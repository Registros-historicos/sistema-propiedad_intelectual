import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router,
} from '@angular/router';
import { Rol, RolNombre } from '../guards/roles.constant';
import {AuthService} from '../modules/auth';

@Injectable({
  providedIn: 'root',
})
export class RoleGuard implements CanActivate {
  constructor(
    private router: Router,
    private authS: AuthService
  ) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    const expectedRoles: string[] = route.data['roles'] || [];

    const rawRole = this.authS.currentUserValue?.roles[0];
    const roleNumber = Number(rawRole);

    if (!Object.values(Rol).includes(roleNumber)) {
      this.router.navigate(['/']);
      return false;
    }

    const currentRole = RolNombre[roleNumber as Rol];

    if (!expectedRoles.includes(currentRole)) {
      this.router.navigate(['/']);
      return false;
    }

    return true;
  }
}
