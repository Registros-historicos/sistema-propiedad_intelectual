import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  EventEmitter,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { Config } from 'datatables.net';
import { SwalComponent } from '@sweetalert2/ngx-sweetalert2';
import { SweetAlertOptions } from 'sweetalert2';
import moment from 'moment/moment';
import { TranslateService } from '@ngx-translate/core';
import { getCSSVariableValue } from 'src/app/template/kt/_utils';
import { APPLICANTS_REQUEST_DATA } from 'src/app/api/data/applicant.data';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit, AfterViewInit, OnDestroy {
  pageLength: number = 10;
  dtInstance: any;
  lengthMenu: number[] = [5, 10, 15, 20];
  datatableConfig: Config = {};
  reloadEvent: EventEmitter<boolean> = new EventEmitter();

  @ViewChild('noticeSwal')
  noticeSwal!: SwalComponent;

  swalOptions: SweetAlertOptions = {};

  solicitudes: any[] = [];

  chartOptions: any;

  // Estadísticas
  totalSolicitudes: number = 0;
  solicitudesPendientes: number = 0;
  solicitudesEnTramite: number = 0;
  solicitudesRegistradas: number = 0;
  solicitudesConObservaciones: number = 0;
  solicitudesAprobadas: number = 0;

  constructor(
    private cdr: ChangeDetectorRef,
    private translate: TranslateService
  ) {}

  ngOnInit(): void {
    this.solicitudes = APPLICANTS_REQUEST_DATA.map((applicant) => ({
      tipo: applicant.titulo,
      titulo: applicant.descripcion,
      estado: applicant.estado,
      fecha: applicant.fechaSolicitud,
    }));

    this.datatableConfig = {
      serverSide: false,
      lengthMenu: this.lengthMenu,
      pageLength: this.pageLength,
      language: {
        info: this.translate.instant('TABLE.PAG_INFO'),
        infoFiltered: this.translate.instant('TABLE.PAG_INFO_FILTERED'),
        processing: this.translate.instant('TABLE.PROCESSING'),
        emptyTable: this.translate.instant('TABLE.EMPTY_TABLE'),
        infoEmpty: this.translate.instant('TABLE.PAG_INFO_EMPTY'),
        zeroRecords: this.translate.instant('TABLE.ZERO_RECORDS'),
      },
      data: this.solicitudes,
      columns: [
        {
          title: this.translate.instant('TABLE.TYPE_REQUEST'),
          data: 'tipo',
          render: (data) =>
            `<span class="fw-bold fs-6 text-gray-800">${data || ''}</span>`,
        },
        {
          title: this.translate.instant('TABLE.WORK_TITLE'),
          data: 'titulo',
          render: (data) =>
            `<span class="fw-semibold text-gray-600">${data || ''}</span>`,
        },
        {
          title: this.translate.instant('TABLE.STATUS_REQUEST'),
          data: 'estado',
          render: (data) =>
            `<span class="fw-semibold text-gray-600">${data || ''}</span>`,
        },
        {
          title: this.translate.instant('TABLE.DATE'),
          data: 'fecha',
          render: (data) =>
            `<span class="fw-semibold text-gray-600">${moment(data).format(
              'DD-MM-YYYY'
            )}</span>`,
        },
      ],
      createdRow: (row, data, dataIndex) => {
        const $row = $(row);
        $row.attr('data-action', 'view');
        $row.attr('data-id', dataIndex);
        $row.addClass('cursor-pointer');
      },
      initComplete: (settings, json) => {
        this.dtInstance = settings.oInstance.api();
        this.cdr.detectChanges();
      },
    };

    // Datos de ejemplo para la gráfica
    const solicitudesData = [
      { tipo: 'DA', data: [12, 18, 24, 19, 15, 21] },
      { tipo: 'PA', data: [8, 12, 15, 11, 9, 14] },
      { tipo: 'MU', data: [25, 32, 28, 35, 41, 38] },
      { tipo: 'DI', data: [6, 9, 11, 8, 12, 10] },
      { tipo: 'MA', data: [45, 52, 48, 56, 63, 59] },
    ];

    // Calcula el total de solicitudes y pendientes
    this.totalSolicitudes = solicitudesData.reduce(
      (acc, item) => acc + item.data.reduce((sum, val) => sum + val, 0),
      0
    );
    this.solicitudesPendientes = this.solicitudes.filter(
      (solicitud) => solicitud.estado === 'Pendiente'
    ).length;

    // Calcula totales por estado
    this.solicitudesEnTramite = this.solicitudes.filter(
      (solicitud) => solicitud.estado === 'En trámite'
    ).length;
    this.solicitudesRegistradas = this.solicitudes.filter(
      (solicitud) => solicitud.estado === 'Registrada'
    ).length;
    this.solicitudesConObservaciones = this.solicitudes.filter(
      (solicitud) => solicitud.estado === 'Trámite con Observaciones'
    ).length;
    this.solicitudesAprobadas = this.solicitudes.filter(
      (solicitud) => solicitud.estado === 'Aprobada'
    ).length;

    this.chartOptions = this.getChartOptions(350);
  }

  onPageLengthChange(event: any): void {
    const newLength = parseInt(event.target.value);
    this.pageLength = newLength;

    if (this.dtInstance) {
      this.dtInstance.page.len(newLength).draw();
    } else {
      this.reloadEvent.emit(true);
    }
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

  delete(event: any): void {
    this.showAlert({
      title: '¿Estás seguro?',
      text: 'Esta acción eliminará la solicitud.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar',
    });
  }

  editarSolicitud(event: any): void {
    this.showAlert({
      title: 'Editar solicitud',
      text: `Editar: ${event.titulo}`,
      icon: 'info',
      confirmButtonText: 'Aceptar',
    });
  }

  showAlert(swalOptions: SweetAlertOptions): void {
    this.swalOptions = Object.assign(
      {
        buttonsStyling: false,
        confirmButtonText: 'Ok, entendido!',
        customClass: {
          confirmButton: 'btn btn-success',
        },
      },
      swalOptions
    );
    this.cdr.detectChanges();
    this.noticeSwal.fire();
  }

  ngAfterViewInit(): void {}

  ngOnDestroy(): void {
    this.reloadEvent.unsubscribe();
  }
}
