import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { TablerosService } from 'src/app/api/services/tableros.service';
import { getCSSVariableValue } from 'src/app/template/kt/_utils';

interface Solicitudes {
  tipo_registro: string;
  rama: string;
  total: number;
}

@Component({
  selector: 'app-grafica-solicitudes-in',
  templateUrl: './grafica-solicitudes-in.component.html',
  styleUrls: ['./grafica-solicitudes-in.component.scss']
})
export class GraficaSolicitudesInComponent implements OnInit {

  tiposSolicitudes: Solicitudes[] = [];

  chartOptions: any;
  totalSolicitudes: number = 0;

  constructor(
    private tablerosService: TablerosService,
    private cdRef: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.loadTotalINDAUTORApplications()
  }

  getChartOptions(height: number) {
    const labelColor = getCSSVariableValue('--bs-gray-500');
    const seriesColors = [
      getCSSVariableValue('--bs-primary'),
      getCSSVariableValue('--bs-success'),
      getCSSVariableValue('--bs-warning'),
      getCSSVariableValue('--bs-danger'),
      getCSSVariableValue('--bs-info'),
    ];

    const pieData = this.tiposSolicitudes.map(item => item.total);
    const pieLabels = this.tiposSolicitudes.map(item => item.rama);

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
          return this.tiposSolicitudes[opts.seriesIndex].rama;
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
              return this.tiposSolicitudes[seriesIndex].rama;
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

  private loadTotalINDAUTORApplications(): void {
    this.tablerosService.getTotalINDAUTORApplications().subscribe({
      next: (data) => {
        this.tiposSolicitudes = data;
        this.totalSolicitudes = this.tiposSolicitudes
          .reduce((acc, item) => acc + (item.total ?? 0), 0);
        this.chartOptions = this.getChartOptions(350);
        this.cdRef.detectChanges();
      },
      error: (error: any) => {
        console.error('ERROR:', error);
      }
    });
  }
}