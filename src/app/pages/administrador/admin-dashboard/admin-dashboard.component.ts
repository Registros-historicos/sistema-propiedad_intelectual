import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrl: './admin-dashboard.component.scss'
})
export class AdminDashboardComponent implements OnInit {
  protected readonly topFiveEntities = [
    {name: 'Veracruz', value: 800},
    {name: 'Puebla', value: 700},
    {name: 'Oaxaca', value: 600},
    {name: 'Chiapas', value: 500},
    {name: 'Tabasco', value: 400}
  ];

  protected readonly topFiveFederalInstitutions = [
    {name: 'Instituto Nacional de Migración', value: 800},
    {name: 'Secretaría de Relaciones Exteriores', value: 700},
    {name: 'Secretaría de Gobernación', value: 600},
    {name: 'Secretaría de la Defensa Nacional', value: 500},
    {name: 'Secretaría de Marina', value: 400}
  ];

  protected readonly topFiveCentralizedInstitutions = [
    {name: 'Gobierno del Estado de Veracruz', value: 400},
    {name: 'Gobierno del Estado de Puebla', value: 350},
    {name: 'Gobierno del Estado de Oaxaca', value: 300},
    {name: 'Gobierno del Estado de Chiapas', value: 250},
    {name: 'Gobierno del Estado de Tabasco', value: 200}
  ];

  constructor() { }

  ngOnInit(): void {
  }

}
