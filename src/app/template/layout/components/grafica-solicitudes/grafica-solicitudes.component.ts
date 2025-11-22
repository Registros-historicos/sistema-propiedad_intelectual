import { ChangeDetectorRef, Component, OnInit, Output, EventEmitter } from '@angular/core';
import { TablerosService } from 'src/app/api/services/tableros.service';
import { getCSSVariableValue } from 'src/app/template/kt/_utils';
import ApexCharts from 'apexcharts'; 

interface Solicitudes {
  tipo_registro: string;
  rama_nombre: string;
  total: number;
}

@Component({
  selector: 'app-grafica-solicitudes',
  templateUrl: './grafica-solicitudes.component.html',
  styleUrls: ['./grafica-solicitudes.component.scss']
})
export class GraficaSolicitudesComponent implements OnInit {
  @Output() exportExcel = new EventEmitter<void>();

  tiposSolicitudes: Solicitudes[] = [];

  onExportExcel(): void {
  this.exportExcel.emit();
  }

  chartOptions: any = {
    series: [],
    chart: {  id: 'graficaSolicitudesIM', type: 'donut', height: 350, toolbar: { show: false } },
    labels: [],
    colors: [],
    dataLabels: { enabled: false },
    legend: { show: false },
    stroke: { show: false },
    plotOptions: {},
    tooltip: {},
    states: {}
  };

  totalSolicitudes: number = 0;

  constructor(
    private tablerosService: TablerosService,
    private cdRef: ChangeDetectorRef
  ) {}
  
  ngOnInit(): void {
    this.chartOptions = this.getChartOptions(350);
    this.loadTotalIMPIApplications()
  }

  getChartOptions(height: number) {
    const labelColor = getCSSVariableValue('--bs-gray-500');
    const seriesColors = [
      getCSSVariableValue('--bs-primary'),
      getCSSVariableValue('--bs-success'),
      getCSSVariableValue('--bs-warning'),
      getCSSVariableValue('--bs-danger'),
      getCSSVariableValue('--bs-info'),
      getCSSVariableValue('--bs-teal'),
    ];

    const pieData = this.tiposSolicitudes.map(item => item.total);
    const pieLabels = this.tiposSolicitudes.map(item => item.rama_nombre);

    return {
      series: pieData,
      chart: {
        type: 'donut',
        height: height,
        toolbar: { show: false },
      },
      labels: pieLabels,
      colors: seriesColors,
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
          colors: labelColor,
          useSeriesColors: false
        },
        formatter: (seriesName: string, opts: any) => {
          return this.tiposSolicitudes[opts.seriesIndex].rama_nombre;
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
                color: labelColor,
                formatter: (val: any) => {
                  return 'Total';
                }
              },
              value: {
                show: true,
                fontSize: '24px',
                fontWeight: 'bold',
                color: labelColor,
                formatter: (val: any) => {
                  return this.totalSolicitudes.toString();
                }
              },
              total: {
                show: true,
                showAlways: true,
                label: 'Total',
                color: labelColor,
                formatter: (w: any) => {
                  return this.totalSolicitudes.toString();
                }
              }
            }
          }
        }
      },
      tooltip: {
        style: { fontSize: '12px' },
        y: {
          formatter: (val: number) => `${val} solicitudes`,
          title: {
            formatter: (seriesName: any, { seriesIndex }: any) => {
              return this.tiposSolicitudes[seriesIndex].rama_nombre;
            }
          }
        }
      },
      states: {
        hover: {
          filter: { type: 'darken', value: 0.1 }
        }
      }
    };
  }

  private loadTotalIMPIApplications(): void {
    this.tablerosService.getTotalIMPIApplications().subscribe({
      next: (data) => {
        console.log('DATA TABLERO :', data);
        this.tiposSolicitudes = data ?? [];
        this.totalSolicitudes = this.tiposSolicitudes
          .reduce((acc, item) => acc + (item.total ?? 0), 0);
        this.chartOptions = this.getChartOptions(350);
        this.cdRef.detectChanges();
                setTimeout(() => {
                  ApexCharts.exec('graficaSolicitudesIN', 'updateOptions', this.chartOptions, true);
                }, 0);
        
      },
      error: (error: any) => {
        console.error('ERROR:', error);
        this.chartOptions = this.getChartOptions(350);
      }
    });
  }
}