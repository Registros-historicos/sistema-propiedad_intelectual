import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { ThemeModeService } from 'src/app/template/widgets/layout/theme-mode-switcher/theme-mode.service';
import { TranslateModule } from '@ngx-translate/core';

import { MatIcon } from '@angular/material/icon';
import { AuthService } from '../../auth';
@Component({
  selector: 'app-error503',
  standalone: true,
  imports: [
    MatIcon,
    TranslateModule
  ],
  templateUrl: './error503.component.html',
  styleUrl: './error503.component.scss'
})
export class Error503Component {
  private unsubscribe: Subscription[] = [];

  constructor(private router: Router, private modeService: ThemeModeService, private authS: AuthService) { }

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
        this.router.navigate(['error/404']);
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
