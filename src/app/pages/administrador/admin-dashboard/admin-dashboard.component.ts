import {Component, OnInit} from '@angular/core';
<<<<<<< Updated upstream
import { getCSSVariableValue } from 'src/app/template/kt/_utils';
=======
import { forkJoin } from 'rxjs';
import { ImpiRegistriesService } from 'src/app/api/services/impi.service';
import { IndautorRegistriesService } from 'src/app/api/services/indautor.service';
>>>>>>> Stashed changes

export interface Top5 {
  city_name: string;
  total_registries: number;
  tags?: any[];
}
@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrl: './admin-dashboard.component.scss'
})
export class AdminDashboardComponent implements OnInit {
  chartOptions: any;
  chartOptionsGraph2: any;

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

  combinedTop: Top5[] = [];
  rawImpi: any;
  rawIndautor: any;

  constructor(private impiService: ImpiRegistriesService, private indautorService: IndautorRegistriesService) {
  }

  ngOnInit(): void {
<<<<<<< Updated upstream
    this.initGraphs();
  }

  private initGraphs(): void {
    const solicitudesData = this.getSimulatedData();
    this.chartOptions = this.createChartOptions(350, solicitudesData);
    const solicitudesDataGraph2 = this.getSimulatedDataGraph2();
    this.chartOptionsGraph2 = this.createChartOptions(350, solicitudesDataGraph2);
  }

  private getSimulatedData(): any[] {
    return [
      { rama: 'Patente', data: [15, 18, 15, 6] }, 
      { rama: 'Marca', data: [20, 5, 12, 8] },
      { rama: 'Modelo de Utilidad', data: [10, 12, 10, 5] },
      { rama: 'Diseño Industrial', data: [5, 7, 8, 2] },
      { rama: 'Aviso Comercial', data: [8, 10, 9, 2] },
    ];
  }

  private getSimulatedDataGraph2(): any[] {
    return [
      { rama: 'Programas de computación', data: [10, 4, 6, 3] }, 
      { rama: 'Literaria', data: [11, 5, 9, 8] },
      { rama: 'Reserva de derechos', data: [1, 10, 9, 5] },
      { rama: 'ISSN', data: [5, 7, 8, 2] },
      { rama: 'Dibujo', data: [8, 10, 9, 5] },
    ];
  }

  private createChartOptions(height: number, data: any[]): any {
    const labelColor = getCSSVariableValue('--bs-gray-500');
    const borderColor = getCSSVariableValue('--bs-gray-200');

    const series = this.mapDataToSeries(data);
    const seriesColors = this.getSeriesColors();

    return {
      series: series,
      chart: {
        fontFamily: 'inherit',
        type: 'bar',
        height: height,
        toolbar: { show: false },
      },
      plotOptions: {
        bar: {
          horizontal: false,
          columnWidth: '30%', 
          borderRadius: 5,
        },
      },
      legend: { show: false },
      dataLabels: { enabled: false },
      stroke: {
        show: true,
        width: 2,
        colors: ['transparent'],
      },
      xaxis: {
        categories: ['2022', '2023', '2024', '2025'], // Años
        axisBorder: { show: false },
        axisTicks: { show: false },
        labels: {
          style: {
            colors: labelColor,
            fontSize: '12px',
          },
        },
      },
      yaxis: {
        title: {
          text: 'Número de Registros',
          style: {
            color: labelColor,
            fontSize: '12px',
          },
        },
        labels: {
          style: {
            colors: labelColor,
            fontSize: '12px',
          },
        },
      },
      fill: { opacity: 1 },
      states: {
        normal: { filter: { type: 'none', value: 0 } },
        hover: { filter: { type: 'none', value: 0 } },
        active: {
          allowMultipleDataPointsSelection: false,
          filter: { type: 'none', value: 0 },
        },
      },
      tooltip: {
        style: { fontSize: '12px' },
        y: {
          formatter: function (val: number) {
            return val + ' registros';
          },
        },
      },
      colors: seriesColors,
      grid: {
        borderColor: borderColor,
        strokeDashArray: 4,
        yaxis: { lines: { show: true } },
      },
    };
  }

  private mapDataToSeries(data: any[]): any[] {
    return data.map(item => ({
      name: item.rama,
      data: item.data,
    }));
  }

  private getSeriesColors(): string[] {
    return [
      getCSSVariableValue('--bs-primary'),
      getCSSVariableValue('--bs-success'),
      getCSSVariableValue('--bs-warning'),
      getCSSVariableValue('--bs-danger'),
      getCSSVariableValue('--bs-info'),
    ];
=======
    const impi$ = this.impiService.listImpiTop5();
    const indautor$ = this.indautorService.listIndautorTop5();
    forkJoin([impi$, indautor$]).subscribe({
      next: ([impiResp, indautorResp]) => {
        this.rawImpi = impiResp;
        this.rawIndautor = indautorResp;
        const impiArr: Top5[] = this.normalizeResponse(impiResp);
        const indautorArr: Top5[] = this.normalizeResponse(indautorResp);
        const combined = [...impiArr, ...indautorArr];
        this.combinedTop = this.aggregateAndSort(combined, 'desc');
        this.combinedTop = this.combinedTop.slice(0, 5);
      }, 
      error: (err) => {
        console.error("Error: ", err);
      }
    })
  }

  normalizeResponse(resp: any): Top5[] {
    if(!resp) return [];
    if(Array.isArray(resp)) return resp as Top5[];
    if(Array.isArray(resp.data)) return resp.data as Top5[];
    if(Array.isArray(resp.result)) return resp.result as Top5[];
    if(Array.isArray(resp.items)) return resp.items as Top5[];

    try {

      const arrays = Object.values(resp).filter(v => Array.isArray(v)) as [][]
      if(!arrays.length) return [];

      const values = arrays.reduce((acc: any[], cur: any[]) => acc.concat(cur), []);
      if(values && values.length) return values as Top5[];
      
    } catch (error) {
      
    }
    return [];
  }

  aggregateAndSort(arr: Top5[], order: 'desc'|'asc' = 'desc'): Top5[] {
    const map = new Map<string, Top5>()
    for (const item of arr) {

      const key = (item.city_name || '').trim();
      if(!key) continue;

      const existing = map.get(key);
      const value = Number(item.total_registries || 0);

      if(existing) {
        existing.total_registries = Number(existing.total_registries) + value;
      } else {
        map.set(key, {city_name: key, total_registries: value});
      }
    }

    const aggregate = Array.from(map.values());
    aggregate.sort((a, b) => {
      if(a.total_registries !== b.total_registries) {
        return order === 'desc' ? b.total_registries - a.total_registries : a.total_registries - b.total_registries;
      };
      return a.city_name.localeCompare(b.city_name, 'es', {sensitivity: 'base'});
    });
    return aggregate;
>>>>>>> Stashed changes
  }

}
