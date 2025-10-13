import { Component, Input, ViewChild, OnInit, ChangeDetectorRef } from '@angular/core';
import { ChartComponent } from 'ng-apexcharts';
import { getCSSVariableValue } from 'src/app/template/kt/_utils';
import { TablerosService } from 'src/app/api/services/tableros.service';
@Component({
  selector: 'app-registros-sexo',
  templateUrl: './registros-sexo.component.html',
  styleUrls: ['./registros-sexo.component.scss']
})
export class RegistrosSexoComponent implements OnInit {
  @ViewChild('chart') chart: ChartComponent;

  chartOptions: any = {
    series: [],
    chart: {
      type: 'donut',
      height: 350,
    },
    labels: [],
    dataLabels: {
      enabled: true,
      style: {
        fontSize: '12px',
        fontWeight: 'bold',
      },
      dropShadow: { enabled: false }
    },
    legend: {
      position: 'bottom',
      horizontalAlign: 'center',
      fontSize: '12px',
      labels: {
        colors: getCSSVariableValue('--bs-gray-500'),
        useSeriesColors: false
      },
      itemMargin: { horizontal: 10, vertical: 5 }
    },
    stroke: {
      show: true,
      width: 2,
      colors: ['transparent']
    },
    plotOptions: {
      pie: {
        donut: {
          labels: {
            show: true,
            name: {
              show: true,
              fontSize: '16px',
              fontWeight: 'bold',
              color: getCSSVariableValue('--bs-gray-500'),
              formatter: () => 'Total'
            },
            value: {
              show: true,
              fontSize: '24px',
              fontWeight: 'bold',
              color: getCSSVariableValue('--bs-gray-500'),
            },
            total: {
              show: true,
              showAlways: true,
              label: 'Total',
              color: getCSSVariableValue('--bs-gray-500'),
            }
          }
        }
      }
    },
    responsive: [
      {
        breakpoint: 480,
        options: {
          chart: { width: 300 },
          legend: { position: 'bottom' }
        }
      }
    ]
  };

  constructor(
    private tablerosService: TablerosService,
    private cdRef: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.tablerosService.getRegistrosPorSexo().subscribe({
      next: (data) => {
        console.log('Datos recibidos:', data);
        const labels = data.map(item => item.sexo);   // ['Femenino', 'Masculino']
        const series = data.map(item => item.total);  // [99, 99]

        // Reasignar el objeto para que Angular detecte el cambio y ApexCharts se actualice
        this.chartOptions = {
          ...this.chartOptions,
          labels,
          series
        };

        // Forzar detección de cambios por si hace falta
        this.cdRef.detectChanges();
      },
      error: (err) => {
        console.error('Error al obtener registros por sexo:', err);
      }
    });
  }
}


/*
interface ChartOptions {
  label: string;
  serie: number;
}

@Component({
  selector: 'app-registros-sexo',
  templateUrl: './registros-sexo.component.html',
  styleUrl: './registros-sexo.component.scss'
})
export class RegistrosSexoComponent {
  @ViewChild("chart") chart: ChartComponent;

  @Input() data: ChartOptions[];

  chartOptions: any = {};

  ngOnInit() {
    const labels = this.data.map(s => s.label);
    const series = this.data.map(s => s.serie);

    this.chartOptions = {
      series,
      chart: {
        type: 'donut',
        height: 350,
      },
      labels,
      dataLabels: {
        enabled: true,
        style: {
          fontSize: '12px',
          fontWeight: 'bold',
        },
        dropShadow: { enabled: false }
      },
      legend: {
        position: 'bottom',
        horizontalAlign: 'center',
        fontSize: '12px',
        labels: { 
          colors: getCSSVariableValue('--bs-gray-500'),
          useSeriesColors: false
        },
        itemMargin: { horizontal: 10, vertical: 5 }
      },
      stroke: {
        show: true,
        width: 2,
        colors: ['transparent']
      },
      plotOptions: {
        pie: {
          donut: {
            labels: {
              show: true,
              name: {
                show: true,
                fontSize: '16px',
                fontWeight: 'bold',
                color: getCSSVariableValue('--bs-gray-500'),
                formatter: (val: any) => {
                  return 'Total';
                }
              },
              value: {
                show: true,
                fontSize: '24px',
                fontWeight: 'bold',
                color: getCSSVariableValue('--bs-gray-500'),
              },
              total: {
                show: true,
                showAlways: true,
                label: 'Total',
                color: getCSSVariableValue('--bs-gray-500'),
              }
            }
          }
        }
      },
     chart: {
        width: 550,
        height: 550,
        type: "donut",
      },
      labels,
      dataLabels: {
        enabled: true,
        style: {
          fontSize: '12px',
          fontWeight: 'bold',
        },
      },
      legend: {
        position: 'right',
        horizontalAlign: 'right',
        fontSize: '16px',
        offsetY: 100,
      },
      stroke: {
        show: true,
        width: 2,
        colors: ['transparent']
      },
      plotOptions: {
        pie: {
          customScale: 0.8,
          donut: {
            labels: {
              show: true,
              name: {
                show: true,
                fontSize: '16px',
                fontWeight: 'bold',
              },
              value: {
                show: true,
                fontSize: '24px',
                fontWeight: 'bold',
                color: getCSSVariableValue('--bs-gray-500'),
              },
            }
          }
        }
      },
      responsive: [
        {
          breakpoint: 480,
          options: {
            chart: {
              width: 450,
              height: 450,
            },
            legend: {
              position: 'bottom',
              fontSize: '30px'
            },
            dataLabels: {
              style: { fontSize: '12px' }
            }
          }
        }
      ] 
    };
  }
} /* */
