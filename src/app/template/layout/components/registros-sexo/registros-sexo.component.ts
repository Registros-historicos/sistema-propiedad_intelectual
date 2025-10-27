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

  // NUEVA: Propiedades para manejar estados
  isChartReady = false;
  isLoading = true;
  hasError = false;
  
  // NUEVA: Input para datos externos 
  @Input() externalData: any[] = [];

  chartOptions: any = {
    series: [],
    chart: {
      type: 'donut',
      height: 350,
            // NUEVO: Configuraciones para renderizado
      animations: {
        enabled: true,
        easing: 'easeinout',
        speed: 800
      },
      redrawOnParentResize: true,    // NUEVO IMPORTANTE para zoom
      redrawOnWindowResize: true,    // NUEVO IMPORTANTE para zoom
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
          size: '65%', //SE AGREGÓ PARA VLA RESPONSIVIDAD
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
    // NUEVO: Colores para los 3 géneros
    colors: [
      getCSSVariableValue('--bs-primary'),    // Masculino
      getCSSVariableValue('--bs-success'),    // Femenino  
      getCSSVariableValue('--bs-warning')     // Otro
    ],
    responsive: [
      {
        breakpoint: 480,
        options: { //SE AGREGÓ DE AQUÍ
        chart: {
          height: 300,
          width: '100%'
        },
        legend: {
          position: 'bottom',
          horizontalAlign: 'center',
          fontSize: '10px', // Texto más pequeño en móviles
          itemMargin: {
            horizontal: 5,
            vertical: 2
          }
        },
        plotOptions: {
          pie: {
            donut: {
              size: '60%', // Donut más pequeño en móviles
              labels: {
                name: {
                  fontSize: '14px'
                },
                value: {
                  fontSize: '20px'
                }
              }
            }
          }
        },
        dataLabels: {
          style: {
            fontSize: '10px'
          }
        }
      }
    },
    {
      breakpoint: 768, // Tablets
      options: {
        chart: {
          height: 320
        },
        legend: {
          fontSize: '11px'
        }
      }
    },
    {
      breakpoint: 1024, // Pantallas grandes
      options: {
        chart: {
          height: 350
        }
      }
    }//HASTA AQUÍ
    ]
  };

  constructor(
    private tablerosService: TablerosService,
    private cdRef: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.tablerosService.getRegistrosPorSexo().subscribe({
      next: (data) => {

        //const labels = data.map(item => item.sexo);   // ['Femenino', 'Masculino']
        //const series = data.map(item => item.total);  // [99, 99]
        
        // NUEVO: Normalizar datos para incluir "otro"
        const normalizedData = this.normalizeGenderData(data);
        const labels = normalizedData.map(item => item.label);   // ['Femenino', 'Masculino', 'Otro']
        const series = normalizedData.map(item => item.value);   // [99, 99, 0]

        // Reasignar el objeto para que Angular detecte el cambio y ApexCharts se actualice
        /**this.chartOptions = {
          ...this.chartOptions,
          labels,
          series
        };**/
        // MODIFICADO: Usar timeout para mejor renderizado
        setTimeout(() => {
          this.chartOptions = {
            ...this.chartOptions,
            labels,
            series
          };

          // NUEVO: Actualizar estados
          this.isChartReady = true;
          this.isLoading = false;

        // Forzar detección de cambios por si hace falta
        this.cdRef.detectChanges();
      },100);//AGREGADO 100);
      },//AGREGADA
      error: (err) => {
        console.error('Error al obtener registros por sexo:', err);
        // NUEVO: Actualizar estados de error
        this.isLoading = false;
        this.hasError = true;
        this.cdRef.detectChanges();
      }
    });
  }
   // NUEVO: Normalizar datos de género
  private normalizeGenderData(data: any[]): { label: string, value: number }[] {
    const genderMap: { [key: string]: string } = {
      'masculino': 'Masculino',
      'femenino': 'Femenino', 
      'hombre': 'Masculino',
      'mujer': 'Femenino',
      'otro': 'Otro',
      'otros': 'Otro',
      'other': 'Otro'
    };

    const result: { [key: string]: number } = {};

    data.forEach(item => {
      const rawGender = (item.sexo || item.gender || '').toString().toLowerCase().trim();
      const normalizedGender = genderMap[rawGender] || this.capitalizeFirst(rawGender) || 'Otro';
      
      const value = Number(item.total || item.value || item.count || 0);
      
      if (result[normalizedGender]) {
        result[normalizedGender] += value;
      } else {
        result[normalizedGender] = value;
      }
    });

    // Asegurar categorías principales
    const defaultGenders = ['Masculino', 'Femenino', 'Otro'];
    defaultGenders.forEach(gender => {
      if (!result[gender]) {
        result[gender] = 0;
      }
    });

    return Object.keys(result)
      .map(key => ({ label: key, value: result[key] }))
      .sort((a, b) => b.value - a.value);
  }

  // NUEVO: Helper para capitalizar
  private capitalizeFirst(str: string): string {
    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
  }

  // NUEVO: Método para reintentar
  retryLoad(): void {
    this.isLoading = true;
    this.hasError = false;
    this.ngOnInit(); // Recargar los datos
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
