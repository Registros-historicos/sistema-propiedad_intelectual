import { Component, Input } from '@angular/core';
import { MatIcon } from "@angular/material/icon";

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
