import { Component, OnInit } from '@angular/core';
import { getCSSVariableValue } from 'src/app/template/kt/_utils';
import { CardItem } from 'src/app/template/layout/components/tablero-instituciones-federales/tablero-instituciones-federales.component';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrl: './admin-dashboard.component.scss',
})
export class AdminDashboardComponent implements OnInit {
  chartOptions: any;
  chartOptionsGraph2: any;

  protected readonly topFiveEntities = [
    {
      name: 'Veracruz',
      value: 800,
      tags: ['PA', 'DA', 'MU', 'DI', 'MA'],
    },
    {
      name: 'Puebla',
      value: 700,
      tags: ['PA', 'MU', 'MA'],
    },
    {
      name: 'Oaxaca',
      value: 600,
      tags: ['PA', 'DA', 'DI', 'MA'],
    },
    {
      name: 'Chiapas',
      value: 500,
      tags: ['DA', 'MU', 'DI'],
    },
    {
      name: 'Tabasco',
      value: 400,
      tags: ['PA', 'MU', 'MA'],
    },
  ];

  protected readonly topFiveFederalInstitutions = [
    {
      name: 'Instituto Tecnológico de Tuxtla Gutierrez',
      value: 800,
      tags: ['PA', 'DA', 'MU', 'DI', 'MA'],
    },
    {
      name: 'Instituto Tecnológico de Durango',
      value: 700,
      tags: ['PA', 'MU', 'MA'],
    },
    {
      name: 'Instituto Tecnológico de Orizaba',
      value: 600,
      tags: ['PA', 'DA', 'DI', 'MA'],
    },
    {
      name: 'Instituto Tecnológico de Celaya',
      value: 500,
      tags: ['DA', 'MU', 'DI'],
    },
    {
      name: 'Instituto Tecnológico de Acapulco',
      value: 400,
      tags: ['PA', 'MU', 'MA'],
    },
  ];

  protected readonly topFiveCentralizedInstitutions = [
    {
      name: 'Instituto Tecnológico Superior de Zongolica',
      value: 400,
      tags: ['PA', 'DA', 'MU', 'DI', 'MA'],
    },
    {
      name: 'Instituto Tecnológico Superior de Palenque',
      value: 350,
      tags: ['PA', 'DA', 'DI', 'MA'],
    },
    {
      name: 'Instituto Tecnológico Superior de Irapuato',
      value: 300,
      tags: ['PA', 'MU', 'MA'],
    },
    {
      name: 'Instituto Tecnológico Superior de Cintapala',
      value: 250,
      tags: ['DA', 'MU', 'DI'],
    },
    {
      name: 'Instituto Tecnológico Superior de Comitán',
      value: 200,
      tags: ['PA', 'DA', 'DI'],
    },
  ];

  protected readonly federalInstitutions: CardItem[] = [
    {
      icon: 'emoji_objects',
      iconColor: 'text-danger',
      titleTranslate: 'Patentes',
      count: 800,
      routerLink: '/administrador/propiedades/patente',
    },
    {
      icon: 'branding_watermark',
      iconColor: 'text-info',
      titleTranslate: 'Marcas',
      count: 300,
      routerLink: '/administrador/propiedades/patente',
    },
    {
      icon: 'construction',
      iconColor: 'text-warning',
      titleTranslate: 'Modelos de Utilidad',
      count: 400,
      routerLink: '/administrador/propiedades/patente',
    },
    {
      icon: 'copyright',
      iconColor: 'text-success',
      titleTranslate: 'Derechos de Autor',
      count: 200,
      routerLink: '/administrador/propiedades/patente',
    },
    {
      icon: 'architecture',
      iconColor: 'text-primary',
      titleTranslate: 'Diseños Industriales',
      count: 300,
      routerLink: '/administrador/propiedades/patente',
    },
  ];

