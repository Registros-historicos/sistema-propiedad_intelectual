import { Component, OnInit } from '@angular/core';
import { getCSSVariableValue } from 'src/app/template/kt/_utils';
import { NgApexchartsModule } from 'ng-apexcharts';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-grafica-solicitudes-in',
  standalone: true,
  imports: [CommonModule, NgApexchartsModule, MatIconModule, RouterModule,TranslateModule],
  templateUrl: './grafica-solicitudes-in.component.html',
  styleUrls: ['./grafica-solicitudes-in.component.scss']
})
export class GraficaSolicitudesInComponent implements OnInit {

  tiposSolicitudes = [
    { nombre: 'Programa de Computación', total: 130, icono: 'emoji_objects' },
    { nombre: 'Literaria', total: 100, icono: 'credit_card' },
    { nombre: 'Reserva de Derechos', total: 40, icono: 'build' },
    { nombre: 'Artística', total: 60, icono: 'copyright' },
    { nombre: 'Compilación de Datos', total: 70, icono: 'architecture' },
  ];

  chartOptions: any;
  totalSolicitudes: number = 0;

  ngOnInit(): void {
    this.totalSolicitudes = this.tiposSolicitudes.reduce(
      (acc, item) => acc + item.total,
      0
    );

    this.chartOptions = this.getChartOptions(350);
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
    const pieLabels = this.tiposSolicitudes.map(item => item.nombre);

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
          return this.tiposSolicitudes[opts.seriesIndex].nombre;
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
              return this.tiposSolicitudes[seriesIndex].nombre;
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
}