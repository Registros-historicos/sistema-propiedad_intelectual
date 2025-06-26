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
import { FormsModule } from '@angular/forms';
import { TranslationModule } from 'src/app/modules/i18n';

@Component({
  selector: 'app-coordinator-listing',
  templateUrl: './coordinator-listing.component.html',
  standalone: true,
  imports: [
    CommonModule,
    SharedModule,
    SweetAlert2Module,
    CrudModule,
    FormsModule,
    TranslationModule
  ],
  styleUrls: ['./coordinator-listing.component.scss']
})
export class CoordinatorListingComponent implements OnInit, OnDestroy {

  datatableConfig: Config = {};
  reloadEvent: EventEmitter<boolean> = new EventEmitter();
  lengthMenu: number[] = [5, 10, 15, 20];
  pageLength: number = 10;
  dtInstance: any;
  placeholder: string = '';
  selectedCoordinator: ICoordinatorModel | null = null;
  coordinadorModel: ICoordinatorModel = {
    id: 0,
    nombre: '',
    apellidos: '',
    edad: 0,
    entidad_federativa: '',
    institucion_adscripcion: '',
    sexo: '',
    telefono: '',
    email: '',
    rfc: '',
    curp: '',
    created_at: ''
  };
  entidadesFederativas = ENTIDADES_FEDERATIVAS;
  sexoOptions = SEXO_OPTIONS;
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
  ) { }

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
          const searchValue = dataTablesParameters.search?.value || '';

          const orderColumn = dataTablesParameters.order?.[0]?.column || 0;
          const orderDir = dataTablesParameters.order?.[0]?.dir || 'asc';
          const columnName = dataTablesParameters.columns?.[orderColumn]?.data || 'id';

          let filteredCoordinators = mockData;

          if (searchValue) {
            filteredCoordinators = mockData.filter(coordinator => {
              return coordinator.nombre.toLowerCase().includes(searchValue.toLowerCase()) ||
                coordinator.entidad_federativa.toLowerCase().includes(searchValue.toLowerCase()) ||
                coordinator.institucion_adscripcion.toLowerCase().includes(searchValue.toLowerCase()) ||
                coordinator.telefono.toLowerCase().includes(searchValue.toLowerCase())
            });
          }

          const getCoordinatorValue = (coordinator: ICoordinatorModel, column: string): string | number => {
            switch (column) {
              case 'nombre':
                return coordinator.nombre || '';
              case 'entidad_federativa':
                return coordinator.entidad_federativa || '';
              case 'institucion_adscripcion':
                return coordinator.institucion_adscripcion || '';
              case 'created_at':
                return coordinator.created_at || '';
              default:
                return coordinator.id;
            }
          };

          filteredCoordinators.sort((a, b) => {
            const valueA = getCoordinatorValue(a, columnName);
            const valueB = getCoordinatorValue(b, columnName);

            if (orderDir === 'asc') {
              return valueA > valueB ? 1 : -1;
            } else {
              return valueA < valueB ? 1 : -1;
            }
          });

          const total = filteredCoordinators.length;
          const paginatedData = filteredCoordinators.slice(start, start + length);

          callback({
            data: paginatedData,
            draw: dataTablesParameters.draw,
            recordsTotal: mockData.length,
            recordsFiltered: total
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
          title: this.translate.instant('TABLE.FULL_NAME'), data: 'nombre', render: function (data, type, full) {
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
          title: this.translate.instant('TABLE.FEDERAL_ENTITY'), data: 'entidad_federativa', className: 'text-center'
        },
        {
          title: this.translate.instant('TABLE.INSTITUTION'), data: 'institucion_adscripcion', className: 'text-center'
        },
        {
          title: this.translate.instant('TABLE.PHONE'), data: 'telefono', className: 'text-center', orderable: false
        },
        {
          title: this.translate.instant('TABLE.REGISTERED_DATE'), data: 'created_at', className: 'text-center', render: function (data) {
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

  edit(id: number) {
    this.cdr.detectChanges();

    if (environment.production) {
      this.coordinatorService.getCoordinator(id).subscribe({
        next: (coordinator: ICoordinatorModel) => {
          this.coordinadorModel = { ...coordinator };
        },
        error: (error) => {
          console.error('Error loading coordinator:', error);
          this.showAlert({
            title: 'Error',
            text: 'No se pudo cargar la información del coordinador',
            icon: 'error'
          });
        }
      });
    } else {
      const allCoordinators = this.getMockCoordinators();
      const foundCoordinator = allCoordinators.find(c =>
        c.id === id || c.id === Number(id) || String(c.id) === String(id)
      );

      if (foundCoordinator) {
        this.coordinadorModel = { ...foundCoordinator };
      } else {
        this.showAlert({
          title: 'No encontrado',
          text: `El coordinador con ID ${id} no existe`,
          icon: 'warning'
        });
      }
    }
  }

  closeForm(modal: any) {
    modal.dismiss('cancel');

    this.coordinadorModel = {
      id: 0,
      nombre: '',
      apellidos: '',
      edad: 0,
      entidad_federativa: '',
      institucion_adscripcion: '',
      sexo: '',
      telefono: '',
      email: '',
      rfc: '',
      curp: '',
      created_at: ''
    };

    this.selectedCoordinator = null;
  }

  saveChanges(modal: any) {
    console.log('Guardando cambios para coordinador:', this.coordinadorModel);

    this.showAlert({
      title: '¡Éxito!',
      text: 'Los cambios se han guardado correctamente',
      icon: 'success'
    });
    modal.close();
  }

  async navigateToEdit(id: number, modalTemplate: TemplateRef<any>) {
    this.edit(id);
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

    const institucionesPorEntidad: { [key: string]: IInstitucionModel[] } = {};
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
