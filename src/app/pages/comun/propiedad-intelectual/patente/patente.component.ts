import { AfterViewInit, ChangeDetectorRef, Component, EventEmitter, OnDestroy, OnInit, ViewChild } from '@angular/core';
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
import { ImpiRegistriesService } from '../../../../api/services/impi.service';
import { ParametrizacionesService, Catalogos, Parametrizacion, } from '../../../../api/services/parametrizaciones.service';

type EstatusPatente = 'Registrada' | 'En trámite' | 'Trámite con observaciones' | 'Aprobada' | 'Concluida';

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

// Estructura del dataset local usado por la tabla y los modales
interface ImpiLocalItem {
  id: number;
  rama: string;
  titulo: string;
  institucion: string;
  fechaSolicitud: string; // YYYY-MM-DD
  numeroExpediente: string;
  numeroCertificado: string; // N. de Título
  estatus?: EstatusPatente;
  medioIngreso?: string;
  tecnologicoOrigen?: string;
  cePat?: string;
  anioRenovacion?: string;
  tipoSector?: string;
  sector?: string;
  subsector?: string;
  fechaExpedicion?: string; // YYYY-MM-DD
  archivo?: string;
  observaciones?: string;
  descripcion?: string;
  inventores?: Inventor[];
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

interface ParametroItem {
  id: number;
  nombre: string;
}

@Component({
  selector: 'app-patente',
  templateUrl: './patente.component.html',
  styleUrl: './patente.component.scss'
})
export class PatenteComponent implements OnInit, AfterViewInit, OnDestroy {
  isCollapsed1 = false;
  isCollapsed2 = true;
  ramasCatalogo: ParametroItem[] = [];
  mediosIngresoCatalogo: ParametroItem[] = [];
  tiposSectorCatalogo: ParametroItem[] = [];
  estatusCatalogo: ParametroItem[] = [];
  pageLength: number = 10;
  dtInstance: any;
  selectedPage: number = 0;
  // Flag para trabajar con el arreglo local de la tabla
  useLocalFakeData: boolean = false;

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
  private readonly FAKE_IMPI_DATA_LOCAL: ImpiLocalItem[] = [
    {
      id: 1,
      rama: 'Invención',
      titulo: 'Sistema Cuántico de Encriptación de Datos',
      institucion: 'TecNM / Instituto Tecnológico de Ensenada',
      fechaSolicitud: '2025-09-08',
      numeroExpediente: 'EXP-0001',
      numeroCertificado: 'CERT-0001',
      estatus: 'En trámite',
      descripcion: '',
      observaciones: '',
      inventores: [
        {
          curp: 'PEAJ900101HDFRRN01',
          nombreCompleto: 'Pedro Álvarez Juárez',
          sexo: 'M',
          tipoInvestigador: 'Profesor-Investigador',
          institucion: 'TecNM / Instituto Tecnológico de Ensenada',
          programaEducativo: 'Ingeniería en Sistemas',
          cuerpoAcademico: 'Cómputo Aplicado',
          departamento: 'Sistemas y Computación',
          fechaAfiliacion: '2020-03-15',
          fechaFin: ''
        }
      ]
    },
    {
      id: 2,
      rama: 'Modelo de Utilidad',
      titulo: 'Dispositivo Portátil para Purificación de Agua',
      institucion: 'TecNM / Instituto Tecnológico de La Paz',
      fechaSolicitud: '2025-09-05',
      numeroExpediente: 'EXP-0002',
      numeroCertificado: 'CERT-0002',
      estatus: 'Registrada',
      descripcion: '',
      observaciones: '',
      inventores: [
        {
          curp: 'LOPR920202MDFRRS02',
          nombreCompleto: 'Lourdes Pérez Ríos',
          sexo: 'F',
          tipoInvestigador: 'Estudiante',
          institucion: 'TecNM / Instituto Tecnológico de La Paz',
          programaEducativo: 'Química',
          cuerpoAcademico: 'Procesos Químicos',
          departamento: 'Química',
          fechaAfiliacion: '2023-01-10',
          fechaFin: ''
        },
        {
          curp: 'HOGM850606HDFTRN03',
          nombreCompleto: 'Hugo Gómez Martínez',
          sexo: 'M',
          tipoInvestigador: 'Técnico Académico',
          institucion: 'TecNM / Instituto Tecnológico de La Paz',
          programaEducativo: 'Ingeniería Química',
          cuerpoAcademico: 'Procesos Químicos',
          departamento: 'Ingeniería',
          fechaAfiliacion: '2021-09-01',
          fechaFin: ''
        }
      ]
    },
    {
      id: 3,
      rama: 'Diseño Industrial',
      titulo: 'Silla Ergonómica con Materiales Reciclados',
      institucion: 'TecNM / Instituto Tecnológico de Campeche',
      fechaSolicitud: '2025-09-01',
      numeroExpediente: 'EXP-0003',
      numeroCertificado: 'CERT-0003',
      estatus: 'En trámite',
      descripcion: '',
      observaciones: '',
      inventores: []
    },
    {
      id: 4,
      rama: 'Invención',
      titulo: 'Algoritmo de IA para Detección Temprana de Cáncer',
      institucion: 'TecNM / Instituto Tecnológico Superior de Calkiní',
      fechaSolicitud: '2025-08-28',
      numeroExpediente: 'EXP-0004',
      numeroCertificado: 'CERT-0004',
      estatus: 'En trámite',
      descripcion: '',
      observaciones: '',
      inventores: []
    },
    {
      id: 5,
      rama: 'Modelo de Utilidad',
      titulo: 'Mecanismo de Cierre Automático para Contenedores',
      institucion: 'TecNM / Instituto Tecnológico de la Selva',
      fechaSolicitud: '2025-08-25',
      numeroExpediente: 'EXP-0005',
      numeroCertificado: 'CERT-0005',
      estatus: 'En trámite',
      descripcion: '',
      observaciones: '',
      inventores: []
    },
    {
      id: 6,
      rama: 'Invención',
      titulo: 'Dron Autónomo para Monitoreo Agrícola',
      institucion: 'TecNM / Instituto Tecnológico de Tapachula',
      fechaSolicitud: '2025-08-22',
      numeroExpediente: 'EXP-0006',
      numeroCertificado: 'CERT-0006',
      estatus: 'En trámite',
      descripcion: '',
      observaciones: '',
      inventores: []
    },
    {
      id: 7,
      rama: 'Diseño Industrial',
      titulo: 'Lámpara LED de Bajo Consumo con Forma Orgánica',
      institucion: 'TecNM / Instituto Tecnológico de Tuxtla Gutiérrez',
      fechaSolicitud: '2025-08-19',
      numeroExpediente: 'EXP-0007',
      numeroCertificado: 'CERT-0007',
      estatus: 'En trámite',
      descripcion: '',
      observaciones: '',
      inventores: []
    },
    {
      id: 8,
      rama: 'Modelo de Utilidad',
      titulo: 'Filtro de Aire Mejorado para Automóviles',
      institucion: 'TecNM / Instituto Tecnológico Superior de Cintalapa',
      fechaSolicitud: '2025-08-15',
      numeroExpediente: 'EXP-0008',
      numeroCertificado: 'CERT-0008',
      estatus: 'En trámite',
      descripcion: '',
      observaciones: '',
      inventores: []
    },
    {
      id: 9,
      rama: 'Invención',
      titulo: 'Batería de Grafeno de Carga Ultra Rápida',
      institucion: 'TecNM / Instituto Tecnológico Superior de Comitán',
      fechaSolicitud: '2025-08-11',
      numeroExpediente: 'EXP-0009',
      numeroCertificado: 'CERT-0009',
      estatus: 'En trámite',
      descripcion: '',
      observaciones: '',
      inventores: []
    },
    {
      id: 10,
      rama: 'Diseño Industrial',
      titulo: 'Mobiliario Urbano Inteligente con Paneles Solares',
      institucion: 'TecNM / Instituto Tecnológico de Gustavo A. Madero',
      fechaSolicitud: '2025-08-07',
      numeroExpediente: 'EXP-0010',
      numeroCertificado: 'CERT-0010',
      estatus: 'En trámite',
      descripcion: '',
      observaciones: '',
      inventores: []
    },
    {
      id: 11,
      rama: 'Invención',
      titulo: 'Software de Simulación de Reacciones Químicas',
      institucion: 'TecNM / Instituto Tecnológico de Gustavo A. Madero II',
      fechaSolicitud: '2025-08-04',
      numeroExpediente: 'EXP-0011',
      numeroCertificado: 'CERT-0011',
      estatus: 'En trámite',
      descripcion: '',
      observaciones: '',
      inventores: []
    },
    {
      id: 12,
      rama: 'Modelo de Utilidad',
      titulo: 'Sistema de Riego por Goteo de Alta Eficiencia',
      institucion: 'TecNM / Instituto Tecnológico José Mario Molina Pasquel y Henríquez',
      fechaSolicitud: '2025-08-01',
      numeroExpediente: 'EXP-0012',
      numeroCertificado: 'CERT-0012',
      estatus: 'En trámite',
      descripcion: '',
      observaciones: '',
      inventores: []
    },
    {
      id: 13,
      rama: 'Invención',
      titulo: 'Prótesis Robótica Controlada por Señales Neuronales',
      institucion: 'TecNM / Instituto Tecnológico de Celaya',
      fechaSolicitud: '2025-07-29',
      numeroExpediente: 'EXP-0013',
      numeroCertificado: 'CERT-0013',
      estatus: 'En trámite',
      descripcion: '',
      observaciones: '',
      inventores: []
    },
    {
      id: 14,
      rama: 'Diseño Industrial',
      titulo: 'Empaque Ecológico para Alimentos a Base de Algas',
      institucion: 'TecNM / Instituto Tecnológico de León',
      fechaSolicitud: '2025-07-25',
      numeroExpediente: 'EXP-0014',
      numeroCertificado: 'CERT-0014',
      estatus: 'En trámite',
      descripcion: '',
      observaciones: '',
      inventores: []
    },
    {
      id: 15,
      rama: 'Modelo de Utilidad',
      titulo: 'Herramienta Multifuncional para Ciclismo Urbano',
      institucion: 'TecNM / Instituto Tecnológico de Irapuato',
      fechaSolicitud: '2025-07-21',
      numeroExpediente: 'EXP-0015',
      numeroCertificado: 'CERT-0015',
      estatus: 'En trámite',
      descripcion: '',
      observaciones: '',
      inventores: []
    }
  ];

