import { Injectable, NgZone } from '@angular/core';
import { fromEvent, merge, Subject, timer } from 'rxjs';
import { mapTo, startWith, switchMap } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class IdleService {
    private activity$ = new Subject<void>();
    private idle$ = new Subject<void>();

    constructor(private zone: NgZone) { }

    start(idleMs = 3 * 60 * 1000) {
        this.zone.runOutsideAngular(() => {
            merge(
                fromEvent(window, 'mousemove'),
                fromEvent(window, 'keydown'),
                fromEvent(window, 'click'),
                fromEvent(window, 'scroll'),
                fromEvent(window, 'touchstart')
            ).pipe(mapTo(void 0)).subscribe(() => this.activity$.next());

            this.activity$.pipe(
                startWith(void 0),
                switchMap(() => timer(idleMs))
            ).subscribe(() => this.idle$.next());
        });
    }

    onActivity() { return this.activity$.asObservable(); }
    onIdle() { return this.idle$.asObservable(); }
}
