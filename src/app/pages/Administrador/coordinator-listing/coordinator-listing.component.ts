import { AfterViewInit, ChangeDetectorRef, Component, ElementRef, EventEmitter, OnDestroy, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { CommonModule } from '@angular/common'; // ← AGREGADO
import { SwalComponent, SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import { Observable } from 'rxjs';
import { SweetAlertOptions } from 'sweetalert2';
import moment from 'moment';
import { Config } from 'datatables.net';
import {
  CoordinatorService,
  ICoordinatorModel,
  IInstitucionModel,
  DataTablesResponse,
  ENTIDADES_FEDERATIVAS,
  SEXO_OPTIONS, InstitucionService
} from '../shared-services';
import { NgbCollapse } from '@ng-bootstrap/ng-bootstrap';
import { SharedModule } from '../../../template/shared/shared.module';
import { CrudModule } from '../../../modules/crud/crud.module';
import { NgClass } from '@angular/common';
import {environment} from '../../../../environments/environment';

@Component({
  selector: 'app-coordinator-listing',
  templateUrl: './coordinator-listing.component.html',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    NgbCollapse,
    SharedModule,
    SweetAlert2Module,
    CrudModule,
    NgClass
  ],
  styleUrls: ['./coordinator-listing.component.scss']
})
export class CoordinatorListingComponent implements OnInit, AfterViewInit, OnDestroy {

  isCollapsed1 = false;
  isCollapsed2 = true;

  isLoading = false;

  coordinators: DataTablesResponse;

  datatableConfig: Config = {};

  reloadEvent: EventEmitter<boolean> = new EventEmitter();

  aCoordinator: Observable<ICoordinatorModel>;
  coordinatorModel: ICoordinatorModel = {
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
    curp: ''
  };

  @ViewChild('noticeSwal')
  noticeSwal!: SwalComponent;

  @ViewChild('oficioAsignacion')
  oficioAsignacion: ElementRef;

  swalOptions: SweetAlertOptions = {};

  entidadesFederativas: string[] = ENTIDADES_FEDERATIVAS;
  sexoOptions: string[] = SEXO_OPTIONS;

  instituciones$: Observable<IInstitucionModel[]>;
  institucionesFiltradas: IInstitucionModel[] = [];

  selectedFile: File | null = null;

  constructor(
    private coordinatorService: CoordinatorService,
    private institucionService: InstitucionService,
    private cdr: ChangeDetectorRef
  ) {
    this.entidadesFederativas = ENTIDADES_FEDERATIVAS;
    this.sexoOptions = SEXO_OPTIONS;
  }

  ngAfterViewInit(): void {
  }

  ngOnInit(): void {
    console.log('Entidades Federativas:', this.entidadesFederativas);
    console.log('Opciones de Sexo:', this.sexoOptions);

    this.datatableConfig = {
      serverSide: true,
      /*ajax: (dataTablesParameters: any, callback) => {
        this.coordinatorService.getCoordinators(dataTablesParameters).subscribe(resp => {
          callback(resp);
        });
      },*/
      ajax: (dataTablesParameters: any, callback) => {

        if (environment.production === false) {
          const mockData = this.generateMockCoordinators();
          callback({
            data: mockData,
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
          title: 'Entidad Federativa', data: 'entidad_federativa'
        },
        {
          title: 'Institución', data: 'institucion_adscripcion'
        },
        {
          title: 'Teléfono', data: 'telefono'
        },
        {
          title: 'Fecha de Registro', data: 'created_at', render: function (data) {
            return moment(data).format('DD MMM YYYY, hh:mm a');
          }
        }
      ],
      createdRow: function (row, data, dataIndex) {
        $('td:eq(0)', row).addClass('d-flex align-items-center');
      },
    };
    this.institucionService.getInstituciones().subscribe(instituciones => {
      console.log('Instituciones cargadas:', instituciones);
    });

    this.instituciones$ = this.coordinatorService.getInstituciones();
    this.instituciones$.subscribe(instituciones => {
      console.log('Instituciones cargadas:', instituciones);
    });
  }

  onEntidadChange() {
    console.log('Entidad seleccionada:', this.coordinatorModel.entidad_federativa);
    this.coordinatorModel.institucion_adscripcion = '';

    this.institucionService.getInstitucionesByEntidad(this.coordinatorModel.entidad_federativa)
      .subscribe(instituciones => {
        this.institucionesFiltradas = instituciones;
        console.log('Instituciones filtradas:', this.institucionesFiltradas);
        this.cdr.detectChanges();
      });
  }

  onFileSelected(event: any) {
    const file = event.target.files[0];
    if (file && file.type === 'application/pdf') {
      this.selectedFile = {
        name: file.name,
        size: file.size,
        type: file.type
      } as File;
      // No asignamos el archivo real al modelo
      // this.coordinatorModel.oficio_asignacion = file;
    } else if (file) {
      // Mostrar error si no es PDF
      const errorAlert: SweetAlertOptions = {
        icon: 'error',
        title: 'Error!',
        text: 'Solo se permiten archivos PDF',
      };
      this.showAlert(errorAlert);
      event.target.value = '';
    }
  }

  delete(id: number) {
    this.coordinatorService.deleteCoordinator(id).subscribe(() => {
      this.reloadEvent.emit(true);
    });
  }

  edit(id: number) {
    this.aCoordinator = this.coordinatorService.getCoordinator(id);
    this.aCoordinator.subscribe((coordinator: ICoordinatorModel) => {
      this.coordinatorModel = { ...coordinator };
      this.onEntidadChange(); // Cargar instituciones de la entidad seleccionada
    });
  }

  create() {
    this.coordinatorModel = {
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
      curp: ''
    };
    this.selectedFile = null;
    this.institucionesFiltradas = [];
    if (this.oficioAsignacion) {
      this.oficioAsignacion.nativeElement.value = '';
    }
  }

  onSubmit(event: Event, myForm: NgForm) {
    if (myForm && myForm.invalid) {
      return;
    }

    this.isLoading = true;

    const successAlert: SweetAlertOptions = {
      icon: 'success',
      title: 'Éxito!',
      text: this.coordinatorModel.id > 0 ? 'Coordinador actualizado exitosamente!' : 'Coordinador registrado exitosamente!',
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
      this.coordinatorService.updateCoordinator(this.coordinatorModel.id, this.coordinatorModel).subscribe({
        next: () => {
          this.showAlert(successAlert);
          this.reloadEvent.emit(true);
        },
        error: (error) => {
          errorAlert.text = this.extractText(error.error);
          this.showAlert(errorAlert);
          this.isLoading = false;
        },
        complete: completeFn,
      });
    };

    const createFn = () => {
      this.coordinatorService.createCoordinator(this.coordinatorModel).subscribe({
        next: () => {
          this.showAlert(successAlert);
          this.reloadEvent.emit(true);
        },
        error: (error) => {
          errorAlert.text = this.extractText(error.error);
          this.showAlert(errorAlert);
          this.isLoading = false;
        },
        complete: completeFn,
      });
    };

    if (this.coordinatorModel.id > 0) {
      updateFn();
    } else {
      createFn();
    }
  }

  extractText(obj: any): string {
    var textArray: string[] = [];

    for (var key in obj) {
      if (typeof obj[key] === 'string') {
        textArray.push(obj[key]);
      } else if (typeof obj[key] === 'object') {
        textArray = textArray.concat(this.extractText(obj[key]));
      }
    }

    var uniqueTextArray = Array.from(new Set(textArray));
    var text = uniqueTextArray.join('\n');

    return text;
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

  private generateMockCoordinators(): ICoordinatorModel[] {
    const sexos = SEXO_OPTIONS;
    const mockCoordinators: ICoordinatorModel[] = [];
    const nombres = ['Juan', 'María', 'Pedro', 'Ana', 'Luis', 'Laura'];
    const apellidos = ['García', 'López', 'Martínez', 'Hernández', 'González', 'Rodríguez'];

    // Obtener todas las instituciones del mock
    const todasLasInstituciones = this.institucionService.getMockInstituciones();

    // Agrupar instituciones por entidad federativa
    const institucionesPorEntidad: {[key: string]: IInstitucionModel[]} = {};
    todasLasInstituciones.forEach(inst => {
      if (!institucionesPorEntidad[inst.entidad_federativa]) {
        institucionesPorEntidad[inst.entidad_federativa] = [];
      }
      institucionesPorEntidad[inst.entidad_federativa].push(inst);
    });

    // Obtener lista de entidades que tienen instituciones
    const entidadesConInstituciones = Object.keys(institucionesPorEntidad);

    for (let i = 1; i <= 20; i++) {
      const nombre = nombres[Math.floor(Math.random() * nombres.length)];
      const apellido = apellidos[Math.floor(Math.random() * apellidos.length)];

      // Seleccionar una entidad aleatoria que tenga instituciones
      const entidad = entidadesConInstituciones[Math.floor(Math.random() * entidadesConInstituciones.length)];

      // Obtener instituciones para esta entidad
      const institucionesEntidad = institucionesPorEntidad[entidad];
      const institucion = institucionesEntidad[Math.floor(Math.random() * institucionesEntidad.length)];

      mockCoordinators.push({
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

    return mockCoordinators;
  }
}