  tranlatesPlaceholders: any = {};

  constructor(
    private service: PatentsService,
    private cdr: ChangeDetectorRef,
    private translate: TranslateService,
    private impiService: ImpiRegistriesService,
    private parametrizacionesServices: ParametrizacionesService // ← AGREGAR ESTO

  ) {
    this.tranlatesPlaceholders = {
      METHOD_SUBMISSION: this.translate.instant('FORMS.PLACEHOLDERS.METHOD_SUBMISSION'),
      TYPE_SECTOR: this.translate.instant('FORMS.PLACEHOLDERS.TYPE_SECTOR'),
      SECTOR: this.translate.instant('FORMS.PLACEHOLDERS.SECTOR'),
      SUBSECTOR: this.translate.instant('FORMS.PLACEHOLDERS.SUBSECTOR'),
      COMMENTS: this.translate.instant('FORMS.PLACEHOLDERS.COMMENTS'),
      DESCRIPTION: this.translate.instant('FORMS.PLACEHOLDERS.DESCRIPTION'),
      TYPE_RESEARCHER: this.translate.instant('FORMS.PLACEHOLDERS.TYPE_RESEARCHER'),
      ACADEMIC_PROGRAM: this.translate.instant('FORMS.PLACEHOLDERS.ACADEMIC_PROGRAM'),
      ACADEMIC_RESEARCH: this.translate.instant('FORMS.PLACEHOLDERS.ACADEMIC_RESEARCH'),
      DEPARTMENT: this.translate.instant('FORMS.PLACEHOLDERS.DEPARTMENT'),
    }
  }

