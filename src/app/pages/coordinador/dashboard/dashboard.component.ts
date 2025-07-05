import { Component, Input } from '@angular/core';
import { getCSSVariableValue } from '../../../template/kt/_utils';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html'
})
export class DashboardComponent {
  chartOptions: any = {};
  chartOptionsRound: any = {};
  selectedFilter: string = '1';

  @Input() cssClass: string = '';
  @Input() chartSize: number = 70;
  @Input() chartLine: number = 11;
  @Input() chartRotate?: number = 145;

  constructor(private translate: TranslateService) { }

  ngOnInit(): void {
    this.chartOptions = this.getChartOptions(350);

    setTimeout(() => {
      initChart(this.chartSize, this.chartLine, this.chartRotate);
    }, 10);
  }

  onFilterChange(): void {
    this.chartOptions = this.getChartOptions(350);
  }

  getFilterCategories(): string[] {
    if (this.selectedFilter === '1') {
      return ['Feb', 'Mar', this.translate.instant('GRAPHICS.LEGENDS.ACRONYM.MONTHS.APRIL'), 'May', 'Jun', 'Jul'];
    } else {
      return ['2019', '2020', '2021', '2022', '2023', '2024'];
    }
  }

  getFilterData(): any[] {
    if (this.selectedFilter === '1') {
      return [
        {
          name: this.translate.instant('ACRONYM.PATENTS'),
          data: [8, 12, 15, 11, 9, 14],
        },
        {
          name: this.translate.instant('ACRONYM.TRADEMARKS'),
          data: [45, 52, 48, 56, 63, 59],
        },
        {
          name: this.translate.instant('ACRONYM.UTILITY_MODELS'),
          data: [25, 32, 28, 35, 41, 38],
        },
        {
          name: this.translate.instant('ACRONYM.COPYRIGHTS'),
          data: [12, 18, 24, 19, 15, 21],
        },
        {
          name: this.translate.instant('ACRONYM.INDUSTRIAL_DESIGNS'),
          data: [6, 9, 11, 8, 12, 10],
        },
      ];
    } else {
      return [
        {
          name: this.translate.instant('ACRONYM.PATENTS'),
          data: [120, 145, 180, 160, 140, 165],
        },
        {
          name: this.translate.instant('ACRONYM.TRADEMARKS'),
          data: [540, 620, 580, 670, 750, 710],
        },
        {
          name: this.translate.instant('ACRONYM.UTILITY_MODELS'),
          data: [300, 380, 340, 420, 490, 450],
        },
        {
          name: this.translate.instant('ACRONYM.COPYRIGHTS'),
          data: [144, 216, 288, 228, 180, 252],
        },
        {
          name: this.translate.instant('ACRONYM.INDUSTRIAL_DESIGNS'),
          data: [72, 108, 132, 96, 144, 120],
        },
      ];
    }
  }

  getChartOptions(height: number) {
    const labelColor = getCSSVariableValue('--bs-gray-500')
    const borderColor = getCSSVariableValue('--bs-gray-200')
    const seriesColors = [
      getCSSVariableValue('--bs-primary'),
      getCSSVariableValue('--bs-success'),
      getCSSVariableValue('--bs-warning'),
      getCSSVariableValue('--bs-danger'),
      getCSSVariableValue('--bs-info')
    ];

    const tooltipText = this.translate ? this.translate.instant('GRAPHICS.LEGENDS.HOVER_APPLICATIONS') : '';

    return {
      series: this.getFilterData(),
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
        categories: this.getFilterCategories(),
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
          text: this.translate.instant('GRAPHICS.LEGENDS.TOTAL_APPLICATIONS'),
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
            return val + ' ' + tooltipText;
          },
        },
      },
      colors: [seriesColors[3], seriesColors[4], seriesColors[2], seriesColors[1], seriesColors[0]],
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
  ctx.translate(options.size / 2, options.size / 2);
  // @ts-ignore
  ctx.rotate((-1 / 2 + options.rotate / 180) * Math.PI); 

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
    ctx.lineCap = 'round';
    ctx.lineWidth = lineWidth;
    ctx.stroke();
  };

  // Init
  drawCircle('#E4E6EF', options.lineWidth, 100 / 100);
  drawCircle(getCSSVariableValue('--bs-primary'), options.lineWidth, 100 / 150);
  drawCircle(getCSSVariableValue('--bs-success'), options.lineWidth, 100 / 250);
};