  protected readonly instituciones = [
    {
      name: 'Instituto Tecnológico de Tuxtla Gutierrez',
      value: 800,
      tags: ['PA', 'DA', 'MU', 'DI', 'MA'],
    },
    {
      name: 'Instituto Tecnológico de Durango',
      value: 700,
      tags: ['PA', 'MU', 'MA'],
    },
    {
      name: 'Instituto Tecnológico de Orizaba',
      value: 600,
      tags: ['PA', 'DA', 'DI', 'MA'],
    },
    {
      name: 'Instituto Tecnológico de Celaya',
      value: 500,
      tags: ['DA', 'MU', 'DI'],
    },
    {
      name: 'Instituto Tecnológico de Acapulco',
      value: 400,
      tags: ['PA', 'MU', 'MA'],
    },
    {
      name: 'Instituto Tecnológico de Mérida',
      value: 350,
      tags: ['PA', 'DA', 'DI'],
    },
    {
      name: 'Instituto Tecnológico de Chihuahua',
      value: 300,
      tags: ['MU', 'DI', 'MA'],
    },
    {
      name: 'Instituto Tecnológico de Tijuana',
      value: 250,
      tags: ['PA', 'DA', 'MU'],
    },
    {
      name: 'Instituto Tecnológico de León',
      value: 200,
      tags: ['DA', 'DI', 'MA'],
    },
    {
      name: 'Instituto Tecnológico de Cancún',
      value: 150,
      tags: ['PA', 'MU', 'MA'],
    },
  ];

  protected readonly categorias = [
    { categoria: 'Docentes', value: 500 },
    { categoria: 'Administrativos', value: 250 },
    { categoria: 'Alumnos', value: 180 },
  ];

  protected readonly solicitudes = [
    { categoria: 'Marcas', value: 712 },
    { categoria: 'Modelo de Utilidad', value: 250 },
    { categoria: 'Patente', value: 630 },
    { categoria: 'Programas de Computación', value: 300 },
    { categoria: 'Literaria', value: 280 },
  ];

