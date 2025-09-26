// visor-pdf.component.ts
import { Component, OnDestroy, OnInit } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { Router } from '@angular/router';

@Component({
  selector: 'app-visor-pdf',
  templateUrl: './visor-pdf.component.html',
  styleUrls: ['./visor-pdf.component.scss']
})
export class VisorPdfComponent implements OnInit, OnDestroy {
  pdfUrl?: SafeResourceUrl;
  rawUrl?: string;       // para revokeObjectURL
  filename?: string;
  tipo?: string;
  errorMsg = '';

  constructor(private router: Router, private sanitizer: DomSanitizer) {}

  /* Cuando llegamos al visor PDF, obtenemos la URL y el nombre del archivo. En este caso podemos ver que,
  podemos utilizar la url para mostrar el PDF regresado por el API para reportes ó archivos locales para fines de visualización */
  ngOnInit(): void {
    const { url, filename, tipo } = history.state || {};
    if (!url) {
      this.errorMsg = 'No se pudo cargar el reporte. Regrese e inténtelo de nuevo.';
      return;
    }

    //this.rawUrl = url as string; // Usa  la URL del API generada
    this.rawUrl = 'assets/reportes/admin/' + (filename as string); // Usa archivos locales para pruebas
    this.filename = filename as string;
    this.tipo = tipo as string;
    this.pdfUrl = this.sanitizer.bypassSecurityTrustResourceUrl(this.rawUrl);
  }

  ngOnDestroy(): void {
    // Revocar el blob URL para liberar memoria
    if (this.rawUrl) {
      URL.revokeObjectURL(this.rawUrl);
    }
  }

  back(): void {
    history.length > 1 ? history.back() : this.router.navigate(['/']);
  }
}
