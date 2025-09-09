import { Component, HostListener, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ReporteCard, REPORTES_POR_ROL, Rol } from '../constants/reportes-por-rol.constant';
import { NgZone } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpEventType, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment'; // <-- ajuste si su ruta difiere

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

  // Modal
  modalOpen = false;
  selectedReporte?: ReporteCard;

  // Error UI
  errorMsg = '';

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private zone: NgZone,
    private http: HttpClient
  ) {}

  ngOnInit(): void {
    const url = this.router.url;
    if (url.includes('/administrador/')) this.perfil = 'admin';
    else if (url.includes('/coordinador/')) this.perfil = 'coordinador';
    else if (url.includes('/solicitante/')) this.perfil = 'solicitante';

    this.reportes = REPORTES_POR_ROL[this.perfil];
  }

  // ===== Modal =====
  openModal(item: ReporteCard): void {
    this.selectedReporte = item;
    this.modalOpen = true;
    document.body.style.overflow = 'hidden';
    this.errorMsg = '';
  }

  closeModal(): void {
    this.modalOpen = false;
    this.selectedReporte = undefined;
    document.body.style.overflow = '';
  }

  @HostListener('document:keydown.escape')
  onEsc(): void { if (this.modalOpen) this.closeModal(); }

  // ===== POST a la API y descarga del PDF =====
  onSubmit(formValues?: any): void {
    if (!this.selectedReporte?.archivo) {
      this.errorMsg = 'No se encontró el archivo del reporte.';
      return;
    }

    const payload = this.buildPayload(formValues);

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'x-api-key': environment.REPORTS_API_KEY // defínalo en environments
    });

    this.errorMsg = '';
    this.isLoading = true;
    this.progress = 0;

    this.http.post(environment.REPORTS_API_URL, payload, {
      headers,
      responseType: 'blob',
      observe: 'response',
      reportProgress: true
    }).subscribe({
      next: (event) => {
        // progreso (si el runtime lo emite)
        const anyEvent: any = event as any;
        if (anyEvent?.type === HttpEventType.DownloadProgress && anyEvent.total) {
          this.progress = Math.round(100 * anyEvent.loaded / anyEvent.total);
        }

        if (event.body instanceof Blob) {
          const blob = event.body;
          const cd  = event.headers?.get('Content-Disposition') || event.headers?.get('content-disposition');
          const filename = this.getFilenameFromDisposition(cd) || this.suggestFileName();
          this.downloadBlob(blob, filename);
          this.isLoading = false;
          this.progress = 100;
          this.closeModal();
        }
      },
      error: (err: HttpErrorResponse) => {
        this.isLoading = false;
        this.errorMsg = this.parseApiError(err);
      }
    });
  }

  // ===== Utilidades =====
  private downloadBlob(blob: Blob, filename: string) {
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename.endsWith('.pdf') ? filename : `${filename}.pdf`;
    document.body.appendChild(a);
    a.click();
    a.remove();
    window.URL.revokeObjectURL(url);
  }

  private getFilenameFromDisposition(disposition?: string | null): string | null {
    if (!disposition) return null;
    // ej: Content-Disposition: attachment; filename="reporte_admin.pdf"
    const match = /filename\*?=(?:UTF-8''|")?([^\";]+)/i.exec(disposition);
    if (match?.[1]) {
      try { return decodeURIComponent(match[1].replace(/"/g, '')); }
      catch { return match[1].replace(/"/g, ''); }
    }
    return null;
  }

  private suggestFileName(): string {
    const base = this.selectedReporte?.archivo?.replace(/\.[^.]+$/, '') || 'reporte';
    const fecha = new Date().toISOString().slice(0,10);
    return `${base}-${fecha}.pdf`;
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

    // JSON que nos compartió (reporte_entidad_federativa)
    return {
      kind,
      fecha,
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

  showLoading(): void {
    this.isLoading = true;
    this.progress = 0;
  }
  trackByArchivo(_index: number, r: ReporteCard): string {
    return r.archivo;
  }
}
