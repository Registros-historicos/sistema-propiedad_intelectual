import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  EventEmitter,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { SweetAlertOptions } from 'sweetalert2';
import { Config } from 'datatables.net';
import { SwalComponent } from '@sweetalert2/ngx-sweetalert2';
import moment from 'moment';
import { TranslateService } from '@ngx-translate/core';
import {
  ParametrizacionesService,
  Catalogos,
  Parametrizacion,
} from '../../../../api/services/parametrizaciones.service';
import { IntellectualPropertyService } from '../../../../api/services/intellectual-property.service';
import { PatenteUIModel } from 'src/app/api/models/patent.model';
import { CepatService, Cepat } from 'src/app/api/services/cepat.service';
import { InstitucionesService, Institucion } from 'src/app/api/services/insttituciones.service';
import { FileUploadService } from '../../../../api/services/file-upload.service';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';

declare const $: any;

interface Inventor {
  curp: string;
  nombreCompleto: string;
  sexo: 'M' | 'F' | '';
  tipoInvestigador: string;
  institucion: string;
  programaEducativo: string;
  cuerpoAcademico: string;
  departamento: string;
  fechaAfiliacion: string;
  fechaFin: string;
}

@Component({
  selector: 'app-modelo-utilidad',
  templateUrl: './modelo-utilidad.component.html',
  styleUrl: './modelo-utilidad.component.scss',
})
export class ModeloUtilidadComponent implements OnInit, AfterViewInit, OnDestroy {
  private readonly TIPO_INDAUTOR = '45';
  readonly RAMAS_INDAUTOR_IDS = [8, 9, 10, 11, 12, 13, 14, 15, 16, 17];

  pageLength = 10;
  dtInstance: any;
  lengthMenu: number[] = [5, 10, 15, 20];

  datatableConfig: Config = {} as Config;

  reloadEvent: EventEmitter<boolean> = new EventEmitter<boolean>();

  @ViewChild('noticeSwal')
  noticeSwal!: SwalComponent;

  @ViewChild('archivoInput')
  archivoInput: any;

  swalOptions: SweetAlertOptions = {};
  placeholder = '';

  // ====== Catálogos ======
  ramasCatalogo: Parametrizacion[] = [];
  mediosIngresoCatalogo: Parametrizacion[] = [];
  tiposSectorCatalogo: Parametrizacion[] = [];
  estatusCatalogo: Parametrizacion[] = [];
  subsectoresCatalogo: Parametrizacion[] = [];
  sectoresCatalogo: Parametrizacion[] = [];

  // Listas filtradas
  sectoresFiltrados: Parametrizacion[] = [];
  subsectoresFiltrados: Parametrizacion[] = [];

  // CePat e Instituciones
  cepatList: Cepat[] = [];
  institucionesCepat: Institucion[] = [];
  todasInstituciones: Institucion[] = [];

  private mapaCepatInstituciones: { [idCepat: number]: Institucion[] } = {};
  private mapaInstitucionACepatPorId: { [idInstitucion: number]: number } = {};
  private mapaInstitucionACepatPorNombre: Map<string, number> = new Map<string, number>();

  selectedCepatId: number | null = null;
  institucionSeleccionadaCepat: number | null = null;
  tipoSectorSeleccionadoId: number | null = null;
  sectorSeleccionadoId: number | null = null;
  subsectorIdSeleccionado: number | null = null;

  // Años de renovación
  aniosRenovacion: number[] = [];

  private catalogosAll: Catalogos | null = null;
  private isInicializandoDesdeRegistro = false;

  indautorModel: PatenteUIModel = {
    id: 0,
    solicitudId: '',
    nombrePatente: '',
    solicitante: '',
    fechaSolicitud: '',
    estatus: 'En trámite',
    descripcion: '',
    institucion: '',
    correo: '',
    documentos: [''],
    numeroExpediente: '',
    numeroTitulo: '',
    denominacion: '',
    rama: '',
    medioIngreso: '',
    tecnologicoOrigen: '',
    cePat: 'N/A',
    anioRenovacion: (new Date().getFullYear() + 1).toString(),
    tipoSector: '',
    sector: '',
    subsector: '',
    fechaExpedicion: '',
    archivo: '',
    observaciones: '',
    inventores: [
      {
        curp: '',
        nombreCompleto: '',
        sexo: '',
        tipoInvestigador: '',
        institucion: '',
        programaEducativo: '',
        cuerpoAcademico: '',
        departamento: '',
        fechaAfiliacion: '',
        fechaFin: '',
      },
    ],
  };

  selectedFile: File | null = null;
  filePreviewUrl: string | null = null;
  isViewMode = true;
  isEditingStatus = false;
  isSaving = false;

  search: string = '';

  constructor(
    private service: IntellectualPropertyService,
    private cdr: ChangeDetectorRef,
    private translate: TranslateService,
    private paramService: ParametrizacionesService,
    private cepatService: CepatService,
    private institucionesService: InstitucionesService,
    private fileUploadService: FileUploadService,
    private sanitizer: DomSanitizer
  ) { }

