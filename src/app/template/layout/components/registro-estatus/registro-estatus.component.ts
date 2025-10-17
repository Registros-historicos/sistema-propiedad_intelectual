import { AfterViewInit, ChangeDetectorRef, Component, ViewChild } from '@angular/core';
import { ChartComponent } from 'ng-apexcharts';
import { TablerosService } from 'src/app/api/services/tableros.service';

interface IRegisterStatus {
  estatus: string;
  total: number;
}

@Component({
  selector: 'app-registro-estatus',
  templateUrl: './registro-estatus.component.html',
  styleUrls: ['./registro-estatus.component.scss'] // 👈 plural para que cargue el SCSS
})
export class RegistroEstatusComponent implements AfterViewInit {
  @ViewChild('chart') chart?: ChartComponent;

  data: IRegisterStatus[] = [];
  chartOptions: any = {};
  isLoaded = false;

  private readonly colors = [
    '#008FFB','#00E396','#FEB019','#FF4560',
    '#775DD0','#3F51B5','#546E7A','#D4526E','#8D5B4C'
  ];

  constructor(
    private tablerosService: TablerosService,
    private cdRef: ChangeDetectorRef
  ) {}

  // 👇 Esperamos a que exista el DOM con tamaño real
  ngAfterViewInit(): void {
    setTimeout(() => this.loadRegisterStatus(), 0);
  }

  private loadRegisterStatus(): void {
    this.tablerosService.getRegisterStatus().subscribe({
      next: (data) => {
        this.data = (data || []).filter(x => x && x.estatus != null);
        this.buildChart();
        this.isLoaded = true;
        this.cdRef.detectChanges();
      },
      error: (err) => console.error('ERROR:', err)
    });
  }

  private buildChart(): void {
    const labels = this.data.map(s => s.estatus);
    const series = this.data.map(s => Number(s.total) || 0);

    this.chartOptions = {
      series,
      labels,
      colors: this.colors,
      chart: {
        id: 'registro-estatus',
        type: 'pie',
        height: 420,                 // 👈 alto suficiente y estable
        toolbar: { show: false },
        animations: {
          enabled: true,
          speed: 500,
          dynamicAnimation: { enabled: false } // 👈 evita recalculados pesados
        },
        foreColor: '#3f4254'
      },
      legend: {
        show: true,
        position: 'right',           // 👈 a la derecha por defecto
        horizontalAlign: 'left',
        fontSize: '13px',
        markers: { width: 10, height: 10, radius: 12 },
        itemMargin: { vertical: 4, horizontal: 8 }
      },
      dataLabels: {
        enabled: true,
        style: { fontSize: '13px', fontWeight: 'bold' }
      },
      states: {                       // 👈 hover visible sin “parpadeo”
        hover: { filter: { type: 'lighten', value: 0.08 } },
        active: { filter: { type: 'none' } }
      },
      stroke: { show: false },
      plotOptions: {
        pie: {
          expandOnClick: true,        // hover/click nativo
          dataLabels: { offset: 0 },
          customScale: 0.96            // un poco más grande sin chocar con la leyenda
        }
      },
      tooltip: { enabled: true },
      responsive: [
        {
          // 👇 en < 1400px baja la leyenda para no romper el layout
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
