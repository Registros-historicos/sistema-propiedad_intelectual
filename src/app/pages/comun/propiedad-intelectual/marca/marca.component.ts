import { AfterViewInit, ChangeDetectorRef, Component, EventEmitter, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { DataTablesResponse } from '../../../administrador/shared-services';
import { Config } from 'datatables.net';
import { SwalComponent } from '@sweetalert2/ngx-sweetalert2';
import { SweetAlertOptions } from 'sweetalert2';
import { TrademarksService } from '../../../../api/services/trademarks.service';
import moment from 'moment';
import { NgForm } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { Observable } from 'rxjs';
import { DatosMarca } from 'src/app/api/models/marca.model';

@Component({
  selector: 'app-marca',
  templateUrl: './marca.component.html',
  styleUrl: './marca.component.scss'
})
export class MarcaComponent implements OnInit, AfterViewInit, OnDestroy {
  isCollapsed1 = false;
  isCollapsed2 = true;

  isLoading = false;

  placeholder: string = '';
  pageLength: number = 10;
  dtInstance: any;
  lengthMenu: number[] = [5, 10, 15, 20];

  applicants: DataTablesResponse;

  datatableConfig: Config = {};

  reloadEvent: EventEmitter<boolean> = new EventEmitter();

  @ViewChild('noticeSwal')
  noticeSwal!: SwalComponent;

  swalOptions: SweetAlertOptions = {};

  aMarca: Observable<DatosMarca>
  marcaModel: DatosMarca = {
    denominacion: "",
    expediente: 0,
    registro: 0,
    fechaPresentacion: "",
    fechaConcesion: "",
    fechaTerminacion: "",
    tipoSolicitud: "",
    inicioUso: "",
    marca: "",
    productosServicios: [],
    titular: "",
    tramites: [],
    estatus: 'Registrada'
  };

  isViewMode: boolean = true;

  constructor(
    private service: TrademarksService,
    private cdr: ChangeDetectorRef,
    private translate: TranslateService
  ) {
  }

  ngAfterViewInit(): void {
  }

  onEntidadChange() { }

  ngOnInit(): void {
    this.placeholder = this.translate.instant('TABLE.PLACEHOLDER_SEARCH')

    this.datatableConfig = {
      serverSide: true,
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
      /* ajax: (dataTablesParameters: any, callback) => {
        this.applicantService.getApplicants(dataTablesParameters).subscribe(resp => {
          callback(resp);
        });
      },*/
      ajax: (dataTablesParameters: any, callback) => {
        this.service.getTrademarks(dataTablesParameters).subscribe({
          next: (resp) => {
            callback(resp);
          },
          error: (error) => {
            console.error('Error loading data:', error);
            callback({
              draw: dataTablesParameters.draw,
              recordsTotal: 0,
              recordsFiltered: 0,
              data: []
            });
          }
        });
      },
      columns: [
        {
          title: this.translate.instant('TABLE.MARK.NAME'),
          data: 'denominacion',
          render: function (data, type, full) {
            const initials = (data[0] + (full.titular.nombre ? full.titular.nombre[0] : '')).toUpperCase();
            const colorClasses = ['success', 'info', 'warning', 'danger'];
            const randomColorClass = colorClasses[Math.floor(Math.random() * colorClasses.length)];

            const symbolLabel = `
              <div class="symbol-label fs-3 bg-light-${randomColorClass} text-${randomColorClass}">
                ${initials}
              </div>`;

            const nameAndHolder = `
              <div class="d-flex flex-column" data-action="view" data-id="${full.registro}">
                <a href="javascript:;" class="text-gray-800 text-hover-primary mb-1">${data}</a>
              </div>`;

            return `
              <div class="symbol symbol-circle symbol-50px overflow-hidden me-3" data-action="view" data-id="${full.registro}">
                <a href="javascript:;">
                  ${symbolLabel}
                </a>
              </div>
              ${nameAndHolder}
            `;
          }
        },
        {
          title: this.translate.instant('TABLE.MARK.IMAGE'),
          data: 'marca',
          render: function (url: string, type, full) {
            return `
              <div class="text-center">
                <img src="${url}"
                    alt="${full.denominacion}"
                    style="width: 50px; height: 50px; object-fit: contain;"
                    onerror="this.onerror=null;this.src='https://via.placeholder.com/50?text=No+Image';" />
              </div>
            `;
          }
        },
        {
          title: this.translate.instant('TABLE.MARK.APPLICATION_TYPE'),
          data: 'tipoSolicitud'
        },
        {
          title: this.translate.instant('TABLE.MARK.APPLICANT'),
          data: 'titular',
        },
        {
          title: this.translate.instant('TABLE.MARK.DATE'),
          data: 'fechaPresentacion',
          render: function (data: string) {
            return `<span class="fw-semibold text-gray-600">${moment(data, 'DD/MM/YYYY').format('DD-MM-YYYY')}</span>`;
          }
        }
      ],
      createdRow: function (row, data, dataIndex) {
        const $row = $(row);
        $row.attr('data-action', 'view');
        $row.addClass('cursor-pointer');
        $('td:eq(0)', row).addClass('d-flex align-items-center');
        $('td:eq(1)', row).addClass('fw-bold fs-6 text-gray-800 mb-1');
        $('td:eq(2)', row).addClass('fw-semibold text-gray-600');
        $('td:eq(3)', row).addClass('fw-semibold text-gray-600');
      },
      initComplete: (settings, json) => {
        this.dtInstance = settings.oInstance.api()
        this.cdr.detectChanges();
      }
    };
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

  delete(id: number) {
    this.service.deleteTrademark(id).subscribe(() => {
      this.reloadEvent.emit(true);
    });
  }

  view(id: number) {
    this.isViewMode = true;
    this.cdr.detectChanges();

    this.service.getTrademark(id).subscribe((marca: DatosMarca) => {
      this.marcaModel = { ...marca };
    });
  }

  follow(id: number) {
    this.isViewMode = false;
    this.cdr.detectChanges();

    this.service.getTrademark(id).subscribe((marca: DatosMarca) => {
      this.marcaModel = { ...marca };
    });
  }

  edit(id: number) {
    this.showAlert(
      {
        icon: 'info',
        title: 'Editar Solicitud con ID: ' + id,
        text: 'Función en desarrollo'
      }
    );
  }

  create() {
    this.showAlert(
      {
        icon: 'info',
        title: 'Nueva Solicitud',
        text: 'Función en desarrollo'
      }
    );
  }

  showAlert(swalOptions: SweetAlertOptions) {
    let style = swalOptions.icon?.toString() || 'success';
    if (swalOptions.icon === 'error') {
      style = 'danger';
    }
    this.swalOptions = Object.assign({
      buttonsStyling: false,
      confirmButtonText: "Ok, entendido!",
      customClass: {
        confirmButton: "btn btn-" + style
      }
    }, swalOptions);
    this.cdr.detectChanges();
    this.noticeSwal.fire();
  }

  closeForm(modal: any) {
    modal.dismiss('cancel');

    this.marcaModel = {
      denominacion: "",
      expediente: 0,
      registro: 0,
      fechaPresentacion: "",
      fechaConcesion: "",
      fechaTerminacion: "",
      tipoSolicitud: "",
      inicioUso: "",
      marca: "",
      productosServicios: [],
      titular: "",
      tramites: [],
      estatus: 'Registrada'
    };
  }

  getStatusOrder(status: string): number {
    const statusOrder: { [key: string]: number } = {
      'Registrada': 1,
      'En trámite': 2,
      'Trámite con observaciones': 2.5,
      'Aprobada': 4,
      'Concluida': 5
    };

    return statusOrder[status] || 0;
  }

  getStatusProgress(status: string): number {
    const order = this.getStatusOrder(status);
    const maxOrder = 5;
    return Math.round((order / maxOrder) * 100);
  }

  getStatusDescription(status: string): string {
    const translationKeys: { [key: string]: string } = {
      'Registrada': 'MODAL.FOLLOW_UP.DESCRIPTIONS.REGISTERED',
      'En trámite': 'MODAL.FOLLOW_UP.DESCRIPTIONS.IN_PROCESS',
      'Trámite con observaciones': 'MODAL.FOLLOW_UP.DESCRIPTIONS.WITH_OBSERVATIONS',
      'Aprobada': 'MODAL.FOLLOW_UP.DESCRIPTIONS.APPROVED',
      'Concluida': 'MODAL.FOLLOW_UP.DESCRIPTIONS.COMPLETED'
    };

    const translationKey = translationKeys[status];
    if (translationKey) {
      return this.translate.instant(translationKey);
    }

    return 'Estado no reconocido.';
  }

  getStatusIcon(status: string): string {
    const statusIcons: { [key: string]: string } = {
      'Registrada': 'document',
      'En trámite': 'timer',
      'Trámite con observaciones': 'information',
      'Aprobada': 'check',
      'Concluida': 'check-circle'
    };

    return statusIcons[status] || 'document';
  }

  ngOnDestroy(): void {
    this.reloadEvent.unsubscribe();
  }

  onSubmit(event: Event, myForm: NgForm) {
    if (myForm && myForm.invalid) {
      return;
    }

    this.isLoading = true;

    const successAlert: SweetAlertOptions = {
      icon: 'success',
      title: 'Éxito!',
      text: 'Coordinador actualizado exitosamente!',
    };
    const errorAlert: SweetAlertOptions = {
      icon: 'error',
      title: 'Error!',
      text: '',
    };

    const completeFn = () => {
      this.isLoading = false;
    };

    const updateFn = () => {

    };

    const createFn = () => {

    };

    updateFn();

  }
}
