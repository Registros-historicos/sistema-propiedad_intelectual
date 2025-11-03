import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { AuthService } from '../auth';
import { UsersService } from '../../../app/api/services/usuarios.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
})
export class ProfileComponent implements OnInit {
  userProfile: any = null; // CAMBIO: null en lugar de datos por defecto
  isLoading = true;

  constructor(
    private authS: AuthService,
    private usersService: UsersService,
    private cdRef: ChangeDetectorRef
  ) {}

    onProfileUpdated(updatedProfile: any) {
    // Actualiza en AuthService para que se refleje en el menú
    this.authS.setUserProfile(updatedProfile);
  }

  ngOnInit(): void {
    this.loadUserProfile();
  }

  loadUserProfile(): void {
    const currentUser = this.authS.currentUserValue;
    
    this.isLoading = true;

    if (currentUser && (currentUser.id || currentUser.email)) {
      
      this.usersService.getUserByEmail(currentUser.email).subscribe({
        next: (apiUser) => {
          if (apiUser) {
            this.userProfile = this.mapUserDataFromAPI(apiUser, currentUser);
          } else {
            this.userProfile = this.mapUserDataFromContext(currentUser);
          }
          this.isLoading = false;
          this.cdRef.detectChanges();
        },
        error: (error) => {
          this.userProfile = this.mapUserDataFromContext(currentUser);
          this.isLoading = false;
          this.cdRef.detectChanges();
        }
      });
    } else {
      // CAMBIO: No asignar datos por defecto, dejar null
      this.userProfile = null;
      this.isLoading = false;
      this.cdRef.detectChanges();
    }
  }

  private mapUserDataFromAPI(apiUser: any, currentUser: any): any {
    const contexto = currentUser?.contexto;
    
    const mappedData = {
      id: apiUser.id_usuario || 0,
      username: (apiUser.correo || '').split('@')[0] || 'usuario',
      email: apiUser.correo || 'No especificado',
      fullname: `${apiUser.nombre || ''} ${apiUser.ape_pat || ''} ${apiUser.ape_mat || ''}`.trim() || 'Usuario',
      firstname: apiUser.nombre || 'Usuario',
      lastname: `${apiUser.ape_pat || ''} ${apiUser.ape_mat || ''}`.trim() || 'Sistema',
      
      // ✅ Usar métodos específicos
      occupation: this.getSpecificOccupation(contexto, apiUser.tipo_usuario_param),
      companyName: this.getSpecificCompanyName(contexto),
      
      phone: apiUser.telefono || 'No especificado',
      language: 'es',
      timeZone: 'America/Mexico_City',
      pic: apiUser.url_foto || './assets/media/avatars/300-1.jpg',
      roles: currentUser?.roles || [apiUser.tipo_usuario_param] || [1],
      address: {
        city: 'No especificada',
        state: 'No especificado',
        addressLine: 'Dirección no especificada',
        postCode: '00000'
      },
      communication: {
        email: true,
        sms: true,
        phone: false
      }
    };
    
    return mappedData;
  }

  // Método para ocupación específica
  private getSpecificOccupation(contexto: any, roleId: number): string {
    // Si hay contexto, usar la información específica
    if (contexto?.rol_nombre && contexto?.institucion_nombre) {
      return `${contexto.rol_nombre} - ${contexto.institucion_nombre}`;
    }
    
    if (contexto?.rol_nombre && contexto?.cepat_nombre) {
      return `${contexto.rol_nombre} - ${contexto.cepat_nombre}`;
    }
    
    // Fallback al mapeo básico
    return this.mapRolIdToNombre(roleId);
  }

  // Método para empresa específica
  private getSpecificCompanyName(contexto: any): string {
    // Prioriza la información específica del contexto
    return contexto?.institucion_nombre || contexto?.cepat_nombre || 'TECNM ADSCRITO';
  }

  private mapUserDataFromContext(currentUser: any): any {
    const contexto = currentUser?.contexto;
    
    return {
      id: contexto?.id_usuario || currentUser?.id || 0,
      username: (contexto?.correo || currentUser?.email || '').split('@')[0] || 'usuario',
      email: contexto?.correo || currentUser?.email || 'No especificado',
      fullname: contexto?.nombre || currentUser?.name || this.getDefaultNameByRol(contexto?.rol_id),
      firstname: (contexto?.nombre || currentUser?.name || 'Usuario').split(' ')[0],
      lastname: (contexto?.nombre || currentUser?.name || 'Sistema').split(' ').slice(1).join(' '),
      
      //  Usa métodos específicos aquí también
      occupation: this.getSpecificOccupation(contexto, contexto?.rol_id),
      companyName: this.getSpecificCompanyName(contexto),
      
      phone: 'No especificado',
      language: 'es',
      timeZone: 'America/Mexico_City',
      pic: './assets/media/avatars/300-1.jpg',
      roles: currentUser?.roles || [contexto?.rol_id] || [1],
      address: {
        city: 'No especificada',
        state: 'No especificado',
        addressLine: 'Dirección no especificada',
        postCode: '00000'
      },
      communication: {
        email: true,
        sms: true,
        phone: false
      }
    };
  }

  private getDefaultNameByRol(rol: number): string {
    const roleMap: { [key: number]: string } = {
      1: 'Administrador del Sistema',
      2: 'Coordinador del Sistema', 
      4: 'Usuario CEPAT',
      35: 'Administrador del Sistema',
      36: 'Coordinador del Sistema',
      37: 'Usuario CEPAT'
    };
    return roleMap[rol] || 'Usuario del Sistema';
  }

  private mapRolIdToNombre(rolId: number): string {
    const roleMap: { [key: number]: string } = {
      1: 'Administrador',
      2: 'Coordinador', 
      4: 'CEPAT',
      35: 'Administrador',
      36: 'Coordinador', 
      37: 'CEPAT'
    };
    
    //  Verifica explícitamente si existe la clave
    const roleName = roleMap.hasOwnProperty(rolId) ? roleMap[rolId] : undefined;
    
    if (!roleName) {
      // Usuario está registrado pero rol no está mapeado
      console.error(`❌ ERROR: Rol no mapeado en frontend: ${rolId}. Usuario registrado pero rol desconocido.`);
      return 'Usuario del Sistema';
    }
    
    return roleName;
  }
}