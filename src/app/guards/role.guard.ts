import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router,
} from '@angular/router';
import { Rol, RolNombre } from '../guards/roles.constant';

@Injectable({
  providedIn: 'root',
})
export class RoleGuard implements CanActivate {
  constructor(private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    const expectedRoles: string[] = route.data['roles'] || [];

    const rawRole = localStorage.getItem('role');
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
