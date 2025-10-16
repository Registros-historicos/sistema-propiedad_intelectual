import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { TablerosService } from 'src/app/api/services/tableros.service';
import { getCSSVariableValue } from 'src/app/template/kt/_utils';

interface RegistroEstatusRow {
  estatus: string;
  total: number;
}

@Component({
  selector: 'app-registro-estatus',
  templateUrl: './registro-estatus.component.html',
  styleUrls: ['./registro-estatus.component.scss']
})
export class RegistroEstatusComponent implements OnInit {

  data: RegistroEstatusRow[] = [];
  chartOptions: any;
  totalRegistros = 0;

  constructor(
    private tablerosService: TablerosService,
    private cdRef: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.loadRegisterStatus();
  }

  private getChartOptions(height: number) {
    const labelColor = getCSSVariableValue('--bs-gray-500');
    const seriesColors = [
      getCSSVariableValue('--bs-primary'),
      getCSSVariableValue('--bs-success'),
      getCSSVariableValue('--bs-warning'),
      getCSSVariableValue('--bs-danger'),
      getCSSVariableValue('--bs-info'),
      getCSSVariableValue('--bs-dark'),
      getCSSVariableValue('--bs-purple'),
      getCSSVariableValue('--bs-teal'),
      getCSSVariableValue('--bs-pink'),
    ];

    const series = this.data.map(d => Number(d.total) || 0);
    const labels = this.data.map(d => d.estatus ?? '');

    return {
      series,
      chart: {
        type: 'donut',          // donut como el ejemplo que sí funciona
        height: height,
        toolbar: { show: false }
      },
      labels,
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
                formatter: () => 'Total'
              },
              value: {
                show: true,
                fontSize: '24px',
                fontWeight: 'bold',
                color: labelColor,
                formatter: () => this.totalRegistros.toString()
              },
              total: {
                show: true,
                showAlways: true,
                label: 'Total',
                color: labelColor,
                formatter: () => this.totalRegistros.toString()
              }
            }
          }
        }
      },
      tooltip: {
        style: { fontSize: '12px' },
        y: {
          formatter: (val: number) => `${val} registros`,
          title: {
            formatter: (seriesName: any, { seriesIndex }: any) => labels[seriesIndex] ?? ''
          }
        }
      },
      states: {
        hover: { filter: { type: 'darken', value: 0.1 } }
      }
    };
  }

  private loadRegisterStatus(): void {
    this.tablerosService.getRegisterStatus().subscribe({
      next: (data) => {
        // normaliza datos
        this.data = Array.isArray(data)
          ? data.map(d => ({ estatus: d.estatus, total: Number(d.total) || 0 }))
          : [];

        this.totalRegistros = this.data.reduce((a, b) => a + b.total, 0);

        // mismo patrón que tu ejemplo: altura por contenedor
        this.chartOptions = this.getChartOptions(350);

        this.cdRef.detectChanges();
      },
      error: (err) => console.error('ERROR:', err)
    });
  }
}
