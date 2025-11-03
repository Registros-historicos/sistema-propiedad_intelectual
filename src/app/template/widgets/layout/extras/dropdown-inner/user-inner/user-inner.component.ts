import { Component, HostBinding, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { TranslationService } from '../../../../../../modules/i18n';
import { AuthService, CurrentUser } from '../../../../../../modules/auth';
import { TranslateService } from '@ngx-translate/core';
import { Router } from '@angular/router';
import { SwalComponent } from '@sweetalert2/ngx-sweetalert2';
import { SweetAlertOptions } from 'sweetalert2';
//AGREGA: Importar el servicio de usuarios
import { UsersService } from '../../../../../../../app/api/services/usuarios.service';

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
  
  //AGREGA: Propiedad para los datos del perfil
  userProfile: any = null;
  isLoading: boolean = true;
  
  private unsubscribe: Subscription[] = [];

  constructor(
    private authS: AuthService,
    private translationService: TranslationService,
    private translate: TranslateService,
    private router: Router,
    //AGREGA: Inyectar el servicio de usuarios
    private usersService: UsersService
  ) { }

  ngOnInit(): void {
    this.titleDelete = this.translate.instant('ALERT.LOGOUT.TITLE');
    this.user$ = this.authS.currentUser$;
    this.setupSweetAlert();
    this.initializeLanguages();
    this.setLanguage(this.translationService.getSelectedLanguage());
    
    //AGREGA: Cargar el perfil del usuario
    this.userProfile = this.authS.getUserProfile();
    this.loadUserProfile();

    if (!this.userProfile) {
      this.loadUserProfile();
    }
  }

  //AGREGA: Método para cargar el perfil
  loadUserProfile(): void {
    const currentUser = this.authS.currentUserValue;
    this.isLoading = true;

    if (currentUser && currentUser.email) {
      this.usersService.getUserByEmail(currentUser.email).subscribe({
        next: (apiUser) => {
          if (apiUser) {
            this.userProfile = this.mapUserDataFromAPI(apiUser, currentUser);
          } else {
            this.userProfile = this.mapUserDataFromAuth(currentUser);
          }
          this.isLoading = false;
          this.authS.setUserProfile(this.userProfile);
        },
        error: (error) => {
          console.error('Error loading user profile:', error);
          this.userProfile = this.mapUserDataFromAuth(currentUser);
          this.isLoading = false;
        }
      });
    } else {
      this.userProfile = this.getDefaultProfile();
      this.isLoading = false;
    }
  }

  // AGREGA: Mapear datos desde API
  private mapUserDataFromAPI(apiUser: any, currentUser: any): any {
    return {
      name: `${apiUser.nombre || ''} ${apiUser.ape_pat || ''} ${apiUser.ape_mat || ''}`.trim() || 
             currentUser.name || 'Usuario',
      email: apiUser.correo || currentUser.email,
      // FOTO REAL del usuario desde la API
      profilePic: apiUser.url_foto || './assets/media/avatars/300-1.jpg',
      roles: currentUser.roles
    };
  }

  //AGREGA: Mapear datos desde Auth (fallback)
  private mapUserDataFromAuth(currentUser: any): any {
    return {
      name: currentUser.name || 'Usuario',
      email: currentUser.email,
      profilePic: './assets/media/avatars/300-1.jpg', // Avatar por defecto
      roles: currentUser.roles
    };
  }

  //AGREGA: Perfil por defecto
  private getDefaultProfile(): any {
    return {
      name: 'Usuario',
      email: 'No especificado',
      profilePic: './assets/media/avatars/300-1.jpg',
      roles: [1]
    };
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