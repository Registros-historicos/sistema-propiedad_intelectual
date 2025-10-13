import { Component, Input, OnChanges, SimpleChanges, HostListener, ElementRef, ChangeDetectorRef } from '@angular/core';
import { getCSSVariableValue } from 'src/app/template/kt/_utils';
import { TablerosService } from 'src/app/api/services/tableros.service';

interface Data {
  category: string;
  series1: number;
  series2: number;
}

@Component({
  selector: 'app-registros-anio',
  templateUrl: './registros-anio.component.html',
  styleUrl: './registros-anio.component.scss'
})
export class RegistrosAnioComponent implements OnChanges {
  @Input() anios: Data[] = [];
  // Opcional: año para filtrar desde el backend
  @Input() year?: number | null;

  chartOptions: any;
  today: any;

  selectedQuarter: string | null = null;
  startDate: string | null = null;
  endDate: string | null = null;

  constructor(private tablerosService: TablerosService, private elRef: ElementRef, private cd: ChangeDetectorRef) {}

  // Control del dropdown sin depender de Bootstrap JS
  showYearMenu = false;
  // Mostrar versión compacta del control cuando se haga scroll
  compactYearButton = false;

  toggleYearMenu() {
    this.showYearMenu = !this.showYearMenu;
    console.debug('[RegistrosAnio] toggleYearMenu ->', this.showYearMenu);
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent) {
    const target = event.target as HTMLElement;
    if (!this.elRef.nativeElement.contains(target)) {
      this.showYearMenu = false;
    }
  }

  // Opciones de años para el dropdown
  yearOptions: number[] = [];
  // Última respuesta cruda del backend (para debug en UI)
  lastResponseRows: any[] = [];

  private buildYearOptions() {
    const current = new Date().getFullYear();
    const start = 2020; // año inicial razonable
    const end = current + 1;
    this.yearOptions = [];
    for (let y = end; y >= start; y--) {
      this.yearOptions.push(y);
    }
    // Si no hay year seleccionado, establecer por defecto al actual
    if (this.year === undefined || this.year === null) {
      this.year = current;
    }
    console.debug('[RegistrosAnio] buildYearOptions -> yearOptions:', this.yearOptions, 'selected year:', this.year);
  }

  selectYear(y: number, event?: Event) {
    if (event) {
      event.preventDefault();
      event.stopPropagation();
    }
    console.debug('[RegistrosAnio] selectYear ->', y);
    this.year = y;
    this.showYearMenu = false; // cerrar el menú al seleccionar
    this.loadRegistrosByMonth();
  }

  @HostListener('window:scroll', [])
  onWindowScroll() {
    const y = window.scrollY || window.pageYOffset;
    const shouldCompact = y > 80;
    if (shouldCompact !== this.compactYearButton) {
      this.compactYearButton = shouldCompact;
      // opcional: debug
      console.debug('[RegistrosAnio] onWindowScroll -> compactYearButton =', this.compactYearButton);
    }
  }

  ngOnChanges(changes: SimpleChanges) {
    // Si cambian 'year' o 'anios', recargar la data
    if (changes['year']) {
      this.loadRegistrosByMonth();
    }
    if (changes['anios'] && (!this.anios || this.anios.length === 0)) {
      // si el input anios llega vacío, intentamos cargar desde backend
      this.loadRegistrosByMonth();
    }
  }

  ngOnInit() {
    const d = new Date();
    this.today = d.toISOString().split('T')[0];

    // Construir opciones de año para el dropdown
    this.buildYearOptions();

    // Inicializar chart (se actualizará cuando lleguen datos)
    this.initializeChart();

    // Intentamos cargar datos desde backend si no hay datos iniciales
    if (!this.anios || this.anios.length === 0) {
      this.loadRegistrosByMonth();
    }
  }

  initializeChart() {
    const categories = this.anios.map(s => s.category);
    const series1Data = this.anios.map(s => s.series1);
    const series2Data = this.anios.map(s => s.series2);

    this.chartOptions = {
      series: [
        {
          name: 'IMPI',
          data: series1Data,
        },
        {
          name: 'INDAUTOR',
          data: series2Data,
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
    // Forzar actualización visual del chart
    try { this.cd.detectChanges(); } catch (e) { /* ignore */ }
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
          name: 'IMPI',
          data: filteredData.map(s => s.series1 || 0),
        },
        {
          name: 'INDAUTOR',
          data: filteredData.map(s => s.series2 || 0),
        },
      ],
      xaxis: {
        ...this.chartOptions.xaxis,
        categories: filteredData.map(s => s.category),
      },
    };
  }

  // Carga desde el endpoint que devuelve [{mes, total}]
  loadRegistrosByMonth() {
    // Si ya tenemos datos locales y no se especificó year, no hacemos petición
    if (this.anios && this.anios.length === 12 && (this.year === undefined || this.year === null)) {
      this.initializeChart();
      return;
    }
    const requestedYear = this.year ?? 2025;
    console.debug('[RegistrosAnio] loadRegistrosByMonth -> requesting year:', requestedYear, 'expected URL: /api/tableros/registros/mes/?anio=' + requestedYear);

    this.tablerosService.getRegistrosPorMes(this.year ?? undefined).subscribe({
      next: (rows) => {
        console.debug('[RegistrosAnio] loadRegistrosByMonth -> response rows:', rows);
        this.lastResponseRows = rows || [];
        // rows: [{mes: number (1-12?), total: number}]
        // Normalizar a 12 meses
        const months: Data[] = [];
        const monthNames = ['Ene','Feb','Mar','Abr','May','Jun','Jul','Ago','Sep','Oct','Nov','Dic'];
        for (let m = 1; m <= 12; m++) {
          months.push({ category: monthNames[m - 1], series1: 0, series2: 0 });
        }

        // Si backend devuelve multiples registros por mes, los asignamos a series1 y series2
        // Regla: el primer registro de cada mes va a series1; el segundo (y el resto) se suman en series2.
        const grouped: Record<number, number[]> = {};
        rows.forEach(r => {
          const mes = r.mes || 1;
          if (!grouped[mes]) grouped[mes] = [];
          grouped[mes].push(r.total);
        });

        for (let m = 1; m <= 12; m++) {
          const vals = grouped[m] || [];
          months[m - 1].series1 = vals.length > 0 ? vals[0] : 0;
          if (vals.length > 1) {
            months[m - 1].series2 = vals.slice(1).reduce((a, b) => a + b, 0);
          } else {
            months[m - 1].series2 = 0;
          }
        }

        console.debug('[RegistrosAnio] loadRegistrosByMonth -> mapped months:', months);

        this.anios = months;
        this.initializeChart();
      },
      error: (err) => {
        console.error('Error cargando registros por mes', err);
        this.lastResponseRows = [];
        // Mantener chart con datos vacíos
        this.anios = this.anios && this.anios.length ? this.anios : Array.from({ length: 12 }, (_, i) => ({ category: String(i + 1), series1: 0, series2: 0 }));
        this.initializeChart();
      }
    });
  }
}