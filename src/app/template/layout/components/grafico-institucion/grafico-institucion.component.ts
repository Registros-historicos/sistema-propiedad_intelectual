import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-grafico-institucion',
  templateUrl: './grafico-institucion.component.html',
  styleUrl: './grafico-institucion.component.scss'
})
export class GraficoInstitucionComponent {

  topFiveEntities = [
    {
      name: 'Instituto Tecnológico de Orizaba',
      value: 85
    },
    {
      name: 'Instituto Tecnológico de Zongolica',
      value: 72
    },
    {
      name: 'Instituto Superior de Huatusco',
      value: 68
    },
    {
      name: 'Instituto de Tecnológico de Aguascalientes',
      value: 61
    },
    {
      name: 'Instituto Tecnológico de Apizaco',
      value: 54
    },
    {
      name: 'Instituto Tecnológico de Ciudad Victoria',
      value: 54
    },
    {
      name: 'Instituto Tecnológico de Durango',
      value: 54
    }
  ];

  constructor() {}
}