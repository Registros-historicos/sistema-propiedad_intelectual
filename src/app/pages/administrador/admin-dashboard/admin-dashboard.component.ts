import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrl: './admin-dashboard.component.scss'
})
export class AdminDashboardComponent implements OnInit {
  protected readonly topFiveEntities = [
    {
      name: 'Veracruz', value: 800, tags: [
        'PA', 'DA', 'MU', 'DI', 'MA'
      ]
    },
    {
      name: 'Puebla', value: 700, tags: [
        'PA', 'MU', 'MA'
      ]
    },
    {
      name: 'Oaxaca', value: 600, tags: [
        'PA', 'DA', 'DI', 'MA'
      ]
    },
    {
      name: 'Chiapas', value: 500, tags: [
        'DA', 'MU', 'DI'
      ]
    },
    {
      name: 'Tabasco', value: 400, tags: [
        'PA', 'MU', 'MA'
      ]
    }
  ];

  protected readonly topFiveFederalInstitutions = [
    {
      name: 'Instituto Tecnológico de Tuxtla Gutierrez', value: 800, tags: [
        'PA', 'DA', 'MU', 'DI', 'MA'
      ]
    },
    {
      name: 'Instituto Tecnológico de Durango', value: 700, tags: [
        'PA', 'MU', 'MA'
      ]
    },
    {
      name: 'Instituto Tecnológico de Orizaba', value: 600, tags: [
        'PA', 'DA', 'DI', 'MA'
      ]
    },
    {
      name: 'Instituto Tecnológico de Celaya', value: 500, tags: [
        'DA', 'MU', 'DI'
      ]
    },
    {
      name: 'Instituto Tecnológico de Acapulco', value: 400, tags: [
        'PA', 'MU', 'MA'
      ]
    }
  ];

  protected readonly topFiveCentralizedInstitutions = [
    {
      name: 'Instituto Tecnológico Superior de Zongolica', value: 400, tags: [
        'PA', 'DA', 'MU', 'DI', 'MA'
      ]
    },
    {
      name: 'Instituto Tecnológico Superior de Palenque', value: 350, tags: [
        'PA', 'DA', 'DI', 'MA'
      ]
    },
    {
      name: 'Instituto Tecnológico Superior de Irapuato', value: 300, tags: [
        'PA', 'MU', 'MA'
      ]
    },
    {
      name: 'Instituto Tecnológico Superior de Cintapala', value: 250, tags: [
        'DA', 'MU', 'DI'
      ]
    },
    {
      name: 'Instituto Tecnológico Superior de Comitán', value: 200, tags: [
        'PA', 'DA', 'DI'
      ]
    }
  ];

  constructor() {
  }

  ngOnInit(): void {
  }

}
