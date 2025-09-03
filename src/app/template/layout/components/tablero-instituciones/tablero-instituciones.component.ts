import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-tablero-instituciones',
  templateUrl: './tablero-instituciones.component.html',
  styleUrls: ['./tablero-instituciones.component.scss'],
})
export class TableroInstitucionesComponent {
  @Input() topFiveFederalInstitutions: {
    name: string;
    value: number;
    tags: string[];
  }[] = [];
}
