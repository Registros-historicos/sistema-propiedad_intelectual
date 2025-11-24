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
    anioRenovacion: '',
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
  ) {}

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
          render: (data: string) => `<span class="fw-semibold text-gray-600">${data || '—'}</span>`,
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
        this.catalogosAll = cats;
        this.ramasCatalogo = (cats[3]?.lista || []) as Parametrizacion[];
        this.mediosIngresoCatalogo = (cats[8]?.lista || []) as Parametrizacion[];
        this.tiposSectorCatalogo = (cats[2]?.lista || []) as Parametrizacion[];
        this.estatusCatalogo = (cats[7]?.lista || []) as Parametrizacion[];
        this.subsectoresCatalogo = (cats[17]?.lista || []) as Parametrizacion[];

        const sectoresSet = new Set<number>();
        this.subsectoresCatalogo.forEach(sub => {
          if (sub.id_param_padre) {
            sectoresSet.add(sub.id_param_padre);
          }
        });

        this.sectoresCatalogo = Array.from(sectoresSet)
          .map(id => this.findParamById(id))
          .filter(Boolean) as Parametrizacion[];
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
    const id = event?.target?.value;
    this.tipoSectorSeleccionadoId = id ? Number(id) : null;

    if (!this.tipoSectorSeleccionadoId) {
      this.sectoresFiltrados = [];
      this.subsectoresFiltrados = [];
      this.sectorSeleccionadoId = null;
      this.subsectorIdSeleccionado = null;
      return;
    }

    this.sectoresFiltrados = this.sectoresCatalogo.filter(
      s => s.id_param_padre === this.tipoSectorSeleccionadoId
    );
    this.subsectoresFiltrados = [];
    this.sectorSeleccionadoId = null;
    this.subsectorIdSeleccionado = null;
  }

  onSectorChange(event: any): void {
    const id = event?.target?.value;
    this.sectorSeleccionadoId = id ? Number(id) : null;

    if (!this.sectorSeleccionadoId) {
      this.subsectoresFiltrados = [];
      this.subsectorIdSeleccionado = null;
      return;
    }

    this.subsectoresFiltrados = this.subsectoresCatalogo.filter(
      sub => sub.id_param_padre === this.sectorSeleccionadoId
    );
    this.subsectorIdSeleccionado = null;
  }

  onSubsectorChange(event: any): void {
    const id = event?.target?.value;
    this.subsectorIdSeleccionado = id ? Number(id) : null;
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
    const payload = {
      ...this.indautorModel,
      id_institucion: this.institucionSeleccionadaCepat,
      id_cepat: this.selectedCepatId,
      tipo_sector_param: this.tipoSectorSeleccionadoId,
      sector_param: this.sectorSeleccionadoId,
      id_subsector: this.subsectorIdSeleccionado,
    };

    this.service.updateRegistro(id, payload, this.TIPO_INDAUTOR).subscribe({
      next: () => {
        this.isSaving = false;
        this.isViewMode = true;
        this.selectedFile = null;
        this.filePreviewUrl = null;

        this.showAlert({
          icon: 'success',
          title: '¡Guardado!',
          text: 'Los cambios se guardaron correctamente.',
          timer: 1800,
          showConfirmButton: false,
        });

        if (this.dtInstance) {
          this.dtInstance.ajax.reload(null, false);
        }

        modal?.dismiss?.('saved');
      },
      error: (err) => {
        this.isSaving = false;
        this.showAlert({
          icon: 'error',
          title: 'Error al guardar',
          text: 'Ocurrió un error al guardar los cambios.'
        });
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
        this.showAlert({ icon: 'success', title: 'Deshabilitado', text: 'El registro fue deshabilitado.' });
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

  closeForm(modal: any): void {
    modal.dismiss('cancel');
    this.isViewMode = true;
    this.selectedFile = null;
    this.filePreviewUrl = null;

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

    this.selectedCepatId = null;
    this.institucionSeleccionadaCepat = null;
    this.tipoSectorSeleccionadoId = null;
    this.sectorSeleccionadoId = null;
    this.subsectorIdSeleccionado = null;
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
