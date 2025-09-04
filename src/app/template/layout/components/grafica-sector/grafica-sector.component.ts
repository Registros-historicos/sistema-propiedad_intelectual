import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-grafica-sector',
  templateUrl: './grafica-sector.component.html',
  styleUrl: './grafica-sector.component.scss'
})
export class GraficaSectorComponent {

  sectoresList = [
    {
      name: 'Agricultura',
      value: 1250,
      tags: ['Sector Primario'],
      icon: 'agriculture'
    },
    {
      name: 'Ganadería',
      value: 890,
      tags: ['Sector Primario'],
      icon: 'pets'
    },
    {
      name: 'Minería',
      value: 670,
      tags: ['Sector Primario'],
      icon: 'landscape'
    },
    {
      name: 'Manufactura',
      value: 1580,
      tags: ['Sector Secundario'],
      icon: 'factory'
    },
    {
      name: 'Construcción',
      value: 920,
      tags: ['Sector Secundario'],
      icon: 'construction'
    },
    {
      name: 'Comercio',
      value: 2150,
      tags: ['Sector Terciario'],
      icon: 'shopping_cart'
    },
    {
      name: 'Turismo',
      value: 780,
      tags: ['Sector Terciario'],
      icon: 'flight_takeoff'
    },
    {
      name: 'Tecnología',
      value: 640,
      tags: ['Sector Cuaternario'],
      icon: 'computer'
    },
    {
      name: 'Investigación y Desarrollo',
      value: 420,
      tags: ['Sector Cuaternario'],
      icon: 'science'
    },
    {
      name: 'Educación',
      value: 310,
      tags: ['Sector Quinario'],
      icon: 'school'
    },
    {
      name: 'Salud',
      value: 540,
      tags: ['Sector Quinario'],
      icon: 'local_hospital'
    },
    {
      name: 'Administración Pública',
      value: 280,
      tags: ['Sector Quinario'],
      icon: 'account_balance'
    }
  ];

  constructor() {}
}