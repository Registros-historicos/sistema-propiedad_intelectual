import { Component, Input, OnInit } from '@angular/core';

export interface Instituto {
  tipo_institucion_param: number;
  nombre_tipo_institucion: string;
  nombre_institucion: string;
  total_registros: number;
}

@Component({
  selector: 'app-tablero-institutos-general',
  templateUrl: './tablero-institutos-general.component.html',
  styleUrl: './tablero-institutos-general.component.scss',
})
export class TableroInstitutosGeneralComponent implements OnInit {
  @Input() data: Instituto[] = [];

  totalInstitutes: number = 0;
  totalRegistros: number = 0;

  constructor() {}
  ngOnInit(): void {
    this.totalInstitutes = this.data.length;
    this.totalRegistros = this.data.reduce((sum, current) => sum + current.total_registros, 0);
  }
}
