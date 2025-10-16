import { Component, Input } from '@angular/core';
import { Top10Instituciones } from 'src/app/api/services/tableros.service';



@Component({
  selector: 'app-tablero-top10-instituciones',
  templateUrl: './tablero-top10-instituciones.component.html',
  styleUrl: './tablero-top10-instituciones.component.scss',
})
export class TableroTop10InstitucionesComponent {
  @Input() instituciones: Top10Instituciones[] = [];

  trackByInstitution(index: number, item: Top10Instituciones) {
    return item.id_institucion;
  }

  onExportExcel() {
    console.log('Exportando a Excel...');
  }
}
