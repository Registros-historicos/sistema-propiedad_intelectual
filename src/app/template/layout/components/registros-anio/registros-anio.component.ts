import { Component, Input } from '@angular/core';
import { getCSSVariableValue } from 'src/app/template/kt/_utils';

interface Data {
  data: number;
  category: string;
}

@Component({
  selector: 'app-registros-anio',
  templateUrl: './registros-anio.component.html',
  styleUrl: './registros-anio.component.scss'
})
export class RegistrosAnioComponent {
  @Input() anios: Data[] = [];

  chartOptions: any;
  today: any;

  selectedQuarter: string | null = null;
  startDate: string | null = null;
  endDate: string | null = null;

  ngOnInit() {
    this.initializeChart();

    const d = new Date();
    this.today = d.toISOString().split('T')[0];
  }

  initializeChart() {
    const data = this.anios.map(s => s.data);
    const categories = this.anios.map(s => s.category);

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

  applyQuarterFilter(event: any) {
    const quarter = event.target ? event.target.value : event;

    this.selectedQuarter = quarter;
    this.startDate = null;
    this.endDate = null;
    this.updateChartData();
  }

  applyDateRange(startEvent: any, endEvent: any) {
    const start = startEvent.target ? startEvent.target.value : startEvent;
    const end = endEvent.target ? endEvent.target.value : endEvent;

    this.startDate = start;
    this.endDate = end;
    this.selectedQuarter = null;
    this.updateChartData();
  }

  resetFilters() {
    this.selectedQuarter = null;
    this.startDate = null;
    this.endDate = null;
    this.updateChartData();
  }

  updateChartData() {
    let filteredData = [...this.anios];

    if (this.selectedQuarter) {
      switch (this.selectedQuarter) {
        case 'Ene-Mar':
          filteredData = this.anios.slice(0, 3);
          break;
        case 'Abr-Jun':
          filteredData = this.anios.slice(3, 6);
          break;
        case 'Jul-Sep':
          filteredData = this.anios.slice(6, 9);
          break;
        case 'Oct-Dic':
          filteredData = this.anios.slice(9, 12);
          break;
      }
    }

    if (this.startDate && this.endDate) {
      const startMonth = new Date(this.startDate).getMonth();
      const endMonth = new Date(this.endDate).getMonth();

      filteredData = this.anios.filter((item, index) => index >= startMonth && index <= endMonth);
    }

    this.chartOptions = {
      ...this.chartOptions,
      series: [
        {
          data: filteredData.map(s => s.data),
        },
      ],
      xaxis: {
        ...this.chartOptions.xaxis,
        categories: filteredData.map(s => s.category),
      },
    };
  }
}