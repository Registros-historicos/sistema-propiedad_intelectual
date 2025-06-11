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
    {name: 'Instituto Tecnológico de Tuxtla Gutierrez', value: 800},
    {name: 'Instituto Tecnológico de Durango', value: 700},
    {name: 'Instituto Tecnológico de Orizaba', value: 600},
    {name: 'Instituto Tecnológico de Celaya', value: 500},
    {name: 'Instituto Tecnológico de Acapulco', value: 400}
  ];

  protected readonly topFiveCentralizedInstitutions = [
    {name: 'Instituto Tecnológico Superior de Zongolica', value: 400},
    {name: 'Instituto Tecnológico Superior de Palenque', value: 350},
    {name: 'Instituto Tecnológico Superior de Irapuato', value: 300},
    {name: 'Instituto Tecnológico Superior de Cintapala', value: 250},
    {name: 'Instituto Tecnológico Superior de Comitán', value: 200}
  ];

  constructor() { }

  ngOnInit(): void {
  }

}
