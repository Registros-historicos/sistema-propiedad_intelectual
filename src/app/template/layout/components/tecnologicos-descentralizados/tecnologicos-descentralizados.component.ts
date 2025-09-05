import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';

export interface Instituto {
  tipo_institucion_param: number;
  nombre_tipo_institucion: string;
  nombre_institucion: string;
  total_registros: number;
}

@Component({
  selector: 'app-tecnologicos-descentralizados',
  templateUrl: './tecnologicos-descentralizados.component.html',
  styleUrl: './tecnologicos-descentralizados.component.scss',
})
export class TecnologicosDescentralizadosComponent implements OnInit {
  @Input() data: Instituto[]=[
  {
    tipo_institucion_param: 1,
    nombre_tipo_institucion: 'Descentralizado',
    nombre_institucion: 'Instituto Tecnológico Superior de Zacapoaxtla',
    total_registros: 123
  },
  {
    tipo_institucion_param: 2,
    nombre_tipo_institucion: 'Descentralizado',
    nombre_institucion: 'Instituto Tecnológico Superior de Irapuato',
    total_registros: 456
  },
  {
    tipo_institucion_param: 2,
    nombre_tipo_institucion: 'Descentralizado',
    nombre_institucion: 'Instituto Tecnológico Superior de Jalisco',
    total_registros: 228
  },
  {
    tipo_institucion_param: 2,
    nombre_tipo_institucion: 'Descentralizado',
    nombre_institucion: 'Instituto Tecnológico Superior de Tantoyuca',
    total_registros: 129
  },
  {
    tipo_institucion_param: 2,
    nombre_tipo_institucion: 'Descentralizado',
    nombre_institucion: 'Instituto Tecnológico Superior de Misantla',
    total_registros: 300
  },
  {
    tipo_institucion_param: 2,
    nombre_tipo_institucion: 'Descentralizado',
    nombre_institucion: 'Instituto Tecnológico Superior de Zongolica',
    total_registros: 249
  },
  {
    tipo_institucion_param: 2,
    nombre_tipo_institucion: 'Descentralizado',
    nombre_institucion: 'Instituto Tecnológico Superior de Abasolo',
    total_registros: 343
  },
  {
    tipo_institucion_param: 2,
    nombre_tipo_institucion: 'Descentralizado',
    nombre_institucion: 'Instituto Tecnológico Superior de Tepeaca',
    total_registros: 273
  },
  {
    tipo_institucion_param: 2,
    nombre_tipo_institucion: 'Descentralizado',
    nombre_institucion: 'Instituto Tecnológico Superior de Poza Rica',
    total_registros: 243
  }
  ,
  {
    tipo_institucion_param: 2,
    nombre_tipo_institucion: 'Descentralizado',
    nombre_institucion: 'Instituto Tecnológico Superior de Las Choapas',
    total_registros: 234
  }
];
  @Input() titulo: string = ''

  totalInstitutes: number = 0;
  totalRegistros: number = 0;

  constructor() {}
  ngOnInit(): void {
    this.totalInstitutes = this.data.length;
    this.totalRegistros = this.data.reduce((sum, current) => sum + current.total_registros, 0);
  }
}
