import { Component, Input } from '@angular/core';
import { getCSSVariableValue } from '../../../template/kt/_utils';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html'
})
export class DashboardComponent {
  chartOptions: any = {};
  chartOptionsRound: any = {};

  @Input() cssClass: string = '';
  @Input() chartSize: number = 70;
  @Input() chartLine: number = 11;
  @Input() chartRotate?: number = 145;

  constructor() { }

  ngOnInit(): void {
    this.chartOptions = this.getChartOptions(350);

    setTimeout(() => {
      initChart(this.chartSize, this.chartLine, this.chartRotate);
    }, 10);
  }

  getChartOptions(height: number) {
    const labelColor = getCSSVariableValue('--bs-gray-500')
    const borderColor = getCSSVariableValue('--bs-gray-200')
    const baseColor = getCSSVariableValue('--bs-primary')
    const secondaryColor = getCSSVariableValue('--bs-gray-300')
    const seriesColors = [
      getCSSVariableValue('--bs-primary'),
      getCSSVariableValue('--bs-success'),
      getCSSVariableValue('--bs-warning'),
      getCSSVariableValue('--bs-danger'),
      getCSSVariableValue('--bs-info')
    ];

    return {
      series: [
        {
          name: 'DA',
          data: [12, 18, 24, 19, 15, 21],
        },
        {
          name: 'PA',
          data: [8, 12, 15, 11, 9, 14],
        },
        {
          name: 'MU',
          data: [25, 32, 28, 35, 41, 38],
        },
        {
          name: 'DI',
          data: [6, 9, 11, 8, 12, 10],
        },
        {
          name: 'MA',
          data: [45, 52, 48, 56, 63, 59],
        },
      ],
      chart: {
        fontFamily: 'inherit',
        type: 'bar',
        height: height,
        toolbar: {
          show: false,
        },
      },
      plotOptions: {
        bar: {
          horizontal: false,
          columnWidth: '30%',
          borderRadius: 5,
        },
      },
      legend: {
        show: false
      },
      dataLabels: {
        enabled: false,
      },
      stroke: {
        show: true,
        width: 2,
        colors: ['transparent'],
      },
      xaxis: {
        categories: ['Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul'],
        axisBorder: {
          show: false,
        },
        axisTicks: {
          show: false,
        },
        labels: {
          style: {
            colors: labelColor,
            fontSize: '12px',
          },
        },
      },
      yaxis: {
        title: {
          text: 'Total de solicitudes',
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
      fill: {
        opacity: 1,
      },
      states: {
        normal: {
          filter: {
            type: 'none',
            value: 0,
          },
        },
        hover: {
          filter: {
            type: 'none',
            value: 0,
          },
        },
        active: {
          allowMultipleDataPointsSelection: false,
          filter: {
            type: 'none',
            value: 0,
          },
        },
      },
      tooltip: {
        style: {
          fontSize: '12px',
        },
        y: {
          formatter: function (val: number) {
            return val + ' solicitudes';
          },
        },
      },
      colors: [seriesColors[0], seriesColors[1], seriesColors[2], seriesColors[3], seriesColors[4]],
      grid: {
        borderColor: borderColor,
        strokeDashArray: 4,
        yaxis: {
          lines: {
            show: true,
          },
        },
      },
    };
  }

}

const initChart = function (
  chartSize: number = 70,
  chartLine: number = 11,
  chartRotate: number = 145
) {
  const el = document.getElementById('kt_card_widget_17_chart');

  if (!el) {
    return;
  }

  var options = {
    size: chartSize,
    lineWidth: chartLine,
    rotate: chartRotate,
    //percent:  el.getAttribute('data-kt-percent') ,
  };

  const canvas = document.createElement('canvas');
  const span = document.createElement('span');

  // @ts-ignore
  if (typeof G_vmlCanvasManager !== 'undefined') {
    // @ts-ignore
    G_vmlCanvasManager.initElement(canvas);
  }

  const ctx = canvas.getContext('2d');
  canvas.width = canvas.height = options.size;

  el.appendChild(span);
  el.appendChild(canvas);

  // @ts-ignore
  ctx.translate(options.size / 2, options.size / 2); // change center
  // @ts-ignore
  ctx.rotate((-1 / 2 + options.rotate / 180) * Math.PI); // rotate -90 deg

  //imd = ctx.getImageData(0, 0, 240, 240);
  const radius = (options.size - options.lineWidth) / 2;

  const drawCircle = function (
    color: string,
    lineWidth: number,
    percent: number
  ) {
    percent = Math.min(Math.max(0, percent || 1), 1);
    if (!ctx) {
      return;
    }

    ctx.beginPath();
    ctx.arc(0, 0, radius, 0, Math.PI * 2 * percent, false);
    ctx.strokeStyle = color;
    ctx.lineCap = 'round'; // butt, round or square
    ctx.lineWidth = lineWidth;
    ctx.stroke();
  };

  // Init
  drawCircle('#E4E6EF', options.lineWidth, 100 / 100);
  drawCircle(getCSSVariableValue('--bs-primary'), options.lineWidth, 100 / 150);
  drawCircle(getCSSVariableValue('--bs-success'), options.lineWidth, 100 / 250);
};