import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { AuthService } from '../../auth';
import { UsersService } from '../../../api/services/usuarios.service';

@Component({
  selector: 'app-overview',
  templateUrl: './overview.component.html',
})
export class OverviewComponent implements OnInit {
  userProfile: any = null;

  constructor(
    private iconRegistry: MatIconRegistry,
    private sanitizer: DomSanitizer,
    private authS: AuthService,
    private usersService: UsersService,
    private cdRef: ChangeDetectorRef
  ) {
    this.iconRegistry.addSvgIcon(
      'linkedin',
      this.sanitizer.bypassSecurityTrustResourceUrl(
        './assets/media/svg/social-logos/linkedin.svg'
      )
    );
    this.iconRegistry.addSvgIcon(
      'facebook',
      this.sanitizer.bypassSecurityTrustResourceUrl(
        './assets/media/svg/social-logos/facebook.svg'
      )
    );
    this.iconRegistry.addSvgIcon(
      'twitter',
      this.sanitizer.bypassSecurityTrustResourceUrl(
        './assets/media/svg/social-logos/twitter.svg'
      )
    );
    this.iconRegistry.addSvgIcon(
      'instagram',
      this.sanitizer.bypassSecurityTrustResourceUrl(
        './assets/media/svg/social-logos/instagram.svg'
      )
    );
  }

  ngOnInit(): void {
    this.loadUserProfile();
  }

  loadUserProfile(): void {
    const currentUser = this.authS.currentUserValue;

    if (!currentUser) {
      this.userProfile = null;
      this.cdRef.detectChanges();
      return;
    }

    // Intentar primero el endpoint de perfil completo
    this.usersService.getMyProfileCompleto().subscribe({
    next: (perfilCompleto) => {
    if (perfilCompleto) {
      this.userProfile = this.mapUserDataFromProfile(perfilCompleto, currentUser);
      this.cdRef.detectChanges();
      return;
      }
      this.loadUserProfileFallback(currentUser);
      },
      error: (err) => {
      console.error('Error en /me/profile/:', err);
      this.loadUserProfileFallback(currentUser);
    },
    });

  }

  /**
   * Fallback a la lógica original basada en getUserByEmail
   */
  private loadUserProfileFallback(currentUser: any): void {
    if (currentUser && currentUser.email) {
      this.usersService.getUserByEmail(currentUser.email).subscribe({
        next: (apiUser) => {
          if (apiUser) {
            this.userProfile = this.mapUserData(apiUser, currentUser);
          } else {
            this.userProfile = this.mapUserDataFromAuth(currentUser);
          }
          this.cdRef.detectChanges();
        },
        error: () => {
          this.userProfile = this.mapUserDataFromAuth(currentUser);
          this.cdRef.detectChanges();
        },
      });
    } else {
      this.userProfile = this.mapUserDataFromAuth(currentUser);
      this.cdRef.detectChanges();
    }
  }

  /**
   * Mapper usando el endpoint /api/usuarios/me/profile/
   * que incluye contexto y perfil.empresa (institución / CEPAT).
   */
  private mapUserDataFromProfile(apiProfile: any, currentUser: any): any {
    const contexto = apiProfile?.contexto || currentUser?.contexto;
    const perfil = apiProfile?.perfil || {};

    return {
      id: apiProfile.id_usuario || currentUser.id || 0,
      username: (apiProfile.correo || currentUser.email || '').split('@')[0] || 'usuario',
      email: apiProfile.correo || currentUser.email || 'No especificado',
      authToken: currentUser.token,
      refreshToken: currentUser.refresh,
      roles: currentUser.roles || [apiProfile.tipo_usuario_param] || [1],
      pic: apiProfile.url_foto || './assets/media/avatars/300-1.jpg',

      fullname:
        perfil.nombre_completo ||
        `${apiProfile.nombre || ''} ${apiProfile.ape_pat || ''} ${
          apiProfile.ape_mat || ''
        }`.trim() ||
        currentUser.name ||
        this.getDefaultName(currentUser.roles?.[0]),

      firstname: apiProfile.nombre || currentUser.name?.split(' ')[0] || 'Usuario',
      lastname:
        `${apiProfile.ape_pat || ''} ${apiProfile.ape_mat || ''}`.trim() ||
        currentUser.name?.split(' ').slice(1).join(' ') ||
        'Sistema',

      occupation:
        perfil.ocupacion ||
        this.getSpecificOccupation(contexto, apiProfile.tipo_usuario_param),

      // Aquí ya viene la institución / CEPAT del backend
      companyName:
        perfil.empresa ||
        contexto?.institucion_nombre ||
        contexto?.cepat_nombre ||
        'Sin institución registrada',

      phone: apiProfile.telefono || 'No especificado',

      language: perfil.configuracion?.idioma || 'es',
      timeZone: perfil.configuracion?.zona_horaria || 'America/Mexico_City',

      communication: {
        email: perfil.configuracion?.email_habilitado ?? true,
        sms: perfil.configuracion?.sms_habilitado ?? true,
        phone: perfil.configuracion?.telefono_habilitado ?? false,
      },

      address: {
        addressLine:
          perfil.direccion?.direccion_linea || 'Dirección no especificada',
        city: perfil.direccion?.ciudad || 'No especificada',
        state: perfil.direccion?.estado || 'No especificado',
        postCode: perfil.direccion?.codigo_postal || '00000',
      },

      socialNetworks: {
        linkedIn: 'https://linkedin.com/tecnm',
        facebook: 'https://facebook.com/tecnm',
        twitter: 'https://twitter.com/tecnm',
        instagram: 'https://instagram.com/tecnm',
      },
    };
  }

