import { Component, Input, ViewChild } from '@angular/core';
import { ChartComponent } from 'ng-apexcharts';

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
        width: 550,
        height: 550,
        type: "pie",
      },
      labels,
      legend: {
        position: 'right',
        horizontalAlign: 'right',
        fontSize: '16px',
        offsetY: 100,
      },
      plotOptions: {
        pie: {
          customScale: 0.8
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
}
