import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { of } from 'rxjs';
import { getCSSVariableValue } from 'src/app/template/kt/_utils';
import { CategoriaInvestigador, TablerosService, Top10Instituciones } from 'src/app/api/services/tableros.service';

// INTERFAZ
export interface CardItem {
  icon: string;
  iconColor: string;
  titleTranslate: string;
  count: number;
  routerLink: string;
}
interface TopEntity {
  city_name: string;
  total_registries: number;
  tags?: string[];
}

interface Instituto {
  id_institucion: number;
  institucion_nombre: string;
  total: number;
}

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrl: './admin-dashboard.component.scss',
})
export class AdminDashboardComponent implements OnInit {
  dataFederalInstitutes: Instituto[] = []
  dataDecentralizedInstitutes: Instituto[] = []
  dataTop10Institutions: Top10Instituciones[] = [];

  chartOptions: any;
  chartOptionsGraph2: any;

  // TOP 10 ENTIDADES FEDERATIVAS (original)
  topFiveEntities: any[] = [];

  protected readonly topFiveFederalInstitutions = [];

  protected readonly topFiveCentralizedInstitutions = [];

  protected readonly federalInstitutions: CardItem[] = [];

  categorias: { categoria: string; value: number }[] = [];


  constructor(
    private tablerosService: TablerosService,
    private cdRef: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.loadTopEntities();
    this.loadTop10Institutions();
    this.tablerosService.getCategoriasInvestigadores().subscribe({
      next: (resp: CategoriaInvestigador[]) => {
        this.categorias = (resp || []).map(it => ({
          categoria: it.categoria,
          value: Number(it.total)
        }));
        // NUEVA LÍNEA PARA GRAFICA POR CATEGORIAS
        this.cdRef.detectChanges();
      },
      error: (err) => {
        console.error('Error cargando categorias de investigadores desde backend', err);
        // NUEVA LÍNEA PARA GRAFICA POR CATEGORIAS     
        this.cdRef.detectChanges();
      }
    });
    this.initGraphs();
    
    this.loadRegisterInstitutes(123)
    this.loadRegisterInstitutes(122)


  }

  trackByEntidad(index: number, item: any): number {
    return item.ent_federativa_param;
  }

private loadTopEntities(): void {
  this.tablerosService.getTopEntities().subscribe({
    next: (data) => {
      this.topFiveEntities = data;
      this.cdRef.detectChanges();
    },
    error: (error) => {
      console.error('❌ ERROR:', error);
    }
  });
}
  private loadTop10Institutions(): void {
  this.tablerosService.getTopInstitutions().subscribe({
    next: (data) => {
      this.dataTop10Institutions = data;
      this.cdRef.detectChanges();
    },
    error: (error) => {
      console.error('ERROR cargando top instituciones:', error);
    },
  });
}


  private initGraphs(): void {
    const solicitudesData = this.getSimulatedData();
    this.chartOptions = this.createChartOptions(350, solicitudesData);
    const solicitudesDataGraph2 = this.getSimulatedDataGraph2();
    this.chartOptionsGraph2 = this.createChartOptions(
      350,
      solicitudesDataGraph2
    );
  }

  private getSimulatedData(): any[] {
    return [
      { rama: 'Patente', data: [15, 18, 15, 6] },
      { rama: 'Marca', data: [20, 5, 12, 8] },
      { rama: 'Modelo de Utilidad', data: [10, 12, 10, 5] },
      { rama: 'Diseño Industrial', data: [5, 7, 8, 2] },
      { rama: 'Aviso Comercial', data: [8, 10, 9, 2] },
    ];
  }

  private getSimulatedDataGraph2(): any[] {
    return [
      { rama: 'Programas de computación', data: [10, 4, 6, 3] },
      { rama: 'Literaria', data: [11, 5, 9, 8] },
      { rama: 'Reserva de derechos', data: [1, 10, 9, 5] },
      { rama: 'ISSN', data: [5, 7, 8, 2] },
      { rama: 'Dibujo', data: [8, 10, 9, 5] },
    ];
  }

  private createChartOptions(height: number, data: any[]): any {
    const labelColor = getCSSVariableValue('--bs-gray-500');
    const borderColor = getCSSVariableValue('--bs-gray-200');

    const series = this.mapDataToSeries(data);
    const seriesColors = this.getSeriesColors();

    return {
      series: series,
      chart: {
        fontFamily: 'inherit',
        type: 'bar',
        height: height,
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
        categories: ['2022', '2023', '2024', '2025'], // Años
        axisBorder: { show: false },
        axisTicks: { show: false },
        labels: {
          style: {
            colors: labelColor,
            fontSize: '12px',
          },
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
      colors: seriesColors,
      grid: {
        borderColor: borderColor,
        strokeDashArray: 4,
        yaxis: { lines: { show: true } },
      },
    };
  }

  private mapDataToSeries(data: any[]): any[] {
    return data.map((item) => ({
      name: item.rama,
      data: item.data,
    }));
  }

  private getSeriesColors(): string[] {
    return [
      getCSSVariableValue('--bs-primary'),
      getCSSVariableValue('--bs-success'),
      getCSSVariableValue('--bs-warning'),
      getCSSVariableValue('--bs-danger'),
      getCSSVariableValue('--bs-info'),
    ];
  }

  normalizeResponse(resp: any): TopEntity[] {
    if(!resp) return [];
    if(Array.isArray(resp)) return resp as TopEntity[];
    if(Array.isArray(resp.data)) return resp.data as TopEntity[];
    if(Array.isArray(resp.result)) return resp.result as TopEntity[];
    if(Array.isArray(resp.items)) return resp.items as TopEntity[];

    try {

      const arrays = Object.values(resp).filter(v => Array.isArray(v)) as [][]
      if(!arrays.length) return [];

      const values = arrays.reduce((acc: any[], cur: any[]) => acc.concat(cur), []);
      if(values && values.length) return values as TopEntity[];
      
    } catch (error) {
      
    }
    return [];
  }

  aggregateAndSort(arr: TopEntity[], order: 'desc'|'asc' = 'desc'): TopEntity[] {
    const map = new Map<string, TopEntity>()
    for (const item of arr) {

      const key = (item.city_name || '').trim();
      if(!key) continue;

      const existing = map.get(key);
      const value = Number(item.total_registries || 0);

      if(existing) {
        existing.total_registries = Number(existing.total_registries) + value;
      } else {
        map.set(key, {city_name: key, total_registries: value});
      }
    }

    const aggregate = Array.from(map.values());
    aggregate.sort((a, b) => {
      if(a.total_registries !== b.total_registries) {
        return order === 'desc' ? b.total_registries - a.total_registries : a.total_registries - b.total_registries;
      };
      return a.city_name.localeCompare(b.city_name, 'es', {sensitivity: 'base'});
    });
    return aggregate;
  }

  loadRegisterInstitutes(tipoInstitucion: number) {
    this.tablerosService.getNewInstitucionesFiltradas(tipoInstitucion ?? 0).subscribe({
      next: (data) => {
        if (tipoInstitucion === 122) {
          this.dataDecentralizedInstitutes = [...data];
        } else {
          this.dataFederalInstitutes = [...data];
        }
        this.cdRef.detectChanges();
      },
      error: (error: any) => {
        console.error('ERROR:', error);
        return of<Instituto[]>([]);
      }
    });
  }
}