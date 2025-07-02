import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import {
  DrawerComponent,
  MenuComponent,
  ScrollComponent,
  ScrollTopComponent,
  StickyComponent,
  ToggleComponent,
} from '../../../template/kt/components';
import { ThemeModeService } from '../../../template/widgets/layout/theme-mode-switcher/theme-mode.service';
import { AuthService } from '../../auth';

@Component({
  selector: 'app-error404',
  templateUrl: './error404.component.html',
  styleUrls: ['./error404.component.scss'],
})
export class Error404Component implements OnInit, OnDestroy {
  private unsubscribe: Subscription[] = [];

  constructor(private router: Router, private modeService: ThemeModeService, private authS: AuthService) {}

  ngOnInit(): void {
    const subscr = this.modeService.mode.asObservable().subscribe((mode) => {
      document.body.style.backgroundImage =
        mode === 'dark'
          ? 'url(./assets/media/auth/bg1-dark.jpg)'
          : 'url(./assets/media/auth/bg1.jpg)';
    });
    this.unsubscribe.push(subscr);
  }

  routeToDashboard() {
    const role = this.authS.currentUserValue?.roles[0];

    switch (role) {
      case 1:
        this.router.navigate(['administrador']);
        break;
      case 2:
        this.router.navigate(['coordinador']);
        break;
      default:
        this.router.navigate(['error/404']);
        break;
    }
  }

  ngOnDestroy() {
    this.unsubscribe.forEach((sb) => sb.unsubscribe());
    document.body.style.backgroundImage = 'none';
  }
}