  protected readonly institutosData = [
    {
      tipo_institucion_param: 4,
      nombre_tipo_institucion: 'Instituto Tecnológico',
      nombre_institucion: 'Instituto Tecnológico de Aguascalientes',
      total_registros: 60,
    },
    {
      tipo_institucion_param: 4,
      nombre_tipo_institucion: 'Instituto Tecnológico',
      nombre_institucion: 'Instituto Tecnológico de Ensenada',
      total_registros: 45,
    },
    {
      tipo_institucion_param: 4,
      nombre_tipo_institucion: 'Instituto Tecnológico',
      nombre_institucion: 'Instituto Tecnológico de Mexicali',
      total_registros: 80,
    },
    {
      tipo_institucion_param: 4,
      nombre_tipo_institucion: 'Instituto Tecnológico',
      nombre_institucion: 'Instituto Tecnológico de Tijuana',
      total_registros: 120,
    },
    {
      tipo_institucion_param: 4,
      nombre_tipo_institucion: 'Instituto Tecnológico',
      nombre_institucion: 'Instituto Tecnológico de La Paz',
      total_registros: 70,
    },
    {
      tipo_institucion_param: 4,
      nombre_tipo_institucion: 'Instituto Tecnológico',
      nombre_institucion: 'Instituto Tecnológico Superior de Los Cabos',
      total_registros: 55,
    },
    {
      tipo_institucion_param: 4,
      nombre_tipo_institucion: 'Instituto Tecnológico',
      nombre_institucion: 'Instituto Tecnológico de Comitán',
      total_registros: 90,
    },
    {
      tipo_institucion_param: 4,
      nombre_tipo_institucion: 'Instituto Tecnológico',
      nombre_institucion: 'Instituto Tecnológico de Tapachula',
      total_registros: 65,
    },
    {
      tipo_institucion_param: 4,
      nombre_tipo_institucion: 'Instituto Tecnológico',
      nombre_institucion: 'Instituto Tecnológico de Tuxtla Gutiérrez',
      total_registros: 150,
    },
    {
      tipo_institucion_param: 4,
      nombre_tipo_institucion: 'Instituto Tecnológico',
      nombre_institucion: 'Instituto Tecnológico Superior de Ciudad Acuña',
      total_registros: 40,
    },
    {
      tipo_institucion_param: 4,
      nombre_tipo_institucion: 'Instituto Tecnológico',
      nombre_institucion: 'Instituto Tecnológico de Saltillo',
      total_registros: 180,
    },
    {
      tipo_institucion_param: 4,
      nombre_tipo_institucion: 'Instituto Tecnológico',
      nombre_institucion: 'Instituto Tecnológico de La Laguna',
      total_registros: 110,
    },
    {
      tipo_institucion_param: 4,
      nombre_tipo_institucion: 'Instituto Tecnológico',
      nombre_institucion: 'Instituto Tecnológico de Ciudad Victoria',
      total_registros: 85,
    },
    {
      tipo_institucion_param: 4,
      nombre_tipo_institucion: 'Instituto Tecnológico',
      nombre_institucion:
        'Instituto Tecnológico de Estudios Superiores de La Región Carbonífera',
      total_registros: 50,
    },
    {
      tipo_institucion_param: 4,
      nombre_tipo_institucion: 'Instituto Tecnológico',
      nombre_institucion: 'Instituto Tecnológico de Durango',
      total_registros: 130,
    },
    {
      tipo_institucion_param: 4,
      nombre_tipo_institucion: 'Instituto Tecnológico',
      nombre_institucion: 'Instituto Tecnológico de Chihuahua',
      total_registros: 160,
    },
    {
      tipo_institucion_param: 4,
      nombre_tipo_institucion: 'Instituto Tecnológico',
      nombre_institucion: 'Instituto Tecnológico de Ciudad Cuauhtémoc',
      total_registros: 75,
    },
    {
      tipo_institucion_param: 4,
      nombre_tipo_institucion: 'Instituto Tecnológico',
      nombre_institucion: 'Instituto Tecnológico de Parral',
      total_registros: 55,
    },
    {
      tipo_institucion_param: 4,
      nombre_tipo_institucion: 'Instituto Tecnológico',
      nombre_institucion: 'Instituto Tecnológico de Orizaba',
      total_registros: 140,
    },
    {
      tipo_institucion_param: 4,
      nombre_tipo_institucion: 'Instituto Tecnológico',
      nombre_institucion: 'Instituto Tecnológico de Veracruz',
      total_registros: 100,
    },
    {
      tipo_institucion_param: 4,
      nombre_tipo_institucion: 'Instituto Tecnológico',
      nombre_institucion: 'Instituto Tecnológico Superior de Xalapa',
      total_registros: 95,
    },
    {
      tipo_institucion_param: 4,
      nombre_tipo_institucion: 'Instituto Tecnológico',
      nombre_institucion:
        'Instituto Tecnológico de Estudios Superiores de Monterrey',
      total_registros: 200,
    },
    {
      tipo_institucion_param: 4,
      nombre_tipo_institucion: 'Instituto Tecnológico',
      nombre_institucion: 'Instituto Tecnológico de La Región Mixe',
      total_registros: 35,
    },
    {
      tipo_institucion_param: 4,
      nombre_tipo_institucion: 'Instituto Tecnológico',
      nombre_institucion: 'Instituto Tecnológico de La Zona Olmeca',
      total_registros: 50,
    },
    {
      tipo_institucion_param: 4,
      nombre_tipo_institucion: 'Instituto Tecnológico',
      nombre_institucion: 'Instituto Tecnológico de Lázaro Cárdenas',
      total_registros: 70,
    },
    {
      tipo_institucion_param: 4,
      nombre_tipo_institucion: 'Instituto Tecnológico',
      nombre_institucion: 'Instituto Tecnológico de Tláhuac II',
      total_registros: 45,
    },
    {
      tipo_institucion_param: 4,
      nombre_tipo_institucion: 'Instituto Tecnológico',
      nombre_institucion: 'Instituto Tecnológico de Tlajomulco',
      total_registros: 50,
    },
    {
      tipo_institucion_param: 4,
      nombre_tipo_institucion: 'Instituto Tecnológico',
      nombre_institucion: 'Instituto Tecnológico de Tlalnepantla',
      total_registros: 85,
    },
    {
      tipo_institucion_param: 4,
      nombre_tipo_institucion: 'Instituto Tecnológico',
      nombre_institucion: 'Instituto Tecnológico de Tlalpan',
      total_registros: 60,
    },
    {
      tipo_institucion_param: 4,
      nombre_tipo_institucion: 'Instituto Tecnológico',
      nombre_institucion: 'Instituto Tecnológico Superior de Acatlán de Osorio',
      total_registros: 40,
    },
    {
      tipo_institucion_param: 4,
      nombre_tipo_institucion: 'Instituto Tecnológico',
      nombre_institucion: 'Instituto Tecnológico Superior de Acayucan',
      total_registros: 55,
    },
    {
      tipo_institucion_param: 4,
      nombre_tipo_institucion: 'Instituto Tecnológico',
      nombre_institucion: 'Instituto Tecnológico Superior de Álamo Temapache',
      total_registros: 65,
    },
    {
      tipo_institucion_param: 4,
      nombre_tipo_institucion: 'Instituto Tecnológico',
      nombre_institucion: 'Instituto Tecnológico Superior de Chicontepec',
      total_registros: 30,
    },
    {
      tipo_institucion_param: 4,
      nombre_tipo_institucion: 'Instituto Tecnológico',
      nombre_institucion: 'Instituto Tecnológico Superior de Cintalapa',
      total_registros: 45,
    },
    {
      tipo_institucion_param: 4,
      nombre_tipo_institucion: 'Instituto Tecnológico',
      nombre_institucion: 'Instituto Tecnológico Superior de Ciudad Hidalgo',
      total_registros: 50,
    },
    {
      tipo_institucion_param: 4,
      nombre_tipo_institucion: 'Instituto Tecnológico',
      nombre_institucion: 'Instituto Tecnológico Superior de Ciudad Serdán',
      total_registros: 55,
    },
    {
      tipo_institucion_param: 4,
      nombre_tipo_institucion: 'Instituto Tecnológico',
      nombre_institucion: 'Tecnológico de Estudios Superiores de Coacalco',
      total_registros: 80,
    },
    {
      tipo_institucion_param: 4,
      nombre_tipo_institucion: 'Instituto Tecnológico',
      nombre_institucion: 'Instituto Tecnológico Superior de Coalcomán',
      total_registros: 40,
    },
    {
      tipo_institucion_param: 4,
      nombre_tipo_institucion: 'Instituto Tecnológico',
      nombre_institucion: 'Instituto Tecnológico Superior de Coatzacoalcos',
      total_registros: 95,
    },
    {
      tipo_institucion_param: 4,
      nombre_tipo_institucion: 'Instituto Tecnológico',
      nombre_institucion:
        'Instituto Tecnológico Superior de Felipe Carrillo Puerto',
      total_registros: 60,
    },
    {
      tipo_institucion_param: 4,
      nombre_tipo_institucion: 'Instituto Tecnológico',
      nombre_institucion: 'Instituto Tecnológico Superior de La Costa Chica',
      total_registros: 35,
    },
    {
      tipo_institucion_param: 4,
      nombre_tipo_institucion: 'Instituto Tecnológico',
      nombre_institucion: 'Instituto Tecnológico Superior de La Huerta',
      total_registros: 45,
    },
    {
      tipo_institucion_param: 4,
      nombre_tipo_institucion: 'Instituto Tecnológico',
      nombre_institucion: 'Instituto Tecnológico Superior de La Montaña',
      total_registros: 50,
    },
    {
      tipo_institucion_param: 4,
      nombre_tipo_institucion: 'Instituto Tecnológico',
      nombre_institucion:
        'Instituto Tecnológico Superior de La Región de Los Llanos',
      total_registros: 55,
    },
    {
      tipo_institucion_param: 4,
      nombre_tipo_institucion: 'Instituto Tecnológico',
      nombre_institucion: 'Instituto Tecnológico Superior de La Región Sierra',
      total_registros: 40,
    },
    {
      tipo_institucion_param: 4,
      nombre_tipo_institucion: 'Instituto Tecnológico',
      nombre_institucion:
        'Instituto Tecnológico Superior de La Sierra Negra de Ajalpan',
      total_registros: 30,
    },
    {
      tipo_institucion_param: 4,
      nombre_tipo_institucion: 'Instituto Tecnológico',
      nombre_institucion:
        'Instituto Tecnológico Superior de La Sierra Norte de Puebla',
      total_registros: 70,
    },
    {
      tipo_institucion_param: 4,
      nombre_tipo_institucion: 'Instituto Tecnológico',
      nombre_institucion: 'Tecnológico de Estudios Superiores de Chimalhuacán',
      total_registros: 90,
    },
    {
      tipo_institucion_param: 4,
      nombre_tipo_institucion: 'Instituto Tecnológico',
      nombre_institucion:
        'Tecnológico de Estudios Superiores de Cuautitlán Izcalli',
      total_registros: 100,
    },
    {
      tipo_institucion_param: 4,
      nombre_tipo_institucion: 'Instituto Tecnológico',
      nombre_institucion: 'Tecnológico de Estudios Superiores de Ecatepec',
      total_registros: 110,
    },
    {
      tipo_institucion_param: 4,
      nombre_tipo_institucion: 'Instituto Tecnológico',
      nombre_institucion: 'Tecnológico de Estudios Superiores de Huixquilucan',
      total_registros: 85,
    },
    {
      tipo_institucion_param: 4,
      nombre_tipo_institucion: 'Instituto Tecnológico',
      nombre_institucion: 'Tecnológico de Estudios Superiores de Ixtapaluca',
      total_registros: 75,
    },
  ];

  constructor() {}

  ngOnInit(): void {
    this.initGraphs();
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
}
