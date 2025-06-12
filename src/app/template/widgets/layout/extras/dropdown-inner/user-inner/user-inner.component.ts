import { Component, HostBinding, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { TranslationService } from '../../../../../../modules/i18n';
import { AuthService, UserType } from '../../../../../../modules/auth';
import { TranslateService } from '@ngx-translate/core';

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

  language: LanguageFlag;
  user$: Observable<UserType>;
  langs: LanguageFlag[] = [];
  private unsubscribe: Subscription[] = [];

  constructor(
    private auth: AuthService,
    private translationService: TranslationService,
    private translate: TranslateService
  ) {}

  ngOnInit(): void {
    this.user$ = this.auth.currentUserSubject.asObservable();
    this.initializeLanguages();
    this.setLanguage(this.translationService.getSelectedLanguage());
  }

  logout() {
    this.auth.logout();
    document.location.reload();
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
    // document.location.reload();
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

  ngOnDestroy() {
    this.unsubscribe.forEach((sb) => sb.unsubscribe());
  }
}
