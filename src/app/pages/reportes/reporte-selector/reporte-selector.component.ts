import { Component, HostListener, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ReporteCard, REPORTES_POR_ROL, Rol } from '../constants/reportes-por-rol.constant';
import { NgZone } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { AuthService, CurrentUser } from 'src/app/modules/auth';
import { FormBuilder, FormGroup } from '@angular/forms';
import { HttpResponse } from '@angular/common/http';
import { ENTIDADES_FEDERATIVAS_DATA } from 'src/app/api/data/entity.data';
import { ENTIDADES_FEDERATIVAS_MAP } from 'src/app/api/data/entity-institucion.data';
import { SECTORES_DATA, ESTATUS_DATA } from 'src/app/api/data/sectores.data';
import { FederalEntity } from 'src/app/api/models/entity.model';
import { UsersService } from 'src/app/api/services/usuarios.service';

type FieldType = 'text' | 'date' | 'select' | 'year';
interface FieldConfig {
  name: string;
  label: string;
  type: FieldType;
  placeholder?: string;
  options?: { value: string; label: string }[];
  validators?: any[];
  visibleIf?: (model: any) => boolean;
}

@Component({
  selector: 'app-reporte-selector',
  templateUrl: './reporte-selector.component.html',
  styleUrls: ['./reporte-selector.component.scss']
})
export class ReporteSelectorComponent implements OnInit {
  perfil: Rol = 'admin';
  reportes: ReporteCard[] = [];
  isLoading = false;
  progress = 0;
  form!: FormGroup;
  currentKind = '';
  currentFields: FieldConfig[] = [];
  entidades: FederalEntity[] = ENTIDADES_FEDERATIVAS_DATA;
  institutionesMap = ENTIDADES_FEDERATIVAS_MAP;
  instituciones: { id: number; nombre: string }[] = [];
  sectores: FederalEntity[] = SECTORES_DATA;
  estatus: FederalEntity[] = ESTATUS_DATA;

  user$: Observable<CurrentUser | null>;
  modalOpen = false;
  selectedReporte?: ReporteCard;

  userProfile: any = null;

