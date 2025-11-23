import { AfterViewInit, ChangeDetectorRef, Component, EventEmitter, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { DataTablesResponse } from '../../../administrador/shared-services';
import { Config } from 'datatables.net';
import { SwalComponent } from '@sweetalert2/ngx-sweetalert2';
import { SweetAlertOptions } from 'sweetalert2';
import moment from 'moment/moment';
import { PatentsService } from '../../../../api/services/patents.service';
import { TranslateService } from '@ngx-translate/core';
import { Observable } from 'rxjs';
import { IPatentModel, PatenteUIModel } from 'src/app/api/models/patent.model';
import { FederalEntity } from 'src/app/api/models/entity.model';
import { ENTIDADES_FEDERATIVAS_DATA } from 'src/app/api/data/entity.data';
import { ENTIDADES_FEDERATIVAS_MAP } from 'src/app/api/data/entity-institucion.data';
import { ImpiRegistriesService } from '../../../../api/services/impi.service';
import { ParametrizacionesService, Catalogos, Parametrizacion, } from '../../../../api/services/parametrizaciones.service';

type EstatusPatente = 'Registrada' | 'En trámite' | 'Trámite con observaciones' | 'Aprobada' | 'Concluida';

interface Inventor {
  curp: string;
  nombreCompleto: string;
  sexo: string;
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

/* export type PatenteUIModel = IPatentModel & {
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
}; */

interface ParametroItem {
  id: number;
  nombre: string;
}

interface SubsectorItem {
  id: number;
  nombre: string;
  sector: string;
  tipoSector: string;
}

@Component({
  selector: 'app-patente',
  templateUrl: './patente.component.html',
  styleUrl: './patente.component.scss'
})
export class PatenteComponent implements OnInit, AfterViewInit, OnDestroy {
  isCollapsed1 = false;
  isCollapsed2 = true;
  ramasCatalogo: Parametrizacion[] = [];
  mediosIngresoCatalogo: Parametrizacion[] = [];
  tiposSectorCatalogo: Parametrizacion[] = [];
  estatusCatalogo: Parametrizacion[] = [];
  // 🔹 Catálogo de subsectores (para el <select> de subsector)
  subsectoresCatalogo: Parametrizacion[] = [];

  // 🔹 Catálogos fijos para Tecnológico de Origen y CePat
  tecnologicosOrigenCatalogo: string[] = [
    '-',
    'TecNM / Instituto Tecnológico de Orizaba',
    'TecNM / Instituto Tecnológico de Morelia',
    'TecNM / Instituto Tecnológico de Ciudad Juárez',
    'Centro Nacional de Investigación y Desarrollo Tecnológico (CENIDET)'
  ];

  cePatCatalogo: string[] = [
    'N/A',
    'CePat Centro',
    'CePat Noreste',
    'CePat Noroeste',
    'CePat Sur-Sureste'
  ];

  // 🔹 Años de renovación: año actual ± 30
  aniosRenovacion: number[] = [];

  // 🔹 Catálogos completos para poder resolver subsector → sector / tipo sector
  private catalogosAll: Catalogos | null = null;

  // 🔹 Id de subsector seleccionado en el modal
  subsectorIdSeleccionado: number | null = null;

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
    cePat: "N/A",
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


  search: string;

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
        this.selectedPage = pageInfo.page;
      });
    }
  }

  ngOnInit(): void {
    this.placeholder = this.translate.instant('TABLE.PLACEHOLDER_SEARCH')
    this.cargarCatalogos();


    // Para mostrar el mismo arreglo y columnas que en INDAUTOR/local, usa el dataset local propio de este componente

    this.datatableConfig = {
      serverSide: !this.useLocalFakeData,
      lengthMenu: this.lengthMenu,
      pageLength: this.pageLength,
      ordering: true,
      orderMulti: false,
      order: [[5, 'desc']],
      columnDefs: [
        {
          targets: '_all',
          orderSequence: ['asc', 'desc']
        }
      ],
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
          this.service.getPatents(dataTablesParameters, this.search).subscribe({
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
          data: 'id_registro',
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
          data: 'rama_param',
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
        this.selectedPage = this.dtInstance.page.info().page;

        this.dtInstance.on('page', () => {
          const pageInfo = this.dtInstance.page.info();
          const currentPage = pageInfo.page;
          this.selectedPage = pageInfo.page;
        });

        this.cdr.detectChanges();
      }
    };
  }

  onFilter(ev: any) {
    this.search = ev.target.value?.trim() || '';
    console.log('search: ' + this.search)
    if (this.dtInstance) {
      this.dtInstance.ajax.reload(); // fuerza server-side con q=this.search
    }
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
    // 🔹 Rama: el backend manda el nombre en rama_param
    if ((this.patenteModel as any).rama_param && !this.patenteModel.rama) {
      this.patenteModel.rama = (this.patenteModel as any).rama_param as string;
    }

    // 🔹 Medio de ingreso: idem, backend manda el nombre en medio_ingreso_param
    if ((this.patenteModel as any).medio_ingreso_param && !this.patenteModel.medioIngreso) {
      this.patenteModel.medioIngreso = (this.patenteModel as any).medio_ingreso_param as string;
    }

    // 🔹 Años de renovación: regeneramos la lista y respetamos el valor existente
    this.generarAniosRenovacion();

    // 🔹 Subsector: usar id_subsector (si viene) o el nombre para seleccionar en el combo
    if (this.catalogosAll && this.subsectoresCatalogo?.length) {
      const valorSubsector =
        (this.patenteModel as any).id_subsector ??
        this.patenteModel.subsector ??
        '';

      const porId = this.subsectoresCatalogo.find(
        s => String(s.id_param) === String(valorSubsector)
      );
      const porNombre = this.subsectoresCatalogo.find(
        s => s.nombre === valorSubsector
      );

      const subEncontrado = porId || porNombre || null;

      this.subsectorIdSeleccionado = subEncontrado ? subEncontrado.id_param : null;

      if (this.subsectorIdSeleccionado) {
        this.actualizarSectorDesdeSubsector(this.subsectorIdSeleccionado);
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

      this.service.getPatent(id).subscribe({
        next: (patente: any) => {
          console.log('dato receive:', patente)

          this.patenteModel = { ...this.patenteModel, ...patente };

          /* this.convertirNombresAIdsParaEdicion();

          if (!this.patenteModel.denominacion) {
            this.patenteModel.denominacion = this.patenteModel.nombrePatente;
          } */
          // Si no hay denominación, usamos el nombrePatente
          if (!this.patenteModel.denominacion) {
            this.patenteModel.denominacion = this.patenteModel.nombrePatente;
          }

          // ⬇️ Llenar selects con la info correspondiente de catálogos
          this.inicializarSeleccionesDesdePatente();

        },
        error: (err) => {
          console.error('[PatenteComponent] Error al cargar el registro para edición:', err);
        }
      });
    }
  }

  saveEdit(modal: any) {
    if (!this.patenteModel) {
      const alertaError: SweetAlertOptions = {
        icon: 'error',
        title: 'Error',
        text: 'No se encontró la información del registro a editar.',
      };
      this.showAlert(alertaError);
      return;
    }

    // Identificador del registro (viene como id_registro o id)
    const id =
      (this.patenteModel as any).id_registro ??
      (this.patenteModel as any).id;

    if (!id) {
      const alertaError: SweetAlertOptions = {
        icon: 'error',
        title: 'Error',
        text: 'No se encontró el identificador del registro a editar.',
      };
      this.showAlert(alertaError);
      return;
    }

    // Validación mínima de campos obligatorios
    if (!this.patenteModel.denominacion || !this.patenteModel.denominacion.trim()) {
      const alertaError: SweetAlertOptions = {
        icon: 'warning',
        title: 'Campos obligatorios',
        text: 'La denominación no puede estar vacía.',
      };
      this.showAlert(alertaError);
      return;
    }

    this.isSaving = true;

    // --- Mapeo de catálogos (Rama, Medio de ingreso, Subsector) ---

    // 1) Rama: buscamos el id_param a partir del nombre elegido en el <select>
    const ramaSeleccionada = this.ramasCatalogo.find(
      r => r.nombre === this.patenteModel.rama
    );
    const ramaParamId = ramaSeleccionada?.id_param;

    // 2) Medio de ingreso
    const medioSeleccionado = this.mediosIngresoCatalogo.find(
      m => m.nombre === this.patenteModel.medioIngreso
    );
    const medioIngresoParamId = medioSeleccionado?.id_param;

    // 3) Subsector: id y nombre (el nombre lo mostramos en UI / reporte)
    let subsectorId: number | string | null = null;
    let subsectorNombre: string | null = null;

    if (this.subsectorIdSeleccionado) {
      const subsector = this.subsectoresCatalogo.find(
        s => s.id_param === this.subsectorIdSeleccionado
      );
      subsectorId = subsector?.id_param ?? null;
      subsectorNombre = subsector?.nombre ?? null;
    } else if (this.patenteModel.subsector) {
      // En registros antiguos, subsector viene como id en string (ej. "282")
      subsectorId = this.patenteModel.subsector;
      subsectorNombre = this.obtenerNombreSubsectorPorId(this.patenteModel.subsector);
    }

    if (this.subsectorIdSeleccionado) {
      this.patenteModel.subsector = String(this.subsectorIdSeleccionado);
    }
    // Si a partir del subsector ya actualizaste tipoSector y sector
    // en el método actualizarSectorDesdeSubsector(), aquí solo los respetamos.

    // --- Construimos el payload explícito que se mandará al servicio ---

    const payload: any = {
      // Identificadores y títulos
      id,
      id_registro: id,
      solicitudId: this.patenteModel.solicitudId || this.patenteModel.no_expediente || this.patenteModel.numeroExpediente,
      no_expediente: this.patenteModel.no_expediente || this.patenteModel.solicitudId || this.patenteModel.numeroExpediente,
      numeroExpediente: this.patenteModel.numeroExpediente || this.patenteModel.no_expediente,
      titulo: this.patenteModel.titulo || this.patenteModel.denominacion || this.patenteModel.nombrePatente,
      nombrePatente: this.patenteModel.denominacion || this.patenteModel.nombrePatente,
      denominacion: this.patenteModel.denominacion,

      // Datos de solicitud (usuario, institución, correo)
      solicitante: this.patenteModel.solicitante,
      institucion: this.patenteModel.institucion,
      correo: this.patenteModel.correo,

      // Fechas (se mandan como string YYYY-MM-DD, el servicio las normaliza)
      fechaSolicitud: this.patenteModel.fechaSolicitud,
      fechaExpedicion: this.patenteModel.fechaExpedicion || null,

      // Descripción y observaciones
      descripcion: this.patenteModel.descripcion,
      observaciones: this.patenteModel.observaciones,

      // Estatus (texto, el servicio lo mapea a id)
      estatus: this.patenteModel.estatus,

      // Rama, Medio de ingreso, Tecnológico de origen, CePat, Año de renovación
      rama: this.patenteModel.rama,
      medioIngreso: this.patenteModel.medioIngreso,
      tecnologicoOrigen: this.patenteModel.tecnologicoOrigen,
      cePat: this.patenteModel.cePat,
      anioRenovacion: this.patenteModel.anioRenovacion,

      // Sector / Tipo de sector (texto calculado a partir del subsector)
      tipoSector: this.patenteModel.tipoSector,
      sector: this.patenteModel.sector,

      // Subsector como texto para UI/reportes
      subsector: subsectorNombre || this.patenteModel.subsector,

      // Documento
      archivo: this.patenteModel.archivo || (this.patenteModel.documentos?.[0] ?? ''),

      // Inventores
      inventores: this.patenteModel.inventores || [],

      // Hints explícitos para el backend (id de parametrización):
      // se usarán en mapFrontendToBackend si existen
      rama_param: ramaParamId ?? (this.patenteModel as any).rama_param,
      medio_ingreso_param: medioIngresoParamId ?? (this.patenteModel as any).medio_ingreso_param,
      tipo_sector_param: (this.patenteModel as any).tipo_sector_param, // si lo estás manejando por id
      id_subsector: subsectorId,
      tipo_ingreso_param: (this.patenteModel as any).tipo_ingreso_param, // ej. IMPI = 44
    };

    console.log('[PatenteComponent] Payload a enviar en update:', payload);

    this.service.updatePatent(id, payload).subscribe({
      next: () => {
        this.isSaving = false;

        const alertaExito: SweetAlertOptions = {
          icon: 'success',
          title: 'Registro actualizado',
          text: 'La patente se actualizó correctamente.',
        };
        this.showAlert(alertaExito);

        modal.close();
        this.reloadEvent.emit(true);
      },
      error: (error) => {
        this.isSaving = false;
        console.error('Error al actualizar patente:', error);
        const alertaError: SweetAlertOptions = {
          icon: 'error',
          title: 'Error',
          text: 'Ocurrió un problema al actualizar la patente. Inténtalo de nuevo.',
        };
        this.showAlert(alertaError);
      },
    });
  }

  private obtenerNombreSubsectorPorId(idSubsector: string | number): string {
    if (!this.subsectoresCatalogo || !this.subsectoresCatalogo.length) {
      return 'N/A';
    }

    // Normalizamos el id a número
    const id = typeof idSubsector === 'string' ? parseInt(idSubsector, 10) : idSubsector;
    if (isNaN(id)) {
      return 'N/A';
    }

    // Buscamos en el catálogo de subsectores por id_param
    const subsector = this.subsectoresCatalogo.find(s => s.id_param === id);
    return subsector ? subsector.nombre : 'N/A';
  }


  private convertirNombresAIdsParaEdicion(): void {
    if (this.patenteModel.rama && typeof this.patenteModel.rama === 'string') {
      const ramaEncontrada = this.ramasCatalogo.find(r =>
        r.nombre.toLowerCase().trim() === (this.patenteModel.rama as string).toLowerCase().trim()
      );
      if (ramaEncontrada) {
        // Guardar el ID en una propiedad temporal para el select
        (this.patenteModel as any).ramaIdTemp = ramaEncontrada.id_param;
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
      next: (catalogos) => {
        this.catalogosAll = catalogos;

        // id_tema según tu backend:
        this.ramasCatalogo = catalogos[3]?.lista ?? []; // rama_param
        this.mediosIngresoCatalogo = catalogos[8]?.lista ?? []; // medio_ingreso_param
        this.tiposSectorCatalogo = catalogos[2]?.lista ?? []; // tipo_sector_param
        this.estatusCatalogo = catalogos[7]?.lista ?? []; // estatus_param
        this.subsectoresCatalogo = catalogos[17]?.lista ?? []; // subsectores/actividades

        this.generarAniosRenovacion();
      },
      error: (err) => {
        console.error('[PatenteComponent] Error al cargar catálogos:', err);
      },
    });
  }


  private generarAniosRenovacion(): void {
    const currentYear = new Date().getFullYear();
    const start = currentYear - 30;
    const end = currentYear + 30;

    this.aniosRenovacion = [];
    for (let y = start; y <= end; y++) {
      this.aniosRenovacion.push(y);
    }

    // Si ya hay un año de renovación en el modelo y no está en el rango, lo agregamos
    if (this.patenteModel.anioRenovacion && this.patenteModel.anioRenovacion !== 'N/A') {
      const asNumber = Number(this.patenteModel.anioRenovacion);
      if (!isNaN(asNumber) && !this.aniosRenovacion.includes(asNumber)) {
        this.aniosRenovacion.push(asNumber);
        this.aniosRenovacion.sort((a, b) => a - b);
      }
    }
  }

  private findParamById(idParam: number): Parametrizacion | undefined {
    if (!this.catalogosAll) {
      return undefined;
    }

    // Recorre todos los temas hasta encontrar el id_param
    for (const temaIdStr of Object.keys(this.catalogosAll)) {
      const tema = this.catalogosAll[Number(temaIdStr)];
      const encontrado = tema?.mapa[idParam];
      if (encontrado) {
        return encontrado;
      }
    }
    return undefined;
  }

  private actualizarSectorDesdeSubsector(idSubsector: number | null): void {
    if (!idSubsector || !this.catalogosAll) {
      this.patenteModel.sector = '';
      this.patenteModel.tipoSector = '';
      this.patenteModel.subsector = 'N/A';
      return;
    }

    const temaSubsectores = this.catalogosAll[17];
    const subsector = temaSubsectores?.mapa[idSubsector];

    if (!subsector) {
      console.warn('⚠️ Subsector no encontrado para id', idSubsector);
      return;
    }

    // Guardar el id en el modelo (este campo es el que viaja al backend)
    this.patenteModel.subsector = String(subsector.id_param);

    const chain = this.service.getSectorChainFromSubsector(idSubsector);

    this.patenteModel.tipoSector = chain.tipoSector;
    this.patenteModel.sector = chain.sector;
  }

  onSubsectorChange(event: any): void {
    const value = (event.target as HTMLSelectElement).value;
    this.subsectorIdSeleccionado = value ? Number(value) : null;
    this.actualizarSectorDesdeSubsector(this.subsectorIdSeleccionado);
  }

  getRamaNombre(ramaId: string | number | undefined): string {
    if (!ramaId) return 'N/A';
    const id = typeof ramaId === 'string' ? parseInt(ramaId) : ramaId;
    const rama = this.ramasCatalogo.find(r => r.id_param === id);
    return rama ? rama.nombre : 'N/A';
  }

  getMedioIngresoNombre(medioId: string | number | undefined): string {
    if (!medioId) return 'N/A';
    const id = typeof medioId === 'string' ? parseInt(medioId) : medioId;
    const medio = this.mediosIngresoCatalogo.find(m => m.id_param === id);
    return medio ? medio.nombre : 'N/A';
  }

  getTipoSectorNombre(sectorId: string | number | undefined): string {
    if (!sectorId) return 'N/A';
    const id = typeof sectorId === 'string' ? parseInt(sectorId) : sectorId;
    const sector = this.tiposSectorCatalogo.find(s => s.id_param === id);
    return sector ? sector.nombre : 'N/A';
  }

  getEstatusNombre(estatusId: string | number | undefined): string {
    if (!estatusId) return 'N/A';
    const id = typeof estatusId === 'string' ? parseInt(estatusId) : estatusId;
    const estatus = this.estatusCatalogo.find(e => e.id_param === id);
    return estatus ? estatus.nombre : 'N/A';
  }

  ngOnDestroy(): void {
    this.reloadEvent.unsubscribe();
  }


}


