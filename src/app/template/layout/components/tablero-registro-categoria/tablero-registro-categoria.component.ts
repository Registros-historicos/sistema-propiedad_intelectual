import { Component, Input, OnInit, OnChanges, SimpleChanges, ChangeDetectorRef, Output, EventEmitter} from '@angular/core';
import { getCSSVariableValue } from 'src/app/template/kt/_utils';

@Component({
  selector: 'app-tablero-registro-categoria',
  templateUrl: './tablero-registro-categoria.component.html',
  styleUrl: './tablero-registro-categoria.component.scss',
})
export class TableroCategoriasComponent implements OnInit, OnChanges {
  @Input() data: { categoria: string; value: number }[] = [];
  @Input() titulo: string = '';
  @Input() subtitulo: string = '';
  @Input() height: number = 350;
  @Output() exportExcel = new EventEmitter<void>();

  onExportExcel() {
    this.exportExcel.emit();
  }

  chartOptions: any;
  // NUEVA
  isChartReady = false;

    // NUEVO CONSTRUCTOR AGREGADO
  constructor(private cdRef: ChangeDetectorRef) {}

  ngOnInit(): void {
    //this.chartOptions = this.createCategoryChartOptions(this.height, this.data);
    // SE CAMBIÓ por esta línea
    this.updateChart();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['data']) {
      //this.chartOptions = this.createCategoryChartOptions(this.height, this.data);
      // SE CAMBIÓ por esta línea
      this.updateChart();
    }
  }
    // NUEVO MÉTODO 
  private updateChart(): void {
    if (!this.data || this.data.length === 0) {
      this.isChartReady = false;
      return;
    }

    // NUEVO SETTIMEOUT
    setTimeout(() => {
      this.chartOptions = this.createCategoryChartOptions(this.height, this.data);
      this.isChartReady = true;
      this.cdRef.detectChanges();
    }, 100);
  }

  private createCategoryChartOptions(height: number, data: any[]): any {
    const labelColor = getCSSVariableValue('--bs-gray-500');
    const borderColor = getCSSVariableValue('--bs-gray-200');

    const categories = data.map((d) => d.categoria);
    const values = data.map((d) => d.value);

    return {
      series: [
        {
          name: 'Cantidad',
          data: values,
        },
      ],
      chart: {
        fontFamily: 'inherit',
        type: 'bar',
        height: height,
        toolbar: { show: false },
        // AGREGADO desde aquí
        animations: {
          enabled: true,
          easing: 'easeinout',
          speed: 800,
          animateGradually: {
            enabled: true,
            delay: 150
          },
          dynamicAnimation: {
            enabled: true,
            speed: 350
          }
        },
        redrawOnParentResize: true, // 🔥 NUEVA PROPIEDAD
        redrawOnWindowResize: true  // 🔥 NUEVA PROPIEDAD
        // HASTA aquí
      },
      plotOptions: {
        bar: {
          horizontal: false,
          columnWidth: '10%',
          borderRadius: 6,
          distributed: true,
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
        categories: categories,
        axisBorder: { show: false },
        axisTicks: { show: false },
        labels: {
          style: {
            colors: labelColor,
            fontSize: '12px',
          },
          // LINEA AGREGADA
          rotate: -45,
        },
      },
      yaxis: {
        title: {
          text: 'Número de Registros',
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
      fill: { opacity: 1 },
      tooltip: {
        style: { fontSize: '12px' },
        y: {
          formatter: function (val: number) {
            return val + ' registros';
          },
        },
      },
      colors: [
        getCSSVariableValue('--bs-primary'),
        getCSSVariableValue('--bs-success'),
        getCSSVariableValue('--bs-warning'),
        getCSSVariableValue('--bs-danger'),
        getCSSVariableValue('--bs-info'),
        '#8E44AD', // morado
        '#E67E22', // naranja
        '#1ABC9C', // turquesa
      ],
      grid: {
        borderColor: borderColor,
        strokeDashArray: 4,
        yaxis: { lines: { show: true } },
      },
    };
  }
}
