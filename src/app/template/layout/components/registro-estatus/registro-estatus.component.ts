import { ChangeDetectorRef, Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { ChartComponent } from 'ng-apexcharts';
import { TablerosService } from 'src/app/api/services/tableros.service';

interface IRegisterStatus {
  estatus: string;
  total: number;
}

@Component({
  selector: 'app-registro-estatus',
  templateUrl: './registro-estatus.component.html',
  styleUrls: ['./registro-estatus.component.scss']
})
export class RegistroEstatusComponent implements OnInit {
  @ViewChild('chart') chart?: ChartComponent;
  @Output() exportExcel = new EventEmitter<void>();
    
  onExportExcel(): void {
    this.exportExcel.emit();
  }

  chartOptions: any;
  data: IRegisterStatus[] = [];
  isLoaded = false;

  constructor(
    private tablerosService: TablerosService,
    private cdRef: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.loadRegisterStatus();
  }

  private loadRegisterStatus(): void {
    this.tablerosService.getRegisterStatus().subscribe({
      next: (data) => {
        this.data = (data || []).filter(x => x && x.estatus != null);
        this.chartOptions = this.getChartOptions(420);
        this.isLoaded = true;

        // 👇 Forzamos el repaint una vez Angular ya renderizó el DOM
        setTimeout(() => {
          this.cdRef.detectChanges();
          this.chart?.updateOptions(this.chartOptions, true, true);
        }, 200);
      },
      error: (err) => console.error('❌ ERROR:', err)
    });
  }

  /**
   * 🎨 Genera una paleta dinámica de colores
   * para que nunca falten tonos aunque haya muchos estatus
   */
  private generateColors(count: number): string[] {
    const baseColors = [
      '#008FFB', '#00E396', '#FEB019', '#FF4560',
      '#775DD0', '#3F51B5', '#546E7A', '#D4526E', '#8D5B4C',
      '#26A69A', '#7E36AF', '#F46036', '#F9C80E', '#2E294E', '#662E9B'
    ];
    const colors: string[] = [];
    for (let i = 0; i < count; i++) {
      colors.push(baseColors[i % baseColors.length]);
    }
    return colors;
  }

  private getChartOptions(height: number) {
    const series = this.data.map(s => Number(s.total) || 0);
    const labels = this.data.map(s => s.estatus);
    const colors = this.generateColors(series.length);

    return {
      series,
      labels,
      colors,
      chart: {
        type: 'pie',
        height,
        toolbar: { show: false },
        animations: { enabled: true, speed: 500 },
        foreColor: '#3f4254',
        fontFamily: 'inherit'
      },
      legend: {
        show: true,
        position: 'right',
        horizontalAlign: 'left',
        fontSize: '13px',
        labels: { colors: '#3f4254' },
        markers: { width: 10, height: 10, radius: 12 },
        itemMargin: { vertical: 4, horizontal: 8 }
      },
      dataLabels: {
        enabled: true,
        style: { fontSize: '13px', fontWeight: 'bold' }
      },
      stroke: { show: false },
      plotOptions: {
        pie: { expandOnClick: true, customScale: 0.96 }
      },
      tooltip: {
        y: {
          formatter: (val: number) => `${val} registros`
        }
      },
      theme: { monochrome: { enabled: false } },
      responsive: [
        {
          breakpoint: 1400,
          options: {
            legend: {
              position: 'bottom',
              horizontalAlign: 'center',
              fontSize: '12px'
            },
            chart: { height: 380 },
            dataLabels: { style: { fontSize: '12px' } },
            plotOptions: { pie: { customScale: 0.98 } }
          }
        },
        {
          breakpoint: 992,
          options: {
            chart: { height: 340 },
            dataLabels: { style: { fontSize: '11px' } },
            plotOptions: { pie: { customScale: 1.0 } }
          }
        }
      ]
    };
  }
}