  errorMsg = '';

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private zone: NgZone,
    private http: HttpClient,
    private auth: AuthService,
    private fb: FormBuilder,
    private usersService: UsersService
  ) {}

  private ENDPOINTS_POR_ROL: Record<string, string> = {
    admin: 'v1/administrador/',
    cepat: 'v1/cepat/',
    coordinador: 'v1/coordinador/',
    solicitante: 'v1/solicitante/'
  };

  ngOnInit(): void {
    this.user$ = this.auth.currentUser$;

    const url = this.router.url;
    if (url.includes('/administrador/')) this.perfil = 'admin';
    else if (url.includes('/coordinador/')) this.perfil = 'coordinador';
    else if (url.includes('/solicitante/')) this.perfil = 'solicitante';
    else if (url.includes('/cepat/')) this.perfil = 'cepat';

    this.reportes = REPORTES_POR_ROL[this.perfil];

    this.entidades = [...ENTIDADES_FEDERATIVAS_DATA].sort(
      (a, b) => a.nombre.localeCompare(b.nombre, 'es')
    );

    this.loadUserProfile();
    this.instituciones = this.getAllInstitutes()
    .sort((a, b) => a.nombre.localeCompare(b.nombre, 'es'));
  }

  private extractSimpleProfile(apiUser: any, currentUser: any): { fullname: string; occupation: string } {
    const contexto = currentUser?.contexto;

    const fullnameFromApi = [
      apiUser?.nombre,
      apiUser?.ape_pat,
      apiUser?.ape_mat
    ].filter(Boolean).join(" ").trim();

    const fullname =
      fullnameFromApi ||
      contexto?.nombre ||
      currentUser?.name ||
      "Usuario";

    if (contexto?.rol_nombre && contexto?.institucion_nombre) {
      return {
        fullname,
        occupation: `${contexto.rol_nombre} - ${contexto.institucion_nombre}`
      };
    }

    if (contexto?.rol_nombre && contexto?.cepat_nombre) {
      return {
        fullname,
        occupation: `${contexto.rol_nombre} - ${contexto.cepat_nombre}`
      };
    }

    const basicRoleMap = {
      1: "Administrador",
      2: "Coordinador",
      4: "CEPAT",
      35: "Administrador",
      36: "Coordinador",
      37: "CEPAT"
    };

    const roleName =
      basicRoleMap[contexto?.rol_id as keyof typeof basicRoleMap] ||
      basicRoleMap[currentUser?.roles?.[0] as keyof typeof basicRoleMap] ||
      "Usuario";

    return { fullname, occupation: roleName };
  }

  // ======================================================

  openModal(item: ReporteCard): void {
    this.selectedReporte = item;
    this.modalOpen = true;
    document.body.style.overflow = 'hidden';
    this.errorMsg = '';
    this.currentKind = this.mapToKind(item);
  }

  private mapToKind(item: ReporteCard): string {
    const knownKinds = new Set([
      'reporte_it_federales',
      'reporte_it_descentralizados',
      'reporte_top10_instituciones',
      'topentidades',
      'reporte_registros_anio',
      'reporte_registros_sector',
      'reporte_registros_estatus',
      'reporte_solicitudes_general',
      'reporte_por_institucion',
      'reporte_registros_sexo',
      'reporte_registros_categoria',
      'reporte_registros_departamento',
    ]);
    if (knownKinds.has(item.archivo)) return item.archivo;
    return this.rename();
  }

  rename() {
    const a = (this.selectedReporte?.archivo || '').toLowerCase();
    const t = this.selectedReporte?.titulo || '';

    switch (t) {
      case 'REPORTS.ADMIN.FEDERAL.TITLE': return 'federales';
      case 'REPORTS.ADMIN.DECENTRALIZED.TITLE': return 'descentralizados';
      case 'REPORTS.ADMIN.TOP_INSTITUTIONS.TITLE': return 'topinstituciones';
      case 'REPORTS.ADMIN.TOP_STATES.TITLE': return 'topentidades';
      case 'REPORTS.ADMIN.YEAR.TITLE': return 'anuales';
      case 'REPORTS.ADMIN.SECTOR.TITLE': return 'sectoriales';
      case 'REPORTS.ADMIN.STATUS.TITLE': return 'estatus';
      case 'REPORTS.ADMIN.GENERAL.TITLE': return 'general';
      case 'REPORTS.ADMIN.INSTITUTION.TITLE': return 'institucion';
      case 'REPORTS.ADMIN.SEX.TITLE': return 'genero';
      case 'REPORTS.ADMIN.CATEGORY.TITLE': return 'categoria';
      case 'REPORTS.ADMIN.ACADEMICOS.TITLE': return 'cuerpos_academicos';
      case 'REPORTS.ADMIN.DEPARTMENT.TITLE': return 'departamentos';
      case 'REPORTS.ADMIN.PROGRAM.TITLE': return 'programas_educativos';
      case 'REPORTS.ADMIN.RESEARCHER.TITLE': return 'investigadores';

      case 'REPORTS.CEPAT.FEDERAL.TITLE': return 'federales';
      case 'REPORTS.CEPAT.DECENTRALIZED.TITLE': return 'descentralizados';
      case 'REPORTS.CEPAT.TOP_INSTITUTIONS.TITLE': return 'topinstituciones';
      case 'REPORTS.CEPAT.TOP_STATES.TITLE': return 'topentidades';
      case 'REPORTS.CEPAT.YEAR.TITLE': return 'anuales';
      case 'REPORTS.CEPAT.SECTOR.TITLE': return 'sectoriales';
      case 'REPORTS.CEPAT.STATUS.TITLE': return 'estatus';
      case 'REPORTS.CEPAT.GENERAL.TITLE': return 'general';
      case 'REPORTS.CEPAT.INSTITUTION.TITLE': return 'institucion';
      case 'REPORTS.CEPAT.SEX.TITLE': return 'genero';
      case 'REPORTS.CEPAT.CATEGORY.TITLE': return 'categoria';
      case 'REPORTS.CEPAT.ACADEMICOS.TITLE': return 'cuerpos_academicos';
      case 'REPORTS.CEPAT.DEPARTMENT.TITLE': return 'departamentos';
      case 'REPORTS.CEPAT.PROGRAM.TITLE': return 'programas_educativos';
      case 'REPORTS.CEPAT.RESEARCHER.TITLE': return 'investigadores';

      case 'REPORTS.COORDINATOR.YEAR.TITLE': return 'anuales';
      case 'REPORTS.COORDINATOR.STATUS.TITLE': return 'estatus';
      case 'REPORTS.COORDINATOR.SEX.TITLE': return 'genero';
      case 'REPORTS.COORDINATOR.CATEGORY.TITLE': return 'categoria';
      case 'REPORTS.COORDINATOR.ACADEMICOS.TITLE': return 'cuerpos_academicos';
      case 'REPORTS.COORDINATOR.DEPARTMENT.TITLE': return 'departamentos';
      case 'REPORTS.COORDINATOR.PROGRAM.TITLE': return 'programas_educativos';
      case 'REPORTS.COORDINATOR.RESEARCHER.TITLE': return 'investigadores';

      default:
        if (a.includes('entidad')) return 'reporte_it_federales';
        if (a.includes('clasificación')) return 'reporte_registros_estatus';
        if (a.includes('fecha')) return 'reporte_registros_anio';
        return 'reporte_solicitudes_general';
    }
  }

  closeModal(): void {
    this.modalOpen = false;
    this.selectedReporte = undefined;
    document.body.style.overflow = '';
  }

  @HostListener('document:keydown.escape')
  onEsc(): void { if (this.modalOpen) this.closeModal(); }

  loadUserProfile(): void {
    const currentUser = this.auth.currentUserValue;
    this.isLoading = true;

    if (currentUser && currentUser.email) {
      this.usersService.getUserByEmail(currentUser.email).subscribe({
        next: (apiUser) => {
          this.userProfile = this.extractSimpleProfile(apiUser, currentUser);
          this.isLoading = false;
          this.auth.setUserProfile(this.userProfile);
        },
        error: () => {
          this.userProfile = this.extractSimpleProfile(null, currentUser);
          this.isLoading = false;
        }
      });
    } else {
      this.userProfile = { fullname: "Usuario", occupation: "Usuario del Sistema" };
      this.isLoading = false;
    }
  }

  private buildPayload(formValues?: any): any {
    return {
      persona: this.userProfile?.fullname || "Usuario",
      cargo: this.userProfile?.occupation || "Usuario del Sistema",
      institucion: formValues?.institucion || null,
      entidad: formValues?.entidad || null,
      cuartil: formValues?.trimestre || null,
      anio_inicio: formValues?.anio_inicio || null,
      anio_fin: formValues?.anio_fin || null,
      departamento: formValues?.departamento || null,
      cuerpo_academico: formValues?.cuerpos_academicos || null,
      programa_educativo: formValues?.programa_educativo || null,
      categoria: formValues?.categoria || null,
      genero: formValues?.sexo || null,
      estatus: formValues?.estatus || null,
      sector: formValues?.sector || null,
    };
  }

  private parseApiError(err: HttpErrorResponse): string {
    if (err.status === 0) return 'No se pudo conectar con el servidor.';
    if (err.error instanceof Blob) return 'Error al generar el PDF.';
    if (typeof err.error === 'string') return err.error;
    if (err.error?.detail) return String(err.error.detail);
    return `Error ${err.status}: ${err.statusText}`;
  }

  onSubmit(formValues?: any): void {
    
    if (!this.selectedReporte?.archivo) {
      this.errorMsg = 'No se encontró el archivo del reporte.';
      return;
    }

    const payload = this.buildPayload(formValues);
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'x-api-key': environment.REPORTES_API_KEY
    });

    this.errorMsg = '';
    this.isLoading = true;
    this.progress = 0;

    const tipo = this.perfil;
    const endpoint = environment.REPORTES_API_URL + this.ENDPOINTS_POR_ROL[tipo] + this.currentKind;

    this.http.post(endpoint, payload, {
      headers,
      responseType: 'blob',
      observe: 'response'
    }).subscribe({
      next: (event: HttpResponse<Blob> | any) => {
        if (event instanceof HttpResponse && event.body instanceof Blob) {
          const blob = event.body;
          const filename = this.rename() + '.pdf';
          const url = URL.createObjectURL(blob);

          this.isLoading = false;
          this.progress = 100;
          this.closeModal();

          this.router.navigateByUrl('/visor-pdf', {
            state: { url, filename, tipo }
          });
        }
      },
      error: (err: HttpErrorResponse) => {
        this.isLoading = false;
        this.errorMsg = this.parseApiError(err);
      }
    });
  }

  trackByArchivo(_index: number, r: ReporteCard): string {
    return r.archivo;
  }

  dateError: boolean = false;

  validateDates(values: any): void {
    if (values?.anio_fin && values?.anio_inicio) {
      const desde = new Date(values.anio_inicio);
      const hasta = new Date(values.anio_fin);

      this.dateError = hasta < desde;
    } else {
      this.dateError = false;
    }
  }

  getAllInstitutes(): { id: number; nombre: string }[] {
    const all: { id: number; nombre: string }[] = [];

    Object.values(this.institutionesMap).forEach(lista => {
      all.push(...lista);
    });

    return all;
  }

}
