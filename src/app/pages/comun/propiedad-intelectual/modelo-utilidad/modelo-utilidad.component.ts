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
import {
  DataTablesResponse,
  ENTIDADES_FEDERATIVAS_DATA,
  ENTIDADES_FEDERATIVAS_MAP,
} from '../../../administrador/shared-services';
import { Config } from 'datatables.net';
import { SwalComponent } from '@sweetalert2/ngx-sweetalert2';
import { UtilityModelsService } from '../../../../api/services/utility-models.service';
import moment from 'moment';
import { Observable, switchMap } from 'rxjs';
import { IModUtilModel } from 'src/app/api/models/mod-util.model';
import { FederalEntity } from 'src/app/api/models/entity.model';
import { TranslateService } from '@ngx-translate/core';

declare const $: any;

type EstatusModUtil =
  | 'Registrada'
  | 'En trámite'
  | 'Trámite con observaciones'
  | 'Aprobada'
  | 'Concluida';

interface IndInventor {
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

type IndautorUIModel = {
  id: number;
  titulo: string;
  rama: string;
  institucion: string;
  fechaSolicitud: string;
  numeroExpediente: string;
  numeroCertificado: string;
  estatus: EstatusModUtil | '';
  medioIngreso: string;
  tecnologicoOrigen: string;
  cePat: string;
  anioRenovacion: string;
  tipoSector: string;
  sector: string;
  subsector: string;
  fechaExpedicion: string;
  archivo: string;
  observaciones: string;
  descripcion: string;
  inventores: IndInventor[];
};

@Component({
  selector: 'app-modelo-utilidad',
  templateUrl: './modelo-utilidad.component.html',
  styleUrl: './modelo-utilidad.component.scss',
})
export class ModeloUtilidadComponent
  implements OnInit, AfterViewInit, OnDestroy
{
  isCollapsed1 = false;
  isCollapsed2 = true;

  pageLength = 10;
  dtInstance: any;

  lengthMenu: number[] = [5, 10, 15, 20];

  applicants: DataTablesResponse;
  datatableConfig: Config = {} as Config;

  reloadEvent: EventEmitter<boolean> = new EventEmitter<boolean>();

  @ViewChild('noticeSwal')
  noticeSwal!: SwalComponent;

  swalOptions: SweetAlertOptions = {};
  placeholder = '';

  aModUtil: Observable<IModUtilModel>;
  modUtilModel: IModUtilModel = {
    id: 0,
    solicitudId: '',
    nombreModUtil: '',
    solicitante: '',
    fechaSolicitud: '',
    estatus: 'En trámite',
    descripcion: '',
    institucion: '',
    correo: '',
    documentos: [''],
  };

  // Modelo para el modal "Ver/Editar"
  indautorModel: IndautorUIModel = {
    id: 0,
    titulo: '',
    rama: '',
    institucion: '',
    fechaSolicitud: '',
    numeroExpediente: '',
    numeroCertificado: '',
    estatus: 'En trámite',
    medioIngreso: '',
    tecnologicoOrigen: '',
    cePat: '',
    anioRenovacion: '',
    tipoSector: '',
    sector: '',
    subsector: '',
    fechaExpedicion: '',
    archivo: '',
    observaciones: '',
    descripcion: '',
    inventores: [],
  };

  entidadesFederativas: FederalEntity[] = ENTIDADES_FEDERATIVAS_DATA;
  institucionesFiltradas: any[] = [];
  estadoSeleccionado: number | null = null;
  institucionSeleccionada: number | null = null;

  selectedFile: File | null = null;

  // Flags de UI
  isViewMode = true;         // modal lectura
  isEditingStatus = false;   // edición estatus
  isEditingForm = false;     // edición formulario (lápiz)
  isSaving = false;

  // Estado edición estatus
  statusError = false;
  editedStatus = '';
  editedObservations = '';
  originalStatus = '';
  originalObservations = '';
  editingSelectKey = false;
  observacionesChanged = false;

  private secuenciaEstados: { [key in EstatusModUtil]?: EstatusModUtil } = {
    Registrada: 'En trámite',
    'En trámite': 'Concluida',
    'Trámite con observaciones': 'En trámite',
  };

  // cache local para la tabla
  private tableData: any[] = [];

  constructor(
    private service: UtilityModelsService,
    private cdr: ChangeDetectorRef,
    private translate: TranslateService
  ) {}

  ngAfterViewInit(): void {}

  ngOnInit(): void {
    this.placeholder = this.translate.instant('TABLE.PLACEHOLDER_SEARCH');

    this.datatableConfig = {
      // === TODO local en cliente ===
      serverSide: false,
      processing: true,
      searching: true,
      deferRender: true,

      // === Orden local (dos clics asc/desc; multi columna) ===
      ordering: true,
      orderMulti: true,
      order: [[0, 'asc']],
      rowId: 'id',

      // Si tu template tiene una columna Acciones al final, la desactivamos:
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

      // ⬇⬇⬇ clave: arrancar sin ajax, con data vacía
      data: [],

      columns: [
        // ===== ID =====
        {
          title: 'ID',
          data: 'id',
          className: 'text-gray-700 fw-semibold',
          render: (data: any, type: string) => {
            if (type !== 'display') return data ?? '';
            return `<span class="fw-semibold">${data ?? ''}</span>`;
          },
        },

        // ===== No. expediente =====
        {
          title: 'N.º DE EXPEDIENTE',
          data: 'solicitudId',
          render: (data: any, type: string) => {
            if (type !== 'display') return data ?? '';
            const val = (data ?? '') !== '' ? String(data) : '—';
            return `
              <span class="fw-semibold text-gray-600"
                    style="display:inline-block;max-width:160px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;">
                ${val}
              </span>`;
          },
        },

        // ===== RAMA =====
        {
          title: this.translate.instant('TABLE.BRANCH') || 'RAMA',
          data: 'ramaLabel',
          render: (data: any, type: string, full: any) => {
            const label = (data ?? full?.rama ?? '—').toString();
            if (type !== 'display') return label;

            const id = full?.id ?? '';
            const initials =
              label && label.length > 1
                ? (label[0] + (label[1] || '')).toUpperCase()
                : 'IN';
            const colorClasses = ['success', 'info', 'warning', 'danger'];
            const randomColorClass =
              colorClasses[Math.floor(Math.random() * colorClasses.length)];

            const symbolLabel = `
              <div class="symbol-label fs-3 bg-light-${randomColorClass} text-${randomColorClass}">
                ${initials}
              </div>`;

            const nameAndEmail = `
              <div class="d-flex flex-column" data-action="view" data-id="${id}">
                <a href="javascript:;" class="text-gray-800 text-hover-primary mb-1">${label}</a>
              </div>`;

            return `
              <div class="d-flex align-items-center">
                <div class="symbol symbol-circle symbol-50px overflow-hidden me-3" data-action="view" data-id="${id}">
                  <a href="javascript:;">${symbolLabel}</a>
                </div>
                ${nameAndEmail}
              </div>`;
          },
        },

        // ===== TÍTULO =====
        {
          title: this.translate.instant('TABLE.WORK_TITLE') || 'TÍTULO',
          data: 'nombreModUtil',
          render: (data: string, type: string) => {
            if (type !== 'display') return data || '';
            return `<span class="fw-bold fs-6 text-gray-800">${data || ''}</span>`;
          },
        },

        // ===== INSTITUCIÓN =====
        {
          title: this.translate.instant('TABLE.INSTITUTION') || 'INSTITUCIÓN',
          data: 'institucion',
          render: (data: string, type: string) => {
            if (type !== 'display') return data || '';
            return `<span class="fw-semibold text-gray-600">${data || '—'}</span>`;
          },
        },

        // ===== FECHA SOLICITUD (ordenable por ISO) =====
        {
          title: this.translate.instant('TABLE.DATE') || 'FECHA DE SOLICITUD',
          data: 'fechaSolicitud',
          render: (data: string, type: string) => {
            if (type !== 'display') return data || '';
            return `<span class="fw-semibold text-gray-600">${
              data ? moment(data).format('DD-MM-YYYY') : ''
            }</span>`;
          },
        },

        // (Acciones en tu template: última columna; queda deshabilitada por columnDefs)
      ],

      createdRow: (row: any, data: any) => {
        const $row = $(row);
        $row.attr('data-action', 'view');
        $row.attr('data-id', data?.id ?? 0);
        $row.addClass('cursor-pointer');
      },

      initComplete: (settings: any) => {
        this.dtInstance = settings.oInstance.api();

        // Cargar TODOS los datos y llenar la tabla (sin ajax de DataTables)
        this.refreshTableData();

        this.cdr.detectChanges();
      },
    } as Config;
  }

  /** Trae TODO del backend, actualiza cache local y pinta en la tabla sin parpadeos */
  private refreshTableData(): void {
    // pide un lote grande para “global”
    this.service.getModUtiles({ start: 0, length: 100000 }).subscribe({
      next: (res) => {
        const rows = (res?.data || []).map((r: any) => ({
          // normaliza los campos que usas en columns
          id: r.id,
          solicitudId: r.solicitudId,
          ramaLabel: r.ramaLabel ?? r.rama ?? '',
          nombreModUtil: r.nombreModUtil,
          institucion: r.institucion,
          fechaSolicitud: r.fechaSolicitud, // ISO
        }));

        this.tableData = rows;

        if (this.dtInstance) {
          this.dtInstance.clear();
          this.dtInstance.rows.add(this.tableData);
          this.dtInstance.draw(false);
        } else {
          // fallback si aún no hay instancia (no debería pasar)
          this.datatableConfig.data = this.tableData;
        }
      },
      error: () => {
        // en error deja la tabla vacía (pero no se queda “cargando”)
        this.tableData = [];
        if (this.dtInstance) {
          this.dtInstance.clear().draw(false);
        } else {
          this.datatableConfig.data = [];
        }
      },
    });
  }

  onPageLengthChange(event: any): void {
    const newLength = parseInt(event.target.value, 10);
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
    this.modUtilModel.institucion = '';

    if (estadoId && ENTIDADES_FEDERATIVAS_MAP[estadoId]) {
      this.institucionesFiltradas = ENTIDADES_FEDERATIVAS_MAP[estadoId];
    } else {
      this.institucionesFiltradas = [];
    }
  }

  onInstitucionChange(institucionId: number): void {
    this.institucionSeleccionada = institucionId;

    if (institucionId) {
      const institucion = this.institucionesFiltradas.find(
        (inst: any) => inst.id === institucionId
      );
      if (institucion) {
        this.modUtilModel.institucion = institucion.nombre;
      }
    } else {
      this.modUtilModel.institucion = '';
    }
  }

  private inicializarSeleccionesDesdeModUtil(): void {
    if (this.modUtilModel.institucion) {
      for (const [estadoId, instituciones] of Object.entries(
        ENTIDADES_FEDERATIVAS_MAP
      )) {
        const institucionEncontrada = (instituciones as any[]).find(
          (inst: any) => inst.nombre === this.modUtilModel.institucion
        );
        if (institucionEncontrada) {
          this.estadoSeleccionado = Number(estadoId);
          this.institucionesFiltradas = instituciones as any[];
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
    this.modUtilModel.institucion = '';
  }

  /* ===== CRUD backend ===== */
  delete(id: number): void {
    this.service.deleteModUtil(id).subscribe({
      next: () => {
        this.removeRowFromTable(id);
        this.showAlert({
          icon: 'success',
          title: 'Deshabilitado',
          text: 'El registro fue deshabilitado.',
        });
      },
      error: () => {
        this.showAlert({
          icon: 'error',
          title: 'Error',
          text: 'No se pudo deshabilitar el registro.',
        });
      },
    });
  }

  enable(id: number): void {
    this.service.enableModUtil(id).subscribe({
      next: () => {
        this.showAlert({
          icon: 'success',
          title: 'Habilitado',
          text: 'El registro fue habilitado.',
        });
      },
      error: () => {
        this.showAlert({
          icon: 'error',
          title: 'Error',
          text: 'No se pudo habilitar el registro.',
        });
      },
    });
  }

  // === Ver (modo lectura)
  view(id: number): void {
    this.isViewMode = true;
    this.isEditingForm = false;
    this.cdr.detectChanges();

    this.service.getModUtil(id).subscribe({
      next: (modUtil: IModUtilModel) => {
        const extra: any = modUtil as any;

        this.indautorModel = {
          id: modUtil.id,
          titulo: modUtil.nombreModUtil || '',
          rama: String(extra.ramaRaw ?? ''),
          institucion: modUtil.institucion || '',
          fechaSolicitud: modUtil.fechaSolicitud || '',
          numeroExpediente: modUtil.solicitudId || '',
          numeroCertificado: '',
          estatus: (modUtil.estatus as EstatusModUtil) || 'En trámite',
          medioIngreso: String(extra.medioIngresoRaw ?? ''),
          tecnologicoOrigen: modUtil.institucion || '',
          cePat: '',
          anioRenovacion: '',
          tipoSector: String(extra.tipoSectorRaw ?? ''),
          sector: '',
          subsector: '',
          fechaExpedicion: extra.fechaExpedicion || '',
          archivo: (modUtil.documentos && modUtil.documentos[0]) || '',
          observaciones: modUtil.observaciones || '',
          descripcion: modUtil.descripcion || '',
          inventores: [],
        };
      },
      error: () => {
        this.showAlert({
          icon: 'error',
          title: 'Error',
          text: 'No se pudo cargar el detalle.',
        });
      },
    });
  }

  // === Editar (modo edición con lápiz)
  edit(id: number): void {
    this.isViewMode = false;
    this.isEditingForm = true; // activa inputs en el modal
    this.cdr.detectChanges();

    this.service.getModUtil(id).subscribe({
      next: (modUtil: IModUtilModel) => {
        const extra: any = modUtil as any;

        this.indautorModel = {
          id: modUtil.id,
          titulo: modUtil.nombreModUtil || '',
          rama: String(extra.ramaRaw ?? ''),
          institucion: modUtil.institucion || '',
          fechaSolicitud: modUtil.fechaSolicitud || '',
          numeroExpediente: modUtil.solicitudId || '',
          numeroCertificado: '',
          estatus: (modUtil.estatus as EstatusModUtil) || 'En trámite',
          medioIngreso: String(extra.medioIngresoRaw ?? ''),
          tecnologicoOrigen: modUtil.institucion || '',
          cePat: '',
          anioRenovacion: '',
          tipoSector: String(extra.tipoSectorRaw ?? ''),
          sector: '',
          subsector: '',
          fechaExpedicion: extra.fechaExpedicion || '',
          archivo: (modUtil.documentos && modUtil.documentos[0]) || '',
          observaciones: modUtil.observaciones || '',
          descripcion: modUtil.descripcion || '',
          inventores: [],
        };
      },
      error: () => {
        this.showAlert({
          icon: 'error',
          title: 'Error',
          text: 'No se pudo cargar el detalle para edición.',
        });
      },
    });
  }

  // === Guardar (edición del formulario del modal)
  saveEdit(modal: any): void {
    if (!this.indautorModel.titulo?.trim()) {
      this.showAlert({
        icon: 'error',
        title: 'Validación',
        text: 'El título es obligatorio.',
      });
      return;
    }

    const id = this.indautorModel.id;
    this.isSaving = true;

    const s = (v: any) => (v === undefined || v === null ? '' : String(v));

    this.service.getRegistroRaw(id).pipe(
      switchMap((raw) => {
        const dto = {
          no_expediente:      s(this.indautorModel.numeroExpediente ?? raw.no_expediente),
          titulo:             s(this.indautorModel.titulo ?? raw.titulo),
          tipo_ingreso_param: s(raw.tipo_ingreso_param ?? '45'),
          id_usuario:         Number(raw.id_usuario ?? 0),
          rama_param:         s(this.indautorModel.rama ?? raw.rama_param),
          fec_expedicion:     s(raw.fec_expedicion),
          observaciones:      s(this.indautorModel.observaciones ?? raw.observaciones),
          archivo:            s(this.indautorModel.archivo ?? raw.archivo),
          estatus_param:      s(raw.estatus_param),
          medio_ingreso_param:s(this.indautorModel.medioIngreso ?? raw.medio_ingreso_param),
          tipo_registro_param:s(raw.tipo_registro_param ?? '45'),
          fec_solicitud:      s(this.indautorModel.fechaSolicitud ?? raw.fec_solicitud),
          descripcion:        s(this.indautorModel.descripcion ?? raw.descripcion),
          tipo_sector_param:  s(this.indautorModel.tipoSector ?? raw.tipo_sector_param),
        };

        return this.service.updateRegistro(id, dto as any);
      })
    ).subscribe({
      next: () => {
        this.isSaving = false;
        this.isViewMode = true;
        this.isEditingForm = false;

        // Parchea fila local
        this.patchRowInTable(id, {
          solicitudId:   this.indautorModel.numeroExpediente,
          nombreModUtil: this.indautorModel.titulo,
          institucion:   this.indautorModel.institucion,
          fechaSolicitud:this.indautorModel.fechaSolicitud,
          ramaLabel:     this.indautorModel.rama || undefined,
        });

        this.showAlert({
          icon: 'success',
          title: '¡Guardado!',
          text: 'Los cambios se guardaron correctamente.',
          timer: 1800,
          showConfirmButton: false,
        });

        // Y refresca cache completo por si hay dependencias (sin parpadeo)
        this.refreshTableData();

        modal?.dismiss?.('saved');
      },
      error: (err) => {
        this.isSaving = false;
        this.showAlert({
          icon: 'error',
          title: 'Error al guardar',
          text: 'Ocurrió un error al intentar guardar los cambios.',
        });
        console.error('PUT /api/registros/{id}/ error:', err);
      }
    });
  }

  // === Edición de estatus (flujo existente)
  getStatusBadgeClass(status: string): string {
    const statusClasses: { [key: string]: string } = {
      'En trámite': 'badge-light-info',
      'Trámite con observaciones': 'badge-light-warning',
      Aprobada: 'badge-light-success',
      Registrada: 'badge-light-primary',
      Concluida: 'badge-light-secondary',
    };
    return statusClasses[status] || 'badge-light-secondary';
  }

  getValidStatusOptions(): { value: EstatusModUtil; label: string }[] {
    const currentStatus = this.modUtilModel.estatus;

    switch (currentStatus) {
      case 'Registrada':
        return [
          { value: 'En trámite', label: 'En trámite' },
          { value: 'Trámite con observaciones', label: 'Trámite con observaciones' },
        ];
      case 'Trámite con observaciones':
        return [{ value: 'En trámite', label: 'En trámite' }];
      case 'En trámite':
        return [{ value: 'Aprobada', label: 'Aprobada' }];
      case 'Aprobada':
        return [{ value: 'Concluida', label: 'Concluida' }];
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
    this.originalStatus = this.modUtilModel.estatus;
    this.originalObservations = this.modUtilModel.observaciones || '';
    this.editingSelectKey = false;
    this.editedStatus = '';
    this.editedObservations = this.originalObservations;
    this.statusError = false;

    setTimeout(() => {
      this.editingSelectKey = true;
      this.cdr.detectChanges();
    }, 10);
  }

  private validateFormStatus(): boolean {
    this.statusError = false;
    if (!this.editedStatus || this.editedStatus.trim() === '') {
      this.statusError = true;
      return false;
    }
    return true;
  }

  saveChanges(): void {
    if (!this.validateFormStatus()) {
      this.showAlert({
        icon: 'error',
        title: 'Error de validación',
        text: 'Por favor selecciona un estatus válido',
        customClass: { confirmButton: 'btn btn-danger' },
      });
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
        cancelButton: 'btn btn-secondary',
      },
    };

    import('sweetalert2').then((Swal) => {
      Swal.default.fire(alertaConfirmacion).then((result) => {
        if (result.isConfirmed) {
          this.performSaveStatus();
        }
      });
    });
  }

  private performSaveStatus(): void {
    this.isSaving = true;
    const nuevoEstatus = this.editedStatus as EstatusModUtil;

    this.service
      .updateModUtilStatus(this.modUtilModel.id, String(nuevoEstatus))
      .subscribe({
        next: () => {
          this.isSaving = false;
          this.modUtilModel.estatus = nuevoEstatus;
          this.modUtilModel.observaciones = this.editedObservations;
          this.isEditingStatus = false;

          this.showAlert({
            icon: 'success',
            title: '¡Éxito!',
            text: 'El estatus se ha guardado correctamente',
            timer: 2000,
            showConfirmButton: false,
          });
        },
        error: () => {
          this.isSaving = false;
          this.showAlert({
            icon: 'error',
            title: 'Error al guardar',
            text: 'Ocurrió un error al intentar guardar los cambios',
          });
        },
      });
  }

  editarEstatus(): void {
    const estadoActual = this.modUtilModel.estatus;
    const siguienteEstado = this.secuenciaEstados[estadoActual as EstatusModUtil];

    if (!siguienteEstado) {
      this.showAlert({
        icon: 'warning',
        title: 'Aviso',
        text: 'Este estatus no puede ser modificado o ya se encuentra en el estado final.',
      });
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
        cancelButton: 'btn btn-light',
      },
    };

    import('sweetalert2').then((Swal) => {
      Swal.default.fire(alertaConfirmacion).then((result) => {
        if (result.isConfirmed) this.actualizarEstatus(siguienteEstado);
      });
    });
  }

  private actualizarEstatus(nuevoEstatus: EstatusModUtil): void {
    this.service
      .updateModUtilStatus(this.modUtilModel.id, String(nuevoEstatus))
      .subscribe({
        next: () => {
          this.modUtilModel.estatus = nuevoEstatus;
          this.showAlert({
            icon: 'success',
            title: '¡Actualizado!',
            text: `El estatus ha sido actualizado a "${nuevoEstatus}"`,
          });
        },
        error: () => {
          this.showAlert({
            icon: 'error',
            title: 'Error',
            text: 'Hubo un problema al actualizar el estatus. Inténtalo de nuevo.',
          });
        },
      });
  }

  onObservacionesChange(): void {
    this.observacionesChanged = true;
  }

  guardarObservaciones(): void {
    this.showAlert({
      icon: 'info',
      title: 'No disponible',
      text: 'El guardado de observaciones no está disponible por el momento.',
    });
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

  onFileSelected(event: any): void {
    const file = event.target.files[0];
    if (file && file.type === 'application/pdf') {
      this.selectedFile = {
        name: file.name,
        size: file.size,
        type: file.type,
      } as File;
    } else if (file) {
      this.showAlert({
        icon: 'error',
        title: 'Error!',
        text: 'Solo se permiten archivos PDF',
      });
      event.target.value = '';
    }
  }

  downloadDocument(documentName: string): void {
    console.log('Descargando documento:', documentName);
  }

  closeForm(modal: any): void {
    modal.dismiss('cancel');
    this.isViewMode = true;
    this.isEditingForm = false;

    this.indautorModel = {
      id: 0,
      titulo: '',
      rama: '',
      institucion: '',
      fechaSolicitud: '',
      numeroExpediente: '',
      numeroCertificado: '',
      estatus: 'En trámite',
      medioIngreso: '',
      tecnologicoOrigen: '',
      cePat: '',
      anioRenovacion: '',
      tipoSector: '',
      sector: '',
      subsector: '',
      fechaExpedicion: '',
      archivo: '',
      observaciones: '',
      descripcion: '',
      inventores: [],
    };
  }

  getStatusOrder(status: string): number {
    const statusOrder: { [key: string]: number } = {
      Registrada: 1,
      'En trámite': 2,
      'Trámite con observaciones': 2.5,
      Aprobada: 4,
      Concluida: 5,
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
      Registrada: 'MODAL.FOLLOW_UP.DESCRIPTIONS.REGISTERED',
      'En trámite': 'MODAL.FOLLOW_UP.DESCRIPTIONS.IN_PROCESS',
      'Trámite con observaciones':
        'MODAL.FOLLOW_UP.DESCRIPTIONS.WITH_OBSERVATIONS',
      Aprobada: 'MODAL.FOLLOW_UP.DESCRIPTIONS.APPROVED',
      Concluida: 'MODAL.FOLLOW_UP.DESCRIPTIONS.COMPLETED',
    };
    const translationKey = translationKeys[status];
    if (translationKey) return this.translate.instant(translationKey);
    return 'Estado no reconocido.';
  }

  getStatusIcon(status: string): string {
    const statusIcons: { [key: string]: string } = {
      Registrada: 'document',
      'En trámite': 'timer',
      'Trámite con observaciones': 'information',
      Aprobada: 'check',
      Concluida: 'check-circle',
    };
    return statusIcons[status] || 'document';
  }

  ngOnDestroy(): void {
    this.reloadEvent.unsubscribe();
  }

  /* ===== Helpers UI inventores ===== */
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
    if (index > -1 && index < this.indautorModel.inventores.length) {
      this.indautorModel.inventores.splice(index, 1);
    }
  }

  get inventoresVisibles(): IndInventor[] {
    const invs = this.indautorModel.inventores || [];
    return invs.filter(
      (i) => !!(i && (i.curp || i.nombreCompleto || i.institucion))
    );
  }

  // ===== Helpers DataTable (parche/remo sin recargar) =====
  private patchRowInTable(id: number, patch: Partial<any>): void {
    if (!this.dtInstance) return;

    // actualiza cache local
    const i = this.tableData.findIndex(x => Number(x.id) === Number(id));
    if (i > -1) this.tableData[i] = { ...this.tableData[i], ...patch };

    // actualiza fila visible
    let row = this.dtInstance.row(`#${id}`);
    if (!row || !row.data || !row.data()) {
      row = this.dtInstance.row((idx: number, data: any) => Number(data?.id) === Number(id));
    }
    if (row && row.data) {
      const current = row.data();
      const merged = { ...current, ...patch };
      if (patch.ramaLabel === undefined && current?.ramaLabel) {
        merged.ramaLabel = current.ramaLabel;
      }
      row.data(merged).draw(false);
    }
  }

  private removeRowFromTable(id: number): void {
    if (!this.dtInstance) return;

    // quita de cache
    this.tableData = this.tableData.filter(x => Number(x.id) !== Number(id));

    // quita de tabla
    let row = this.dtInstance.row(`#${id}`);
    if (!row || !row.data || !row.data()) {
      row = this.dtInstance.row((idx: number, data: any) => Number(data?.id) === Number(id));
    }
    if (row && row.remove) {
      row.remove().draw(false);
    }
  }
}
