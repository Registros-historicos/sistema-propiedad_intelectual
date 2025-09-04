import { Component, Input } from '@angular/core';
import { getCSSVariableValue } from 'src/app/template/kt/_utils';

interface Categories {
  category: string;
  data: number;
}

@Component({
  selector: 'app-registros-categoria',
  templateUrl: './registros-categoria.component.html',
  styleUrl: './registros-categoria.component.scss'
})
export class RegistrosCategoriaComponent {
  @Input() categories: Categories[];

  chartOptions: any;

  ngOnInit() {
    const data = this.categories.map(s => s.data );
    const categories = this.categories.map(s => s.category );

    this.chartOptions = {
      series: [
        {
          data,
        },
      ],
      chart: {
        fontFamily: 'inherit',
        type: 'bar',
        height: 400,
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
        categories,
        axisBorder: { show: false },
        axisTicks: { show: false },
        labels: {
          style: {
            colors: getCSSVariableValue('--bs-gray-500'),
            fontSize: '12px',
          },
        },
      },
      yaxis: {
        title: {
          text: 'Número de Registros',
          style: {
            color: getCSSVariableValue('--bs-gray-500'),
            fontSize: '12px',
          },
        },
        labels: {
          style: {
            colors: getCSSVariableValue('--bs-gray-500'),
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
      colors: [getCSSVariableValue('--bs-primary'), getCSSVariableValue('--bs-success'), getCSSVariableValue('--bs-warning'), getCSSVariableValue('--bs-danger'), getCSSVariableValue('--bs-info')],
      grid: {
        borderColor: getCSSVariableValue('--bs-gray-200'),
        strokeDashArray: 4,
        yaxis: { lines: { show: true } },
      },
    }
  }
}
