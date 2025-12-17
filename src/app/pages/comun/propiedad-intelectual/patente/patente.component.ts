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
import { CepatService, Cepat } from 'src/app/api/services/cepat.service';
import { InstitucionesService, Institucion } from 'src/app/api/services/insttituciones.service';
import { FileUploadService } from '../../../../api/services/file-upload.service';

type EstatusPatente = 'Registrada' | 'En trámite' | 'Trámite con observaciones' | 'Aprobada' | 'Concluida';

import { Inventor } from '../../../../api/models/patent.model';
import { forkJoin, of } from 'rxjs';  // Agrega esta importación para forkJoin y of

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
  readonly RAMAS_IMPI_IDS = [176, 177, 178, 179, 180, 181];

  cepatList: Cepat[] = [];

  // 🔹 Subconjunto filtrado por CEPA seleccionado
  institucionesCepat: Institucion[] = [];

  // 🔹 Todas las instituciones que devuelve el backend
  todasInstituciones: Institucion[] = [];

  // 🔹 Mapa auxiliar: id_cepat -> lista de instituciones
  private mapaCepatInstituciones: { [idCepat: number]: Institucion[] } = {};
  // 🔹 Mapas auxiliares para buscar CEPA a partir de una institución
  private mapaInstitucionACepatPorId: { [idInstitucion: number]: number } = {};
  private mapaInstitucionACepatPorNombre: Map<string, number> = new Map<string, number>();


  // Selecciones actuales
  selectedCepatId: number | null = null;
  institucionSeleccionadaCepat: number | null = null;

  // Selecciones actuales
  isCollapsed1 = false;
  isCollapsed2 = true;
  ramasCatalogo: Parametrizacion[] = [];
  mediosIngresoCatalogo: Parametrizacion[] = [];
  tiposSectorCatalogo: Parametrizacion[] = [];
  estatusCatalogo: Parametrizacion[] = [];
  // 🔹 Catálogo de subsectores (para el <select> de subsector)
  subsectoresCatalogo: Parametrizacion[] = [];
  // 🔹 Catálogo de sectores (deducidos de los subsectores)
  sectoresCatalogo: Parametrizacion[] = [];

  // 🔹 Listas filtradas según lo que selecciona el usuario
  sectoresFiltrados: Parametrizacion[] = [];
  subsectoresFiltrados: Parametrizacion[] = [];

  // 🔹 Selecciones actuales de tipo de sector y sector
  tipoSectorSeleccionadoId: number | null = null;
  sectorSeleccionadoId: number | null = null;

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

  @ViewChild('archivoInput')
  archivoInput: any;

  swalOptions: SweetAlertOptions = {};

  placeholder: string = '';

  private isInicializandoDesdeRegistro = false;

  aPatente: Observable<IPatentModel>
  CURRENT_YEAR = new Date().getFullYear().toString();

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
    anioRenovacion: this.CURRENT_YEAR,
    tipoSector: "",
    sector: "",
    subsector: "",
    fechaExpedicion: "",
    archivo: "",
    observaciones: "",
    inventores: [
      {
        curp: "",
        nombre: "",
        apellidoPaterno: "",
        apellidoMaterno: "",
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

  // Referencia a la institución que viene del registro actual
  private institucionEnEdicion: Institucion | null = null;

  entidadesFederativas: FederalEntity[] = ENTIDADES_FEDERATIVAS_DATA
  institucionesFiltradas: any[] = []
  estadoSeleccionado: number | null = null
  institucionSeleccionada: number | null = null

  selectedFile: File | null = null;
  filePreviewUrl: string | null = null;
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
  private readonly FAKE_IMPI_DATA_LOCAL: ImpiLocalItem[] = [ ];

  tranlatesPlaceholders: any = {};

  constructor(
    private service: PatentsService,
    private cdr: ChangeDetectorRef,
    private translate: TranslateService,
    private impiService: ImpiRegistriesService,
    private parametrizacionesServices: ParametrizacionesService,
    private cepatService: CepatService,
    private institucionesService: InstitucionesService,
    private fileUploadService: FileUploadService,
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

  /**
 * 🔹 Reconstruye el mapa id_cepat -> instituciones
 *    usando this.cepatList y this.todasInstituciones.
 */
  private reconstruirMapaCepatInstituciones(): void {
    console.log('[reconstruirMapaCepatInstituciones] Iniciando construcción del mapa');
    console.log('  - cepatList.length:', this.cepatList?.length || 0);
    console.log('  - todasInstituciones.length:', this.todasInstituciones?.length || 0);

    // Si aún no tengo alguno de los dos catálogos, no hago nada
    if (!this.cepatList?.length || !this.todasInstituciones?.length) {
      console.log('[reconstruirMapaCepatInstituciones] Faltan catálogos, se omite construcción');
      return;
    }

    const mapa: { [idCepat: number]: Institucion[] } = {};

    // Inicializamos las llaves con los CEPat existentes
    for (const ce of this.cepatList) {
      if (ce && ce.id_cepat != null) {
        mapa[ce.id_cepat] = [];
      }
    }

    // Agrupamos las instituciones por su id_cepat
    for (const inst of this.todasInstituciones) {
      const idCepat = inst.id_cepat;

      if (idCepat != null) {
        if (!mapa[idCepat]) {
          mapa[idCepat] = [];
        }
        mapa[idCepat].push(inst);
      }
    }

    // Opcional: podrías guardar también las instituciones sin CEPat
    // const sinCepat = this.todasInstituciones.filter(i => i.id_cepat == null);
    // if (sinCepat.length) {
    //   mapa[0] = sinCepat; // ejemplo, 0 para "sin CEPat"
    // }

    this.mapaCepatInstituciones = mapa;

    console.log('[reconstruirMapaCepatInstituciones] Mapa construido:');
    for (const [idCepat, instituciones] of Object.entries(mapa)) {
      console.log(`  - CEPat ${idCepat}: ${instituciones.length} instituciones`);
    }
  }

  // Helpers para autores

  addInventor(): void {
  if (!this.patenteModel.inventores) {
    this.patenteModel.inventores = [];
  }

  this.patenteModel.inventores.push({
    curp: '',
    nombre: '',
    apellidoPaterno: '',
    apellidoMaterno: '',
    sexo: '',
    tipoInvestigador: '',
    institucion: '',
    programaEducativo: '',
    cuerpoAcademico: '',
    departamento: '',
    fechaAfiliacion: '',
    fechaFin: '',
  });
}


cargarCurp(inv: any): void {
  if (!inv.curp) {
    return;
  }

 const persona = this.listaInvestigadores.find(
    (p: any) => p.curp === inv.curp
  );

  if (!persona) {
    return;
  }

  inv.nombre = persona.nombre;
  inv.apellidoPaterno = persona.apellidoPaterno;
  inv.apellidoMaterno = persona.apellidoMaterno;
  inv.sexo = persona.sexo;
  inv.tipoInvestigador = persona.tipoInvestigador;
  inv.institucion = persona.institucion;
  inv.programaEducativo = persona.programaEducativo;
  inv.cuerpoAcademico = persona.cuerpoAcademico;
  inv.departamento = persona.departamento;
  inv.fechaAfiliacion = persona.fechaAfiliacion;
  inv.fechaFin = persona.fechaFin;

  console.log('✅ Datos del inventor actualizados desde CURP:', inv);
  console.log('   Persona encontrada:', persona);
}



private hydrateInventores(): void {
  if (!this.patenteModel?.inventores || this.patenteModel.inventores.length === 0) {
    return;
  }

  let hidratados = 0;
  this.patenteModel.inventores.forEach((inv, index) => {
    if (inv.curp) {
      const persona = this.listaInvestigadores.find(p => p.curp === inv.curp);
      if (persona) {
        // Copiamos todos los datos
        Object.assign(inv, persona);
        hidratados++;
        console.log(`✅ Inventor ${index + 1} hidratado: ${inv.curp} → ${inv.nombre} ${inv.apellidoPaterno}`);
      } else {
        console.warn(`⚠️ CURP no encontrada en la lista: ${inv.curp}`);
      }
    }
  });

  console.log(`✅ Hidratación completada: ${hidratados}/${this.patenteModel.inventores.length} inventores`);

  // Forzamos detección de cambios si es necesario (por si el modal ya está abierto)
  this.cdr.detectChanges();
}
onCurpChange(inv: any): void {
  if (!inv.curp) {
    return;
  }

 const persona = this.listaInvestigadores.find(
    (p: any) => p.curp === inv.curp
  );

  if (!persona) {
    return;
  }

          const sexoValue = Number(inv.sexo);
        if (sexoValue === 2) {
          inv.sexo = "Femenino";
        } else if (sexoValue === 1) {
          inv.sexo = "Masculino";
        } else {
          inv.sexo = "Otro";
        }

        const tipoInvValue = Number(inv.tipoInvestigador);
        if (tipoInvValue === 46) {
          inv.tipoInvestigador = "Docente";
        } else if (tipoInvValue === 47) {
          inv.tipoInvestigador = "Administrativo";
        } else if (tipoInvValue === 48) {
          inv.tipoInvestigador = "Alumno";
        }
      

  inv.nombre = persona.nombre;
  inv.apellidoPaterno = persona.apellidoPaterno;
  inv.apellidoMaterno = persona.apellidoMaterno;
  inv.institucion = persona.institucion;
  inv.programaEducativo = persona.programaEducativo;
  inv.cuerpoAcademico = persona.cuerpoAcademico;
  inv.departamento = persona.departamento;
  inv.fechaAfiliacion = persona.fechaAfiliacion;
  inv.fechaFin = persona.fechaFin;

  console.log('✅ Datos del inventor actualizados desde CURP:', inv);
  console.log('   Persona encontrada:', persona);
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

listaInvestigadores: Inventor[] = [];





cargarInvestigadores(): void {
  this.service.getInvestigadores().subscribe({
    
    next: (data) => {
      // Map API Inventor to local Inventor interface
      this.listaInvestigadores = data.map((item: any) => (
        // haz que si sexo es dos pone F, si es uno pone M, si es otro pone otro


        {
        curp: item.curp || '',
        nombre: item.nombre || item.nombre || '',
        apellidoPaterno: item.ape_pat || '',
        apellidoMaterno: item.ape_mat || '',
        sexo: item.sexo_param  || '',
        tipoInvestigador: item.tipo_investigador_param || '',
        institucion: item.institucion || '',
        programaEducativo: item.programaEducativo || '',
        cuerpoAcademico: item.cuerpoAcademico || '',
        departamento: item.departamento || '',
        fechaAfiliacion: item.fechaAfiliacion || '',
        fechaFin: item.fechaFin || ''
      }));
      console.log('✅ Investigadores cargados:', this.listaInvestigadores);
    },
    error: (err) => {
      console.error('❌ Error al cargar investigadores:', err);
    }
  });
}


  ngOnInit(): void {
    this.placeholder = this.translate.instant('TABLE.PLACEHOLDER_SEARCH')
    this.cargarCatalogos();
    this.cargarCepats();
    this.cargarTodasInstituciones();
    this.cargarInvestigadores();
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
              console.log(resp)
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
            return `<span class="fw-semibold text-gray-600">${data === '-' ? 'N/A' : data}</span>`;
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
    if (this.dtInstance) {
      this.dtInstance.ajax.reload(); // fuerza server-side con q=this.search
    }
  }

  /**
 * Construye los mapas:
 *  - id_institucion  -> id_cepat
 *  - nombre_normalizado -> id_cepat
 * Solo toma en cuenta instituciones que YA tienen id_cepat ≠ null.
 */
  private reconstruirMapaInstitucionCepat(): void {
    this.mapaInstitucionACepatPorId = {};
    this.mapaInstitucionACepatPorNombre = new Map<string, number>();

    if (!this.todasInstituciones?.length) {
      return;
    }

    const normalizar = (s: string) =>
      s.normalize('NFD').replace(/[\u0300-\u036f]/g, '').trim().toLowerCase();

    for (const inst of this.todasInstituciones) {
      if (!inst || inst.id_cepat == null) {
        // Si la institución no tiene id_cepat en BD, aquí no nos sirve
        continue;
      }

      // 🔹 Mapa por id_institucion
      if (inst.id_institucion != null) {
        this.mapaInstitucionACepatPorId[inst.id_institucion] = inst.id_cepat;
      }

      // 🔹 Mapa por nombre normalizado (evitamos sobrescribir si hay ambigüedad)
      const nombreNorm = normalizar(inst.nombre || '');
      if (nombreNorm && !this.mapaInstitucionACepatPorNombre.has(nombreNorm)) {
        this.mapaInstitucionACepatPorNombre.set(nombreNorm, inst.id_cepat);
      }
    }

    console.log('[mapaInstitucionACepatPorId]', this.mapaInstitucionACepatPorId);
    console.log('[mapaInstitucionACepatPorNombre]', this.mapaInstitucionACepatPorNombre);
  }

  private cargarTodasInstituciones(): void {
    this.institucionesService.getAll().subscribe({
      next: (instituciones) => {
        this.todasInstituciones = instituciones || [];

        // 🔹 Construir los mapas de institución -> CEPA
        this.reconstruirMapaInstitucionCepat();

        // 🔹 Construir mapa de CEPA -> instituciones
        this.reconstruirMapaCepatInstituciones();

        // 🔹 Intentar preseleccionar solo si ya tenemos ambos catálogos cargados
        if (this.patenteModel && (this.patenteModel as any).id_registro && this.cepatList?.length) {
          this.preseleccionarCepatEInstitucionDesdeRegistro();
        }
      },
      error: (err) => {
        console.error('Error al cargar instituciones:', err);
        this.todasInstituciones = [];
      }
    });
  }




  private cargarCepats(): void {
    this.cepatService.getAllCepat().subscribe({
      next: (data: any) => {
        this.cepatList = data || [];

        // 🔹 Intentar construir el mapa (si ya hay instituciones cargadas)
        this.reconstruirMapaCepatInstituciones();

        // 🔹 Intentar preseleccionar solo si ya tenemos ambos catálogos cargados
        if (this.patenteModel && (this.patenteModel as any).id_registro && this.todasInstituciones?.length) {
          this.preseleccionarCepatEInstitucionDesdeRegistro();
        }
      },
      error: (err: any) => {
        console.error('Error al cargar CEPA:', err);
        this.cepatList = [];
      }
    });
  }



  /**
   * 🔹 Carga TODAS las instituciones desde el backend.
   */
  private cargarInstitucionesCepat(): void {
    this.institucionesService.getAll().subscribe({
      next: (data: Institucion[]) => {
        this.todasInstituciones = data || [];
        console.log("[intitutciones]", data)

        // Igual que con CEPat, si ya hay patente para edición,
        // intentamos inicializar los selects (ahora sí tenemos instituciones)
        if (this.patenteModel && (this.patenteModel as any).id_registro) {
          this.inicializarSeleccionesDesdePatente();
        }
      },
      error: (err: any) => {
        console.error('Error al cargar instituciones:', err);
        this.todasInstituciones = [];
      }
    });
  }

  onCepatChange(cepatId: number | null): void {
    console.log('[onCepatChange] cepatId:', cepatId, 'isInicializandoDesdeRegistro:', this.isInicializandoDesdeRegistro);

    const id = cepatId !== null ? Number(cepatId) : NaN;

    if (Number.isNaN(id)) {
      this.selectedCepatId = null;
      this.institucionesCepat = [];

      if (!this.isInicializandoDesdeRegistro) {
        // Solo cuando el cambio viene del usuario limpiamos completamente
        this.institucionSeleccionadaCepat = null;
        this.patenteModel.tecnologicoOrigen = '';
        this.patenteModel.cePat = 'N/A';
      }

      return;
    }

    this.selectedCepatId = id;

    // Nombre visible del CEPat
    const cepatSeleccionado = this.cepatList.find(c => c.id_cepat === id);
    if (cepatSeleccionado) {
      this.patenteModel.cePat = cepatSeleccionado.nombre;
      console.log('[onCepatChange] CEPat seleccionado:', cepatSeleccionado.nombre);
    }

    // 🔹 Si estamos en inicialización desde el modelo,
    //     NO tocamos la lista de instituciones ni la selección:
    //     eso ya lo hizo preseleccionarCepatEInstitucionDesdeRegistro()
    if (this.isInicializandoDesdeRegistro) {
      console.log('[onCepatChange] En inicialización, no se modifica la lista de instituciones');
      return;
    }

    // 🔹 Cambio hecho por el usuario: ahora sí filtramos normalmente
    if (this.mapaCepatInstituciones && this.mapaCepatInstituciones[id]) {
      // Clonamos el arreglo para no compartir referencia
      this.institucionesCepat = [...this.mapaCepatInstituciones[id]];
      console.log('[onCepatChange] Instituciones filtradas:', this.institucionesCepat.length);
    } else {
      this.institucionesCepat = [];
      console.log('[onCepatChange] No hay instituciones para este CEPat');
    }


    // Y limpiamos la institución seleccionada, para que el usuario elija una
    this.institucionSeleccionadaCepat = null;
    this.patenteModel.tecnologicoOrigen = '';
  }



  onInstitucionCepatChange(institucionIdValue: number | null): void {
    const id = institucionIdValue !== null ? Number(institucionIdValue) : NaN;

    if (Number.isNaN(id)) {
      this.institucionSeleccionadaCepat = null;
      this.patenteModel.tecnologicoOrigen = '';
      return;
    }

    this.institucionSeleccionadaCepat = id;

    const institucion = this.institucionesCepat.find(inst => inst.id_institucion === id);
    if (institucion) {
      this.patenteModel.tecnologicoOrigen = institucion.nombre;
    } else {
      this.patenteModel.tecnologicoOrigen = '';
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
    console.log('[inicializarSeleccionesDesdePatente] Iniciando...', this.patenteModel);

    // 🔹 Rama: el backend manda el nombre en rama_param
    if ((this.patenteModel as any).rama_param && !this.patenteModel.rama) {
      this.patenteModel.rama = (this.patenteModel as any).rama_param as string;
    }

    // 🔹 Medio de ingreso
    if ((this.patenteModel as any).medio_ingreso_param && !this.patenteModel.medioIngreso) {
      this.patenteModel.medioIngreso = (this.patenteModel as any).medio_ingreso_param as string;
    }

    // 🔹 Años de renovación
    this.generarAniosRenovacion();

    // 🔹 Subsector
    if (this.catalogosAll && this.subsectoresCatalogo?.length) {
      const valorSubsector =
        (this.patenteModel as any).id_subsector ??
        this.patenteModel.subsector ??
        '';

      console.log('[inicializarSeleccionesDesdePatente] Buscando subsector con valor:', valorSubsector);

      const porId = this.subsectoresCatalogo.find(
        s => String(s.id_param) === String(valorSubsector)
      );
      const porNombre = this.subsectoresCatalogo.find(
        s => s.nombre === valorSubsector
      );

      const subEncontrado = porId || porNombre || null;

      console.log('[inicializarSeleccionesDesdePatente] Subsector encontrado:', subEncontrado);

      this.subsectorIdSeleccionado = subEncontrado ? subEncontrado.id_param : null;

      if (this.subsectorIdSeleccionado) {
        console.log('[inicializarSeleccionesDesdePatente] Llamando a actualizarSectorDesdeSubsector con:', this.subsectorIdSeleccionado);
        this.actualizarSectorDesdeSubsector(this.subsectorIdSeleccionado);
      }
    }

    

   
    console.log('✅ CURPs originales copiadas:', this.originalInventoresCurps);
    // 🔹 CEPat + institución (usando la institución del registro)
    this.preseleccionarCepatEInstitucionDesdeRegistro();
  }

  private preseleccionarCepatEInstitucionDesdeRegistro(): void {

    console.log('[preseleccionarCepatEInstitucionDesdeRegistro] Iniciando...');

    // 🔹 Activamos el flag para evitar que onCepatChange limpie los valores
    this.isInicializandoDesdeRegistro = true;



    // 0) Limpiar estado previo, para no arrastrar datos de otro registro
    this.selectedCepatId = null;
    this.institucionSeleccionadaCepat = null;
    this.institucionesCepat = [];
    this.hydrateInventores();
    

    if (this.patenteModel.inventores && this.patenteModel.inventores.length > 0) {
      for (const inv of this.patenteModel.inventores) {
        const sexoValue = Number(inv.sexo);
        if (sexoValue === 2) {
          inv.sexo = "Femenino";
        } else if (sexoValue === 1) {
          inv.sexo = "Masculino";
        } else {
          inv.sexo = "Otro";
        }

        const tipoInvValue = Number(inv.tipoInvestigador);
        if (tipoInvValue === 46) {
          inv.tipoInvestigador = "Docente";
        } else if (tipoInvValue === 47) {
          inv.tipoInvestigador = "Administrativo";
        } else if (tipoInvValue === 48) {
          inv.tipoInvestigador = "Alumno";
        }
      }      

  }

    if (!this.patenteModel) {
      this.isInicializandoDesdeRegistro = false;
      return;
    }

    // 1️⃣ Obtener el id de institución asociado al registro
    const idInstitucion = (this.patenteModel as any).id_institucion ??
      (this.patenteModel as any).idInstitucion ??
      null;

    const nombreTec = (this.patenteModel.tecnologicoOrigen || '').trim();

    console.log('[preseleccionarCepatEInstitucionDesdeRegistro] id_institucion:', idInstitucion, 'nombreTec:', nombreTec);

    // 2️⃣ Buscar la institución primero por id; si no, por nombre
    let institucion: Institucion | undefined;

    if (idInstitucion && this.todasInstituciones?.length) {
      institucion = this.todasInstituciones.find(
        inst => inst.id_institucion === Number(idInstitucion)
      );
      console.log('[preseleccionarCepatEInstitucionDesdeRegistro] Institución encontrada por ID:', institucion);
    }

    if (!institucion && nombreTec && this.todasInstituciones?.length) {
      const normalizar = (s: string) =>
        s.normalize('NFD').replace(/[\u0300-\u036f]/g, '').trim().toLowerCase();

      const nombreNormalizado = normalizar(nombreTec);

      // 🔹 Primero, intentamos búsqueda exacta
      institucion = this.todasInstituciones.find(inst => {
        const nombreInst = normalizar(inst.nombre || '');
        return nombreInst === nombreNormalizado;
      });

      // 🔹 Si no se encontró con búsqueda exacta, intentamos con variaciones
      if (!institucion) {
        // Remover palabras comunes que pueden causar confusión
        const removerPalabrasComunes = (texto: string) => {
          return texto
            .replace(/\btecnm\b/g, '')
            .replace(/\b\/\b/g, '')
            .replace(/\binstituto\b/g, '')
            .replace(/\btecnologico\b/g, '')
            .replace(/\bde\b/g, '')
            .replace(/\bdel\b/g, '')
            .replace(/\bla\b/g, '')
            .replace(/\bel\b/g, '')
            .replace(/\s+/g, ' ')
            .trim();
        };

        const nombreLimpio = removerPalabrasComunes(nombreNormalizado);

        // Buscar instituciones cuyo nombre limpio sea exactamente igual
        institucion = this.todasInstituciones.find(inst => {
          const nombreInstLimpio = removerPalabrasComunes(normalizar(inst.nombre || ''));
          return nombreInstLimpio === nombreLimpio;
        });

        // 🔹 Si aún no se encuentra, intentamos buscar por la parte más distintiva
        if (!institucion && nombreLimpio.length > 3) {
          institucion = this.todasInstituciones.find(inst => {
            const nombreInstLimpio = removerPalabrasComunes(normalizar(inst.nombre || ''));

            // Solo coincide si el nombre limpio está completamente contenido
            // y tiene una longitud similar (para evitar falsos positivos)
            const lengthDiff = Math.abs(nombreInstLimpio.length - nombreLimpio.length);

            return (nombreInstLimpio === nombreLimpio ||
              (nombreInstLimpio.includes(nombreLimpio) && lengthDiff <= 10) ||
              (nombreLimpio.includes(nombreInstLimpio) && lengthDiff <= 10));
          });
        }
      }

      console.log('[preseleccionarCepatEInstitucionDesdeRegistro] Búsqueda por nombre:');
      console.log('  - Nombre buscado:', nombreTec);
      console.log('  - Institución encontrada:', institucion);
    }

    if (!institucion) {
      console.warn('[PatenteComponent] No se encontró institución para el registro', this.patenteModel);
      this.patenteModel.cePat = 'N/A';
      this.isInicializandoDesdeRegistro = false;
      return;
    }

    // 3️⃣ Preseleccionar la institución en el combo "Tecnológico de Origen"
    this.institucionSeleccionadaCepat = institucion.id_institucion;
    this.patenteModel.tecnologicoOrigen = institucion.nombre;

    // 4️⃣ Intentar determinar el CEPat

    // 4.1) Primero, el id_cepat que ya pueda tener la tabla institucion
    let cepatId: number | null = institucion.id_cepat ?? null;
    console.log('[preseleccionarCepatEInstitucionDesdeRegistro] id_cepat de la institución:', cepatId);

    // 4.2) Si la institución no tiene id_cepat, intentamos deducirlo por el texto cePat del registro
    if (!cepatId) {
      const cePatNombre = (this.patenteModel.cePat || '').trim();

      if (cePatNombre && cePatNombre.toLowerCase() !== 'n/a') {
        const normalizar = (s: string) =>
          s.normalize('NFD').replace(/[\u0300-\u036f]/g, '').trim().toLowerCase();

        const cePatNormalizado = normalizar(cePatNombre);

        const cepatEncontrado = this.cepatList.find(c => {
          const nombreCepat = normalizar(c.nombre || '');
          return nombreCepat === cePatNormalizado ||
            nombreCepat.includes(cePatNormalizado) ||
            cePatNormalizado.includes(nombreCepat);
        });

        if (cepatEncontrado) {
          cepatId = cepatEncontrado.id_cepat;
          console.log('[preseleccionarCepatEInstitucionDesdeRegistro] CEPat encontrado por nombre del registro:', cepatId);
        }
      }
    }

    // 4.3) Si seguimos sin CEPat, intentamos deducirlo usando los mapas
    if (!cepatId && institucion) {
      const normalizar = (s: string) =>
        s.normalize('NFD').replace(/[\u0300-\u036f]/g, '').trim().toLowerCase();

      // 4.3.1) Buscar por id_institucion
      if (
        institucion.id_institucion != null &&
        this.mapaInstitucionACepatPorId[institucion.id_institucion]
      ) {
        cepatId = this.mapaInstitucionACepatPorId[institucion.id_institucion];
        console.log('[preseleccionarCepatEInstitucionDesdeRegistro] CEPat encontrado en mapa por ID:', cepatId);
      }

      // 4.3.2) Si aún no hay CEPat, intentamos por nombre normalizado de la institución
      if (!cepatId) {
        const nombreInstNorm = normalizar(institucion.nombre || '');
        const idPorNombre = this.mapaInstitucionACepatPorNombre.get(nombreInstNorm);

        if (idPorNombre) {
          cepatId = idPorNombre;
          console.log('[preseleccionarCepatEInstitucionDesdeRegistro] CEPat encontrado en mapa por nombre:', cepatId);
        }
      }
    }

    // 4.4) Si aun así no se pudo determinar CEPat, dejamos la institución seleccionada
    //      y el CEPat en 'N/A', pero llenamos el combo de instituciones.
    if (!cepatId) {
      console.warn('[PatenteComponent] No se pudo determinar CEPat para la institución', institucion);

      // No hay CEPat preseleccionado
      this.selectedCepatId = null;
      this.patenteModel.cePat = 'N/A';

      // 🔹 Aseguramos que el combo de Tecnológico de Origen tenga al menos la institución del registro
      this.institucionesCepat = institucion ? [institucion] : [];

      // 🔹 Mantenemos la institución seleccionada en el modelo
      this.institucionSeleccionadaCepat = institucion?.id_institucion ?? null;

      this.isInicializandoDesdeRegistro = false;
      return;
    }

    // 5️⃣ Con un id_cepat válido, llenamos los selects dependientes
    this.selectedCepatId = cepatId;
    console.log('[preseleccionarCepatEInstitucionDesdeRegistro] Preseleccionando CEPat:', cepatId);

    // Filtrar instituciones de ese CEPat usando el mapa
    if (this.mapaCepatInstituciones && this.mapaCepatInstituciones[cepatId]) {
      // Clonamos el arreglo de instituciones del mapa
      this.institucionesCepat = [...this.mapaCepatInstituciones[cepatId]];
      console.log('[preseleccionarCepatEInstitucionDesdeRegistro] Instituciones filtradas del mapa:', this.institucionesCepat.length);
    } else {
      // Fallback: filtrar directo de todas las instituciones
      this.institucionesCepat = this.todasInstituciones.filter(
        inst => inst.id_cepat === cepatId
      );
      console.log('[preseleccionarCepatEInstitucionDesdeRegistro] Instituciones filtradas directo:', this.institucionesCepat.length);
    }

    // Asegurar que la institución actual esté en la lista
    if (!this.institucionesCepat.some(inst => inst.id_institucion === institucion.id_institucion)) {
      this.institucionesCepat = [...this.institucionesCepat, institucion];
      console.log('[preseleccionarCepatEInstitucionDesdeRegistro] Institución agregada a la lista');
    }

    // Ajustar el nombre del CEPat visible en el modelo
    const cepat = this.cepatList.find(c => c.id_cepat === cepatId);
    if (cepat) {
      this.patenteModel.cePat = cepat.nombre;
      console.log('[preseleccionarCepatEInstitucionDesdeRegistro] Nombre CEPat actualizado:', this.patenteModel.cePat);
    }

    // La institución sigue seleccionada
    this.institucionSeleccionadaCepat = institucion.id_institucion;

    console.log('[preseleccionarCepatEInstitucionDesdeRegistro] Estado final:');
    console.log('  - selectedCepatId:', this.selectedCepatId);
    console.log('  - institucionSeleccionadaCepat:', this.institucionSeleccionadaCepat);
    console.log('  - institucionesCepat.length:', this.institucionesCepat.length);


    for (const inv of this.patenteModel.inventores || []) {
      this.originalInventoresCurps.push(inv.curp);
    }


    // 🔹 Desactivamos el flag al finalizar
    this.isInicializandoDesdeRegistro = false;
  }



  originalInventoresCurps: string[] = [];  //

private procederConGuardado(modal: any): void {
    if (this.selectedFile) {
      this.fileUploadService.uploadFile(this.selectedFile, 'patentes').subscribe({
        next: (response: any) => {
          this.patenteModel.archivo = response.fileName;
          
        },
        error: (error) => {
          console.error('Error al subir archivo:', error);
          const alertaError: SweetAlertOptions = {
            icon: 'error',
            title: 'Error al subir archivo',
            text: 'Ocurrió un error al subir el archivo',
            customClass: {
              confirmButton: 'btn btn-danger'
            }
          };
          this.showAlert(alertaError);
        }
      });
    } else {
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
          // La notificación de éxito ya se muestra en el componente crud
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

    // Limpiar archivo seleccionado y previsualización al abrir un nuevo registro
    if (this.filePreviewUrl) {
      URL.revokeObjectURL(this.filePreviewUrl);
      this.filePreviewUrl = null;
    }
    this.selectedFile = null;

    // Limpiar el input de archivo
    if (this.archivoInput && this.archivoInput.nativeElement) {
      this.archivoInput.nativeElement.value = '';
    }

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
          anioRenovacion: item.anioRenovacion != 'N/A' ? item.anioRenovacion : 2029,
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
          console.log("patente", patente)

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

    // Validación de fechas: formato válido y año >= 2000; además solicitud <= expedición
    const fechaSolicitud: string | Date = (this.patenteModel as any).fechaSolicitud;
    const fechaExpedicion: string | Date = (this.patenteModel as any).fechaExpedicion;

    const formatos = ['YYYY-MM-DD', 'DD-MM-YYYY', 'YYYY/MM/DD', 'DD/MM/YYYY'];
    const parseStrict = (val: string | Date): Date | null => {
      if (!val) return null;
      if (val instanceof Date) return isNaN(val.getTime()) ? null : val;
      const s = String(val).trim();
      const m = moment(s, formatos, true);
      return m.isValid() ? m.toDate() : null;
    };

    if (fechaSolicitud) {
      const solDate = parseStrict(fechaSolicitud);
      if (!solDate || solDate.getFullYear() < 2000) {
        const alertaError: SweetAlertOptions = {
          icon: 'warning',
          title: 'Fecha de solicitud inválida',
          text: 'Usa un formato válido (DD-MM-YYYY) y año 2000 o posterior.',
        };
        this.showAlert(alertaError);
        return;
      }
    }

    if (fechaExpedicion) {
      const expDate = parseStrict(fechaExpedicion);
      if (!expDate || expDate.getFullYear() < 2000) {
        const alertaError: SweetAlertOptions = {
          icon: 'warning',
          title: 'Fecha de expedición inválida',
          text: 'Usa un formato válido (DD-MM-YYYY) y año 2000 o posterior.',
        };
        this.showAlert(alertaError);
        return;
      }
    }

    if (fechaSolicitud && fechaExpedicion) {
      const solDate = parseStrict(fechaSolicitud)!;
      const expDate = parseStrict(fechaExpedicion)!;
      if (solDate.getTime() > expDate.getTime()) {
        const alertaError: SweetAlertOptions = {
          icon: 'warning',
          title: 'Validación de fechas',
          text: 'Las fechas son inconsistentes: la solicitud debe ser anterior o igual a la expedición.',
        };
        this.showAlert(alertaError);
        return;
      }
    }

    this.isSaving = true;

    // 🔹 Si hay un archivo seleccionado, primero lo subimos al servidor
    if (this.selectedFile) {
      this.fileUploadService.uploadFile(this.selectedFile, 'patentes').subscribe({
        next: (response) => {
          if (response.success) {
            // Actualizar el nombre del archivo con el devuelto por el servidor
            this.patenteModel.archivo = response.filename;
            // Continuar con el guardado del registro
            this.performSaveEdit(modal, id);
          } else {
            this.isSaving = false;
            const alertaError: SweetAlertOptions = {
              icon: 'error',
              title: 'Error al subir archivo',
              text: response.message || 'No se pudo subir el archivo.',
            };
            this.showAlert(alertaError);
          }
        },
        error: (error) => {
          this.isSaving = false;
          console.error('Error al subir archivo:', error);
          const alertaError: SweetAlertOptions = {
            icon: 'error',
            title: 'Error al subir archivo',
            text: 'Ocurrió un error al intentar subir el archivo.',
          };
          this.showAlert(alertaError);
        }
      });
    } else {
      // Si no hay archivo nuevo, continuar con el guardado normal
      this.performSaveEdit(modal, id);
    }


    const currentCurps = this.patenteModel.inventores
      ?.map(inv => inv.curp)
      .filter(curp => !!curp && curp.trim() !== '') || [];

    const removedCurps = this.originalInventoresCurps.filter(curp => !currentCurps.includes(curp));
    const addedCurps = currentCurps.filter(curp => !this.originalInventoresCurps.includes(curp));

    console.log('🔍 Comparación de CURPs:', {
      originales: this.originalInventoresCurps,
      actuales: currentCurps,
      eliminadas: removedCurps,
      nuevas: addedCurps
    });

    const noExpediente = this.patenteModel.numeroExpediente || '';  // Asegúrate de que exista
    if (!noExpediente) {
      // Error si no hay expediente (necesario para las APIs)
      const alertaError: SweetAlertOptions = {
        icon: 'error',
        title: 'Error',
        text: 'No se puede vincular/desvincular sin número de expediente.'
      };
      this.showAlert(alertaError);
      return;
    }

    // Preparar llamadas a APIs
    const desvincularCalls: Observable<any>[] = removedCurps.map(curp =>
      this.service.desvincularInvestigador(curp, noExpediente)
    );

    const vincularCalls: Observable<any>[] = addedCurps.map(curp =>
      this.service.vincularInvestigador(curp, noExpediente)
    );

    const allCalls = [...desvincularCalls, ...vincularCalls];

    if (allCalls.length > 0) {
      // Ejecutar en paralelo y esperar
      forkJoin(allCalls).subscribe({
        next: (responses) => {
          console.log('✅ Vinculaciones/Desvinculaciones completadas:', responses);
          // Proceder con el guardado (upload o directo)
          this.procederConGuardado(modal);
        },
        error: (error) => {
          console.error('❌ Error en vinculación/desvinculación:', error);
          const alertaError: SweetAlertOptions = {
            icon: 'error',
            title: 'Error',
            text: 'Hubo un problema al vincular/desvincular investigadores. Inténtalo de nuevo.'
          };
          this.showAlert(alertaError);
        }
      });
    } else {
      // Sin cambios en CURPs, proceder directamente
      this.procederConGuardado(modal);
    }

  }

  private inicializarDesdeRegistro(registro: PatenteUIModel): void {
    // ... (código existente para asignar this.patenteModel = { ...registro })

    // Nueva lógica: Copia las CURPs originales (filtrando vacías)
    this.originalInventoresCurps = registro.inventores
      ?.map(inv => inv.curp)
      .filter(curp => !!curp && curp.trim() !== '') || [];

    console.log('✅ CURPs originales copiadas:', this.originalInventoresCurps);

    // ... (resto del método, como hidratación, etc.)
  }


  private performSaveEdit(modal: any, id: number) {

    // --- Mapeo de catálogos (Rama, Medio de ingreso, Subsector) ---

    // 1) Rama: buscamos el id_param a partir del nombre elegido en el <select>
    let ramaParamId: number | null = null;
    if ((this.patenteModel as any).rama_param != null) {
      const ramaId = typeof (this.patenteModel as any).rama_param === 'string'
        ? parseInt((this.patenteModel as any).rama_param, 10)
        : (this.patenteModel as any).rama_param;
      ramaParamId = !isNaN(ramaId) ? ramaId : null;
    } else if (this.patenteModel.rama) {
      const ramaSeleccionada = this.ramasCatalogo.find(r => r.nombre === this.patenteModel.rama);
      ramaParamId = ramaSeleccionada?.id_param ?? null;
    }

    // 2) Medio de ingreso
    let medioIngresoParamId: number | null = null;
    if ((this.patenteModel as any).medio_ingreso_param != null) {
      const medioId = typeof (this.patenteModel as any).medio_ingreso_param === 'string'
        ? parseInt((this.patenteModel as any).medio_ingreso_param, 10)
        : (this.patenteModel as any).medio_ingreso_param;
      medioIngresoParamId = !isNaN(medioId) ? medioId : null;
    } else if (this.patenteModel.medioIngreso) {
      const medioSeleccionado = this.mediosIngresoCatalogo.find(m => m.nombre === this.patenteModel.medioIngreso);
      medioIngresoParamId = medioSeleccionado?.id_param ?? null;
    }

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

    // 4) Año de renovación: convertir a entero o null
    let anioRenovacion: number | null = null;
    if (this.patenteModel.anioRenovacion !== undefined && this.patenteModel.anioRenovacion !== null) {
      const raw = String(this.patenteModel.anioRenovacion).trim();
      if (raw !== '' && raw.toUpperCase() !== 'N/A') {
        const parsed = Number(raw);
        if (!Number.isNaN(parsed)) {
          anioRenovacion = parsed;
        }
      }
    }

    // --- Construimos el payload explícito que se mandará al servicio ---

    const payload: any = {
      // Identificadores y títulos
      id,
      id_registro: id,
      solicitudId: this.patenteModel.solicitudId || this.patenteModel.no_expediente || this.patenteModel.numeroExpediente,
      no_expediente: this.patenteModel.no_expediente || this.patenteModel.solicitudId || this.patenteModel.numeroExpediente,
      numeroExpediente: this.patenteModel.numeroExpediente || this.patenteModel.no_expediente,
      titulo: this.patenteModel.denominacion,
      nombrePatente: this.patenteModel.denominacion || this.patenteModel.nombrePatente,
      denominacion: this.patenteModel.denominacion,

      // Datos de solicitud (usuario, institución, correo)
      solicitante: this.patenteModel.solicitante,
      institucion: this.patenteModel.institucion,
      correo: this.patenteModel.correo,

      // 🔹 IDs para CEPat e Institución (crítico para poder recuperar después)
      id_institucion: this.institucionSeleccionadaCepat,
      id_cepat: this.selectedCepatId,

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
      anioRenovacion: anioRenovacion,

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
      rama_param: ramaParamId,
      medio_ingreso_param: medioIngresoParamId,
      tipo_sector_param: this.tipoSectorSeleccionadoId ?? null,
      id_subsector: subsectorId,
      tipo_ingreso_param: (this.patenteModel as any).tipo_ingreso_param || null,
    };

    this.service.updatePatent(id, payload).subscribe({
      next: () => {
        this.isSaving = false;

        const alertaExito: SweetAlertOptions = {
          icon: 'success',
          title: 'Registro actualizado',
          text: 'La patente se actualizó correctamente.',
        };
        this.showAlert(alertaExito);

        // Limpiar todos los datos de edición
        this.limpiarDatosEdicion();

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
    return invs
      .map(i => {
        // Map API Inventor to local Inventor interface
        const nombre = (i as any).nombre || (i as any).nombreCompleto || '';
        const apellidoPaterno = (i as any).apellidoPaterno || '';
        const apellidoMaterno = (i as any).apellidoMaterno || '';
        const nombreCompleto = `${nombre} ${apellidoPaterno} ${apellidoMaterno}`.trim();
        
        return {
          curp: i.curp || '',
          nombre: i.nombre || nombreCompleto || '',
          apellidoPaterno: i.apellidoPaterno || '',
          apellidoMaterno: i.apellidoMaterno || '',
          sexo: i.sexo ?? '',
          tipoInvestigador: i.tipoInvestigador || '',
          institucion: i.institucion || '',
          programaEducativo: i.programaEducativo || '',
          cuerpoAcademico: i.cuerpoAcademico || '',
          departamento: i.departamento || '',
          fechaAfiliacion: i.fechaAfiliacion || '',
          fechaFin: i.fechaFin || ''
        };
      })
      .filter(i => !!(i && (i.curp || i.nombre || i.institucion)));
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

  onArchivoSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      if (file.type === 'application/pdf') {
        // Limpiar URL previa si existe
        if (this.filePreviewUrl) {
          URL.revokeObjectURL(this.filePreviewUrl);
        }

        // Guardar el archivo seleccionado
        this.selectedFile = file;
        // Guardar el nombre del archivo en el modelo
        this.patenteModel.archivo = file.name;

        // Generar URL de previsualización
        this.filePreviewUrl = URL.createObjectURL(file);
      } else {
        const errorAlert: SweetAlertOptions = {
          icon: 'error',
          title: 'Error!',
          text: 'Solo se permiten archivos PDF',
        };
        this.showAlert(errorAlert);
        event.target.value = '';
        this.selectedFile = null;
        this.patenteModel.archivo = '';
        this.filePreviewUrl = null;
      }
    }
  }

  downloadDocument(documentName: string): void {
    if (!documentName) {
      const alertaError: SweetAlertOptions = {
        icon: 'error',
        title: 'Error',
        text: 'No hay un archivo disponible para descargar.',
      };
      this.showAlert(alertaError);
      return;
    }

    this.fileUploadService.downloadFile(documentName, 'patentes').subscribe({
      next: (blob) => {
        // Crear una URL temporal para el blob
        const url = window.URL.createObjectURL(blob);

        // Abrir el PDF en una nueva pestaña para visualización
        window.open(url, '_blank');

        // Opcional: Si se quiere descargar en lugar de visualizar, usar esto:
        // const link = document.createElement('a');
        // link.href = url;
        // link.download = documentName;
        // link.click();
        // window.URL.revokeObjectURL(url);
      },
      error: (error) => {
        console.error('Error al descargar documento:', error);
        const alertaError: SweetAlertOptions = {
          icon: 'error',
          title: 'Error al descargar',
          text: 'No se pudo descargar el archivo. Por favor, inténtalo de nuevo.',
        };
        this.showAlert(alertaError);
      }
    });
  }

  private limpiarDatosEdicion(): void {
    // Limpiar URL de previsualización
    if (this.filePreviewUrl) {
      URL.revokeObjectURL(this.filePreviewUrl);
      this.filePreviewUrl = null;
    }

    // Limpiar el input de archivo
    if (this.archivoInput && this.archivoInput.nativeElement) {
      this.archivoInput.nativeElement.value = '';
    }

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
      anioRenovacion: (new Date().getFullYear() + 1).toString(),
      documentos: [],
      numeroExpediente: '',
      numeroTitulo: '',
      denominacion: '',
      rama: '',
      medioIngreso: '',
      tecnologicoOrigen: '',
      cePat: 'N/A',
      tipoSector: '',
      sector: '',
      subsector: '',
      fechaExpedicion: '',
      archivo: '',
      observaciones: '',
      inventores: []
    };

    // Limpiar selecciones de sector
    this.tipoSectorSeleccionadoId = null;
    this.sectorSeleccionadoId = null;
    this.subsectorIdSeleccionado = null;
    this.sectoresFiltrados = [];
    this.subsectoresFiltrados = [];

    // Limpiar selecciones de CEPat e instituciones
    this.selectedCepatId = null;
    this.institucionSeleccionadaCepat = null;
    this.institucionesCepat = [];

    // Limpiar flags de edición
    this.isInicializandoDesdeRegistro = false;
    this.isViewMode = true;
    this.isEditingStatus = false;
    this.editedStatus = '';
    this.editedObservations = '';
    this.originalStatus = '';
    this.originalObservations = '';

    this.estadoSeleccionado = 0;
    this.institucionSeleccionada = 0;
    this.institucionesFiltradas = [];
    this.selectedFile = null;
  }

  closeForm(modal: any) {
    modal.dismiss('cancel');
    this.limpiarDatosEdicion();
  }

  onModalDismissed() {
    // Este método se llama cuando se cierra el modal (backdrop, ESC, botón X)
    this.limpiarDatosEdicion();
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
    console.log('[cargarCatalogos] Iniciando carga de catálogos...');

    this.parametrizacionesServices.getAll().subscribe({
      next: (catalogos) => {
        this.catalogosAll = catalogos;

        // 🔹 1) Ramas: solo las de IMPI
        const todasLasRamas = catalogos[3]?.lista ?? [];  // tema 3 = rama_param

        this.ramasCatalogo = todasLasRamas.filter(rama =>
          this.RAMAS_IMPI_IDS.includes(rama.id_param)
        );

        // 🔹 2) Resto de catálogos, igual que antes
        this.mediosIngresoCatalogo = catalogos[8]?.lista ?? [];   // medio_ingreso_param
        this.tiposSectorCatalogo = catalogos[2]?.lista ?? [];   // tipo_sector_param
        this.estatusCatalogo = catalogos[7]?.lista ?? [];   // estatus_param
        this.subsectoresCatalogo = catalogos[17]?.lista ?? [];  // subsectores/actividades

        // 🔹 3) Construir catálogo de sectores a partir de subsectores (como ya lo tienes)
        const sectoresMap = new Map<number, Parametrizacion>();
        const temaSubsectores = catalogos[17];

        if (temaSubsectores?.lista) {
          for (const sub of temaSubsectores.lista) {
            if (sub.id_param_padre) {
              const sector = this.findParamById(sub.id_param_padre);
              if (sector && !sectoresMap.has(sector.id_param)) {
                sectoresMap.set(sector.id_param, sector);
              }
            }
          }
        }

        this.sectoresCatalogo = Array.from(sectoresMap.values());

        // 🔹 Ajustamos las listas filtradas según la selección actual (si ya hay datos)
        this.actualizarListasDesdeSeleccionActual();

        this.generarAniosRenovacion();
      },
      error: (err) => {
        console.error('[PatenteComponent] Error al cargar catálogos:', err);
      },
    });
  }

  private actualizarListasDesdeSeleccionActual(): void {
    console.log('[actualizarListasDesdeSeleccionActual] Estado inicial:', {
      tipoSectorSeleccionadoId: this.tipoSectorSeleccionadoId,
      sectorSeleccionadoId: this.sectorSeleccionadoId,
      subsectorIdSeleccionado: this.subsectorIdSeleccionado
    });

    if (!this.subsectoresCatalogo || !this.subsectoresCatalogo.length) {
      console.warn('[Sector] No hay subsectores disponibles (catálogos aún no cargados).');
      return;
    }

    // Aseguramos sectoresCatalogo por si aún no se ha llenado
    if (!this.sectoresCatalogo || !this.sectoresCatalogo.length) {
      const sectoresSet = new Map<number, Parametrizacion>();
      for (const sub of this.subsectoresCatalogo) {
        const sector = this.findParamById(sub.id_param_padre || 0);
        if (sector && !sectoresSet.has(sector.id_param)) {
          sectoresSet.set(sector.id_param, sector);
        }
      }
      this.sectoresCatalogo = Array.from(sectoresSet.values());
    }

    const tipoId = this.tipoSectorSeleccionadoId != null ? Number(this.tipoSectorSeleccionadoId) : null;
    const sectorId = this.sectorSeleccionadoId != null ? Number(this.sectorSeleccionadoId) : null;

    // 1) Filtramos sectores según el tipo de sector (si está seleccionado)
    if (tipoId !== null) {
      console.log('[DEBUG] Filtrando sectores para tipo sector ID:', tipoId);
      console.log('[DEBUG] Total sectores en catálogo:', this.sectoresCatalogo.length);
      console.log('[DEBUG] Detalle de sectores:', this.sectoresCatalogo.map(s => ({
        id: s.id_param,
        nombre: s.nombre,
        padre: s.id_param_padre
      })));

      this.sectoresFiltrados = this.sectoresCatalogo.filter(sec => {
        const padre = sec.id_param_padre != null ? Number(sec.id_param_padre) : null;
        return padre !== null && padre === tipoId;
      });

      console.log('[DEBUG] Sectores filtrados encontrados:', this.sectoresFiltrados.length);
      console.log('[DEBUG] Detalle sectores filtrados:', this.sectoresFiltrados.map(s => ({
        id: s.id_param,
        nombre: s.nombre,
        padre: s.id_param_padre
      })));
    } else {
      this.sectoresFiltrados = [...this.sectoresCatalogo];
    }

    // 2) Si tenemos subsector seleccionado, alineamos sector y tipo
    if (this.subsectorIdSeleccionado) {
      const subsector = this.subsectoresCatalogo.find(
        s => s.id_param === this.subsectorIdSeleccionado
      );
      if (subsector) {
        const sectorFromSubsector = this.findParamById(subsector.id_param_padre || 0);
        if (sectorFromSubsector) {
          this.sectorSeleccionadoId = sectorFromSubsector.id_param;
          if (!this.tipoSectorSeleccionadoId && sectorFromSubsector.id_param_padre) {
            this.tipoSectorSeleccionadoId = sectorFromSubsector.id_param_padre;
          }
        }
      }
    }

    // 3) Filtramos subsectores según sector / tipo
    if (sectorId !== null) {
      this.subsectoresFiltrados = this.subsectoresCatalogo.filter(sub => {
        const padre = sub.id_param_padre != null ? Number(sub.id_param_padre) : null;
        return padre !== null && padre === sectorId;
      });
    } else if (tipoId !== null) {
      const sectoresOfTipo = this.sectoresFiltrados.length
        ? this.sectoresFiltrados
        : this.sectoresCatalogo.filter(sec => {
          const padre = sec.id_param_padre != null ? Number(sec.id_param_padre) : null;
          return padre !== null && padre === tipoId;
        });

      const sectorIdsOfTipo = new Set(sectoresOfTipo.map(s => Number(s.id_param)));

      this.subsectoresFiltrados = this.subsectoresCatalogo.filter(sub => {
        const padre = sub.id_param_padre != null ? Number(sub.id_param_padre) : null;
        return padre !== null && sectorIdsOfTipo.has(padre);
      });
    } else {
      this.subsectoresFiltrados = [...this.subsectoresCatalogo];
    }

    console.log('[actualizarListasDesdeSeleccionActual] Estado final:', {
      tipoSectorSeleccionadoId: this.tipoSectorSeleccionadoId,
      sectorSeleccionadoId: this.sectorSeleccionadoId,
      subsectorIdSeleccionado: this.subsectorIdSeleccionado,
      sectoresFiltrados: this.sectoresFiltrados,
      subsectoresFiltrados: this.subsectoresFiltrados
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
    console.log('[actualizarSectorDesdeSubsector] idSubsector:', idSubsector);

    if (!idSubsector || !this.catalogosAll) {
      this.patenteModel.sector = '';
      this.patenteModel.tipoSector = '';
      this.patenteModel.subsector = 'N/A';
      this.tipoSectorSeleccionadoId = null;
      this.sectorSeleccionadoId = null;
      return;
    }

    // Subsector
    const subsector = this.subsectoresCatalogo.find(s => s.id_param === idSubsector);
    if (!subsector) {
      console.warn('[actualizarSectorDesdeSubsector] Subsector no encontrado para id', idSubsector);
      return;
    }

    this.subsectorIdSeleccionado = subsector.id_param;
    this.patenteModel.subsector = subsector.nombre || String(subsector.id_param);

    // Sector (padre del subsector)
    const sectorParam = subsector.id_param_padre
      ? this.findParamById(subsector.id_param_padre)
      : undefined;

    // Tipo de sector (padre del sector)
    const tipoSectorParam = sectorParam?.id_param_padre
      ? this.findParamById(sectorParam.id_param_padre)
      : undefined;

    this.sectorSeleccionadoId = sectorParam?.id_param ?? null;
    this.tipoSectorSeleccionadoId = tipoSectorParam?.id_param ?? null;

    this.patenteModel.sector = sectorParam?.nombre || '';
    this.patenteModel.tipoSector = tipoSectorParam?.nombre || '';

    this.actualizarListasDesdeSeleccionActual();
  }


  onTipoSectorChange(event: any): void {
    console.log(event.target)
    const prevalue = (event.target as HTMLSelectElement).value;
    const value = prevalue.split(':')[1]
    this.tipoSectorSeleccionadoId = value ? Number(value) : null;

    // Limpia niveles inferiores
    this.sectorSeleccionadoId = null;
    this.subsectorIdSeleccionado = null;
    this.patenteModel.sector = '';
    this.patenteModel.subsector = 'N/A';

    if (!this.tipoSectorSeleccionadoId) {
      this.patenteModel.tipoSector = '';
      this.sectoresFiltrados = [];
      this.subsectoresFiltrados = [];
      return;
    }

    const tipo = this.tiposSectorCatalogo.find(
      t => t.id_param === this.tipoSectorSeleccionadoId
    );
    this.patenteModel.tipoSector = tipo?.nombre ?? '';

    this.actualizarListasDesdeSeleccionActual();
  }


  onSectorChange(event: any): void {
    const prevalue = (event.target as HTMLSelectElement).value;
    const value = prevalue.split(':')[1]
    this.sectorSeleccionadoId = value ? Number(value) : null;

    this.subsectorIdSeleccionado = null;
    this.patenteModel.subsector = 'N/A';

    if (!this.sectorSeleccionadoId) {
      this.patenteModel.sector = '';
      this.subsectoresFiltrados = [];
      return;
    }

    const sector = this.sectoresCatalogo.find(
      s => s.id_param === this.sectorSeleccionadoId
    );
    this.patenteModel.sector = sector?.nombre ?? '';

    // Si el sector tiene padre, actualizamos también el tipo de sector
    if (sector?.id_param_padre) {
      this.tipoSectorSeleccionadoId = sector.id_param_padre;
      const tipo = this.tiposSectorCatalogo.find(
        t => t.id_param === this.tipoSectorSeleccionadoId
      );
      this.patenteModel.tipoSector = tipo?.nombre ?? '';
    }

    this.actualizarListasDesdeSeleccionActual();
  }


  onSubsectorChange(event: any): void {
    const prevalue = (event.target as HTMLSelectElement).value;
    const value = prevalue.split(':')[1]
    this.subsectorIdSeleccionado = value ? Number(value) : null;

    if (!this.subsectorIdSeleccionado) {
      this.patenteModel.subsector = 'N/A';
      return;
    }

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


