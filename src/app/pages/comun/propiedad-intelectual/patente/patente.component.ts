import { AfterViewInit, ChangeDetectorRef, Component, EventEmitter, OnDestroy, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { DataTablesResponse } from '../../../administrador/shared-services';
import { Config } from 'datatables.net';
import { SwalComponent } from '@sweetalert2/ngx-sweetalert2';
import { SweetAlertOptions } from 'sweetalert2';
import moment from 'moment/moment';
import { PatentsService } from '../../../../api/services/patents.service';
import { TranslateService } from '@ngx-translate/core';
import { Observable } from 'rxjs';
import { IPatentModel } from 'src/app/api/models/patent.model';
import { FederalEntity } from 'src/app/api/models/entity.model';
import { ENTIDADES_FEDERATIVAS_DATA } from 'src/app/api/data/entity.data';
import { ENTIDADES_FEDERATIVAS_MAP } from 'src/app/api/data/entity-institucion.data';
import {ImpiRegistriesService} from '../../../../api/services/impi.service';

type EstatusPatente = 'Registrada' | 'En trámite' | 'Trámite con observaciones' | 'Aprobada' | 'Concluida';

// Nuevos tipos para el formulario extendido
interface Inventor {
  curp: string;
  nombreCompleto: string;
  sexo: 'M' | 'F' | '';
  tipoInvestigador: string;
  institucion: string;
  programaEducativo: string;
  cuerpoAcademico: string;
  departamento: string;
  fechaAfiliacion: string; // YYYY-MM-DD
  fechaFin: string; // YYYY-MM-DD
}

type PatenteUIModel = IPatentModel & {
  // Campos adicionales de IMPI
  numeroExpediente?: string;
  numeroTitulo?: string;
  denominacion?: string; // alias de nombrePatente
  rama?: string;
  medioIngreso?: string;
  tecnologicoOrigen?: string;
  cePat?: string;
  anioRenovacion?: string;
  tipoSector?: string;
  sector?: string;
  subsector?: string;
  fechaExpedicion?: string;
  archivo?: string;
  observaciones?: string;
  inventores?: Inventor[];
};

@Component({
  selector: 'app-patente',
  templateUrl: './patente.component.html',
  styleUrl: './patente.component.scss'
})
export class PatenteComponent implements OnInit, AfterViewInit, OnDestroy {
  isCollapsed1 = false;
  isCollapsed2 = true;

  pageLength: number = 10;
  dtInstance: any;
  selectedPage: number = 0;
  // Flag para trabajar con el arreglo local de la tabla
  useLocalFakeData: boolean = true;

  lengthMenu: number[] = [5, 10, 15, 20];

  applicants: DataTablesResponse;

  datatableConfig: Config = {};

  reloadEvent: EventEmitter<boolean> = new EventEmitter();

  @ViewChild('noticeSwal')
  noticeSwal!: SwalComponent;

  swalOptions: SweetAlertOptions = {};

  placeholder: string = '';

  aPatente: Observable<IPatentModel>
  patenteModel: PatenteUIModel = {
    id: 0,
    solicitudId: "",
    nombrePatente: "",
    solicitante: "",
    fechaSolicitud: "",
    estatus: "En trámite",
    descripcion: "",
    institucion: "",
    correo: "",
    documentos: [""],
    // Campos adicionales inicializados
    numeroExpediente: "",
    numeroTitulo: "",
    denominacion: "",
    rama: "",
    medioIngreso: "",
    tecnologicoOrigen: "",
    cePat: "",
    anioRenovacion: "",
    tipoSector: "",
    sector: "",
    subsector: "",
    fechaExpedicion: "",
  archivo: "",
    observaciones: "",
    inventores: [
      {
        curp: "",
        nombreCompleto: "",
        sexo: "",
        tipoInvestigador: "",
        institucion: "",
        programaEducativo: "",
        cuerpoAcademico: "",
        departamento: "",
        fechaAfiliacion: "",
        fechaFin: "",
      },
    ],
  };

  entidadesFederativas: FederalEntity[] = ENTIDADES_FEDERATIVAS_DATA
  institucionesFiltradas: any[] = []
  estadoSeleccionado: number | null = null
  institucionSeleccionada: number | null = null

  selectedFile: File | null = null;
  isViewMode: boolean = true;
  isEditingStatus: boolean = false;
  isSaving: boolean = false;
  statusError: boolean = false;
  editedStatus: string = '';
  editedObservations: string = '';
  originalStatus: string = '';
  originalObservations: string = '';
  editingSelectKey: boolean = false;
  observacionesChanged: boolean = false;

  private secuenciaEstados: { [key in EstatusPatente]?: EstatusPatente } = {
    'Registrada': 'En trámite',
    'En trámite': 'Concluida',
    'Trámite con observaciones': 'En trámite'
  };

  // Datos locales de maquetado para IMPI en este componente (independiente de otros)
  private readonly FAKE_IMPI_DATA_LOCAL = [
    { id: 1, rama: 'Invención', titulo: 'Sistema Cuántico de Encriptación de Datos', institucion: 'TecNM - I.T. Orizaba', fechaSolicitud: '2025-09-08', numeroExpediente: 'EXP-0001', numeroCertificado: 'CERT-0001' },
    { id: 2, rama: 'Modelo de Utilidad', titulo: 'Dispositivo Portátil para Purificación de Agua', institucion: 'Universidad Nacional Autónoma de México', fechaSolicitud: '2025-09-05', numeroExpediente: 'EXP-0002', numeroCertificado: 'CERT-0002' },
    { id: 3, rama: 'Diseño Industrial', titulo: 'Silla Ergonómica con Materiales Reciclados', institucion: 'Tecnológico de Monterrey', fechaSolicitud: '2025-09-01', numeroExpediente: 'EXP-0003', numeroCertificado: 'CERT-0003' },
    { id: 4, rama: 'Invención', titulo: 'Algoritmo de IA para Detección Temprana de Cáncer', institucion: 'Instituto Politécnico Nacional', fechaSolicitud: '2025-08-28', numeroExpediente: 'EXP-0004', numeroCertificado: 'CERT-0004' },
    { id: 5, rama: 'Modelo de Utilidad', titulo: 'Mecanismo de Cierre Automático para Contenedores', institucion: 'Universidad de Guadalajara', fechaSolicitud: '2025-08-25', numeroExpediente: 'EXP-0005', numeroCertificado: 'CERT-0005' },
    { id: 6, rama: 'Invención', titulo: 'Dron Autónomo para Monitoreo Agrícola', institucion: 'TecNM - I.T. Orizaba', fechaSolicitud: '2025-08-22', numeroExpediente: 'EXP-0006', numeroCertificado: 'CERT-0006' },
    { id: 7, rama: 'Diseño Industrial', titulo: 'Lámpara LED de Bajo Consumo con Forma Orgánica', institucion: 'Universidad Iberoamericana', fechaSolicitud: '2025-08-19', numeroExpediente: 'EXP-0007', numeroCertificado: 'CERT-0007' },
    { id: 8, rama: 'Modelo de Utilidad', titulo: 'Filtro de Aire Mejorado para Automóviles', institucion: 'Universidad Autónoma de Nuevo León', fechaSolicitud: '2025-08-15', numeroExpediente: 'EXP-0008', numeroCertificado: 'CERT-0008' },
    { id: 9, rama: 'Invención', titulo: 'Batería de Grafeno de Carga Ultra Rápida', institucion: 'TecNM - I.T. Orizaba', fechaSolicitud: '2025-08-11', numeroExpediente: 'EXP-0009', numeroCertificado: 'CERT-0009' },
    { id: 10, rama: 'Diseño Industrial', titulo: 'Mobiliario Urbano Inteligente con Paneles Solares', institucion: 'Tecnológico de Monterrey', fechaSolicitud: '2025-08-07', numeroExpediente: 'EXP-0010', numeroCertificado: 'CERT-0010' },
    { id: 11, rama: 'Invención', titulo: 'Software de Simulación de Reacciones Químicas', institucion: 'Instituto Politécnico Nacional', fechaSolicitud: '2025-08-04', numeroExpediente: 'EXP-0011', numeroCertificado: 'CERT-0011' },
    { id: 12, rama: 'Modelo de Utilidad', titulo: 'Sistema de Riego por Goteo de Alta Eficiencia', institucion: 'Universidad de Guadalajara', fechaSolicitud: '2025-08-01', numeroExpediente: 'EXP-0012', numeroCertificado: 'CERT-0012' },
    { id: 13, rama: 'Invención', titulo: 'Prótesis Robótica Controlada por Señales Neuronales', institucion: 'Universidad Nacional Autónoma de México', fechaSolicitud: '2025-07-29', numeroExpediente: 'EXP-0013', numeroCertificado: 'CERT-0013' },
    { id: 14, rama: 'Diseño Industrial', titulo: 'Empaque Ecológico para Alimentos a Base de Algas', institucion: 'Universidad Iberoamericana', fechaSolicitud: '2025-07-25', numeroExpediente: 'EXP-0014', numeroCertificado: 'CERT-0014' },
    { id: 15, rama: 'Modelo de Utilidad', titulo: 'Herramienta Multifuncional para Ciclismo Urbano', institucion: 'TecNM - I.T. Orizaba', fechaSolicitud: '2025-07-21', numeroExpediente: 'EXP-0015', numeroCertificado: 'CERT-0015' }
  ];

  constructor(
    private service: PatentsService,
    private cdr: ChangeDetectorRef,
    private translate: TranslateService,
    private impiService: ImpiRegistriesService
  ) {
  }

  // Helpers para autores
  addInventor(): void {
    if (!this.patenteModel.inventores) this.patenteModel.inventores = [];
    this.patenteModel.inventores.push({
      curp: "",
      nombreCompleto: "",
      sexo: "",
      tipoInvestigador: "",
      institucion: "",
      programaEducativo: "",
      cuerpoAcademico: "",
      departamento: "",
      fechaAfiliacion: "",
      fechaFin: "",
    });
  }

  removeInventor(index: number): void {
    if (!this.patenteModel.inventores) return;
    if (index > 0 && index < this.patenteModel.inventores.length) {
      this.patenteModel.inventores.splice(index, 1);
    }
  }

  ngAfterViewInit(): void {
    if (this.dtInstance) {
      this.dtInstance.on('page', () => {
        const pageInfo = this.dtInstance.page.info();
        const currentPage = pageInfo.page;
        console.log('New page:', currentPage);
        this.selectedPage = pageInfo.page;
      });
    }
  }

  ngOnInit(): void {
    this.placeholder = this.translate.instant('TABLE.PLACEHOLDER_SEARCH')

    // Para mostrar el mismo arreglo y columnas que en INDAUTOR/local, usa el dataset local propio de este componente

    this.datatableConfig = {
      serverSide: !this.useLocalFakeData,
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
      paging: true,
  ...(this.useLocalFakeData ? {
        data: this.FAKE_IMPI_DATA_LOCAL.map(item => ({
          id: item.id,
          rama: item.rama,
          nombrePatente: item.titulo,
          institucion: item.institucion,
          fechaSolicitud: item.fechaSolicitud,
          numeroExpediente: item.numeroExpediente,
          numeroTitulo: item.numeroCertificado
        }))
      } : {
        ajax: (dataTablesParameters: any, callback) => {
          this.impiService.listImpiRegistries(this.selectedPage, dataTablesParameters.length, dataTablesParameters.search.value || null).subscribe({
            next: (resp) => {
              callback({
                draw: dataTablesParameters.draw,
                recordsTotal: resp.totalElements,
                recordsFiltered: resp.totalElements,
                data: resp.content.map((item: any) => ({
                  id: item.id,
                  solicitudId: item.record,
                  nombrePatente: item.denomination,
                  rama: item.branch || 'No disponible',
                  fechaSolicitud: item.issue_date ? moment(item.issue_date).format('YYYY-MM-DD') : '',
                  institucion: item.origin_city || 'No disponible',
                  estatus: 'No disponible',
                  descripcion: item.notes || '',
                  documentos: [],
                  numeroExpediente: item.numero_expediente || '',
                  numeroTitulo: item.numero_titulo || ''
                }))
              })
            },
            error: (error) => {
              callback({
                draw: dataTablesParameters.draw,
                recordsTotal: 0,
                recordsFiltered: 0,
                data: []
              });
            }
          });
        }
      }),
      columns: [
        {
          title: this.translate.instant('TABLE.BRANCH'),
          data: 'rama',
          render: (data, type, full) => {
            const colorClasses = ['success', 'info', 'warning', 'danger'];
            const randomColorClass = colorClasses[Math.floor(Math.random() * colorClasses.length)];

            const nameParts = data.split(' ').filter((part: string) => part.length > 0 && !part.endsWith('.'));

            let initials = '';
            if (nameParts.length >= 2) {
              initials = (nameParts[0][0] + nameParts[1][0]).toUpperCase();
            } else if (nameParts.length === 1) {
              initials = (nameParts[0][0] + nameParts[0][1]).toUpperCase();
            }

            const symbolLabel = `
              <div class="symbol-label fs-3 bg-light-${randomColorClass} text-${randomColorClass}">
                ${initials}
              </div>
            `;

            const nameAndEmail = `
              <div class="d-flex flex-column" data-action="view" data-id="${full.id}">
                <a href="javascript:;" class="text-gray-800 text-hover-primary mb-1">${data}</a>
              </div>
            `;

            return `
              <div class="d-flex align-items-center">
                <div class="symbol symbol-circle symbol-50px overflow-hidden me-3" data-action="view" data-id="${full.id}">
                  <a href="javascript:;">
                    ${symbolLabel}
                  </a>
                </div>
                ${nameAndEmail}
              </div>
            `;
          },
        },
        {
          title: this.translate.instant('TABLE.WORK_TITLE'),
          data: 'nombrePatente',
          render: (data) => {
            return `<span class="fw-bold fs-6 text-gray-800">${data || ''}</span>`;
          },
        },
        {
          title: this.translate.instant('TABLE.INSTITUTION'),
          data: 'institucion',
          render: (data) => {
            return `<span class="fw-semibold text-gray-600">${data || ''}</span>`;
          },
        },
        {
          title: this.translate.instant('TABLE.DATE'),
          data: 'fechaSolicitud',
          render: (data) => {
            return `<span class="fw-semibold text-gray-600">${moment(data).format('DD-MM-YYYY')}</span>`;
          },
        },
        {
          title: 'Número de expediente', // Nueva columna
          data: 'numeroExpediente',
          render: (data) => {
            return `<span class="fw-semibold text-gray-600">${data || ''}</span>`;
          },
        },
        {
          title: 'Número de título', // Nueva columna
          data: 'numeroTitulo',
          render: (data) => {
            return `<span class="fw-semibold text-gray-600">${data || ''}</span>`;
          },
        }
      ],
      createdRow: (row, data, dataIndex) => {
        const $row = $(row);
        $row.attr('data-action', 'view');
        $row.attr('data-id', 0);
        $row.addClass('cursor-pointer');
      },
      initComplete: (settings, json) => {
  this.dtInstance = settings.oInstance.api()
        console.log('DataTables initialized:', this.dtInstance);
        console.log('Page info():', this.dtInstance.page.info());
        this.selectedPage = this.dtInstance.page.info().page;
        console.log('Selected page:', this.selectedPage);

        this.dtInstance.on('page', () => {
          const pageInfo = this.dtInstance.page.info();
          const currentPage = pageInfo.page;
          console.log('New page:', currentPage);
          this.selectedPage = pageInfo.page;
        });

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

  onEstadoChange(estadoId: number): void {
    this.estadoSeleccionado = estadoId;
    this.institucionSeleccionada = null;
    this.patenteModel.institucion = '';

    if (estadoId && ENTIDADES_FEDERATIVAS_MAP[estadoId]) {
      this.institucionesFiltradas = ENTIDADES_FEDERATIVAS_MAP[estadoId];
    } else {
      this.institucionesFiltradas = [];
    }
  }

  onInstitucionChange(institucionId: number): void {
    this.institucionSeleccionada = institucionId;

    if (institucionId) {
      const institucion = this.institucionesFiltradas.find(inst => inst.id === institucionId);
      if (institucion) {
        this.patenteModel.institucion = institucion.nombre;
      }
    } else {
      this.patenteModel.institucion = '';
    }
  }

  private inicializarSeleccionesDesdePatente(): void {
    if (this.patenteModel.institucion) {
      for (const [estadoId, instituciones] of Object.entries(ENTIDADES_FEDERATIVAS_MAP)) {
        const institucionEncontrada = instituciones.find((inst: { nombre: string; }) => inst.nombre === this.patenteModel.institucion);
        if (institucionEncontrada) {
          this.estadoSeleccionado = Number(estadoId);
          this.institucionesFiltradas = instituciones;
          this.institucionSeleccionada = institucionEncontrada.id;
          break;
        }
      }
    }
  }

  resetFormularioInstitucion(): void {
    this.estadoSeleccionado = null;
    this.institucionSeleccionada = null;
    this.institucionesFiltradas = [];
    this.patenteModel.institucion = '';
  }

  delete(id: number) {
    if (this.useLocalFakeData) {
      const numericId = Number(id);
      const idx = this.FAKE_IMPI_DATA_LOCAL.findIndex(x => x.id === numericId);
      if (idx > -1) {
        this.FAKE_IMPI_DATA_LOCAL.splice(idx, 1);
        if (this.dtInstance) {
          this.dtInstance.rows((i: number, rowData: any) => rowData.id === numericId).remove().draw(false);
        }
      }
      return;
    } else {
      this.service.deletePatent(id).subscribe(() => {
        this.reloadEvent.emit(true);
      });
    }
  }

  view(id: number) {
    this.isViewMode = true;
    this.cdr.detectChanges();

    if (this.useLocalFakeData) {
      const numericId = Number(id);
      const item = this.FAKE_IMPI_DATA_LOCAL.find(x => x.id === numericId);
      if (item) {
        this.patenteModel = {
          ...this.patenteModel,
          id: item.id,
          nombrePatente: item.titulo,
          denominacion: item.titulo,
          rama: item.rama,
          institucion: item.institucion,
          fechaSolicitud: item.fechaSolicitud,
          numeroExpediente: item.numeroExpediente,
          numeroTitulo: item.numeroCertificado,
        } as PatenteUIModel;
      }
    } else {
      this.service.getPatent(id).subscribe((patente: IPatentModel) => {
        // Mezclar datos del servicio con campos UI adicionales (si existen)
        this.patenteModel = {
          ...this.patenteModel,
          ...patente,
          denominacion: patente.nombrePatente || this.patenteModel.denominacion,
        };
        this.inicializarSeleccionesDesdePatente();
      });
    }
  }

  follow(id: number) {
    this.isViewMode = false;
    this.cdr.detectChanges();

    this.service.getPatent(id).subscribe((patente: IPatentModel) => {
      this.patenteModel = { ...patente };
      this.observacionesChanged = false;
      this.resetEditMode();
    });
  }

  // Segundo botón: Editar
  edit(id: number) {
    this.isViewMode = false;
    this.cdr.detectChanges();

    if (this.useLocalFakeData) {
      const numericId = Number(id);
      const item = this.FAKE_IMPI_DATA_LOCAL.find(x => x.id === numericId);
      if (item) {
        this.patenteModel = {
          ...this.patenteModel,
          id: item.id,
          nombrePatente: item.titulo,
          denominacion: item.titulo,
          rama: item.rama,
          institucion: item.institucion,
          fechaSolicitud: item.fechaSolicitud,
          numeroExpediente: item.numeroExpediente,
          numeroTitulo: item.numeroCertificado,
        } as PatenteUIModel;
      }
    } else {
      this.service.getPatent(id).subscribe((patente: IPatentModel) => {
        // Mezclar para no perder campos de UI
        this.patenteModel = { ...this.patenteModel, ...patente };
        // Derivar denominación si viene vacío
        if (!this.patenteModel.denominacion) {
          this.patenteModel.denominacion = this.patenteModel.nombrePatente;
        }
      });
    }
  }

  saveEdit(modal: any) {
    if (this.useLocalFakeData) {
      const idx = this.FAKE_IMPI_DATA_LOCAL.findIndex(x => x.id === this.patenteModel.id);
      if (idx > -1) {
        // Actualizar únicamente los campos que impactan en la tabla
        this.FAKE_IMPI_DATA_LOCAL[idx].titulo = this.patenteModel.denominacion || this.patenteModel.nombrePatente || '';
        this.FAKE_IMPI_DATA_LOCAL[idx].rama = this.patenteModel.rama || '';
        this.FAKE_IMPI_DATA_LOCAL[idx].fechaSolicitud = this.patenteModel.fechaSolicitud || '';
        this.FAKE_IMPI_DATA_LOCAL[idx].numeroExpediente = this.patenteModel.numeroExpediente || '';
        this.FAKE_IMPI_DATA_LOCAL[idx].numeroCertificado = this.patenteModel.numeroTitulo || '';

        if (this.dtInstance) {
          const updatedRow = {
            id: this.FAKE_IMPI_DATA_LOCAL[idx].id,
            rama: this.FAKE_IMPI_DATA_LOCAL[idx].rama,
            nombrePatente: this.FAKE_IMPI_DATA_LOCAL[idx].titulo,
            institucion: this.FAKE_IMPI_DATA_LOCAL[idx].institucion,
            fechaSolicitud: this.FAKE_IMPI_DATA_LOCAL[idx].fechaSolicitud,
            numeroExpediente: this.FAKE_IMPI_DATA_LOCAL[idx].numeroExpediente,
            numeroTitulo: this.FAKE_IMPI_DATA_LOCAL[idx].numeroCertificado,
          };
          const row = this.dtInstance.row((i: number, data: any) => data.id === updatedRow.id);
          if (row && row.data) {
            row.data(updatedRow).draw(false);
          } else {
            this.dtInstance.rows().draw(false);
          }
        }
      }
      this.showAlert({ icon: 'success', title: 'Actualizado', text: 'El registro fue actualizado correctamente.' });
      this.isViewMode = true;
      modal.dismiss('saved');
      return;
    } else {
      const payload: IPatentModel = {
        id: this.patenteModel.id,
        solicitudId: this.patenteModel.solicitudId,
        nombrePatente: this.patenteModel.denominacion || this.patenteModel.nombrePatente,
        solicitante: this.patenteModel.solicitante,
        fechaSolicitud: this.patenteModel.fechaSolicitud,
        estatus: this.patenteModel.estatus as IPatentModel['estatus'],
        descripcion: this.patenteModel.descripcion || '',
        institucion: this.patenteModel.institucion || '',
        correo: this.patenteModel.correo || '',
        documentos: this.patenteModel.documentos || [],
        observaciones: this.patenteModel.observaciones || ''
      };

      this.service.updatePatent(this.patenteModel.id, payload).subscribe({
        next: (updated) => {
          this.showAlert({
            icon: 'success',
            title: 'Actualizado',
            text: 'El registro fue actualizado correctamente.'
          });
          this.reloadEvent.emit(true);
          this.isViewMode = true;
          modal.dismiss('saved');
        },
        error: (err) => {
          console.error('Error al actualizar patente', err);
          this.showAlert({
            icon: 'error',
            title: 'Error',
            text: 'No se pudo actualizar el registro.'
          });
        }
      });
    }
  }

  getStatusBadgeClass(status: string): string {
    const statusClasses: { [key: string]: string } = {
      'En trámite': 'badge-light-info',
      'Trámite con observaciones': 'badge-light-warning',
      'Aprobada': 'badge-light-success',
      'Registrada': 'badge-light-primary',
      'Concluida': 'badge-light-secondary'
    };
    return statusClasses[status] || 'badge-light-secondary';
  }

  getValidStatusOptions(): { value: EstatusPatente, label: string }[] {
    const currentStatus = this.patenteModel.estatus;

    switch(currentStatus) {
      case 'Registrada':
        return [
          { value: 'En trámite', label: 'En trámite' },
          { value: 'Trámite con observaciones', label: 'Trámite con observaciones' }
        ];

      case 'Trámite con observaciones':
        return [
          { value: 'En trámite', label: 'En trámite' }
        ];

      case 'En trámite':
        return [
          { value: 'Aprobada', label: 'Aprobada' }
        ];

      case 'Aprobada':
        return [
          { value: 'Concluida', label: 'Concluida' }
        ];

      case 'Concluida':
        return [];

      default:
        return [];
    }
  }

  canEditStatus(): boolean {
    return this.getValidStatusOptions().length > 0;
  }

  enableEditMode(): void {
    this.isEditingStatus = true;
    this.originalStatus = this.patenteModel.estatus;
    this.originalObservations = this.patenteModel.observaciones || '';
    this.editingSelectKey = false;
    this.editedStatus = '';
    this.editedObservations = this.originalObservations;
    this.statusError = false;

    setTimeout(() => {
      this.editingSelectKey = true;
      this.cdr.detectChanges();
    }, 10);
  }

  private resetEditMode(): void {
    this.isEditingStatus = false;
    this.editingSelectKey = false;
    this.editedStatus = '';
    this.editedObservations = this.originalObservations;
    this.statusError = false;
    this.isSaving = false;
  }

  private hasChanges(): boolean {
    return this.editedStatus !== this.originalStatus ||
      this.editedObservations !== this.originalObservations;
  }

  private validateForm(): boolean {
    this.statusError = false;

    if (!this.editedStatus || this.editedStatus.trim() === '') {
      this.statusError = true;
      return false;
    }

    return true;
  }

  saveChanges(): void {
    if (!this.validateForm()) {
      const alertaError: SweetAlertOptions = {
        icon: 'error',
        title: 'Error de validación',
        text: 'Por favor selecciona un estatus válido',
        customClass: {
          confirmButton: 'btn btn-danger'
        }
      };
      this.showAlert(alertaError);
      return;
    }

    const alertaConfirmacion: SweetAlertOptions = {
      icon: 'question',
      title: '¿Confirmar cambios?',
      html: `
        <div class="text-start">
          <p><strong>Estatus:</strong> ${this.editedStatus}</p>
          <p><strong>Observaciones:</strong></p>
          <p class="text-muted">${this.editedObservations || 'Sin observaciones'}</p>
        </div>
      `,
      showCancelButton: true,
      confirmButtonText: 'Sí, guardar',
      cancelButtonText: 'Cancelar',
      customClass: {
        confirmButton: 'btn btn-success',
        cancelButton: 'btn btn-secondary'
      }
    };

    import('sweetalert2').then(Swal => {
      Swal.default.fire(alertaConfirmacion).then((result) => {
        if (result.isConfirmed) {
          this.performSave();
        }
      });
    });
  }

  private performSave(): void {
    this.isSaving = true;

    const updateData = {
      estatus: this.editedStatus as EstatusPatente,
      observaciones: this.editedObservations
    };

    this.service.updatePatentStatusAndObservations(this.patenteModel.id, updateData).subscribe({
      next: (response) => {
        this.isSaving = false;
        this.patenteModel.estatus = updateData.estatus;
        this.patenteModel.observaciones = updateData.observaciones;
        this.originalStatus = this.editedStatus;
        this.originalObservations = this.editedObservations;
        this.isEditingStatus = false;

        const alertaExito: SweetAlertOptions = {
          icon: 'success',
          title: '¡Éxito!',
          text: 'Los cambios se han guardado correctamente',
          timer: 2000,
          showConfirmButton: false
        };

        this.showAlert(alertaExito);
        this.reloadEvent.emit(true);
      },
      error: (error) => {
        this.isSaving = false;
        console.error('Error al guardar:', error);

        const alertaError: SweetAlertOptions = {
          icon: 'error',
          title: 'Error al guardar',
          text: 'Ocurrió un error al intentar guardar los cambios',
          customClass: {
            confirmButton: 'btn btn-danger'
          }
        };
        this.showAlert(alertaError);
      }
    });
  }

  editarEstatus(): void {
    const estadoActual = this.patenteModel.estatus;
    const siguienteEstado = this.secuenciaEstados[estadoActual];

    if (!siguienteEstado) {
      const alertaError: SweetAlertOptions = {
        icon: 'warning',
        title: 'Aviso',
        text: 'Este estatus no puede ser modificado o ya se encuentra en el estado final.',
      };
      this.showAlert(alertaError);
      return;
    }

    const alertaConfirmacion: SweetAlertOptions = {
      icon: 'question',
      title: '¿Actualizar estatus?',
      text: `¿Deseas cambiar el estatus de "${estadoActual}" a "${siguienteEstado}"?`,
      showCancelButton: true,
      confirmButtonText: 'Sí, actualizar',
      cancelButtonText: 'Cancelar',
      customClass: {
        confirmButton: 'btn btn-primary',
        cancelButton: 'btn btn-light'
      }
    };

    import('sweetalert2').then(Swal => {
      Swal.default.fire(alertaConfirmacion).then((result) => {
        if (result.isConfirmed) {
          this.actualizarEstatus(siguienteEstado);
        }
      });
    });
  }

  private actualizarEstatus(nuevoEstatus: EstatusPatente): void {
    this.service.updatePatentStatus(this.patenteModel.id, nuevoEstatus).subscribe({
      next: (response) => {
        this.patenteModel.estatus = nuevoEstatus;

        const alertaExito: SweetAlertOptions = {
          icon: 'success',
          title: '¡Actualizado!',
          text: `El estatus ha sido actualizado a "${nuevoEstatus}"`,
        };
        this.showAlert(alertaExito);

        this.reloadEvent.emit(true);
      },
      error: (error) => {
        console.error('Error al actualizar estatus:', error);
        const alertaError: SweetAlertOptions = {
          icon: 'error',
          title: 'Error',
          text: 'Hubo un problema al actualizar el estatus. Inténtalo de nuevo.',
        };
        this.showAlert(alertaError);
      }
    });
  }

  // Inventores no vacíos para visualización
  get inventoresVisibles(): Inventor[] {
    const invs = this.patenteModel.inventores || [];
    return invs.filter(i => !!(i && (i.curp || i.nombreCompleto || i.institucion)));
  }

  onObservacionesChange(): void {
    this.observacionesChanged = true;
  }

  guardarObservaciones(): void {
    this.service.updatePatentObservations(this.patenteModel.id, this.patenteModel.observaciones || '').subscribe({
      next: (response) => {
        const alertaExito: SweetAlertOptions = {
          icon: 'success',
          title: '¡Guardado!',
          text: 'Las observaciones han sido guardadas correctamente.',
        };
        this.showAlert(alertaExito);
        this.observacionesChanged = false;
        this.reloadEvent.emit(true);
      },
      error: (error) => {
        console.error('Error al guardar observaciones:', error);
        const alertaError: SweetAlertOptions = {
          icon: 'error',
          title: 'Error',
          text: 'Hubo un problema al guardar las observaciones.',
        };
        this.showAlert(alertaError);
      }
    });
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

  onFileSelected(event: any) {
    const file = event.target.files[0];
    if (file && file.type === 'application/pdf') {
      this.selectedFile = {
        name: file.name,
        size: file.size,
        type: file.type
      } as File;
    } else if (file) {
      const errorAlert: SweetAlertOptions = {
        icon: 'error',
        title: 'Error!',
        text: 'Solo se permiten archivos PDF',
      };
      this.showAlert(errorAlert);
      event.target.value = '';
    }
  }

  downloadDocument(documentName: string): void {
    console.log('Descargando documento:', documentName);
  }

  closeForm(modal: any) {
    modal.dismiss('cancel');

    this.patenteModel = {
      id: 0,
      solicitudId: '',
      nombrePatente: '',
      solicitante: '',
      correo: '',
      fechaSolicitud: '',
      institucion: '',
      estatus: 'En trámite',
      descripcion: '',
      documentos: []
    };

    this.estadoSeleccionado = 0;
    this.institucionSeleccionada = 0;
    this.institucionesFiltradas = [];
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
}
