import { ChangeDetectorRef, Component, EventEmitter, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SwalComponent, SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import { Observable } from 'rxjs';
import { SweetAlertOptions } from 'sweetalert2';
import moment from 'moment';
import { Config } from 'datatables.net';
import { Router } from '@angular/router';
import {
  ApplicantService,
  IApplicantModel,
  IInstitucionModel,
  DataTablesResponse,
  ENTIDADES_FEDERATIVAS,
  SEXO_OPTIONS,
  InstitucionService
} from '../shared-services';
import { CrudModule } from '../../../modules/crud/crud.module';
import { SharedModule } from '../../../template/shared/shared.module';
import { environment } from '../../../../environments/environment';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-applicant-listing',
  templateUrl: './applicant-listing.component.html',
  standalone: true,
  imports: [
    CommonModule,
    SweetAlert2Module,
    CrudModule,
    SharedModule,
    FormsModule
  ],
  styleUrls: ['./applicant-listing.component.scss']
})
export class ApplicantListingComponent implements OnInit, OnDestroy {

  datatableConfig: Config = {};
  reloadEvent: EventEmitter<boolean> = new EventEmitter();
  lengthMenu: number[] = [5, 10, 15, 20];
  pageLength: number = 10;
  dtInstance: any; // Para almacenar la instancia de DataTables

  @ViewChild('noticeSwal')
  noticeSwal!: SwalComponent;

  swalOptions: SweetAlertOptions = {};

  constructor(
    private applicantService: ApplicantService,
    private institucionService: InstitucionService,
    private cdr: ChangeDetectorRef,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.datatableConfig = {
      serverSide: true,
      language: {
        info: "Mostrando _START_ a _END_ de _TOTAL_ registros",
      },
      lengthMenu: this.lengthMenu,
      pageLength: this.pageLength,
      ajax: (dataTablesParameters: any, callback) => {
        // Para desarrollo: usar datos mock
        if (environment.production === false) {
          const mockData = this.generateMockApplicants();
          // Aplicar paginación manualmente
          const start = dataTablesParameters.start;
          const length = dataTablesParameters.length;
          const paginatedData = mockData.slice(start, start + length);

          callback({
            data: paginatedData,
            draw: dataTablesParameters.draw,
            recordsTotal: mockData.length,
            recordsFiltered: mockData.length
          });
        } else {
          this.applicantService.getApplicants(dataTablesParameters).subscribe(resp => {
            callback(resp);
          });
        }
      },
      // Añadir este callback para guardar la instancia de la tabla
      initComplete: (settings, json) => {
        this.dtInstance = settings.oInstance.api();
      },
      columns: [
        {
          title: 'Nombre Completo', data: 'nombre', render: function (data, type, full) {
            const colorClasses = ['success', 'info', 'warning', 'danger'];
            const randomColorClass = colorClasses[Math.floor(Math.random() * colorClasses.length)];

            const initials = (data[0] + (full.apellidos ? full.apellidos[0] : '')).toUpperCase();
            const symbolLabel = `
              <div class="symbol-label fs-3 bg-light-${randomColorClass} text-${randomColorClass}">
                ${initials}
              </div>
            `;

            const nameAndEmail = `
              <div class="d-flex flex-column" data-action="view" data-id="${full.id}">
                <a href="javascript:;" class="text-gray-800 text-hover-primary mb-1">${data} ${full.apellidos}</a>
                <span>${full.email}</span>
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
          title: 'Entidad Federativa', data: 'entidad_federativa',className: 'text-center'
        },
        {
          title: 'Institución', data: 'institucion_adscripcion',className: 'text-center'
        },
        {
          title: 'Teléfono', data: 'telefono',className: 'text-center'
        },
        {
          title: 'Fecha de Registro', data: 'created_at', className: 'text-center', render: function (data) {
            return moment(data).format('DD MMM YYYY, hh:mm a');
          }
        }
      ],
      createdRow: function (row, data, dataIndex) {
        $('td:eq(0)', row).addClass('d-flex align-items-center');
      },
    };
  }

  onPageLengthChange(event: any): void {
    const newLength = parseInt(event.target.value);
    this.pageLength = newLength;

    if (this.dtInstance) {
      // Actualizar la configuración y redibujar
      this.dtInstance.page.len(newLength).draw();
    } else {
      // Si no hay instancia, forzar recarga
      this.reloadEvent.emit(true);
    }
  }

  delete(id: number) {
    this.applicantService.deleteApplicant(id).subscribe(() => {
      this.reloadEvent.emit(true);
    });
  }

  navigateToEdit(id: number) {
    this.router.navigate(['/apps/solicitantes/edit', id]);
  }

  navigateToCreate() {
    this.router.navigate(['/apps/solicitantes/registro']);
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

  private generateMockApplicants(): IApplicantModel[] {
    const sexos = SEXO_OPTIONS;
    const mockApplicants: IApplicantModel[] = [];
    const nombres = ['Juan', 'María', 'Pedro', 'Ana', 'Luis', 'Laura'];
    const apellidos = ['García', 'López', 'Martínez', 'Hernández', 'González', 'Rodríguez'];

    const todasLasInstituciones = this.institucionService.getMockInstituciones();

    const institucionesPorEntidad: {[key: string]: IInstitucionModel[]} = {};
    todasLasInstituciones.forEach((inst: IInstitucionModel) => {
      if (!institucionesPorEntidad[inst.entidad_federativa]) {
        institucionesPorEntidad[inst.entidad_federativa] = [];
      }
      institucionesPorEntidad[inst.entidad_federativa].push(inst);
    });

    const entidadesConInstituciones = Object.keys(institucionesPorEntidad);

    for (let i = 1; i <= 200; i++) {
      const nombre = nombres[Math.floor(Math.random() * nombres.length)];
      const apellido = apellidos[Math.floor(Math.random() * apellidos.length)];

      const entidad = entidadesConInstituciones[Math.floor(Math.random() * entidadesConInstituciones.length)];

      const institucionesEntidad = institucionesPorEntidad[entidad];
      const institucion = institucionesEntidad[Math.floor(Math.random() * institucionesEntidad.length)];

      mockApplicants.push({
        id: i,
        nombre: nombre,
        apellidos: apellido,
        edad: Math.floor(Math.random() * 30) + 25,
        entidad_federativa: entidad,
        institucion_adscripcion: institucion.nombre,
        sexo: sexos[Math.floor(Math.random() * sexos.length)],
        telefono: `55${Math.floor(10000000 + Math.random() * 90000000)}`,
        email: `${nombre.toLowerCase()}.${apellido.toLowerCase()}@example.com`,
        rfc: `RFC${Math.floor(100000000000 + Math.random() * 900000000000)}`,
        curp: `CURP${Math.floor(1000000000000000 + Math.random() * 9000000000000000)}`,
        created_at: new Date(Date.now() - Math.floor(Math.random() * 30) * 24 * 60 * 60 * 1000).toISOString()
      });
    }

    return mockApplicants;
  }
}
