import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  EventEmitter,
  OnDestroy,
  OnInit,
  ViewChild,
  TemplateRef,
} from '@angular/core';
import { Config } from 'datatables.net';
import { SwalComponent } from '@sweetalert2/ngx-sweetalert2';
import { SweetAlertOptions } from 'sweetalert2';
import moment from 'moment/moment';
import { TranslateService } from '@ngx-translate/core';
import { getCSSVariableValue } from 'src/app/template/kt/_utils';
import { APPLICANTS_REQUEST_DATA } from 'src/app/api/data/applicant.data';
import { DerechosAutorComponent } from '../registrar/derechos-autor/derechos-autor.component';
import { MatDialog } from '@angular/material/dialog'; // Usado para abrir el modal
import { ApplicantsService } from 'src/app/api/services/applicant.service';
import { IAplicantModel } from 'src/app/api/models/applicant.model';
import { Subscription } from 'rxjs'; // Importado para manejar las suscripciones

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
  @ViewChild('formModal') formModalRef!: TemplateRef<any>;

  swalOptions: SweetAlertOptions = {};

  solicitudes: any[] = [];

  chartOptions: any;

  totalSolicitudes: number = 0;
  solicitudesPendientes: number = 0;
  solicitudesEnTramite: number = 0;
  solicitudesRegistradas: number = 0;
  solicitudesConObservaciones: number = 0;
  solicitudesAprobadas: number = 0;

  solicitudSeleccionada: IAplicantModel | undefined;

  isCollapsed1 = false;
  isCollapsed2 = true;
  estadoSeleccionado: number | null = null;
  institucionSeleccionada: number | null = null;
  selectedFile: File | null = null;
  isViewMode: boolean = false;

  private applicantSubscription: Subscription | undefined;

  constructor(
    private cdr: ChangeDetectorRef,
    private translate: TranslateService,
    private dialog: MatDialog,
    private service: ApplicantsService
  ) {}

  ngOnInit(): void {
    this.solicitudes = APPLICANTS_REQUEST_DATA.map(
      (applicant: IAplicantModel) => ({
        id: applicant.id,
        tipo: applicant.titulo,
        titulo: applicant.descripcion,
        estado: applicant.estado,
        fecha: applicant.fechaSolicitud,
      })
    );

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
      createdRow: (row, data: any, dataIndex) => {
        const $row = $(row);
        $row.attr('data-action', 'view');
        $row.attr('data-id', data.id);
        $row.addClass('cursor-pointer');
      },
      initComplete: (settings, json) => {
        this.dtInstance = settings.oInstance.api();
        this.cdr.detectChanges();
        $(this.dtInstance.table().body()).on('click', 'tr', (event: any) => {
          const rowData = this.dtInstance.row(event.currentTarget).data();
          if (rowData && rowData.id) {
            this.view(rowData.id);
          }
        });
      },
    };

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

  editarSolicitud(id: number): void {
    const solicitud = this.solicitudes.find((sol) => sol.id === id);

    if (solicitud) {
      this.solicitudSeleccionada = solicitud;

      this.dialog.open(DerechosAutorComponent, {
        width: '800px',
        data: { solicitud: this.solicitudSeleccionada },
      });
    } else {
      console.error('Solicitud no encontrada');
    }
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

  view(id: number) {
    if (this.applicantSubscription) {
      this.applicantSubscription.unsubscribe();
    }

    this.applicantSubscription = this.service.getApplicant(id).subscribe(
      (applicantData: IAplicantModel) => {
        this.solicitudSeleccionada = { ...applicantData };
        this.isViewMode = true;
      },
      (error) => {
        console.error('Error al cargar la solicitud:', error);
        this.solicitudSeleccionada = undefined;
      }
    );
  }

  ngAfterViewInit(): void {}

  ngOnDestroy(): void {
    if (this.applicantSubscription) {
      this.applicantSubscription.unsubscribe();
    }
    this.reloadEvent.unsubscribe();
  }
}
