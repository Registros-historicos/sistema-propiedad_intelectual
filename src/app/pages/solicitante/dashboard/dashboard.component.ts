import { Component, OnInit } from '@angular/core';
import { getCSSVariableValue } from 'src/app/template/kt/_utils';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  tiposSolicitudes = [
    { nombre: 'Patentes', total: 90, icono: 'emoji_objects' },
    { nombre: 'Marcas', total: 80, icono: 'credit_card' },
    { nombre: 'Modelos de Utilidad', total: 70, icono: 'build' },
    { nombre: 'Derechos de Autor', total: 60, icono: 'copyright' },
    { nombre: 'Diseños Industriales', total: 50, icono: 'architecture' },
  ];

  solicitudes: any[] = [];

  chartOptions: any;

  totalSolicitudes: number = 0;
  solicitudesPendientes: number = 0;
  solicitudesEnTramite: number = 0;
  solicitudesRegistradas: number = 0;
  solicitudesConObservaciones: number = 0;
  solicitudesAprobadas: number = 0;

  ngOnInit(): void {
    const solicitudesData = [
      { tipo: 'DA', estado: 'Pendiente', data: [8, 12, 10, 10, 8, 12] },
      { tipo: 'PA', estado: 'En trámite', data: [4, 6, 8, 6, 4, 6] },
      { tipo: 'MU', estado: 'Registrada', data: [12, 14, 10, 12, 14, 12] },
      {
        tipo: 'DI',
        estado: 'Trámite con Observaciones',
        data: [4, 6, 4, 4, 6, 4],
      },
      { tipo: 'MA', estado: 'Aprobada', data: [16, 20, 16, 20, 16, 20] },
    ];

    const totalDataPoints = 150;
    const scaleFactor =
      totalDataPoints /
      solicitudesData.reduce(
        (acc, item) => acc + item.data.reduce((sum, val) => sum + val, 0),
        0
      );

    solicitudesData.forEach((item) => {
      item.data = item.data.map((val) => Math.round(val * scaleFactor));
    });

    this.totalSolicitudes = solicitudesData.reduce(
      (acc, item) => acc + item.data.reduce((sum, val) => sum + val, 0),
      0
    );

    this.solicitudesPendientes = solicitudesData
      .filter((item) => item.estado === 'Pendiente')
      .reduce(
        (acc, item) => acc + item.data.reduce((sum, val) => sum + val, 0),
        0
      );

    this.solicitudesEnTramite = solicitudesData
      .filter((item) => item.estado === 'En trámite')
      .reduce(
        (acc, item) => acc + item.data.reduce((sum, val) => sum + val, 0),
        0
      );

    this.solicitudesRegistradas = solicitudesData
      .filter((item) => item.estado === 'Registrada')
      .reduce(
        (acc, item) => acc + item.data.reduce((sum, val) => sum + val, 0),
        0
      );

    this.solicitudesConObservaciones = solicitudesData
      .filter((item) => item.estado === 'Trámite con Observaciones')
      .reduce(
        (acc, item) => acc + item.data.reduce((sum, val) => sum + val, 0),
        0
      );

    this.solicitudesAprobadas = solicitudesData
      .filter((item) => item.estado === 'Aprobada')
      .reduce(
        (acc, item) => acc + item.data.reduce((sum, val) => sum + val, 0),
        0
      );

    this.chartOptions = this.getChartOptions(350);
  }

  getChartOptions(height: number) {
    const labelColor = getCSSVariableValue('--bs-gray-500');
    const borderColor = getCSSVariableValue('--bs-gray-200');
    const seriesColors = [
      getCSSVariableValue('--bs-primary'),
      getCSSVariableValue('--bs-success'),
      getCSSVariableValue('--bs-warning'),
      getCSSVariableValue('--bs-danger'),
      getCSSVariableValue('--bs-info'),
    ];

    return {
      series: [
        { name: 'DA', data: [12, 18, 24, 19, 15, 21] },
        { name: 'PA', data: [8, 12, 15, 11, 9, 14] },
        { name: 'MU', data: [25, 32, 28, 35, 41, 38] },
        { name: 'DI', data: [6, 9, 11, 8, 12, 10] },
        { name: 'MA', data: [45, 52, 48, 56, 63, 59] },
      ],
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
        categories: ['Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul'],
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
          text: 'Total de solicitudes',
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
            return val + ' solicitudes';
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
}
