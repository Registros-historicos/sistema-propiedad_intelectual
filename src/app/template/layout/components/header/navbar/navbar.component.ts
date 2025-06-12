import { AfterViewInit, Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService, UserType } from 'src/app/modules/auth';
import { menuReinitialization } from 'src/app/template/kt/kt-helpers';

@Component({
	selector: 'app-navbar',
	templateUrl: './navbar.component.html',
	styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit, AfterViewInit {
	@Input() appHeaderDefaulMenuDisplay: boolean;
	@Input() isRtl: boolean;

	itemClass: string = 'ms-1 ms-lg-3';
	btnClass: string = 'btn btn-icon btn-custom btn-icon-muted btn-active-light btn-active-color-primary w-35px h-35px w-md-40px h-md-40px';
	userAvatarClass: string = 'symbol-35px symbol-md-40px';
	btnIconClass: string = 'fs-2 fs-md-1';
	
	user$: Observable<UserType>;

	constructor(private auth: AuthService) { }

	ngAfterViewInit(): void {
		menuReinitialization();
	}

	ngOnInit(): void {
		this.user$ = this.auth.currentUserSubject.asObservable();
	}

}
