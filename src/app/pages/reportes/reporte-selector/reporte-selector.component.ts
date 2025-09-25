import { Component, HostListener, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ReporteCard, REPORTES_POR_ROL, Rol } from '../constants/reportes-por-rol.constant';
import { NgZone } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpEventType, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment'; // <-- ajuste si su ruta difiere
import { Observable } from 'rxjs';
import { UserType, AuthService } from 'src/app/modules/auth';
import { FormBuilder, FormGroup } from '@angular/forms';
import { HttpResponse } from '@angular/common/http';
import { ENTIDADES_FEDERATIVAS_DATA } from 'src/app/api/data/entity.data';
import { FederalEntity } from 'src/app/api/models/entity.model';

// tipos campo
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
  
  user$: Observable<UserType>;

  // Modal
  modalOpen = false;
  selectedReporte?: ReporteCard;

  // Error UI
  errorMsg = '';

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private zone: NgZone,
    private http: HttpClient,
    private auth: AuthService,
    private fb: FormBuilder,
  ) {}

  ngOnInit(): void {
    this.user$ = this.auth.currentUserSubject.asObservable();
    const url = this.router.url;
    if (url.includes('/administrador/')) this.perfil = 'admin';
    else if (url.includes('/coordinador/')) this.perfil = 'coordinador';
    else if (url.includes('/solicitante/')) this.perfil = 'solicitante';

    this.reportes = REPORTES_POR_ROL[this.perfil];

    this.entidades = [...ENTIDADES_FEDERATIVAS_DATA].sort(
      (a, b) => a.nombre.localeCompare(b.nombre, 'es')
    );
  }

  // ===== Modal =====

  openModal(item: ReporteCard): void {
    this.selectedReporte = item;
    this.modalOpen = true;
    document.body.style.overflow = 'hidden';
    this.errorMsg = '';

    this.currentKind = this.mapToKind(item);
  }

  // Mapea tu estructura actual (PDFs + repetidos) → kind único para el modal
  private mapToKind(item: ReporteCard): string {
    
    const knownKinds = new Set([
      'reporte_it_federales',
      'reporte_it_descentralizados',
      'reporte_top10_instituciones',
      'reporte_top10_entidades',
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

  rename(){
    const a = (this.selectedReporte?.archivo || '').toLowerCase();
    const t = this.selectedReporte?.titulo || '';
    // 2) si es PDF o está repetido, desambiguamos por el título (keys i18n)
    switch (t) {
      case 'REPORTS.ADMIN.FEDERAL.TITLE':          return 'reporte_it_federales';
      case 'REPORTS.ADMIN.DECENTRALIZED.TITLE':    return 'reporte_it_descentralizados';
      case 'REPORTS.ADMIN.TOP_INSTITUTIONS.TITLE': return 'reporte_top10_instituciones';
      case 'REPORTS.ADMIN.TOP_STATES.TITLE':       return 'reporte_top10_entidades';
      case 'REPORTS.ADMIN.YEAR.TITLE':             return 'reporte_registros_anio';
      case 'REPORTS.ADMIN.SECTOR.TITLE':           return 'reporte_registros_sector';
      case 'REPORTS.ADMIN.STATUS.TITLE':           return 'reporte_registros_estatus';
      case 'REPORTS.ADMIN.GENERAL.TITLE':          return 'reporte_solicitudes_general';
      case 'REPORTS.ADMIN.INSTITUTION.TITLE':      return 'reporte_por_institucion';
      case 'REPORTS.ADMIN.SEX.TITLE':              return 'reporte_registros_sexo';
      case 'REPORTS.ADMIN.CATEGORY.TITLE':         return 'reporte_registros_categoria';
      case 'REPORTS.COORDINATOR.DEPARTMENT.TITLE':       return 'reporte_registros_departamento';
      default:
        // 3) fallback por nombre de archivo PDF (por si lo necesitas)
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

  // ===== POST a la API  =====
  onSubmit(formValues?: any): void {
    if (!this.selectedReporte?.archivo) {
      this.errorMsg = 'No se encontró el archivo del reporte.';
      return;
    }

    const payload = this.buildPayload(formValues);
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'x-api-key': environment.REPORTS_API_KEY
    });

    this.errorMsg = '';
    this.isLoading = true;
    this.progress = 0;

    const tipo = this.perfil;

    this.http.post(environment.REPORTS_API_URL, payload, {
      headers,
      responseType: 'blob',
      observe: 'response',
      reportProgress: true
    }).subscribe({
      next: (event: HttpResponse<Blob> | any) => {
        if (event?.type === HttpEventType.DownloadProgress && event.total) {
          this.progress = Math.round(100 * event.loaded / event.total);
          return;
        }

        if (event instanceof HttpResponse && event.body instanceof Blob) {
          const blob = event.body;
          const cd = event.headers?.get('Content-Disposition') || event.headers?.get('content-disposition');
          const filename = this.rename()+'.pdf';

          // 1) Crear URL temporal del PDF
          const url = URL.createObjectURL(blob);
          console.log('Blob URL:', url);
          // 2) Apagar loader y cerrar modal ANTES de navegar
          this.isLoading = false;
          this.progress = 100;
          this.closeModal();

          // 3) Navegar al visor enviando el blobUrl y metadatos
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

  private parseApiError(err: HttpErrorResponse): string {
    if (err.status === 0) return 'No se pudo conectar con el servidor (CORS o red).';
    if (err.error instanceof Blob) return 'Error al generar el PDF.';
    if (typeof err.error === 'string') return err.error;
    if (err.error?.detail) return String(err.error.detail);
    return `Error ${err.status}: ${err.statusText}`;
  }

  private buildPayload(formValues?: any): any {
    const kind = this.selectedReporte?.archivo || 'reporte_generico';
    const fecha = (formValues?.fecha as string) || this.todayISO();
    const persona = (formValues?.persona as string) || 'Usuario';

    // JSON que nos compartió (reporte_entidad_federativa)
    return {
      kind,
      fecha,
      user: persona,
      data: [
        { institucion: 'TecNM / Instituto Tecnológico de Apizaco', tipo: 'Federal',        patentes: 0, da: 0, mu: 0, di: 0, mc: 0 },
        { institucion: 'TecNM / Instituto Tecnológico Superior de Tlaxco', tipo: 'Federal', patentes: 1, da: 1, mu: 1, di: 0, mc: 0 },
        { institucion: 'TecNM / Instituto Tecnológico de Acayucan', tipo: 'Federal',        patentes: 0, da: 0, mu: 0, di: 0, mc: 1 },
        { institucion: 'TecNM / Instituto Tecnológico de Boca del Río', tipo: 'Federal',    patentes: 2, da: 1, mu: 0, di: 1, mc: 0 },
        { institucion: 'TecNM / Instituto Tecnológico de Cerro Azul', tipo: 'Federal',      patentes: 0, da: 0, mu: 1, di: 0, mc: 0 },
        { institucion: 'TecNM / Instituto Tecnológico de Minatitlán', tipo: 'Federal',      patentes: 1, da: 2, mu: 0, di: 0, mc: 1 },
        { institucion: 'TecNM / Instituto Tecnológico de Orizaba', tipo: 'Descentralizado', patentes: 0, da: 0, mu: 0, di: 1, mc: 0 },
        { institucion: 'TecNM / Instituto Tecnológico de Veracruz', tipo: 'Descentralizado',patentes: 1, da: 1, mu: 1, di: 0, mc: 0 },
        { institucion: 'TecNM / Instituto Tecnológico Superior de Alvarado', tipo: 'Descentralizado', patentes: 0, da: 0, mu: 0, di: 0, mc: 1 },
        { institucion: 'TecNM / Instituto Tecnológico Superior de Coatzacoalcos', tipo: 'Descentralizado', patentes: 2, da: 1, mu: 0, di: 1, mc: 0 },
        { institucion: 'TecNM / Instituto Tecnológico Superior de Huatusco', tipo: 'Descentralizado', patentes: 0, da: 0, mu: 1, di: 0, mc: 0 },
        { institucion: 'TecNM / Instituto Tecnológico Superior de Juan Rodríguez Clara', tipo: 'Descentralizado', patentes: 1, da: 2, mu: 0, di: 0, mc: 1 },
        { institucion: 'TecNM / Instituto Tecnológico Superior de la Región Olmeca', tipo: 'Descentralizado', patentes: 0, da: 0, mu: 0, di: 1, mc: 0 },
        { institucion: 'TecNM / Instituto Tecnológico Superior de Las Choapas', tipo: 'Descentralizado', patentes: 1, da: 1, mu: 1, di: 0, mc: 0 },
        { institucion: 'TecNM / Instituto Tecnológico Superior de Martínez de la Torre', tipo: 'Descentralizado', patentes: 0, da: 0, mu: 0, di: 0, mc: 1 },
        { institucion: 'TecNM / Instituto Tecnológico Superior de Misantla', tipo: 'Descentralizado', patentes: 2, da: 1, mu: 0, di: 1, mc: 0 },
        { institucion: 'TecNM / Instituto Tecnológico Superior de Naranjos', tipo: 'Descentralizado', patentes: 0, da: 0, mu: 1, di: 0, mc: 0 },
        { institucion: 'TecNM / Instituto Tecnológico Superior de Pánuco', tipo: 'Descentralizado', patentes: 1, da: 2, mu: 0, di: 0, mc: 1 },
        { institucion: 'TecNM / Instituto Tecnológico Superior de Papantla', tipo: 'Descentralizado', patentes: 0, da: 1, mu: 1, di: 1, mc: 0 }
      ]
    };

}
  private todayISO(): string { return new Date().toISOString().slice(0,10); }

  trackByArchivo(_index: number, r: ReporteCard): string {
    return r.archivo;
  }
}