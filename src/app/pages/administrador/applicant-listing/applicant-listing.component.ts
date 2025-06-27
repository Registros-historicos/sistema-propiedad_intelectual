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
  ApplicantService,
  IApplicantModel,
  IInstitucionModel,
  DataTablesResponse,
  ENTIDADES_FEDERATIVAS,
  SEXO_OPTIONS,
  InstitucionService,
  DEPARTAMENTOS,
  PROGRAMAS_EDUCATIVOS
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
  dtInstance: any;
  placeholder: string = '';
  selectedApplicant: IApplicantModel | null = null;
  solicitanteModel: IApplicantModel = {
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
    departamento: '',
    programa_educativo: '',
    created_at: ''
  };

  entidadesFederativas = ENTIDADES_FEDERATIVAS;
  sexoOptions = SEXO_OPTIONS;
  departamentos = DEPARTAMENTOS;
  programasEducativos = PROGRAMAS_EDUCATIVOS;
  programasEducativosFiltrados: any[] = [];

  private cachedMockApplicants: IApplicantModel[] | null = null;

  @ViewChild('noticeSwal')
  noticeSwal!: SwalComponent;

  swalOptions: SweetAlertOptions = {};

  constructor(
    private applicantService: ApplicantService,
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
          const mockData = this.getMockApplicants();
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
            return moment(data).format('DD-MM-YYYY');
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
    this.applicantService.deleteApplicant(id).subscribe(() => {
      this.reloadEvent.emit(true);
    });
  }

  edit(id: number) {
    this.cdr.detectChanges();

    if (environment.production) {
      this.applicantService.getApplicant(id).subscribe({
        next: (applicant: IApplicantModel) => {
          this.solicitanteModel = { ...applicant };
          this.updateProgramasEducativosFiltrados();
        },
        error: (error) => {
          console.error('Error loading applicant:', error);
          this.showAlert({
            title: 'Error',
            text: 'No se pudo cargar la información del solicitante',
            icon: 'error'
          });
        }
      });
    } else {
      const allApplicants = this.getMockApplicants();
      const foundApplicant = allApplicants.find(a =>
        a.id === id || a.id === Number(id) || String(a.id) === String(id)
      );

      if (foundApplicant) {
        this.solicitanteModel = { ...foundApplicant };
        this.updateProgramasEducativosFiltrados();
      } else {
        this.showAlert({
          title: 'No encontrado',
          text: `El solicitante con ID ${id} no existe`,
          icon: 'warning'
        });
      }
    }
  }

  closeForm(modal: any) {
    modal.dismiss('cancel');

    this.solicitanteModel = {
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
      departamento: '',
      programa_educativo: '',
      created_at: ''
    };

    this.selectedApplicant = null;
    this.programasEducativosFiltrados = [];
  }

  saveChanges(modal: any) {
    console.log('Guardando cambios para solicitante:', this.solicitanteModel);

    this.showAlert({
      title: '¡Éxito!',
      text: 'Los cambios se han guardado correctamente',
      icon: 'success'
    });
    modal.close();
  }

  onDepartamentoChange() {
    this.updateProgramasEducativosFiltrados();
    if (this.solicitanteModel) {
      this.solicitanteModel.programa_educativo = '';
    }
  }

  private updateProgramasEducativosFiltrados() {
    if (this.solicitanteModel && this.solicitanteModel.departamento) {
      this.programasEducativosFiltrados = this.programasEducativos.filter(
        p => p.departamento === this.solicitanteModel.departamento
      );
    } else {
      this.programasEducativosFiltrados = [];
    }
  }

  async navigateToEdit(id: number, modalTemplate: TemplateRef<any>) {
    this.edit(id);
  }
  navigateToCreate() {
    this.router.navigate(['/administrador/solicitante/registro']);
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

  private getMockApplicants(): IApplicantModel[] {
    if (this.cachedMockApplicants === null) {
      this.cachedMockApplicants = this.generateMockApplicants();
    }
    return this.cachedMockApplicants;
  }

  public clearMockCache(): void {
    this.cachedMockApplicants = null;
  }

  private generateMockApplicants(): IApplicantModel[] {
    const sexos = SEXO_OPTIONS;
    const mockApplicants: IApplicantModel[] = [];
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

    const createdApplicants = this.applicantService.getCreatedApplicants();

    createdApplicants.forEach(applicant => {
      const applicantWithNumericId = {
        ...applicant,
        id: Number(applicant.id)
      };
      mockApplicants.push(applicantWithNumericId);
    });

    let seedCounter = 54321;
    const seededRandom = () => {
      seedCounter = (seedCounter * 9301 + 49297) % 233280;
      return seedCounter / 233280;
    };

    for (let i = 1; i <= 200; i++) {
      const nombre = nombres[Math.floor(seededRandom() * nombres.length)];
      const apellido = apellidos[Math.floor(seededRandom() * apellidos.length)];

      const entidad = entidadesConInstituciones[Math.floor(seededRandom() * entidadesConInstituciones.length)];

      const institucionesEntidad = institucionesPorEntidad[entidad];
      const institucion = institucionesEntidad[Math.floor(seededRandom() * institucionesEntidad.length)];
      const departamento = DEPARTAMENTOS[Math.floor(seededRandom() * DEPARTAMENTOS.length)];
      const programas = PROGRAMAS_EDUCATIVOS.filter(p => p.departamento === departamento);
      const programaEducativo = programas.length > 0
        ? programas[Math.floor(seededRandom() * programas.length)].nombre
        : '';

      const mockId = Number(2000 + i);

      const newApplicant: IApplicantModel = {
        id: mockId,
        nombre: nombre,
        apellidos: apellido,
        edad: Math.floor(seededRandom() * 30) + 18,
        entidad_federativa: entidad,
        institucion_adscripcion: institucion.nombre,
        sexo: sexos[Math.floor(seededRandom() * sexos.length)],
        telefono: `55${Math.floor(10000000 + seededRandom() * 90000000)}`,
        email: `${nombre.toLowerCase()}.${apellido.toLowerCase()}@example.com`,
        rfc: `RFC${Math.floor(100000000000 + seededRandom() * 900000000000)}`,
        curp: `CURP${Math.floor(1000000000000000 + seededRandom() * 9000000000000000)}`,
        departamento: departamento,
        programa_educativo: programaEducativo,
        created_at: new Date(Date.now() - Math.floor(seededRandom() * 30) * 24 * 60 * 60 * 1000).toISOString()
      };

      mockApplicants.push(newApplicant);
    }

    return mockApplicants;
  }
}
