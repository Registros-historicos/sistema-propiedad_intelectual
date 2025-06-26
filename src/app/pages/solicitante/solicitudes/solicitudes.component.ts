import {
  ChangeDetectorRef,
  Component,
  EventEmitter,
  OnDestroy,
  OnInit,
  TemplateRef,
  ViewChild,
} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { TranslateService } from '@ngx-translate/core';
import { SwalComponent } from '@sweetalert2/ngx-sweetalert2';
import { Config } from 'datatables.net';
import moment from 'moment';
import { Observable, Subscription } from 'rxjs';
import { APPLICANTS_REQUEST_DATA } from 'src/app/api/data/applicant.data';
import { IAplicantModel } from 'src/app/api/models/applicant.model';
import { ApplicantsService } from 'src/app/api/services/applicant.service';
import { AuthService, UserType } from 'src/app/modules/auth';
import { SweetAlertOptions } from 'sweetalert2';
import { DerechosAutorComponent } from '../registrar/derechos-autor/derechos-autor.component';

@Component({
  selector: 'app-solicitudes',
  templateUrl: './solicitudes.component.html',
  styleUrls: ['./solicitudes.component.scss'],
})
export class SolicitudesComponent implements OnInit, OnDestroy {
  user$: Observable<UserType>;
  currentDate = new Date();
  itemClass: string = 'ms-1 ms-lg-3';

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
    private service: ApplicantsService,
    private auth: AuthService
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

    this.user$ = this.auth.currentUserSubject.asObservable();
    this.updateCurrentDate();
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

  onPageLengthChange(event: any): void {
    const newLength = parseInt(event.target.value);
    this.pageLength = newLength;

    if (this.dtInstance) {
      this.dtInstance.page.len(newLength).draw();
    } else {
      this.reloadEvent.emit(true);
    }
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

  ngOnDestroy(): void {
    if (this.applicantSubscription) {
      this.applicantSubscription.unsubscribe();
    }
    this.reloadEvent.unsubscribe();
  }

  private updateCurrentDate(): void {
    this.currentDate = new Date();

    const now = new Date();
    const tomorrow = new Date(now);
    tomorrow.setDate(now.getDate() + 1);
    tomorrow.setHours(0, 0, 1, 0);

    const msUntilMidnight = tomorrow.getTime() - now.getTime();

    setTimeout(() => {
      this.updateCurrentDate();
    }, msUntilMidnight);
  }
}
