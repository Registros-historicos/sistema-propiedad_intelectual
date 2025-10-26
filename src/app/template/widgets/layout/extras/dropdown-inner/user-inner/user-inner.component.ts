import { Component, HostBinding, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { TranslationService } from '../../../../../../modules/i18n';
import { AuthService, CurrentUser } from '../../../../../../modules/auth';
import { TranslateService } from '@ngx-translate/core';
import { Router } from '@angular/router';
import { SwalComponent } from '@sweetalert2/ngx-sweetalert2';
import { SweetAlertOptions } from 'sweetalert2';

interface LanguageFlag {
  lang: string;
  name: string;
  flag: string;
  active?: boolean;
}

@Component({
  selector: 'app-user-inner',
  templateUrl: './user-inner.component.html',
})
export class UserInnerComponent implements OnInit, OnDestroy {
  @HostBinding('class')
  class = `menu menu-sub menu-sub-dropdown menu-column menu-rounded menu-gray-600 menu-state-bg menu-state-primary fw-bold py-4 fs-6 w-275px`;
  @HostBinding('attr.data-kt-menu') dataKtMenu = 'true';

  @ViewChild('deleteSwal')
  public readonly deleteSwal!: SwalComponent;

  swalOptions: SweetAlertOptions;
  titleDelete: string = '';
  language: LanguageFlag;
  langs: LanguageFlag[] = [];
  user$: Observable<CurrentUser | null>;
  private unsubscribe: Subscription[] = [];

  constructor(
    private authS: AuthService,
    private translationService: TranslationService,
    private translate: TranslateService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.titleDelete = this.translate.instant('ALERT.LOGOUT.TITLE');
    this.user$ = this.authS.currentUser$;
    this.setupSweetAlert();
    this.initializeLanguages();
    this.setLanguage(this.translationService.getSelectedLanguage());
  }

  getInitials(name?: string): string {
    if (!name) return 'U';
    const parts = name.trim().split(/\s+/).slice(0, 2);
    return parts.map(p => p[0]?.toUpperCase() ?? '').join('') || 'U';
  }

  setupSweetAlert() {
    this.swalOptions = {
      buttonsStyling: false,
      confirmButtonText: this.translate.instant('BUTTON.CONFIRM_LOGOUT'),
      cancelButtonText: this.translate.instant('BUTTON.CANCEL')
    };
  }

  logout() {
    this.deleteSwal.fire().then((clicked) => {
      if (clicked.isConfirmed) {
        this.authS.logout();
      }
    });
  }

  initializeLanguages() {
    this.langs = [
      {
        lang: 'en',
        name: this.translate.instant('TRANSLATOR.LANGUAGES.ENGLISH'),
        flag: './assets/media/flags/united-states.svg',
      },
      {
        lang: 'zh',
        name: this.translate.instant('TRANSLATOR.LANGUAGES.MANDARIN'),
        flag: './assets/media/flags/china.svg',
      },
      {
        lang: 'es',
        name: this.translate.instant('TRANSLATOR.LANGUAGES.SPANISH'),
        flag: './assets/media/flags/spain.svg',
      },
      {
        lang: 'ja',
        name: this.translate.instant('TRANSLATOR.LANGUAGES.JAPANESE'),
        flag: './assets/media/flags/japan.svg',
      },
      {
        lang: 'de',
        name: this.translate.instant('TRANSLATOR.LANGUAGES.GERMAN'),
        flag: './assets/media/flags/germany.svg',
      },
      {
        lang: 'fr',
        name: this.translate.instant('TRANSLATOR.LANGUAGES.FRENCH'),
        flag: './assets/media/flags/france.svg',
      },
    ];
  }

  selectLanguage(lang: string) {
    this.translationService.setLanguage(lang);
    this.setLanguage(lang);
    document.location.reload();
  }

  setLanguage(lang: string) {
    this.langs.forEach((language: LanguageFlag) => {
      if (language.lang === lang) {
        language.active = true;
        this.language = language;
      } else {
        language.active = false;
      }
    });
  }

  redirected() {
    const role = this.authS.currentUserValue?.roles[0];

    switch (role) {
      case 1:
        this.router.navigate(['/administrador/perfil']);
        break;
      case 2:
        this.router.navigate(['/coordinador/perfil']);
        break;
      case 3:
        this.router.navigate(['/solicitante/perfil']);
        break;
      case 4:
        this.router.navigate(['/cepat/perfil']);
        break;  
      default:
        break;
    }
  }

  ngOnDestroy() {
    this.unsubscribe.forEach((sb) => sb.unsubscribe());
  }
}
