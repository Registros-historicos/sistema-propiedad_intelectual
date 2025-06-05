import { AfterViewInit, ChangeDetectorRef, Component, EventEmitter, OnDestroy, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { CommonModule } from '@angular/common'; // ← AGREGADO
import { SwalComponent, SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import { Observable } from 'rxjs';
import { SweetAlertOptions } from 'sweetalert2';
import moment from 'moment';
import { Config } from 'datatables.net';
import {
  ApplicantService,
  IApplicantModel,
  IInstitucionModel,
  DataTablesResponse,
  ENTIDADES_FEDERATIVAS,
  SEXO_OPTIONS,
  InstitucionService  // ← AGREGADO para usar el servicio correcto
} from '../shared-services';
import { NgbCollapse } from '@ng-bootstrap/ng-bootstrap';
import { NgClass } from '@angular/common';
import { CrudModule } from '../../../modules/crud/crud.module';
import { SharedModule } from '../../../template/shared/shared.module';
import {environment} from '../../../../environments/environment';

@Component({
  selector: 'app-applicant-listing',
  templateUrl: './applicant-listing.component.html',
  standalone: true,
  imports: [
    CommonModule,        // ← AGREGADO - Necesario para *ngIf, *ngFor
    FormsModule,
    NgbCollapse,
    NgClass,
    SweetAlert2Module,
    CrudModule,
    SharedModule
  ],
  styleUrls: ['./applicant-listing.component.scss']
})
export class ApplicantListingComponent implements OnInit, AfterViewInit, OnDestroy {

  isCollapsed1 = false;
  isCollapsed2 = true;

  isLoading = false;

  applicants: DataTablesResponse;

  datatableConfig: Config = {};

  // Reload emitter inside datatable
  reloadEvent: EventEmitter<boolean> = new EventEmitter();

  // Single model
  aApplicant: Observable<IApplicantModel>;
  applicantModel: IApplicantModel = {
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

  swalOptions: SweetAlertOptions = {};

  // Catálogos - INICIALIZADOS CORRECTAMENTE
  entidadesFederativas: string[] = ENTIDADES_FEDERATIVAS;
  sexoOptions: string[] = SEXO_OPTIONS;

  instituciones$: Observable<IInstitucionModel[]>;
  institucionesFiltradas: IInstitucionModel[] = [];

  constructor(
    private applicantService: ApplicantService,
    private institucionService: InstitucionService, // ← AGREGADO
    private cdr: ChangeDetectorRef
  ) {
    // Inicializar los catálogos en el constructor
    this.entidadesFederativas = ENTIDADES_FEDERATIVAS;
    this.sexoOptions = SEXO_OPTIONS;
  }

  ngAfterViewInit(): void {
  }

  ngOnInit(): void {
    // Verificar que los catálogos estén cargados
    console.log('Entidades Federativas:', this.entidadesFederativas);
    console.log('Opciones de Sexo:', this.sexoOptions);

    this.datatableConfig = {
      serverSide: true,
      /* ajax: (dataTablesParameters: any, callback) => {
        this.applicantService.getApplicants(dataTablesParameters).subscribe(resp => {
          callback(resp);
        });
      },*/
      ajax: (dataTablesParameters: any, callback) => {
        // Para desarrollo: usar datos mock
        if (environment.production === false) {
          const mockData = this.generateMockApplicants();
          callback({
            data: mockData,
            draw: dataTablesParameters.draw,
            recordsTotal: mockData.length,
            recordsFiltered: mockData.length
          });
        } else {
          // Producción: llamada real al servicio
          this.applicantService.getApplicants(dataTablesParameters).subscribe(resp => {
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

    // Cargar instituciones usando el servicio correcto
    this.instituciones$ = this.applicantService.getInstituciones();
    this.instituciones$.subscribe(instituciones => {
      console.log('Instituciones cargadas:', instituciones);
    });
  }

  onEntidadChange() {
    console.log('Entidad seleccionada:', this.applicantModel.entidad_federativa);
    this.applicantModel.institucion_adscripcion = '';

    // Usar el servicio directamente para obtener instituciones filtradas (igual que en coordinator)
    this.institucionService.getInstitucionesByEntidad(this.applicantModel.entidad_federativa)
      .subscribe(instituciones => {
        this.institucionesFiltradas = instituciones;
        console.log('Instituciones filtradas:', this.institucionesFiltradas);
        this.cdr.detectChanges();
      });
  }

  delete(id: number) {
    this.applicantService.deleteApplicant(id).subscribe(() => {
      this.reloadEvent.emit(true);
    });
  }

  edit(id: number) {
    this.aApplicant = this.applicantService.getApplicant(id);
    this.aApplicant.subscribe((applicant: IApplicantModel) => {
      this.applicantModel = { ...applicant };
      this.onEntidadChange(); // Cargar instituciones de la entidad seleccionada
    });
  }

  create() {
    this.applicantModel = {
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
    this.institucionesFiltradas = [];
  }

  onSubmit(event: Event, myForm: NgForm) {
    if (myForm && myForm.invalid) {
      return;
    }

    this.isLoading = true;

    const successAlert: SweetAlertOptions = {
      icon: 'success',
      title: 'Éxito!',
      text: this.applicantModel.id > 0 ? 'Solicitante actualizado exitosamente!' : 'Solicitante registrado exitosamente!',
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
      this.applicantService.updateApplicant(this.applicantModel.id, this.applicantModel).subscribe({
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
      this.applicantService.createApplicant(this.applicantModel).subscribe({
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

    if (this.applicantModel.id > 0) {
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

  private generateMockApplicants(): IApplicantModel[] {
    const sexos = SEXO_OPTIONS;
    const mockCoordinators: IApplicantModel[] = [];
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
