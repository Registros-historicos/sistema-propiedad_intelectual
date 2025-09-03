import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable({ providedIn: 'root' })
export class AuthGuard  {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const currentUser = this.authService.currentUserValue;
    if (currentUser) {
      // logged in so return true
      if (state.url === '/' || state.url === '') {
        this.redirectUserBasedOnRole(currentUser);
        return false;
      }
      return true;
    }

    // not logged in so redirect to login page with the return url
    this.authService.logout();
    return false;
  }

  private redirectUserBasedOnRole(user: any): void {
    if (user.roles && user.roles.length > 0) {
      const userRole = user.roles[0];
      switch (userRole) {
        case 1:
          this.router.navigate(['/administrador/dashboard']);
          break;
        case 2:
          this.router.navigate(['/coordinador/dashboard']);
          break;
        case 3:
          this.router.navigate(['/solicitante/dashboard']);
          break;
        case 4:
          this.router.navigate(['/cepat/dashboard']);
          break;  
        default:
          this.router.navigate(['/auth/login']);
          break;
      }
    } else {
      this.router.navigate(['/auth/login']);
    }
  }
}