  ngAfterViewInit(): void {
    if (this.dtInstance) {
      this.dtInstance.on('page', () => {
        this.dtInstance.page.info();
      });
    }
  }

  ngOnInit(): void {
    this.placeholder = this.translate.instant('TABLE.PLACEHOLDER_SEARCH');
    this.cargarCatalogos();
    this.cargarCepats();
    this.cargarTodasInstituciones();
    this.generarAniosRenovacion();

    this.datatableConfig = {
      serverSide: true,
      processing: true,
      searching: true,
      deferRender: true,
      ordering: true,
      orderMulti: true,
      order: [[5, 'desc']],
      rowId: 'id',
      columnDefs: [{ targets: -1, orderable: false }],
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
        this.service.getRegistros(this.TIPO_INDAUTOR, dataTablesParameters, this.search).subscribe({
          next: (resp: any) => {
            callback(resp);
          },
          error: (error: any) => {
            console.error('❌ Error al cargar registros INDAUTOR:', error);
            callback({
              draw: dataTablesParameters.draw,
              recordsTotal: 0,
              recordsFiltered: 0,
              data: []
            });
          }
        });
      },
      columns: [
        {
          title: 'No. de expediente',
          data: 'numeroExpediente',
          orderable: true,
          render: (data) => {
            const strData = data ? String(data) : '—';
            return `<span class="fw-semibold text-gray-600" style="display: inline-block; max-width: 100px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;">EXP-<br>${strData}</span>`;
          },
        },
        {
          title: 'No. de título',
          data: 'id_registro',
          orderable: true,
          render: (data) => {
            const strData = data ? String(data) : '—';
            return `<span class="fw-semibold text-gray-600" style="display: inline-block; max-width: 100px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;">CERT-<br>${strData}</span>`;
          },
        },
        {
          title: this.translate.instant('TABLE.BRANCH') || 'RAMA',
          data: 'rama_param',
          orderable: true,
          render: (data: any, _type: any, full: any) => {
            const safeData = (data !== undefined && data !== null) ? String(data) : 'Modelo de Utilidad';
            const colorClasses = ['success', 'info', 'warning', 'danger'];
            const randomColorClass = colorClasses[Math.floor(Math.random() * colorClasses.length)];

            const nameParts = safeData.split(' ').filter((part: string) => part.length > 0 && !part.endsWith('.'));
            let initials = '';
            if (nameParts.length >= 2) {
              initials = (nameParts[0][0] + nameParts[1][0]).toUpperCase();
            } else if (nameParts.length === 1 && nameParts[0].length >= 2) {
              initials = (nameParts[0][0] + nameParts[0][1]).toUpperCase();
            } else {
              initials = 'MU';
            }

            return `
              <div class="d-flex align-items-center">
                <div class="symbol symbol-circle symbol-50px overflow-hidden me-3" data-action="view" data-id="${full.id}">
                  <a href="javascript:;">
                    <div class="symbol-label fs-3 bg-light-${randomColorClass} text-${randomColorClass}">
                      ${initials}
                    </div>
                  </a>
                </div>
                <div class="d-flex flex-column" data-action="view" data-id="${full.id}">
                  <a href="javascript:;" class="text-gray-800 text-hover-primary mb-1">${safeData}</a>
                </div>
              </div>`;
          },
        },
        {
          title: this.translate.instant('TABLE.WORK_TITLE') || 'TÍTULO',
          data: 'nombrePatente',
          orderable: true,
          render: (data: string) => `<span class="fw-bold fs-6 text-gray-800">${data || ''}</span>`,
        },
        {
          title: this.translate.instant('TABLE.INSTITUTION') || 'INSTITUCIÓN',
          data: 'institucion',
          orderable: true,
          render: (data: string) => `<span class="fw-semibold text-gray-600">${data === '-' ? 'N/A' : data}</span>`,
        },
        {
          title: this.translate.instant('TABLE.DATE') || 'FECHA DE SOLICITUD',
          data: 'fechaSolicitud',
          orderable: true,
          render: (data: string) => `<span class="fw-semibold text-gray-600">${data ? moment(data).format('DD-MM-YYYY') : ''}</span>`,
        },
      ],
      createdRow: (row: any, data: any) => {
        const $row = $(row);
        $row.attr('data-action', 'view');
        $row.attr('data-id', data?.id ?? 0);
        $row.addClass('cursor-pointer');
      },
      initComplete: (settings: any) => {
        this.dtInstance = settings.oInstance.api();
        this.cdr.detectChanges();
      },
    } as Config;
  }

  private generarAniosRenovacion(): void {
    const currentYear = new Date().getFullYear();
    this.aniosRenovacion = [];
    for (let i = currentYear - 30; i <= currentYear + 30; i++) {
      this.aniosRenovacion.push(i);
    }
  }

  private cargarCatalogos(): void {
    this.paramService.getAll().subscribe({
      next: (cats: Catalogos) => {
        // Guardamos todos los catálogos crudos
        this.catalogosAll = cats;

        // 1) Ramas (tema 3) filtradas SOLO a INDAUTOR
        const todasLasRamas = cats[3]?.lista || [];
        this.ramasCatalogo = todasLasRamas.filter(r =>
          this.RAMAS_INDAUTOR_IDS.includes(r.id_param)
        );

        // 2) Catálogo directo por tema-id según ParametrizacionesService
        this.mediosIngresoCatalogo = (cats[8]?.lista ?? []); // medio_ingreso_param
        this.tiposSectorCatalogo = (cats[2]?.lista ?? []); // tipo_sector_param
        this.estatusCatalogo = (cats[7]?.lista ?? []); // estatus_param
        this.subsectoresCatalogo = (cats[17]?.lista ?? []); // subsectores / instituciones

        // 3) Construimos la lista de sectores a partir de los subsectores
        const sectoresMap = new Map<number, Parametrizacion>();
        const temaSubsectores = cats[17];

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

        this.actualizarListasDesdeSeleccionActual();
      },
      error: (e) => console.error('❌ Error cargando catálogos', e),
    });
  }

  private findParamById(idParam: number): Parametrizacion | undefined {
    if (!this.catalogosAll) return undefined;

    for (const temaIdStr of Object.keys(this.catalogosAll)) {
      const tema = this.catalogosAll[Number(temaIdStr)];
      const encontrado = tema?.mapa[idParam];
      if (encontrado) {
        return encontrado;
      }
    }
    return undefined;
  }

  private actualizarListasDesdeSeleccionActual(): void {
    if (!this.subsectoresCatalogo || !this.subsectoresCatalogo.length) {
      console.warn('[Sector] No hay subsectores disponibles (catálogos aún no cargados).');
      return;
    }

    // Aseguramos sectoresCatalogo por si viniera vacío
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

    const tipoId =
      this.tipoSectorSeleccionadoId != null ? Number(this.tipoSectorSeleccionadoId) : null;
    const sectorId =
      this.sectorSeleccionadoId != null ? Number(this.sectorSeleccionadoId) : null;

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

  private actualizarSectorDesdeSubsector(idSubsector: number | null): void {
    if (!idSubsector) {
      // Limpia toda la cadena Tipo → Sector → Subsector
      this.subsectorIdSeleccionado = null;
      this.sectorSeleccionadoId = null;
      this.tipoSectorSeleccionadoId = null;

      this.subsectoresFiltrados = [];
      this.sectoresFiltrados = [];

      this.indautorModel.subsector = 'N/A';
      this.indautorModel.sector = '';
      this.indautorModel.tipoSector = '';
      return;
    }

    // 1) Obtener el subsector desde el catálogo global
    const subsector = this.findParamById(idSubsector);
    if (!subsector) {
      console.warn('[Sector] No se encontró subsector con id', idSubsector);
      return;
    }

    this.subsectorIdSeleccionado = subsector.id_param;
    this.indautorModel.subsector = subsector.nombre;

    // 2) Sector = padre del subsector
    let sector: Parametrizacion | undefined;
    if (subsector.id_param_padre) {
      sector = this.findParamById(subsector.id_param_padre);
    }

    if (sector) {
      this.sectorSeleccionadoId = sector.id_param;
      this.indautorModel.sector = sector.nombre;
    } else {
      this.sectorSeleccionadoId = null;
      this.indautorModel.sector = '';
    }

    // 3) Tipo de sector = padre del sector
    let tipoSector: Parametrizacion | undefined;
    if (sector && sector.id_param_padre) {
      tipoSector = this.findParamById(sector.id_param_padre);
    }

    if (tipoSector) {
      this.tipoSectorSeleccionadoId = tipoSector.id_param;
      this.indautorModel.tipoSector = tipoSector.nombre;
    } else {
      this.tipoSectorSeleccionadoId = null;
      this.indautorModel.tipoSector = '';
    }

    // 4) Actualizamos las listas filtradas con la selección ya alineada
    this.actualizarListasDesdeSeleccionActual();
  }

  private cargarTodasInstituciones(): void {
    this.institucionesService.getAll().subscribe({
      next: (instituciones) => {
        this.todasInstituciones = instituciones || [];
        this.reconstruirMapaInstitucionCepat();
        this.reconstruirMapaCepatInstituciones();

        if (this.indautorModel && (this.indautorModel as any).id_registro && this.cepatList?.length) {
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
        this.reconstruirMapaCepatInstituciones();

        if (this.indautorModel && (this.indautorModel as any).id_registro && this.todasInstituciones?.length) {
          this.preseleccionarCepatEInstitucionDesdeRegistro();
        }
      },
      error: (err: any) => {
        console.error('Error al cargar CEPA:', err);
        this.cepatList = [];
      }
    });
  }

  private reconstruirMapaCepatInstituciones(): void {
    if (!this.cepatList?.length || !this.todasInstituciones?.length) {
      return;
    }

    const mapa: { [idCepat: number]: Institucion[] } = {};

    for (const ce of this.cepatList) {
      if (ce && ce.id_cepat != null) {
        mapa[ce.id_cepat] = [];
      }
    }

    for (const inst of this.todasInstituciones) {
      const idCepat = inst.id_cepat;
      if (idCepat != null) {
        if (!mapa[idCepat]) {
          mapa[idCepat] = [];
        }
        mapa[idCepat].push(inst);
      }
    }

    this.mapaCepatInstituciones = mapa;
  }

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
        continue;
      }

      if (inst.id_institucion != null) {
        this.mapaInstitucionACepatPorId[inst.id_institucion] = inst.id_cepat;
      }

      const nombreNorm = normalizar(inst.nombre || '');
      if (nombreNorm && !this.mapaInstitucionACepatPorNombre.has(nombreNorm)) {
        this.mapaInstitucionACepatPorNombre.set(nombreNorm, inst.id_cepat);
      }
    }
  }

  private preseleccionarCepatEInstitucionDesdeRegistro(): void {
    const idInstitucion = this.indautorModel.id_institucion;
    const nombreInstitucion = this.indautorModel.tecnologicoOrigen;

    let cepatDeducido: number | null = null;

    if (idInstitucion) {
      cepatDeducido = this.mapaInstitucionACepatPorId[idInstitucion] ?? null;
    }

    if (!cepatDeducido && nombreInstitucion) {
      const normalizar = (s: string) =>
        s.normalize('NFD').replace(/[\u0300-\u036f]/g, '').trim().toLowerCase();
      const nombreNorm = normalizar(nombreInstitucion);
      cepatDeducido = this.mapaInstitucionACepatPorNombre.get(nombreNorm) ?? null;
    }

    if (cepatDeducido) {
      this.isInicializandoDesdeRegistro = true;
      this.selectedCepatId = cepatDeducido;

      if (this.mapaCepatInstituciones && this.mapaCepatInstituciones[cepatDeducido]) {
        this.institucionesCepat = [...this.mapaCepatInstituciones[cepatDeducido]];
      }

      if (idInstitucion) {
        this.institucionSeleccionadaCepat = idInstitucion;
      }

      setTimeout(() => {
        this.isInicializandoDesdeRegistro = false;
      }, 0);
    }
  }

  onCepatChange(cepatId: number | null): void {
    const id = cepatId !== null ? Number(cepatId) : NaN;

    if (Number.isNaN(id)) {
      this.selectedCepatId = null;
      this.institucionesCepat = [];

      if (!this.isInicializandoDesdeRegistro) {
        this.institucionSeleccionadaCepat = null;
        this.indautorModel.tecnologicoOrigen = '';
        this.indautorModel.cePat = 'N/A';
      }
      return;
    }

    this.selectedCepatId = id;

    const cepatSeleccionado = this.cepatList.find(c => c.id_cepat === id);
    if (cepatSeleccionado) {
      this.indautorModel.cePat = cepatSeleccionado.nombre;
    }

    if (this.isInicializandoDesdeRegistro) {
      return;
    }

    if (this.mapaCepatInstituciones && this.mapaCepatInstituciones[id]) {
      this.institucionesCepat = [...this.mapaCepatInstituciones[id]];
    } else {
      this.institucionesCepat = [];
    }

    this.institucionSeleccionadaCepat = null;
    this.indautorModel.tecnologicoOrigen = '';
  }

  onInstitucionCepatChange(institucionIdValue: number | null): void {
    const id = institucionIdValue !== null ? Number(institucionIdValue) : NaN;

    if (Number.isNaN(id)) {
      this.institucionSeleccionadaCepat = null;
      this.indautorModel.tecnologicoOrigen = '';
      return;
    }

    this.institucionSeleccionadaCepat = id;

    const institucion = this.institucionesCepat.find(inst => inst.id_institucion === id);
    if (institucion) {
      this.indautorModel.tecnologicoOrigen = institucion.nombre;
    } else {
      this.indautorModel.tecnologicoOrigen = '';
    }
  }

  onTipoSectorChange(event: any): void {
    console.log(event.target)
    const prevalue = (event.target as HTMLSelectElement).value;
    const value = prevalue.split(':')[1]
    this.tipoSectorSeleccionadoId = value ? Number(value) : null;

    // Limpia niveles inferiores
    this.sectorSeleccionadoId = null;
    this.subsectorIdSeleccionado = null;
    this.indautorModel.sector = '';
    this.indautorModel.subsector = 'N/A';

    if (!this.tipoSectorSeleccionadoId) {
      this.indautorModel.tipoSector = '';
      this.sectoresFiltrados = [];
      this.subsectoresFiltrados = [];
      return;
    }

    const tipo = this.tiposSectorCatalogo.find(
      t => t.id_param === this.tipoSectorSeleccionadoId
    );
    this.indautorModel.tipoSector = tipo?.nombre ?? '';

    this.actualizarListasDesdeSeleccionActual();
  }


  onSectorChange(event: any): void {
    const prevalue = (event.target as HTMLSelectElement).value;
    const value = prevalue.split(':')[1]
    this.sectorSeleccionadoId = value ? Number(value) : null;

    this.subsectorIdSeleccionado = null;
    this.indautorModel.subsector = 'N/A';

    if (!this.sectorSeleccionadoId) {
      this.indautorModel.sector = '';
      this.subsectoresFiltrados = [];
      return;
    }

    const sector = this.sectoresCatalogo.find(
      s => s.id_param === this.sectorSeleccionadoId
    );
    this.indautorModel.sector = sector?.nombre ?? '';

    // Si el sector tiene padre, actualizamos también el tipo de sector
    if (sector?.id_param_padre) {
      this.tipoSectorSeleccionadoId = sector.id_param_padre;
      const tipo = this.tiposSectorCatalogo.find(
        t => t.id_param === this.tipoSectorSeleccionadoId
      );
      this.indautorModel.tipoSector = tipo?.nombre ?? '';
    }

    this.actualizarListasDesdeSeleccionActual();
  }


  onSubsectorChange(event: any): void {
    const prevalue = (event.target as HTMLSelectElement).value;
    const value = prevalue.split(':')[1]
    this.subsectorIdSeleccionado = value ? Number(value) : null;

    if (!this.subsectorIdSeleccionado) {
      this.indautorModel.subsector = 'N/A';
      return;
    }

    this.actualizarSectorDesdeSubsector(this.subsectorIdSeleccionado);
  }


  onFilter(ev: any): void {
    this.search = ev.target.value?.trim() || '';
    if (this.dtInstance) {
      this.dtInstance.ajax.reload();
    }
  }

  onPageLengthChange(event: any): void {
    const newLength = parseInt(event.target.value, 10);
    this.pageLength = newLength;
    if (this.dtInstance) this.dtInstance.page.len(newLength).draw();
    else this.reloadEvent.emit(true);
  }

  view(id: number): void {
    this.isViewMode = true;
    this.cdr.detectChanges();

    this.service.getRegistro(id).subscribe({
      next: (registro: PatenteUIModel) => {
        this.indautorModel = { ...registro };
        this.preseleccionarCepatEInstitucionDesdeRegistro();
      },
      error: () => {
        this.showAlert({ icon: 'error', title: 'Error', text: 'No se pudo cargar el detalle.' });
      },
    });
  }

  edit(id: number): void {
    this.isViewMode = false;
    this.cdr.detectChanges();

    this.service.getRegistro(id).subscribe({
      next: (registro: PatenteUIModel) => {
        console.log(registro)
        this.indautorModel = { ...registro };
        this.preseleccionarCepatEInstitucionDesdeRegistro();
        this.inicializarSeleccionesDesdeRegistro();
      },
      error: () => {
        this.showAlert({ icon: 'error', title: 'Error', text: 'No se pudo cargar el detalle para edición.' });
      },
    });
  }

  private inicializarSeleccionesDesdeRegistro(): void {
    // Inicializar rama desde rama_param o rama
    if ((this.indautorModel as any).rama_param) {
      const ramaParamValue = (this.indautorModel as any).rama_param;
      console.log(ramaParamValue)

      // 1) Primero intentar buscar por nombre exacto (ya que generalmente llega como texto)
      let ramaEncontrada = this.ramasCatalogo.find(r => r.nombre === ramaParamValue);
      console.log(ramaEncontrada)

      if (!ramaEncontrada) {
        // 2) Si no encuentra por nombre exacto, intentar búsqueda parcial (case insensitive)
        const valorBusqueda = String(ramaParamValue).toLowerCase();
        ramaEncontrada = this.ramasCatalogo.find(r =>
          r.nombre.toLowerCase() === valorBusqueda
        );
      }

      if (!ramaEncontrada) {
        // 3) Intentar con búsqueda por contenido
        const valorBusqueda = String(ramaParamValue).toLowerCase();
        ramaEncontrada = this.ramasCatalogo.find(r =>
          r.nombre.toLowerCase().includes(valorBusqueda)
        );
      }

      if (!ramaEncontrada) {
        // 4) Como último recurso, intentar como número (por si acaso viene el ID)
        const ramaParamId = Number(ramaParamValue);
        if (!isNaN(ramaParamId) && ramaParamId > 0) {
          ramaEncontrada = this.ramasCatalogo.find(r => r.id_param === ramaParamId);
        }
      }

      // Si encontramos la rama, asignar el ID al campo rama_param (que es el que usa el select)
      if (ramaEncontrada) {
        console.log('✅ Asignando rama:', ramaEncontrada.nombre, 'con ID:', ramaEncontrada.id_param);
        (this.indautorModel as any).rama_param = ramaEncontrada.id_param;
        this.indautorModel.rama = ramaEncontrada.nombre;
        console.log('✅ Rama asignada - rama_param:', (this.indautorModel as any).rama_param, 'rama:', this.indautorModel.rama);
      } else {
        console.error('❌ No se encontró la rama en el catálogo para:', ramaParamValue);
      }
    } else if (this.indautorModel.rama) {
      // Si solo viene rama (sin rama_param), buscar en el catálogo
      const ramaEncontrada = this.ramasCatalogo.find(r => r.nombre === this.indautorModel.rama);
      if (ramaEncontrada) {
        (this.indautorModel as any).rama_param = ramaEncontrada.id_param;
      } else {
        // Intentar búsqueda parcial
        const ramaActual = this.indautorModel.rama;
        const ramaEncontradaParcial = this.ramasCatalogo.find(r =>
          r.nombre.toLowerCase().includes(ramaActual.toLowerCase())
        );
        if (ramaEncontradaParcial) {
          (this.indautorModel as any).rama_param = ramaEncontradaParcial.id_param;
          this.indautorModel.rama = ramaEncontradaParcial.nombre;
        }
      }
    }

    // Inicializar medio_ingreso_param
    if ((this.indautorModel as any).medio_ingreso_param) {
      const medioIngresoValue = (this.indautorModel as any).medio_ingreso_param;
      console.log('medio_ingreso_param recibido:', medioIngresoValue);

      // 1) Primero intentar buscar por nombre exacto
      let medioEncontrado = this.mediosIngresoCatalogo.find(m => m.nombre === medioIngresoValue);

      if (!medioEncontrado) {
        // 2) Búsqueda case-insensitive
        const valorBusqueda = String(medioIngresoValue).toLowerCase();
        medioEncontrado = this.mediosIngresoCatalogo.find(m =>
          m.nombre.toLowerCase() === valorBusqueda
        );
      }

      if (!medioEncontrado) {
        // 3) Búsqueda por contenido
        const valorBusqueda = String(medioIngresoValue).toLowerCase();
        medioEncontrado = this.mediosIngresoCatalogo.find(m =>
          m.nombre.toLowerCase().includes(valorBusqueda)
        );
      }

      if (!medioEncontrado) {
        // 4) Como último recurso, intentar como número
        const medioId = Number(medioIngresoValue);
        if (!isNaN(medioId) && medioId > 0) {
          medioEncontrado = this.mediosIngresoCatalogo.find(m => m.id_param === medioId);
        }
      }

      // Si encontramos el medio de ingreso, asignar el ID
      if (medioEncontrado) {
        console.log('✅ Asignando medio_ingreso_param:', medioEncontrado.nombre, 'con ID:', medioEncontrado.id_param);
        (this.indautorModel as any).medio_ingreso_param = medioEncontrado.id_param;
        this.indautorModel.medioIngreso = medioEncontrado.nombre;
      } else {
        console.error('❌ No se encontró el medio de ingreso en el catálogo para:', medioIngresoValue);
      }
    } else if (this.indautorModel.medioIngreso) {
      // Si solo viene medioIngreso (sin medio_ingreso_param), buscar en el catálogo
      const medioEncontrado = this.mediosIngresoCatalogo.find(m => m.nombre === this.indautorModel.medioIngreso);
      if (medioEncontrado) {
        (this.indautorModel as any).medio_ingreso_param = medioEncontrado.id_param;
      }
    }

    if (this.indautorModel.tipo_sector_param) {
      this.tipoSectorSeleccionadoId = typeof this.indautorModel.tipo_sector_param === 'number'
        ? this.indautorModel.tipo_sector_param
        : Number(this.indautorModel.tipo_sector_param);
      this.sectoresFiltrados = this.sectoresCatalogo.filter(
        s => s.id_param_padre === this.tipoSectorSeleccionadoId
      );
    }

    if (this.indautorModel.sector_param) {
      this.sectorSeleccionadoId = typeof this.indautorModel.sector_param === 'number'
        ? this.indautorModel.sector_param
        : Number(this.indautorModel.sector_param);
      this.subsectoresFiltrados = this.subsectoresCatalogo.filter(
        sub => sub.id_param_padre === this.sectorSeleccionadoId
      );
    }

    if (this.indautorModel.id_subsector) {
      this.subsectorIdSeleccionado = this.indautorModel.id_subsector;
    }
  }

  onArchivoSelected(event: any): void {
    const file = event.target?.files?.[0];
    if (!file) {
      this.selectedFile = null;
      this.filePreviewUrl = null;
      return;
    }

    if (file.type !== 'application/pdf') {
      this.showAlert({
        icon: 'error',
        title: 'Archivo no válido',
        text: 'Solo se permiten archivos PDF.'
      });
      this.selectedFile = null;
      this.filePreviewUrl = null;
      if (this.archivoInput) {
        this.archivoInput.nativeElement.value = '';
      }
      return;
    }

    this.selectedFile = file;
    const objectUrl = URL.createObjectURL(file);
    this.filePreviewUrl = objectUrl;
  }

  getSafeUrl(url: string): SafeUrl {
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }

  saveEdit(modal: any): void {
    if (!this.indautorModel.nombrePatente?.trim()) {
      this.showAlert({ icon: 'error', title: 'Validación', text: 'El título es obligatorio.' });
      return;
    }

    const id = this.indautorModel.id;
    this.isSaving = true;

    if (this.selectedFile) {
      this.fileUploadService.uploadFile(this.selectedFile, 'indautor').subscribe({
        next: (uploadResp) => {
          this.indautorModel.archivo = uploadResp.filename;
          this.actualizarRegistro(id, modal);
        },
        error: (err) => {
          console.error('Error al subir archivo:', err);
          this.showAlert({
            icon: 'error',
            title: 'Error',
            text: 'No se pudo subir el archivo. Guardando sin archivo.'
          });
          this.actualizarRegistro(id, modal);
        }
      });
    } else {
      this.actualizarRegistro(id, modal);
    }
  }

  private actualizarRegistro(id: number, modal: any): void {
    // Mapear rama_param a entero o null
    let ramaParam: number | null = null;
    if (this.indautorModel.rama_param != null) {
      const ramaId = typeof this.indautorModel.rama_param === 'string'
        ? parseInt(this.indautorModel.rama_param, 10)
        : this.indautorModel.rama_param;
      ramaParam = !isNaN(ramaId) ? ramaId : null;
    } else if (this.indautorModel.rama) {
      // Buscar en el catálogo por nombre
      const ramaEncontrada = this.ramasCatalogo.find(r => r.nombre === this.indautorModel.rama);
      ramaParam = ramaEncontrada?.id_param ?? null;
    }

    // Mapear medio_ingreso_param a entero o null
    let medioIngresoParam: number | null = null;
    if (this.indautorModel.medio_ingreso_param != null) {
      const medioId = typeof this.indautorModel.medio_ingreso_param === 'string'
        ? parseInt(this.indautorModel.medio_ingreso_param, 10)
        : this.indautorModel.medio_ingreso_param;
      medioIngresoParam = !isNaN(medioId) ? medioId : null;
    } else if (this.indautorModel.medioIngreso) {
      const medioEncontrado = this.mediosIngresoCatalogo.find(m => m.nombre === this.indautorModel.medioIngreso);
      medioIngresoParam = medioEncontrado?.id_param ?? null;
    }

    // Mapear estatus_param a entero o null
    let estatusParam: number | null = null;
    if (this.indautorModel.estatus_param != null) {
      const estatusId = typeof this.indautorModel.estatus_param === 'string'
        ? parseInt(this.indautorModel.estatus_param, 10)
        : this.indautorModel.estatus_param;
      estatusParam = !isNaN(estatusId) ? estatusId : null;
    } else if (this.indautorModel.estatus) {
      const estatusEncontrado = this.estatusCatalogo.find(e => e.nombre === this.indautorModel.estatus);
      estatusParam = estatusEncontrado?.id_param ?? null;
    }

    // Mapear anio_renovacion a entero o null
    let anioRenovacion: number | null = null;
    if (this.indautorModel.anioRenovacion !== undefined && this.indautorModel.anioRenovacion !== null) {
      const raw = String(this.indautorModel.anioRenovacion).trim();
      if (raw !== '' && raw.toUpperCase() !== 'N/A') {
        const parsed = Number(raw);
        if (!Number.isNaN(parsed)) {
          anioRenovacion = parsed;
        }
      }
    }

    // Crear una copia del modelo sin los campos _param que vamos a sobrescribir
    const { rama_param: _, medio_ingreso_param: __, estatus_param: ___, anioRenovacion: ____, ...modeloLimpio } = this.indautorModel as any;

    const payload = {
      ...modeloLimpio,
      id_institucion: this.institucionSeleccionadaCepat,
      id_cepat: this.selectedCepatId,
      tipo_sector_param: this.tipoSectorSeleccionadoId ?? null,
      sector_param: this.sectorSeleccionadoId ?? null,
      id_subsector: this.subsectorIdSeleccionado ?? null,
      rama_param: ramaParam,
      medio_ingreso_param: medioIngresoParam,
      estatus_param: estatusParam,
      anio_renovacion: anioRenovacion,
    };

    this.service.updateRegistro(id, payload, this.TIPO_INDAUTOR).subscribe({
      next: () => {
        this.isSaving = false;

        const alertaExito: SweetAlertOptions = {
          icon: 'success',
          title: 'Registro actualizado',
          text: 'El modelo de utilidad se actualizó correctamente.',
        };
        this.showAlert(alertaExito);

        // Limpiar todos los datos de edición
        this.limpiarDatosEdicion();

        if (this.dtInstance) {
          this.dtInstance.ajax.reload(null, false);
        }

        modal?.dismiss?.('saved');
      },
      error: (err) => {
        this.isSaving = false;
        const alertaError: SweetAlertOptions = {
          icon: 'error',
          title: 'Error',
          text: 'Ocurrió un problema al actualizar el modelo de utilidad. Inténtalo de nuevo.',
        };
        this.showAlert(alertaError);
        console.error('Error al actualizar registro:', err);
      },
    });
  }

  delete(id: number): void {
    this.service.deleteRegistro(id).subscribe({
      next: () => {
        if (this.dtInstance) {
          this.dtInstance.ajax.reload(null, false);
        }
        // La notificación de éxito ya se muestra en el componente crud
      },
      error: () => {
        this.showAlert({ icon: 'error', title: 'Error', text: 'No se pudo deshabilitar el registro.' });
      },
    });
  }

  addInventor(): void {
    if (!this.indautorModel.inventores) this.indautorModel.inventores = [];
    this.indautorModel.inventores.push({
      curp: 'LOPR920202MDFRRS02',
      nombreCompleto: 'Lourdes Pérez Ríos',
      sexo: 'F',
      tipoInvestigador: 'Técnico Académico',
      institucion: 'Instituto Tecnológico Orizaba',
      programaEducativo: 'Ingeniería Informática',
      cuerpoAcademico: 'CA de Informática y Computación',
      departamento: 'Sistemas Computacionales',
      fechaAfiliacion: '2025-09-12',
      fechaFin: '2027-06-23',
    });
  }

  removeInventor(index: number): void {
    if (!this.indautorModel.inventores) return;
    if (index > 0 && index < this.indautorModel.inventores.length) {
      this.indautorModel.inventores.splice(index, 1);
    }
  }

  get inventoresVisibles(): Inventor[] {
    const invs = this.indautorModel.inventores || [];
    return invs.filter((i) => !!(i && (i.curp || i.nombreCompleto || i.institucion)));
  }

  downloadDocument(documentName: string): void {
    if (!documentName) {
      this.showAlert({ icon: 'warning', title: 'Sin archivo', text: 'No hay archivo disponible.' });
      return;
    }

    this.fileUploadService.downloadFile(documentName, 'indautor').subscribe({
      next: (blob) => {
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = documentName;
        link.click();
        window.URL.revokeObjectURL(url);
      },
      error: (err) => {
        console.error('Error al descargar documento:', err);
        this.showAlert({ icon: 'error', title: 'Error', text: 'No se pudo descargar el archivo.' });
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

    this.isViewMode = true;
    this.selectedFile = null;

    this.indautorModel = {
      id: 0,
      solicitudId: '',
      nombrePatente: '',
      solicitante: '',
      fechaSolicitud: '',
      estatus: 'En trámite',
      descripcion: '',
      institucion: '',
      correo: '',
      documentos: [''],
      numeroExpediente: '',
      numeroTitulo: '',
      denominacion: '',
      rama: '',
      medioIngreso: '',
      tecnologicoOrigen: '',
      cePat: 'N/A',
      anioRenovacion: '',
      tipoSector: '',
      sector: '',
      subsector: '',
      fechaExpedicion: '',
      archivo: '',
      observaciones: '',
      inventores: [],
    };

    // Limpiar selecciones de sector
    this.selectedCepatId = null;
    this.institucionSeleccionadaCepat = null;
    this.tipoSectorSeleccionadoId = null;
    this.sectorSeleccionadoId = null;
    this.subsectorIdSeleccionado = null;

    // Limpiar listas filtradas
    this.sectoresFiltrados = [];
    this.subsectoresFiltrados = [];
    this.institucionesCepat = [];

    // Limpiar flags de edición
    this.isInicializandoDesdeRegistro = false;
    this.isEditingStatus = false;
    this.isSaving = false;
  }

  closeForm(modal: any): void {
    modal.dismiss('cancel');
    this.limpiarDatosEdicion();
  }

  onModalDismissed(): void {
    // Este método se llama cuando se cierra el modal (backdrop, ESC, botón X)
    this.limpiarDatosEdicion();
  }

  showAlert(swalOptions: SweetAlertOptions): void {
    let style = swalOptions.icon?.toString() || 'success';
    if (swalOptions.icon === 'error') style = 'danger';

    this.swalOptions = Object.assign(
      {
        buttonsStyling: false,
        confirmButtonText: 'Ok, entendido!',
        customClass: { confirmButton: 'btn btn-' + style },
      },
      swalOptions
    );
    this.cdr.detectChanges();
    this.noticeSwal.fire();
  }

  ngOnDestroy(): void {
    this.reloadEvent.unsubscribe();
    if (this.filePreviewUrl) {
      URL.revokeObjectURL(this.filePreviewUrl);
    }
  }
}
