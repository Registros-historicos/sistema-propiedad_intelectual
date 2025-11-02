import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

export type UserRole = 'administrador' | 'cepat' | 'coordinador';

@Injectable({
  providedIn: 'root'
})
export class NavigationService {

  constructor(private router: Router) {}

  getCurrentUserRole(): UserRole {
    const url = this.router.url;

    if (url.includes('/administrador')) {
      return 'administrador';
    } else if (url.includes('/cepat')) {
      return 'cepat';
    } else if (url.includes('/coordinador')) {
      return 'coordinador';
    }

    return 'administrador';
  }

  getBaseRoute(): string {
    const role = this.getCurrentUserRole();
    return `/${role}`;
  }

  getHistoricalRecordsRoute(): string {
    const baseRoute = this.getBaseRoute();
    return `${baseRoute}/registros/historicos`;
  }

  navigateToHistoricalRecords(): void {
    const route = this.getHistoricalRecordsRoute();
    this.router.navigate([route]);
  }

  navigateToRegister(): void {
    const baseRoute = this.getBaseRoute();
    this.router.navigate([`${baseRoute}/registro`]);
  }
}
