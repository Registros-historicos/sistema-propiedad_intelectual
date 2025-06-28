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

@Component({
  selector: 'app-solicitudes',
  templateUrl: './solicitudes.component.html',
  styleUrls: ['./solicitudes.component.scss'],
})
export class SolicitudesComponent implements OnInit, OnDestroy {
  user$: Observable<UserType>;
  aplicantModel: IAplicantModel = {
    id: 0,
    titulo: '',
    solicitante: '',
    autor: '',
    fechaSolicitud: '',
    estado: 'En trámite',
    descripcion: '',
    institucion: '',
    correo: '',
    documentos: [''],
  };
  currentDate = new Date();
  pageLength: number = 10;
  lengthMenu: number[] = [5, 10, 15, 20];
  datatableConfig: Config = {};
  reloadEvent: EventEmitter<boolean> = new EventEmitter();

  @ViewChild('noticeSwal') noticeSwal!: SwalComponent;
  @ViewChild('formModal') formModalRef!: TemplateRef<any>;

  swalOptions: SweetAlertOptions = {};
  solicitudes: any[] = [];
  solicitudSeleccionada: IAplicantModel | undefined;
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
      createdRow: (row, data: any) => {
        const $row = $(row);
        $row.attr('data-action', 'view');
        $row.attr('data-id', data.id);
        $row.addClass('cursor-pointer');
      },
      initComplete: (settings) => {
        this.cdr.detectChanges();
        $(settings.oInstance.api().table().body()).on(
          'click',
          'tr',
          (event: any) => {
            const rowData = settings.oInstance
              .api()
              .row(event.currentTarget)
              .data();
            if (rowData && rowData.id) {
              this.view(rowData.id);
            }
          }
        );
      },
    };

    this.user$ = this.auth.currentUserSubject.asObservable();
    this.updateCurrentDate();
  }

  view(id: number): void {
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
    this.reloadEvent.emit(true);
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

    follow(id: number): void {
    this.isViewMode = false; // Cambiar al modo de seguimiento
    this.cdr.detectChanges();
  
    this.service.getApplicant(id).subscribe((applicant: IAplicantModel) => {
      this.solicitudSeleccionada = { ...applicant };
    });
  }
  
  getStatusProgress(status: IAplicantModel['estado']): number {
    const statusOrder = this.getStatusOrder(status);
    const maxOrder = 5; // Número máximo de estados
    return Math.round((statusOrder / maxOrder) * 100);
  }
  
  getStatusOrder(status: IAplicantModel['estado']): number {
    const statusOrder: { [key in IAplicantModel['estado']]: number } = {
      Registrada: 1,
      'En trámite': 2,
      'Trámite con observaciones': 2.5,
      Aprobada: 4,
      Concluida: 5,
    };
    return statusOrder[status] || 0;
  }
  
  getStatusDescription(status: IAplicantModel['estado']): string {
    const descriptions: { [key in IAplicantModel['estado']]: string } = {
      Registrada: 'La solicitud ha sido registrada.',
      'En trámite': 'La solicitud está en proceso de revisión.',
      'Trámite con observaciones': 'Se requiere atención para continuar con el trámite.',
      Aprobada: 'La solicitud ha sido aprobada.',
      Concluida: 'El trámite de la solicitud ha concluido.',
    };
    return descriptions[status] || 'Estado desconocido.';
  }
  
  getStatusIcon(status: IAplicantModel['estado']): string {
    const icons: { [key in IAplicantModel['estado']]: string } = {
      Registrada: 'document',
      'En trámite': 'timer',
      'Trámite con observaciones': 'information',
      Aprobada: 'check',
      Concluida: 'check-circle',
    };
    return icons[status] || 'document';
  }
}