  private mapUserData(apiUser: any, currentUser: any): any {
    const contexto = currentUser?.contexto;
    if (!apiUser) {
      return this.mapUserDataFromAuth(currentUser);
    }

    return {
      id: apiUser.id_usuario || currentUser.id || 0,
      username:
        (apiUser.correo || currentUser.email || '').split('@')[0] || 'usuario',
      email: apiUser.correo || currentUser.email || 'No especificado',
      authToken: currentUser.token,
      refreshToken: currentUser.refresh,
      roles: currentUser.roles || [apiUser.tipo_usuario_param] || [1],
      pic:
        apiUser.url_foto ||
        apiUser.avatar ||
        './assets/media/avatars/300-1.jpg',
      fullname:
        `${apiUser.nombre || ''} ${apiUser.ape_pat || ''} ${
          apiUser.ape_mat || ''
        }`.trim() ||
        currentUser.name ||
        this.getDefaultName(currentUser.roles?.[0]),
      firstname: apiUser.nombre || currentUser.name?.split(' ')[0] || 'Usuario',
      lastname:
        `${apiUser.ape_pat || ''} ${apiUser.ape_mat || ''}`.trim() ||
        currentUser.name?.split(' ').slice(1).join(' ') ||
        'Sistema',

      occupation: this.getSpecificOccupation(contexto, apiUser.tipo_usuario_param),
      companyName: this.getSpecificCompanyName(contexto),

      phone: apiUser.telefono || 'No especificado',
      language: 'es',
      timeZone: 'America/Mexico_City',
      website: 'https://tecnm.mx',
      communication: { email: true, sms: true, phone: false },
      address: {
        addressLine: 'Dirección no especificada',
        city: 'No especificada',
        state: 'No especificado',
        postCode: '00000',
      },
      socialNetworks: {
        linkedIn: 'https://linkedin.com/tecnm',
        facebook: 'https://facebook.com/tecnm',
        twitter: 'https://twitter.com/tecnm',
        instagram: 'https://instagram.com/tecnm',
      },
    };
  }

  private mapUserDataFromAuth(currentUser: any): any {
    const contexto = currentUser?.contexto;

    return {
      id: currentUser.id,
      username: currentUser.email?.split('@')[0] || 'usuario',
      email: currentUser.email,
      authToken: currentUser.token,
      refreshToken: currentUser.refresh,
      roles: currentUser.roles || [1],
      pic: './assets/media/avatars/300-1.jpg',
      fullname: currentUser.name || this.getDefaultName(currentUser.roles?.[0]),
      firstname: currentUser.name?.split(' ')[0] || 'Usuario',
      lastname: currentUser.name?.split(' ').slice(1).join(' ') || 'Sistema',

      occupation: this.getSpecificOccupation(contexto, currentUser.roles?.[0]),
      companyName: this.getSpecificCompanyName(contexto),

      phone: 'No especificado',
      language: 'es',
      timeZone: 'America/Mexico_City',
      website: 'https://tecnm.mx',
      communication: { email: true, sms: true, phone: false },
      address: {
        addressLine: 'Dirección no especificada',
        city: 'No especificada',
        state: 'No especificado',
        postCode: '00000',
      },
      socialNetworks: {
        linkedIn: 'https://linkedin.com/tecnm',
        facebook: 'https://facebook.com/tecnm',
        twitter: 'https://twitter.com/tecnm',
        instagram: 'https://instagram.com/tecnm',
      },
    };
  }

  private getSpecificOccupation(contexto: any, roleId: number): string {
    if (contexto?.rol_nombre && contexto?.institucion_nombre) {
      return `${contexto.rol_nombre} - ${contexto.institucion_nombre}`;
    }

    if (contexto?.rol_nombre && contexto?.cepat_nombre) {
      return `${contexto.rol_nombre} - ${contexto.cepat_nombre}`;
    }

    return this.getRoleName(roleId);
  }

  // En caso de que no haya institución
  private getSpecificCompanyName(contexto: any): string {
    return (
      contexto?.institucion_nombre ||
      contexto?.cepat_nombre ||
      'Sin institución registrada'
    );
  }

  private getDefaultName(roleId: number): string {
    const roleMap: { [key: number]: string } = {
      1: 'Administrador del Sistema',
      2: 'Coordinador del Sistema',
      4: 'Usuario CEPAT',
    };
    return roleMap[roleId] || 'Usuario del Sistema';
  }

  private getRoleName(roleId: number): string {
    const roleMap: { [key: number]: string } = {
      1: 'Administrador',
      2: 'Coordinador',
      4: 'CEPAT',
      35: 'Administrador',
      36: 'Coordinador',
      37: 'CEPAT',
    };

    const roleName = roleMap[roleId];
    if (!roleName) {
      console.error(
        `ERROR: Rol no mapeado en frontend: ${roleId}. Usuario registrado pero rol desconocido.`
      );
      return 'Usuario del Sistema';
    }

    return roleName;
  }
}