  // Helpers para autores
  addInventor(): void {
    if (!this.patenteModel.inventores) this.patenteModel.inventores = [];
    this.patenteModel.inventores.push({
      curp: "PEAJ900101HDFRRN01",
      nombreCompleto: "Pedro Álvarez Juárez",
      sexo: "M",
      tipoInvestigador: "Profesor-Investigador",
      institucion: "Instituto Tecnológico de Orizaba",
      programaEducativo: "Ingeniería en Sistemas Computacionales",
      cuerpoAcademico: "CA de Sistemas Computacionales",
      departamento: "Sistemas Computacionales",
      fechaAfiliacion: "2025-09-12",
      fechaFin: "2027-09-12",
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
    this.cargarCatalogos();
    setTimeout(() => {
      console.log('📚 Ramas disponibles:', this.ramasCatalogo);
      console.log('📚 Estatus disponibles:', this.estatusCatalogo);
      console.log('📚 Medios ingreso disponibles:', this.mediosIngresoCatalogo);
      console.log('📚 Sectores disponibles:', this.tiposSectorCatalogo);
    }, 2000);


    // Para mostrar el mismo arreglo y columnas que en INDAUTOR/local, usa el dataset local propio de este componente

    this.datatableConfig = {
      serverSide: !this.useLocalFakeData,
      lengthMenu: this.lengthMenu,
      pageLength: this.pageLength,
      ordering: true,
      order: [[5, 'desc']],
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
          this.service.getPatents(dataTablesParameters).subscribe({
            next: (resp: any) => {
              callback(resp);
            },
            error: (error: any) => {
              console.error('❌ Error al cargar patentes:', error);
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
          title: 'No. de expediente',
          data: 'numeroExpediente',
          orderDataType: 'dom-text',
          type: 'string',
          orderable: true,
          render: (data) => {
            // Convertimos a string por seguridad, aunque sea numérico
            const strData = data ? String(data) : '—';

            return `
      <span class="fw-semibold text-gray-600"
        style="display: inline-block; max-width: 100px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;">
        EXP-<br>${strData}
      </span>
    `;
          },
        },
        {
          title: 'No. de título',
          data: 'numeroTitulo',
          orderable: true,
          render: (data) => {
            const strData = data ? String(data) : '—';

            return `
      <span class="fw-semibold text-gray-600"
        style="display: inline-block; max-width: 100px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;">
        CERT-<br>${strData}
      </span>
    `;
          },
        },
        {
          title: this.translate.instant('TABLE.BRANCH'),
          data: 'rama',
          orderable: true,
          render: (data, type, full) => {
            // Asegurar que sea string
            const safeData = (data !== undefined && data !== null) ? String(data) : 'Invención';

            const colorClasses = ['success', 'info', 'warning', 'danger'];
            const randomColorClass = colorClasses[Math.floor(Math.random() * colorClasses.length)];

            const nameParts = safeData.split(' ').filter((part: string) => part.length > 0 && !part.endsWith('.'));

            let initials = '';
            if (nameParts.length >= 2) {
              initials = (nameParts[0][0] + nameParts[1][0]).toUpperCase();
            } else if (nameParts.length === 1 && nameParts[0].length >= 2) {
              initials = (nameParts[0][0] + nameParts[0][1]).toUpperCase();
            } else {
              initials = 'IN';
            }

            const symbolLabel = `
      <div class="symbol-label fs-3 bg-light-${randomColorClass} text-${randomColorClass}">
        ${initials}
      </div>
    `;

            const nameAndEmail = `
      <div class="d-flex flex-column" data-action="view" data-id="${full.id}">
        <a href="javascript:;" class="text-gray-800 text-hover-primary mb-1">${safeData}</a>
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
          }
        },
        {
          title: this.translate.instant('TABLE.WORK_TITLE'),
          data: 'nombrePatente',
          orderable: true,
          orderDataType: 'dom-text',
          type: 'string',
          render: (data) => {
            return `<span class="fw-bold fs-6 text-gray-800">${data || ''}</span>`;
          },
        },
        {
          title: this.translate.instant('TABLE.INSTITUTION'),
          data: 'institucion',
          orderable: true,
          render: (data) => {
            return `<span class="fw-semibold text-gray-600">${data || ''}</span>`;
          },
        },
        {
          title: this.translate.instant('TABLE.DATE'),
          data: 'fechaSolicitud',
          orderable: true,
          render: (data) => {
            return `<span class="fw-semibold text-gray-600">${moment(data).format('DD-MM-YYYY')}</span>`;
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
        const institucionEncontrada = instituciones.find((inst: {
          nombre: string;
        }) => inst.nombre === this.patenteModel.institucion);
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
      // ... código para datos fake
    } else {
      this.service.deletePatent(id).subscribe({
        next: () => {
          console.log('✅ Registro deshabilitado correctamente');
          this.reloadEvent.emit(true);

          // Opcional: Mostrar alerta de éxito
          this.showAlert({
            icon: 'success',
            title: 'Eliminado',
            text: 'El registro fue deshabilitado correctamente.'
          });
        },
        error: (error) => {
          console.error('❌ Error al deshabilitar:', error);
          this.showAlert({
            icon: 'error',
            title: 'Error',
            text: 'No se pudo deshabilitar el registro.'
          });
        }
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
          estatus: item.estatus || this.patenteModel.estatus,
          medioIngreso: item.medioIngreso || 'Cuenta Pase IMPI',
          tecnologicoOrigen: item.tecnologicoOrigen || 'Instituto Tecnológico de Morelia',
          cePat: item.cePat || 'Centro Nacional de Investigación y Desarrollo Tecnológico (CENIDET)',
          anioRenovacion: item.anioRenovacion || '2029',
          tipoSector: item.tipoSector || 'Primario',
          sector: item.sector || 'Agricultura',
          subsector: item.subsector || 'Cultivo de granos y cereales (maíz, trigo, sorgo, arroz, avena, cebada)',
          fechaExpedicion: item.fechaExpedicion || '2025-09-10',
          archivo: item.archivo || 'registro_impi_0001.pdf',
          observaciones: item.observaciones || 'Requiere documentación adicional',
          descripcion: item.descripcion || 'Sistema automatizado que utiliza nanotecnología para la purificación de agua residual, incorporando sensores IoT para monitoreo en tiempo real',
          inventores: item.inventores && item.inventores.length ? JSON.parse(JSON.stringify(item.inventores)) : []
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
        console.log('📊 Datos de la patente recibidos:', patente);
        console.log('🔢 Valor de rama:', this.patenteModel.rama);
        console.log('🔢 Tipo de rama:', typeof this.patenteModel.rama);
        console.log('✅ Resultado de getRamaNombre:', this.getRamaNombre(this.patenteModel.rama));
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
          estatus: item.estatus || this.patenteModel.estatus,
          medioIngreso: item.medioIngreso || 'Cuenta Pase IMPI',
          tecnologicoOrigen: item.tecnologicoOrigen || 'Instituto Tecnológico de Morelia',
          cePat: item.cePat || 'Centro Nacional de Investigación y Desarrollo Tecnológico (CENIDET)',
          anioRenovacion: item.anioRenovacion || '2029',
          tipoSector: item.tipoSector || 'Primario',
          sector: item.sector || 'Agricultura',
          subsector: item.subsector || 'Cultivo de granos y cereales (maíz, trigo, sorgo, arroz, avena, cebada)',
          fechaExpedicion: item.fechaExpedicion || '2025-09-10',
          archivo: item.archivo || 'registro_impi_0001.pdf',
          observaciones: item.observaciones || 'Requiere documentación adicional',
          descripcion: item.descripcion || 'Sistema automatizado que utiliza nanotecnología para la purificación de agua residual, incorporando sensores IoT para monitoreo en tiempo real',
          inventores: item.inventores && item.inventores.length ? JSON.parse(JSON.stringify(item.inventores)) : []
        } as PatenteUIModel;
      }
    } else {
      this.service.getPatent(id).subscribe((patente: IPatentModel) => {
        this.patenteModel = { ...this.patenteModel, ...patente };
        this.convertirNombresAIdsParaEdicion();
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
        // Actualizar todos los campos del modal en el arreglo local
        const target = this.FAKE_IMPI_DATA_LOCAL[idx];
        target.titulo = this.patenteModel.denominacion || this.patenteModel.nombrePatente || '';
        target.rama = this.patenteModel.rama || '';
        target.institucion = this.patenteModel.institucion || target.institucion || '';
        target.fechaSolicitud = this.patenteModel.fechaSolicitud || '';
        target.numeroExpediente = this.patenteModel.numeroExpediente || '';
        target.numeroCertificado = this.patenteModel.numeroTitulo || '';
        target.estatus = (this.patenteModel.estatus as EstatusPatente) || target.estatus;
        target.medioIngreso = this.patenteModel.medioIngreso || '';
        target.tecnologicoOrigen = this.patenteModel.tecnologicoOrigen || '';
        target.cePat = this.patenteModel.cePat || '';
        target.anioRenovacion = this.patenteModel.anioRenovacion || '';
        target.tipoSector = this.patenteModel.tipoSector || '';
        target.sector = this.patenteModel.sector || '';
        target.subsector = this.patenteModel.subsector || '';
        target.fechaExpedicion = this.patenteModel.fechaExpedicion || '';
        target.archivo = this.patenteModel.archivo || '';
        target.observaciones = this.patenteModel.observaciones || '';
        target.descripcion = this.patenteModel.descripcion || '';
        target.inventores = (this.patenteModel.inventores || []).map(i => ({ ...i }));

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
        rama_param: (this.patenteModel as any).ramaIdTemp as any,
        estatus: this.patenteModel.estatus as IPatentModel['estatus'],
        descripcion: this.patenteModel.descripcion || '',
        institucion: this.patenteModel.institucion || '',
        correo: this.patenteModel.correo || '',
        documentos: this.patenteModel.documentos || [],
        observaciones: this.patenteModel.observaciones || '',
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
          console.error('❌ Error completo al actualizar patente:', err);
          console.error('❌ Error details:', err.error);
          console.error('❌ Error status:', err.status);
          console.error('❌ Error message:', err.message);
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


  private convertirNombresAIdsParaEdicion(): void {
    if (this.patenteModel.rama && typeof this.patenteModel.rama === 'string') {
      const ramaEncontrada = this.ramasCatalogo.find(r =>
        r.nombre.toLowerCase().trim() === (this.patenteModel.rama as string).toLowerCase().trim()
      );
      if (ramaEncontrada) {
        // Guardar el ID en una propiedad temporal para el select
        (this.patenteModel as any).ramaIdTemp = ramaEncontrada.id;
        console.log(`✅ Rama convertida: "${this.patenteModel.rama}" → ID ${ramaEncontrada.id}`);
      } else {
        console.warn(`⚠️ No se encontró rama con nombre: "${this.patenteModel.rama}"`);
      }
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

    switch (currentStatus) {
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
      next: (response: any) => {
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
      error: (error: any) => {
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

  private cargarCatalogos(): void {
    this.parametrizacionesServices.getAll().subscribe({
      next: (catalogos: Catalogos) => {
        console.log('✅ Catálogos completos cargados:', catalogos);

        // 🔹 Cargar Ramas (id_tema = 3)
        if (catalogos[3]?.lista) {
          this.ramasCatalogo = catalogos[3].lista.map((r: Parametrizacion) => ({
            id: r.id_param,
            nombre: r.nombre
          }));
          console.log('✅ Ramas cargadas:', this.ramasCatalogo);
        }

        // 🔹 Cargar Medios de Ingreso (id_tema = 8)
        if (catalogos[8]?.lista) {
          this.mediosIngresoCatalogo = catalogos[8].lista.map((m: Parametrizacion) => ({
            id: m.id_param,
            nombre: m.nombre
          }));
          console.log('✅ Medios de ingreso cargados:', this.mediosIngresoCatalogo);
        }

        // 🔹 Cargar Tipos de Sector (id_tema = 2)
        if (catalogos[2]?.lista) {
          this.tiposSectorCatalogo = catalogos[2].lista.map((s: Parametrizacion) => ({
            id: s.id_param,
            nombre: s.nombre
          }));
          console.log('✅ Tipos de sector cargados:', this.tiposSectorCatalogo);
        }

        // 🔹 Cargar Estatus (id_tema = 5)
        if (catalogos[5]?.lista) {
          this.estatusCatalogo = catalogos[5].lista.map((e: Parametrizacion) => ({
            id: e.id_param,
            nombre: e.nombre
          }));
          console.log('✅ Estatus cargados:', this.estatusCatalogo);
        }
      },
      error: (err) => console.error('❌ Error al cargar catálogos:', err)
    });
  }


  getRamaNombre(ramaId: string | number | undefined): string {
    if (!ramaId) return 'N/A';
    const id = typeof ramaId === 'string' ? parseInt(ramaId) : ramaId;
    const rama = this.ramasCatalogo.find(r => r.id === id);
    return rama ? rama.nombre : 'N/A';
  }

  getMedioIngresoNombre(medioId: string | number | undefined): string {
    if (!medioId) return 'N/A';
    const id = typeof medioId === 'string' ? parseInt(medioId) : medioId;
    const medio = this.mediosIngresoCatalogo.find(m => m.id === id);
    return medio ? medio.nombre : 'N/A';
  }

  getTipoSectorNombre(sectorId: string | number | undefined): string {
    if (!sectorId) return 'N/A';
    const id = typeof sectorId === 'string' ? parseInt(sectorId) : sectorId;
    const sector = this.tiposSectorCatalogo.find(s => s.id === id);
    return sector ? sector.nombre : 'N/A';
  }

  getEstatusNombre(estatusId: string | number | undefined): string {
    if (!estatusId) return 'N/A';
    const id = typeof estatusId === 'string' ? parseInt(estatusId) : estatusId;
    const estatus = this.estatusCatalogo.find(e => e.id === id);
    return estatus ? estatus.nombre : 'N/A';
  }

  ngOnDestroy(): void {
    this.reloadEvent.unsubscribe();
  }


}


