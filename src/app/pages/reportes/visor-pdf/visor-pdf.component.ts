import {Component} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Location} from '@angular/common'

@Component({
  selector: 'app-visor-pdf',
  templateUrl: './visor-pdf.component.html',
  styleUrls: ['./visor-pdf.component.scss']
})
export class VisorPdfComponent {
  archivo: string = '';
  archivoNombre: string = '';
  archivoTitulo: string = '';

  constructor(
    private route: ActivatedRoute,
    private location: Location
  ) {
    const archivoParam = this.route.snapshot.paramMap.get('archivo');
    const tipoParam = this.route.snapshot.paramMap.get('tipo');

    if (archivoParam && tipoParam) {
      this.archivoNombre = archivoParam;
      this.archivo = 'assets/reportes/' + tipoParam + '/' + archivoParam;
      console.log('Archivo cargado:', this.archivo);

      const baseName = archivoParam.replace('.pdf', '').replace(/-/g, ' ');
      this.archivoTitulo = baseName.charAt(0).toUpperCase() + baseName.slice(1);
    }
  }

  protected goBack() {
    // Regresar la navegación una pagina atrás
    this.location.back();
  }
}
