import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-tablero-categorias-simple',
  templateUrl: './tablero-categorias-simple.component.html',
  styleUrls: ['./tablero-categorias-simple.component.scss']
})
export class TableroCategoriasSimpleComponent implements OnChanges {
  @Input() data: { categoria: string; value: number }[] = [];
  @Input() titulo: string = '';
  @Input() height: number = 350;

  chartOptions: any = {};

  ngOnChanges(changes: SimpleChanges): void {
    this.chartOptions = this.createChartOptions(this.height, this.data || []);
  }

  private createChartOptions(height: number, data: any[]): any {
    const categories = data.map((d) => d.categoria);
    const values = data.map((d) => d.value);
    return {
      series: [{ name: 'Cantidad', data: values }],
      chart: { type: 'bar', height: height, toolbar: { show: false } },
      xaxis: { categories },
      yaxis: { title: { text: 'Total' } },
      plotOptions: { bar: { horizontal: false, columnWidth: '40%' } },
      dataLabels: { enabled: false },
      legend: { show: false },
      fill: { opacity: 1 },
      tooltip: { y: { formatter: (val: number) => val + ' registros' } },
    };
  }
}
