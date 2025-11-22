import { Component, Input, Output, EventEmitter} from '@angular/core';
import { Top10Instituciones } from 'src/app/api/services/tableros.service';
@Component({
  selector: 'app-tablero-top10-instituciones',
  templateUrl: './tablero-top10-instituciones.component.html',
  styleUrl: './tablero-top10-instituciones.component.scss',
})
export class TableroTop10InstitucionesComponent {
  @Input() instituciones: Top10Instituciones[] = [];
  @Output() exportExcel = new EventEmitter<void>();

  trackByInstitution(index: number, item: Top10Instituciones) {
    return item.id_institucion;
  }

  onExportExcel() {
    this.exportExcel.emit();
  }
}
