import { ChangeDetectorRef, Component, EventEmitter, OnDestroy, OnInit, ViewChild, TemplateRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SwalComponent, SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import { Observable } from 'rxjs';
import { SweetAlertOptions } from 'sweetalert2';
import moment from 'moment';
import { Config } from 'datatables.net';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { TranslateService } from '@ngx-translate/core';
import {
  CoordinatorService,
  ICoordinatorModel,
  DataTablesResponse,
  ENTIDADES_FEDERATIVAS,
  SEXO_OPTIONS,
  InstitucionService,
  IInstitucionModel
} from '../shared-services';
import { SharedModule } from '../../../template/shared/shared.module';
import { CrudModule } from '../../../modules/crud/crud.module';
import { NgClass } from '@angular/common';
import { environment } from '../../../../environments/environment';
import {FormsModule} from '@angular/forms';

@Component({
  selector: 'app-coordinator-listing',
  templateUrl: './coordinator-listing.component.html',
  standalone: true,
  imports: [
    CommonModule,
    SharedModule,
    SweetAlert2Module,
    CrudModule,
    FormsModule
  ],
  styleUrls: ['./coordinator-listing.component.scss']
})
export class CoordinatorListingComponent implements OnInit, OnDestroy {

  datatableConfig: Config = {};
  reloadEvent: EventEmitter<boolean> = new EventEmitter();
  lengthMenu: number[] = [5, 10, 15, 20];
  pageLength: number = 10;
  dtInstance: any;
  selectedCoordinator: ICoordinatorModel | null = null;
  entidadesFederativas = ENTIDADES_FEDERATIVAS;
  sexoOptions = SEXO_OPTIONS;
  placeholder: string = '';

  private cachedMockCoordinators: ICoordinatorModel[] | null = null;

  @ViewChild('noticeSwal')
  noticeSwal!: SwalComponent;

  swalOptions: SweetAlertOptions = {};

  constructor(
    private coordinatorService: CoordinatorService,
    private institucionService: InstitucionService,
    private cdr: ChangeDetectorRef,
    private router: Router,
    private modalService: NgbModal,
    private translate: TranslateService
  ) {}

  ngOnInit(): void {
    this.placeholder = this.translate.instant('TABLE.PLACEHOLDER_SEARCH');

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
      ajax: (dataTablesParameters: any, callback) => {
        if (environment.production === false) {
          const mockData = this.getMockCoordinators();
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
          this.coordinatorService.getCoordinators(dataTablesParameters).subscribe(resp => {
            callback(resp);
          });
        }
      },
      initComplete: (settings, json) => {
        this.dtInstance = settings.oInstance.api();
        this.cdr.detectChanges();
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
      this.dtInstance.page.len(newLength).draw();
    } else {
      this.reloadEvent.emit(true);
    }
  }

  delete(id: number) {
    this.coordinatorService.deleteCoordinator(id).subscribe(() => {
      this.reloadEvent.emit(true);
    });
  }

  async navigateToEdit(id: number, modalTemplate: TemplateRef<any>) {
    try {
      if (environment.production) {
        this.coordinatorService.getCoordinator(id).subscribe({
          next: (coordinator) => {
            this.selectedCoordinator = { ...coordinator };
            this.modalService.open(modalTemplate, { size: 'lg' });
          },
          error: (err) => {
            this.showAlert({
              title: 'Error',
              text: 'No se pudo cargar la información del coordinador',
              icon: 'error'
            });
          }
        });
      } else {
        const allCoordinators = this.getMockCoordinators();
        const numericId = Number(id);
        const stringId = String(id);

        const foundWithOriginal = allCoordinators.find(c => c.id === id);
        const foundWithNumber = allCoordinators.find(c => c.id === numericId);
        const foundWithString = allCoordinators.find(c => String(c.id) === stringId);
        const foundWithDoubleEqual = allCoordinators.find(c => c.id == id);

        const foundCoordinator = foundWithOriginal || foundWithNumber || foundWithDoubleEqual || foundWithString;

        if (foundCoordinator) {
          this.selectedCoordinator = { ...foundCoordinator };
          this.cdr.detectChanges();
          const modalRef = this.modalService.open(modalTemplate, { size: 'lg' });
        } else {
          this.showAlert({
            title: 'No encontrado',
            text: `El coordinador con ID ${id} no existe`,
            icon: 'warning'
          });
        }
      }
    } catch (error) {
      this.showAlert({
        title: 'Error',
        text: 'Ocurrió un error inesperado al cargar el coordinador',
        icon: 'error'
      });
    }
  }

  navigateToCreate() {
    this.router.navigate(['/administrador/coordinador/registro']);
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

  private getMockCoordinators(): ICoordinatorModel[] {
    if (this.cachedMockCoordinators === null) {
      this.cachedMockCoordinators = this.generateMockCoordinators();
    }
    return this.cachedMockCoordinators;
  }

  public clearMockCache(): void {
    this.cachedMockCoordinators = null;
  }

  private generateMockCoordinators(): ICoordinatorModel[] {
    const sexos = SEXO_OPTIONS;
    const mockCoordinators: ICoordinatorModel[] = [];
    const nombres = ['Juan', 'María', 'Pedro', 'Ana', 'Luis', 'Laura', 'Carlos', 'Sofia', 'Miguel', 'Carmen'];
    const apellidos = ['García', 'López', 'Martínez', 'Hernández', 'González', 'Rodríguez', 'Pérez', 'Sánchez', 'Ramírez', 'Torres'];

    const todasLasInstituciones = this.institucionService.getMockInstituciones();

    const institucionesPorEntidad: {[key: string]: IInstitucionModel[]} = {};
    todasLasInstituciones.forEach((inst: IInstitucionModel) => {
      if (!institucionesPorEntidad[inst.entidad_federativa]) {
        institucionesPorEntidad[inst.entidad_federativa] = [];
      }
      institucionesPorEntidad[inst.entidad_federativa].push(inst);
    });

    const entidadesConInstituciones = Object.keys(institucionesPorEntidad);

    const createdCoordinators = this.coordinatorService.getCreatedCoordinators();

    createdCoordinators.forEach(coord => {
      const coordinatorWithNumericId = {
        ...coord,
        id: Number(coord.id)
      };
      mockCoordinators.push(coordinatorWithNumericId);
    });

    let seedCounter = 12345;
    const seededRandom = () => {
      seedCounter = (seedCounter * 9301 + 49297) % 233280;
      return seedCounter / 233280;
    };

    for (let i = 1; i <= 50; i++) {
      const nombre = nombres[Math.floor(seededRandom() * nombres.length)];
      const apellido = apellidos[Math.floor(seededRandom() * apellidos.length)];

      const entidad = entidadesConInstituciones[Math.floor(seededRandom() * entidadesConInstituciones.length)];

      const institucionesEntidad = institucionesPorEntidad[entidad];
      const institucion = institucionesEntidad[Math.floor(seededRandom() * institucionesEntidad.length)];

      const mockId = Number(1000 + i);

      const newCoordinator: ICoordinatorModel = {
        id: mockId,
        nombre: nombre,
        apellidos: apellido,
        edad: Math.floor(seededRandom() * 30) + 25,
        entidad_federativa: entidad,
        institucion_adscripcion: institucion.nombre,
        sexo: sexos[Math.floor(seededRandom() * sexos.length)],
        telefono: `55${Math.floor(10000000 + seededRandom() * 90000000)}`,
        email: `${nombre.toLowerCase()}.${apellido.toLowerCase()}@example.com`,
        rfc: `RFC${Math.floor(100000000000 + seededRandom() * 900000000000)}`,
        curp: `CURP${Math.floor(1000000000000000 + seededRandom() * 9000000000000000)}`,
        created_at: new Date(Date.now() - Math.floor(seededRandom() * 30) * 24 * 60 * 60 * 1000).toISOString()
      };

      mockCoordinators.push(newCoordinator);
    }

    return mockCoordinators;
  }
}
