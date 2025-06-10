import {AfterViewInit, ChangeDetectorRef, Component, EventEmitter, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {DataTablesResponse} from '../../shared-services';
import {Config} from 'datatables.net';
import {IndustrialDesignsService} from '../industrial-design.service';
import {SwalComponent} from '@sweetalert2/ngx-sweetalert2';
import {SweetAlertOptions} from 'sweetalert2';
import moment from 'moment';

@Component({
  selector: 'app-diseno-industrial',
  templateUrl: './diseno-industrial.component.html',
  styleUrl: './diseno-industrial.component.scss'
})
export class DisenoIndustrialComponent implements OnInit, AfterViewInit, OnDestroy {
  isCollapsed1 = false;
  isCollapsed2 = true;

  isLoading = false;

  applicants: DataTablesResponse;

  datatableConfig: Config = {};

  reloadEvent: EventEmitter<boolean> = new EventEmitter();

  @ViewChild('noticeSwal')
  noticeSwal!: SwalComponent;

  swalOptions: SweetAlertOptions = {};

  constructor(
    private service: IndustrialDesignsService,
    private cdr: ChangeDetectorRef
  ) {
  }

  ngAfterViewInit(): void {
  }

  ngOnInit(): void {
    this.datatableConfig = {
      serverSide: true,
      /* ajax: (dataTablesParameters: any, callback) => {
        this.applicantService.getApplicants(dataTablesParameters).subscribe(resp => {
          callback(resp);
        });
      },*/
      ajax: (dataTablesParameters: any, callback) => {
        this.service.getIndustrialDesigns(dataTablesParameters).subscribe(resp => {
          callback(resp);
        });
      },
      columns: [
        {
          title: 'Nombre del solicitante', data: 'solicitante_nombre', render: function (data, type, full) {
            const colorClasses = ['success', 'info', 'warning', 'danger'];
            const randomColorClass = colorClasses[Math.floor(Math.random() * colorClasses.length)];

            const initials = (data[0] + (full.solicitante_apellidos ? full.solicitante_apellidos[0] : '')).toUpperCase();
            const symbolLabel = `
              <div class="symbol-label fs-3 bg-light-${randomColorClass} text-${randomColorClass}">
                ${initials}
              </div>
            `;

            const nameAndEmail = `
              <div class="d-flex flex-column" data-action="view" data-id="${full.id}">
                <a href="javascript:;" class="text-gray-800 text-hover-primary mb-1">${data} ${full.solicitante_apellidos}</a>
                <span>${full.solicitante_email}</span>
              </div>
            `;

            return `
              <div class="symbol symbol-circle symbol-50px overflow-hidden me-3" data-action="view" data-id="${full.id}">
                <a href="javascript:;">
                  ${symbolLabel}
                </a>
              </div>
              ${nameAndEmail}
            `;
          }
        },
        {
          title: 'Titulo del trabajo', data: 'titulo'
        },
        {
          title: 'Institución', data: 'institucion_adscripcion'
        },
        {
          title: 'Fecha de Solicitud', data: 'fecha_presentacion', render: function (data) {
            return moment(data).format('DD MMM YYYY, hh:mm a');
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
    };
  }

  delete(id: number) {
    this.service.deleteIndustrialDesign(id).subscribe(() => {
      this.reloadEvent.emit(true);
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

  ngOnDestroy(): void {
    this.reloadEvent.unsubscribe();
  }
}
