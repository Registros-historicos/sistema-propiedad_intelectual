import { ChangeDetectorRef, Component, Input, ViewChild } from '@angular/core';
import { ChartComponent } from 'ng-apexcharts';
import { TablerosService } from 'src/app/api/services/tableros.service';

interface ChartOptions {
  estatus: string;
  total: number;
}

@Component({
  selector: 'app-registro-estatus',
  templateUrl: './registro-estatus.component.html',
  styleUrl: './registro-estatus.component.scss'
})
export class RegistroEstatusComponent {
  @ViewChild("chart") chart: ChartComponent;

  data: ChartOptions[];
  
  chartOptions: any = {};

  constructor(
    private tablerosService: TablerosService,
    private cdRef: ChangeDetectorRef 
  ) {}

  ngOnInit() {
    this.loadRegisterStatus();
  }

  private loadRegisterStatus(): void {
    this.tablerosService.getRegisterStatus().subscribe({
      next: (data) => {
        this.data = data;
        this.loadChart();
        this.cdRef.detectChanges();
      },
      error: (error: any) => {
        console.error('ERROR:', error);
      }
    });
  }

  loadChart() {
    const labels = this.data.map(s => s.estatus );
    const series = this.data.map(s => s.total );
    const colors = [
      '#008FFB',
      '#00E396',
      '#FEB019',
      '#FF4560',
      '#775DD0',
      '#3F51B5',
      '#546E7A',
      '#D4526E',
      '#8D5B4C'
    ];

    this.chartOptions = {
      series,
      chart: {
        width: 650,
        height: 650,
        offsetY: -30,
        type: "pie",
      },
      labels,
      colors,
      dataLabels: {
        enabled: true,
        style: {
          fontSize: "16px",  
          fontWeight: 'bold',
          colors: ['#fff']  
        },
      },
      legend: {
        position: 'right',
        horizontalAlign: 'left',
        fontSize: '16px',
        offsetY: 75,
        offsetX: 20,
        height: 350,
      },
      plotOptions: {
        pie: {
          customScale: 0.8,
          dataLabels: {
            offset: 0,
          }
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
              style: { 
                fontSize: '16px'
              }
            }
          }
        }
      ]
    };
  }

}


