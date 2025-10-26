import { Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { AuthService } from './auth.service';
import { catchError, switchMap } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
    private isRefreshing = false;

    constructor(private auth: AuthService, private router: Router) { }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const current = this.auth.currentUserValue;
        let authReq = req;

        if (current?.token) {
            authReq = req.clone({
                setHeaders: { Authorization: `Bearer ${current.token}` }
            });
        }

        return next.handle(authReq).pipe(
            catchError((err: HttpErrorResponse) => {
                if (err.status === 401 && !this.isRefreshing) {
                    this.isRefreshing = true;
                    return this.auth.refreshAccess().pipe(
                        switchMap(newToken => {
                            this.isRefreshing = false;
                            if (!newToken) { 
                                this.auth.logout(); 
                                this.router.navigate(['/auth/login']); 
                                return throwError(() => err); 
                            }
                            const retry = req.clone({ 
                                setHeaders: { 
                                    Authorization: `Bearer ${newToken}`
                                } 
                            });
                            return next.handle(retry);
                        })
                    );
                }
                return throwError(() => err);
            })
        );
    }
}
