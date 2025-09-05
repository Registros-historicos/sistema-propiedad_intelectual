import { Component } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {
  protected readonly institutosFederales = [
    {
      tipo_institucion_param: 4,
      nombre_tipo_institucion: 'Federal',
      nombre_institucion: 'Instituto Tecnológico de Aguascalientes',
      total_registros: 60,
    },
    {
      tipo_institucion_param: 4,
      nombre_tipo_institucion: 'Federal',
      nombre_institucion: 'Instituto Tecnológico de Ensenada',
      total_registros: 45,
    },
    {
      tipo_institucion_param: 4,
      nombre_tipo_institucion: 'Federal',
      nombre_institucion: 'Instituto Tecnológico de Mexicali',
      total_registros: 80,
    },
    {
      tipo_institucion_param: 4,
      nombre_tipo_institucion: 'Federal',
      nombre_institucion: 'Instituto Tecnológico de Tijuana',
      total_registros: 120,
    },
    {
      tipo_institucion_param: 4,
      nombre_tipo_institucion: 'Federal',
      nombre_institucion: 'Instituto Tecnológico de La Paz',
      total_registros: 70,
    },
    {
      tipo_institucion_param: 4,
      nombre_tipo_institucion: 'Federal',
      nombre_institucion: 'Instituto Tecnológico de Tapachula',
      total_registros: 65,
    },
    {
      tipo_institucion_param: 4,
      nombre_tipo_institucion: 'Federal',
      nombre_institucion: 'Instituto Tecnológico de Tuxtla Gutiérrez',
      total_registros: 150,
    },
    {
      tipo_institucion_param: 4,
      nombre_tipo_institucion: 'Federal',
      nombre_institucion: 'Instituto Tecnológico Superior de Ciudad Acuña',
      total_registros: 40,
    },
    {
      tipo_institucion_param: 4,
      nombre_tipo_institucion: 'Federal',
      nombre_institucion: 'Instituto Tecnológico de Saltillo',
      total_registros: 180,
    },
    {
      tipo_institucion_param: 4,
      nombre_tipo_institucion: 'Federal',
      nombre_institucion: 'Instituto Tecnológico de La Laguna',
      total_registros: 110,
    },
    {
      tipo_institucion_param: 4,
      nombre_tipo_institucion: 'Federal',
      nombre_institucion: 'Instituto Tecnológico de Ciudad Victoria',
      total_registros: 85,
    },
    {
      tipo_institucion_param: 4,
      nombre_tipo_institucion: 'Federal',
      nombre_institucion:
        'Instituto Tecnológico de Estudios Superiores de La Región Carbonífera',
      total_registros: 50,
    },
    {
      tipo_institucion_param: 4,
      nombre_tipo_institucion: 'Federal',
      nombre_institucion: 'Instituto Tecnológico de Durango',
      total_registros: 130,
    },
    {
      tipo_institucion_param: 4,
      nombre_tipo_institucion: 'Federal',
      nombre_institucion: 'Instituto Tecnológico de Chihuahua',
      total_registros: 160,
    },
    {
      tipo_institucion_param: 4,
      nombre_tipo_institucion: 'Federal',
      nombre_institucion: 'Instituto Tecnológico de Ciudad Cuauhtémoc',
      total_registros: 75,
    },
    {
      tipo_institucion_param: 4,
      nombre_tipo_institucion: 'Federal',
      nombre_institucion: 'Instituto Tecnológico de Parral',
      total_registros: 55,
    },
    {
      tipo_institucion_param: 4,
      nombre_tipo_institucion: 'Federal',
      nombre_institucion: 'Instituto Tecnológico de Orizaba',
      total_registros: 140,
    },
    {
      tipo_institucion_param: 4,
      nombre_tipo_institucion: 'Federal',
      nombre_institucion: 'Instituto Tecnológico de Veracruz',
      total_registros: 100,
    },
    {
      tipo_institucion_param: 4,
      nombre_tipo_institucion: 'Federal',
      nombre_institucion:
        'Instituto Tecnológico de Estudios Superiores de Monterrey',
      total_registros: 200,
    },
    {
      tipo_institucion_param: 4,
      nombre_tipo_institucion: 'Federal',
      nombre_institucion: 'Instituto Tecnológico de Lázaro Cárdenas',
      total_registros: 70,
    },
    {
      tipo_institucion_param: 4,
      nombre_tipo_institucion: 'Federal',
      nombre_institucion: 'Instituto Tecnológico de Tláhuac II',
      total_registros: 45,
    },
    {
      tipo_institucion_param: 4,
      nombre_tipo_institucion: 'Federal',
      nombre_institucion: 'Instituto Tecnológico de Tlajomulco',
      total_registros: 50,
    },
    {
      tipo_institucion_param: 4,
      nombre_tipo_institucion: 'Federal',
      nombre_institucion: 'Instituto Tecnológico de Tlalnepantla',
      total_registros: 85,
    },
    {
      tipo_institucion_param: 4,
      nombre_tipo_institucion: 'Federal',
      nombre_institucion: 'Instituto Tecnológico de Tlalpan',
      total_registros: 60,
    },
    {
      tipo_institucion_param: 4,
      nombre_tipo_institucion: 'Federal',
      nombre_institucion: 'Tecnológico de Estudios Superiores de Coacalco',
      total_registros: 80,
    },
    {
      tipo_institucion_param: 4,
      nombre_tipo_institucion: 'Federal',
      nombre_institucion: 'Tecnológico de Estudios Superiores de Chimalhuacán',
      total_registros: 90,
    },
    {
      tipo_institucion_param: 4,
      nombre_tipo_institucion: 'Federal',
      nombre_institucion:
        'Tecnológico de Estudios Superiores de Cuautitlán Izcalli',
      total_registros: 100,
    },
    {
      tipo_institucion_param: 4,
      nombre_tipo_institucion: 'Federal',
      nombre_institucion: 'Tecnológico de Estudios Superiores de Ecatepec',
      total_registros: 110,
    },
    {
      tipo_institucion_param: 4,
      nombre_tipo_institucion: 'Federal',
      nombre_institucion: 'Tecnológico de Estudios Superiores de Huixquilucan',
      total_registros: 85,
    },
    {
      tipo_institucion_param: 4,
      nombre_tipo_institucion: 'Federal',
      nombre_institucion: 'Tecnológico de Estudios Superiores de Ixtapaluca',
      total_registros: 75,
    },
  ];

  protected readonly institutosDescentralizados = [
    {
      tipo_institucion_param: 4,
      nombre_tipo_institucion: 'Descentralizado',
      nombre_institucion: 'Instituto Tecnológico Superior de Los Cabos',
      total_registros: 55,
    },
    {
      tipo_institucion_param: 4,
      nombre_tipo_institucion: 'Descentralizado',
      nombre_institucion: 'Instituto Tecnológico Superior de Comitán',
      total_registros: 90,
    },
    {
      tipo_institucion_param: 4,
      nombre_tipo_institucion: 'Descentralizado',
      nombre_institucion: 'Instituto Tecnológico Superior de Xalapa',
      total_registros: 95,
    },
    {
      tipo_institucion_param: 4,
      nombre_tipo_institucion: 'Descentralizado',
      nombre_institucion: 'Instituto Tecnológico Superior de La Región Mixe',
      total_registros: 35,
    },
    {
      tipo_institucion_param: 4,
      nombre_tipo_institucion: 'Descentralizado',
      nombre_institucion: 'Instituto Tecnológico Superior de La Zona Olmeca',
      total_registros: 50,
    },
    {
      tipo_institucion_param: 4,
      nombre_tipo_institucion: 'Descentralizado',
      nombre_institucion: 'Instituto Tecnológico Superior de Acatlán de Osorio',
      total_registros: 40,
    },
    {
      tipo_institucion_param: 4,
      nombre_tipo_institucion: 'Descentralizado',
      nombre_institucion: 'Instituto Tecnológico Superior de Acayucan',
      total_registros: 55,
    },
    {
      tipo_institucion_param: 4,
      nombre_tipo_institucion: 'Descentralizado',
      nombre_institucion: 'Instituto Tecnológico Superior de Álamo Temapache',
      total_registros: 65,
    },
    {
      tipo_institucion_param: 4,
      nombre_tipo_institucion: 'Descentralizado',
      nombre_institucion: 'Instituto Tecnológico Superior de Chicontepec',
      total_registros: 30,
    },
    {
      tipo_institucion_param: 4,
      nombre_tipo_institucion: 'Descentralizado',
      nombre_institucion: 'Instituto Tecnológico Superior de Cintalapa',
      total_registros: 45,
    },
    {
      tipo_institucion_param: 4,
      nombre_tipo_institucion: 'Descentralizado',
      nombre_institucion: 'Instituto Tecnológico Superior de Ciudad Hidalgo',
      total_registros: 50,
    },
    {
      tipo_institucion_param: 4,
      nombre_tipo_institucion: 'Descentralizado',
      nombre_institucion: 'Instituto Tecnológico Superior de Ciudad Serdán',
      total_registros: 55,
    },
    {
      tipo_institucion_param: 4,
      nombre_tipo_institucion: 'Descentralizado',
      nombre_institucion: 'Instituto Tecnológico Superior de Coalcomán',
      total_registros: 40,
    },
    {
      tipo_institucion_param: 4,
      nombre_tipo_institucion: 'Descentralizado',
      nombre_institucion: 'Instituto Tecnológico Superior de Coatzacoalcos',
      total_registros: 95,
    },
    {
      tipo_institucion_param: 4,
      nombre_tipo_institucion: 'Descentralizado',
      nombre_institucion:
        'Instituto Tecnológico Superior de Felipe Carrillo Puerto',
      total_registros: 60,
    },
    {
      tipo_institucion_param: 4,
      nombre_tipo_institucion: 'Descentralizado',
      nombre_institucion: 'Instituto Tecnológico Superior de La Costa Chica',
      total_registros: 35,
    },
    {
      tipo_institucion_param: 4,
      nombre_tipo_institucion: 'Descentralizado',
      nombre_institucion: 'Instituto Tecnológico Superior de La Huerta',
      total_registros: 45,
    },
    {
      tipo_institucion_param: 4,
      nombre_tipo_institucion: 'Descentralizado',
      nombre_institucion: 'Instituto Tecnológico Superior de La Montaña',
      total_registros: 50,
    },
    {
      tipo_institucion_param: 4,
      nombre_tipo_institucion: 'Descentralizado',
      nombre_institucion:
        'Instituto Tecnológico Superior de La Región de Los Llanos',
      total_registros: 55,
    },
    {
      tipo_institucion_param: 4,
      nombre_tipo_institucion: 'Descentralizado',
      nombre_institucion: 'Instituto Tecnológico Superior de La Región Sierra',
      total_registros: 40,
    },
    {
      tipo_institucion_param: 4,
      nombre_tipo_institucion: 'Descentralizado',
      nombre_institucion:
        'Instituto Tecnológico Superior de La Sierra Negra de Ajalpan',
      total_registros: 30,
    },
    {
      tipo_institucion_param: 4,
      nombre_tipo_institucion: 'Descentralizado',
      nombre_institucion:
        'Instituto Tecnológico Superior de La Sierra Norte de Puebla',
      total_registros: 70,
    },
  ];

  protected readonly institutosData = [
    {
      tipo_institucion_param: 4,
      nombre_tipo_institucion: 'Descentralizado',
      nombre_institucion: 'Instituto Tecnológico Superior de Los Cabos',
      total_registros: 55,
    },
    {
      tipo_institucion_param: 4,
      nombre_tipo_institucion: 'Federal',
      nombre_institucion: 'Instituto Tecnológico de Aguascalientes',
      total_registros: 60,
    },
    {
      tipo_institucion_param: 4,
      nombre_tipo_institucion: 'Federal',
      nombre_institucion: 'Instituto Tecnológico de Ensenada',
      total_registros: 45,
    },
    {
      tipo_institucion_param: 4,
      nombre_tipo_institucion: 'Federal',
      nombre_institucion: 'Instituto Tecnológico de Mexicali',
      total_registros: 80,
    },
    {
      tipo_institucion_param: 4,
      nombre_tipo_institucion: 'Federal',
      nombre_institucion: 'Instituto Tecnológico de Tijuana',
      total_registros: 120,
    },
    {
      tipo_institucion_param: 4,
      nombre_tipo_institucion: 'Federal',
      nombre_institucion: 'Instituto Tecnológico de La Paz',
      total_registros: 70,
    },
    {
      tipo_institucion_param: 4,
      nombre_tipo_institucion: 'Descentralizado',
      nombre_institucion: 'Instituto Tecnológico Superior de Comitán',
      total_registros: 90,
    },
    {
      tipo_institucion_param: 4,
      nombre_tipo_institucion: 'Federal',
      nombre_institucion: 'Instituto Tecnológico de Tapachula',
      total_registros: 65,
    },
    {
      tipo_institucion_param: 4,
      nombre_tipo_institucion: 'Federal',
      nombre_institucion: 'Instituto Tecnológico de Tuxtla Gutiérrez',
      total_registros: 150,
    },
    {
      tipo_institucion_param: 4,
      nombre_tipo_institucion: 'Federal',
      nombre_institucion: 'Instituto Tecnológico Superior de Ciudad Acuña',
      total_registros: 40,
    },
    {
      tipo_institucion_param: 4,
      nombre_tipo_institucion: 'Federal',
      nombre_institucion: 'Instituto Tecnológico de Saltillo',
      total_registros: 180,
    },
    {
      tipo_institucion_param: 4,
      nombre_tipo_institucion: 'Federal',
      nombre_institucion: 'Instituto Tecnológico de La Laguna',
      total_registros: 110,
    },
    {
      tipo_institucion_param: 4,
      nombre_tipo_institucion: 'Federal',
      nombre_institucion: 'Instituto Tecnológico de Ciudad Victoria',
      total_registros: 85,
    },
    {
      tipo_institucion_param: 4,
      nombre_tipo_institucion: 'Federal',
      nombre_institucion:
        'Instituto Tecnológico de Estudios Superiores de La Región Carbonífera',
      total_registros: 50,
    },
    {
      tipo_institucion_param: 4,
      nombre_tipo_institucion: 'Federal',
      nombre_institucion: 'Instituto Tecnológico de Durango',
      total_registros: 130,
    },
    {
      tipo_institucion_param: 4,
      nombre_tipo_institucion: 'Federal',
      nombre_institucion: 'Instituto Tecnológico de Chihuahua',
      total_registros: 160,
    },
    {
      tipo_institucion_param: 4,
      nombre_tipo_institucion: 'Federal',
      nombre_institucion: 'Instituto Tecnológico de Ciudad Cuauhtémoc',
      total_registros: 75,
    },
    {
      tipo_institucion_param: 4,
      nombre_tipo_institucion: 'Federal',
      nombre_institucion: 'Instituto Tecnológico de Parral',
      total_registros: 55,
    },
    {
      tipo_institucion_param: 4,
      nombre_tipo_institucion: 'Federal',
      nombre_institucion: 'Instituto Tecnológico de Orizaba',
      total_registros: 140,
    },
    {
      tipo_institucion_param: 4,
      nombre_tipo_institucion: 'Federal',
      nombre_institucion: 'Instituto Tecnológico de Veracruz',
      total_registros: 100,
    },
    {
      tipo_institucion_param: 4,
      nombre_tipo_institucion: 'Descentralizado',
      nombre_institucion: 'Instituto Tecnológico Superior de Xalapa',
      total_registros: 95,
    },
    {
      tipo_institucion_param: 4,
      nombre_tipo_institucion: 'Federal',
      nombre_institucion:
        'Instituto Tecnológico de Estudios Superiores de Monterrey',
      total_registros: 200,
    },
    {
      tipo_institucion_param: 4,
      nombre_tipo_institucion: 'Descentralizado',
      nombre_institucion: 'Instituto Tecnológico Superior de La Región Mixe',
      total_registros: 35,
    },
    {
      tipo_institucion_param: 4,
      nombre_tipo_institucion: 'Descentralizado',
      nombre_institucion: 'Instituto Tecnológico Superior de La Zona Olmeca',
      total_registros: 50,
    },
    {
      tipo_institucion_param: 4,
      nombre_tipo_institucion: 'Federal',
      nombre_institucion: 'Instituto Tecnológico de Lázaro Cárdenas',
      total_registros: 70,
    },
    {
      tipo_institucion_param: 4,
      nombre_tipo_institucion: 'Federal',
      nombre_institucion: 'Instituto Tecnológico de Tláhuac II',
      total_registros: 45,
    },
    {
      tipo_institucion_param: 4,
      nombre_tipo_institucion: 'Federal',
      nombre_institucion: 'Instituto Tecnológico de Tlajomulco',
      total_registros: 50,
    },
    {
      tipo_institucion_param: 4,
      nombre_tipo_institucion: 'Federal',
      nombre_institucion: 'Instituto Tecnológico de Tlalnepantla',
      total_registros: 85,
    },
    {
      tipo_institucion_param: 4,
      nombre_tipo_institucion: 'Federal',
      nombre_institucion: 'Instituto Tecnológico de Tlalpan',
      total_registros: 60,
    },
    {
      tipo_institucion_param: 4,
      nombre_tipo_institucion: 'Descentralizado',
      nombre_institucion: 'Instituto Tecnológico Superior de Acatlán de Osorio',
      total_registros: 40,
    },
    {
      tipo_institucion_param: 4,
      nombre_tipo_institucion: 'Descentralizado',
      nombre_institucion: 'Instituto Tecnológico Superior de Acayucan',
      total_registros: 55,
    },
    {
      tipo_institucion_param: 4,
      nombre_tipo_institucion: 'Descentralizado',
      nombre_institucion: 'Instituto Tecnológico Superior de Álamo Temapache',
      total_registros: 65,
    },
    {
      tipo_institucion_param: 4,
      nombre_tipo_institucion: 'Descentralizado',
      nombre_institucion: 'Instituto Tecnológico Superior de Chicontepec',
      total_registros: 30,
    },
    {
      tipo_institucion_param: 4,
      nombre_tipo_institucion: 'Descentralizado',
      nombre_institucion: 'Instituto Tecnológico Superior de Cintalapa',
      total_registros: 45,
    },
    {
      tipo_institucion_param: 4,
      nombre_tipo_institucion: 'Descentralizado',
      nombre_institucion: 'Instituto Tecnológico Superior de Ciudad Hidalgo',
      total_registros: 50,
    },
    {
      tipo_institucion_param: 4,
      nombre_tipo_institucion: 'Descentralizado',
      nombre_institucion: 'Instituto Tecnológico Superior de Ciudad Serdán',
      total_registros: 55,
    },
    {
      tipo_institucion_param: 4,
      nombre_tipo_institucion: 'Federal',
      nombre_institucion: 'Tecnológico de Estudios Superiores de Coacalco',
      total_registros: 80,
    },
    {
      tipo_institucion_param: 4,
      nombre_tipo_institucion: 'Descentralizado',
      nombre_institucion: 'Instituto Tecnológico Superior de Coalcomán',
      total_registros: 40,
    },
    {
      tipo_institucion_param: 4,
      nombre_tipo_institucion: 'Descentralizado',
      nombre_institucion: 'Instituto Tecnológico Superior de Coatzacoalcos',
      total_registros: 95,
    },
    {
      tipo_institucion_param: 4,
      nombre_tipo_institucion: 'Descentralizado',
      nombre_institucion:
        'Instituto Tecnológico Superior de Felipe Carrillo Puerto',
      total_registros: 60,
    },
    {
      tipo_institucion_param: 4,
      nombre_tipo_institucion: 'Descentralizado',
      nombre_institucion: 'Instituto Tecnológico Superior de La Costa Chica',
      total_registros: 35,
    },
    {
      tipo_institucion_param: 4,
      nombre_tipo_institucion: 'Descentralizado',
      nombre_institucion: 'Instituto Tecnológico Superior de La Huerta',
      total_registros: 45,
    },
    {
      tipo_institucion_param: 4,
      nombre_tipo_institucion: 'Descentralizado',
      nombre_institucion: 'Instituto Tecnológico Superior de La Montaña',
      total_registros: 50,
    },
    {
      tipo_institucion_param: 4,
      nombre_tipo_institucion: 'Descentralizado',
      nombre_institucion:
        'Instituto Tecnológico Superior de La Región de Los Llanos',
      total_registros: 55,
    },
    {
      tipo_institucion_param: 4,
      nombre_tipo_institucion: 'Descentralizado',
      nombre_institucion: 'Instituto Tecnológico Superior de La Región Sierra',
      total_registros: 40,
    },
    {
      tipo_institucion_param: 4,
      nombre_tipo_institucion: 'Descentralizado',
      nombre_institucion:
        'Instituto Tecnológico Superior de La Sierra Negra de Ajalpan',
      total_registros: 30,
    },
    {
      tipo_institucion_param: 4,
      nombre_tipo_institucion: 'Descentralizado',
      nombre_institucion:
        'Instituto Tecnológico Superior de La Sierra Norte de Puebla',
      total_registros: 70,
    },
    {
      tipo_institucion_param: 4,
      nombre_tipo_institucion: 'Federal',
      nombre_institucion: 'Tecnológico de Estudios Superiores de Chimalhuacán',
      total_registros: 90,
    },
    {
      tipo_institucion_param: 4,
      nombre_tipo_institucion: 'Federal',
      nombre_institucion:
        'Tecnológico de Estudios Superiores de Cuautitlán Izcalli',
      total_registros: 100,
    },
    {
      tipo_institucion_param: 4,
      nombre_tipo_institucion: 'Federal',
      nombre_institucion: 'Tecnológico de Estudios Superiores de Ecatepec',
      total_registros: 110,
    },
    {
      tipo_institucion_param: 4,
      nombre_tipo_institucion: 'Federal',
      nombre_institucion: 'Tecnológico de Estudios Superiores de Huixquilucan',
      total_registros: 85,
    },
    {
      tipo_institucion_param: 4,
      nombre_tipo_institucion: 'Federal',
      nombre_institucion: 'Tecnológico de Estudios Superiores de Ixtapaluca',
      total_registros: 75,
    },
  ];

  protected readonly gender = [
    {
      label: "Hombre",
      serie: 47
    },
    {
      label: "Mujer",
      serie: 55
    },
  ]

  protected readonly anios = [
    { category: "Enero", series1: 120, series2: 80 },
    { category: "Febrero", series1: 90, series2: 110 },
    { category: "Marzo", series1: 60, series2: 95 },
    { category: "Abril", series1: 120, series2: 75 },
    { category: "Mayo", series1: 90, series2: 130 },
    { category: "Junio", series1: 60, series2: 85 },
    { category: "Julio", series1: 120, series2: 100 },
    { category: "Agosto", series1: 90, series2: 115 },
    { category: "Septiembre", series1: 60, series2: 70 },
    { category: "Octubre", series1: 120, series2: 140 },
    { category: "Noviembre", series1: 90, series2: 95 },
    { category: "Diciembre", series1: 60, series2: 105 },
  ];

  protected readonly status = [
    {
      label: "En revisión",
      serie: 47
    },
    {
      label: "Concedida",
      serie: 55
    },
    {
      label: "Rechazada",
      serie: 13
    },
    {
      label: "En mantenimiento",
      serie: 43
    }
  ]

}
