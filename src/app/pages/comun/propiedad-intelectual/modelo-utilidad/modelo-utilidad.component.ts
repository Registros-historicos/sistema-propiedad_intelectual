import { AfterViewInit, ChangeDetectorRef, Component, EventEmitter, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { SweetAlertOptions } from 'sweetalert2';
import { DataTablesResponse, ENTIDADES_FEDERATIVAS_DATA, ENTIDADES_FEDERATIVAS_MAP } from '../../../administrador/shared-services';
import { Config } from 'datatables.net';
import { SwalComponent } from '@sweetalert2/ngx-sweetalert2';
import { UtilityModelsService } from '../../../../api/services/utility-models.service';
import moment from 'moment';
import { Observable } from 'rxjs';
import { IModUtilModel } from 'src/app/api/models/mod-util.model';
import { FederalEntity } from 'src/app/api/models/entity.model';
import { TranslateService } from '@ngx-translate/core';
import {IndautorRegistriesService} from '../../../../api/services/indautor.service';

type EstatusModUtil = 'Registrada' | 'En trámite' | 'Trámite con observaciones' | 'Aprobada' | 'Concluida';

// ===== INDAUTOR: Tipos y dataset local =====
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

interface IndautorLocalItem {
  id: number;
  rama: string;
  titulo: string;
  institucion: string;
  fechaSolicitud: string; // YYYY-MM-DD
  numeroExpediente: string;
  numeroCertificado: string;
  estatus?: EstatusModUtil;
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
  inventores?: IndInventor[];
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

// Datos locales para maquetado en este componente (independiente de IMPI)
// Mantengo el mock anterior sin uso por compatibilidad, pero usaremos el dataset local de INDAUTOR
export const FAKE_IMPI_DATA = [] as any[];

@Component({
  selector: 'app-modelo-utilidad',
  templateUrl: './modelo-utilidad.component.html',
  styleUrl: './modelo-utilidad.component.scss'
})
export class ModeloUtilidadComponent implements OnInit, AfterViewInit, OnDestroy {
  isCollapsed1 = false;
  isCollapsed2 = true;

  pageLength: number = 10;
  dtInstance: any;
  selectedPage: number = 0;

  lengthMenu: number[] = [5, 10, 15, 20];

  applicants: DataTablesResponse;

  datatableConfig: Config = {};

  reloadEvent: EventEmitter<boolean> = new EventEmitter();

  @ViewChild('noticeSwal')
  noticeSwal!: SwalComponent;

  swalOptions: SweetAlertOptions = {};

  placeholder: string = '';

  aModUtil: Observable<IModUtilModel>
  modUtilModel: IModUtilModel = {
    id: 0,
    solicitudId: "",
    nombreModUtil: "",
    solicitante: "",
    fechaSolicitud: "",
    estatus: "En trámite",
    descripcion: "",
    institucion: "",
    correo: "",
    documentos: [""]
  };

  // INDAUTOR: trabajo en modo local como en IMPI
  useLocalFakeData: boolean = true;
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
        fechaFin: ''
      }
    ]
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

  private secuenciaEstados: { [key in EstatusModUtil]?: EstatusModUtil } = {
    'Registrada': 'En trámite',
    'En trámite': 'Concluida',
    'Trámite con observaciones': 'En trámite'
  };

  constructor(
    private service: UtilityModelsService,
    private cdr: ChangeDetectorRef,
    private translate: TranslateService,
    private indautorService: IndautorRegistriesService
  ) {
  }

  ngAfterViewInit(): void {
  }

  ngOnInit(): void {
    this.placeholder = this.translate.instant('TABLE.PLACEHOLDER_SEARCH')

    // INDAUTOR: configuración de DataTable usando dataset local
    this.datatableConfig = {
      serverSide: false,
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
      data: this.FAKE_INDAUTOR_DATA_LOCAL.map(item => ({
        id: item.id,
        rama: item.rama,
        titulo: item.titulo,
        institucion: item.institucion,
        fechaSolicitud: item.fechaSolicitud,
        numeroExpediente: item.numeroExpediente,
        numeroCertificado: item.numeroCertificado
      })),
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
          data: 'titulo',
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
          title: 'Número de expediente',
          data: 'numeroExpediente',
          render: (data) => {
            return `<span class="fw-semibold text-gray-600">${data || ''}</span>`;
          },
        },
        {
          title: 'Número de certificado',
          data: 'numeroCertificado',
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
      const institucion = this.institucionesFiltradas.find(inst => inst.id === institucionId);
      if (institucion) {
        this.modUtilModel.institucion = institucion.nombre;
      }
    } else {
      this.modUtilModel.institucion = '';
    }
  }

  private inicializarSeleccionesDesdeModUtil(): void {
    if (this.modUtilModel.institucion) {
      for (const [estadoId, instituciones] of Object.entries(ENTIDADES_FEDERATIVAS_MAP)) {
        const institucionEncontrada = instituciones.find((inst: { nombre: string; }) => inst.nombre === this.modUtilModel.institucion);
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
    this.modUtilModel.institucion = '';
  }

  // ===== INDAUTOR: CRUD local =====
  delete(id: number) {
    if (this.useLocalFakeData) {
      const numericId = Number(id);
      const idx = this.FAKE_INDAUTOR_DATA_LOCAL.findIndex(x => x.id === numericId);
      if (idx > -1) {
        this.FAKE_INDAUTOR_DATA_LOCAL.splice(idx, 1);
        if (this.dtInstance) {
          this.dtInstance.rows((i: number, rowData: any) => rowData.id === numericId).remove().draw(false);
        }
      }
      return;
    } else {
      // Fallback a servicio si se habilita serverSide en el futuro
      this.service.deleteModUtil(id).subscribe(() => {
        this.reloadEvent.emit(true);
      });
    }
  }

  view(id: number) {
    this.isViewMode = true;
    this.cdr.detectChanges();

    if (this.useLocalFakeData) {
      const numericId = Number(id);
      const item = this.FAKE_INDAUTOR_DATA_LOCAL.find(x => x.id === numericId);
      if (item) {
        this.indautorModel = {
          id: item.id,
          titulo: item.titulo || '',
          rama: item.rama || '',
          institucion: item.institucion || '',
          fechaSolicitud: item.fechaSolicitud || '',
          numeroExpediente: item.numeroExpediente || '',
          numeroCertificado: item.numeroCertificado || '',
          estatus: item.estatus || 'En trámite',
          medioIngreso: item.medioIngreso || '',
          tecnologicoOrigen: item.tecnologicoOrigen || '',
          cePat: item.cePat || '',
          anioRenovacion: item.anioRenovacion || '',
          tipoSector: item.tipoSector || '',
          sector: item.sector || '',
          subsector: item.subsector || '',
          fechaExpedicion: item.fechaExpedicion || '',
          archivo: item.archivo || '',
          observaciones: item.observaciones || '',
          descripcion: item.descripcion || '',
          inventores: item.inventores && item.inventores.length ? JSON.parse(JSON.stringify(item.inventores)) : []
        };
      }
    } else {
      // Fallback si se habilita backend
      this.service.getModUtil(id).subscribe((modUtil: IModUtilModel) => {
        // mapear a UI si fuera necesario
        this.indautorModel = {
          id: modUtil.id,
          titulo: modUtil.nombreModUtil || '',
          rama: 'INDAUTOR',
          institucion: modUtil.institucion || '',
          fechaSolicitud: modUtil.fechaSolicitud || '',
          numeroExpediente: '',
          numeroCertificado: '',
          estatus: (modUtil.estatus as EstatusModUtil) || 'En trámite',
          medioIngreso: '',
          tecnologicoOrigen: '',
          cePat: '',
          anioRenovacion: '',
          tipoSector: '',
          sector: '',
          subsector: '',
          fechaExpedicion: '',
          archivo: '',
          observaciones: modUtil.observaciones || '',
          descripcion: modUtil.descripcion || '',
          inventores: []
        };
      });
    }
  }

  // Segundo botón: Editar
  edit(id: number) {
    this.isViewMode = false;
    this.cdr.detectChanges();

    if (this.useLocalFakeData) {
      const numericId = Number(id);
      const item = this.FAKE_INDAUTOR_DATA_LOCAL.find(x => x.id === numericId);
      if (item) {
        this.indautorModel = {
          id: item.id,
          titulo: item.titulo || '',
          rama: item.rama || '',
          institucion: item.institucion || '',
          fechaSolicitud: item.fechaSolicitud || '',
          numeroExpediente: item.numeroExpediente || '',
          numeroCertificado: item.numeroCertificado || '',
          estatus: item.estatus || 'En trámite',
          medioIngreso: item.medioIngreso || '',
          tecnologicoOrigen: item.tecnologicoOrigen || '',
          cePat: item.cePat || '',
          anioRenovacion: item.anioRenovacion || '',
          tipoSector: item.tipoSector || '',
          sector: item.sector || '',
          subsector: item.subsector || '',
          fechaExpedicion: item.fechaExpedicion || '',
          archivo: item.archivo || '',
          observaciones: item.observaciones || '',
          descripcion: item.descripcion || '',
          inventores: item.inventores && item.inventores.length ? JSON.parse(JSON.stringify(item.inventores)) : []
        };
      }
    } else {
      this.service.getModUtil(id).subscribe((modUtil: IModUtilModel) => {
        this.indautorModel = {
          id: modUtil.id,
          titulo: modUtil.nombreModUtil || '',
          rama: 'INDAUTOR',
          institucion: modUtil.institucion || '',
          fechaSolicitud: modUtil.fechaSolicitud || '',
          numeroExpediente: '',
          numeroCertificado: '',
          estatus: (modUtil.estatus as EstatusModUtil) || 'En trámite',
          medioIngreso: '',
          tecnologicoOrigen: '',
          cePat: '',
          anioRenovacion: '',
          tipoSector: '',
          sector: '',
          subsector: '',
          fechaExpedicion: '',
          archivo: '',
          observaciones: modUtil.observaciones || '',
          descripcion: modUtil.descripcion || '',
          inventores: []
        };
      });
    }
  }

  saveEdit(modal: any) {
    if (this.useLocalFakeData) {
      const idx = this.FAKE_INDAUTOR_DATA_LOCAL.findIndex(x => x.id === this.indautorModel.id);
      if (idx > -1) {
        const target = this.FAKE_INDAUTOR_DATA_LOCAL[idx];
        target.titulo = this.indautorModel.titulo || '';
        target.rama = this.indautorModel.rama || '';
        target.institucion = this.indautorModel.institucion || target.institucion || '';
        target.fechaSolicitud = this.indautorModel.fechaSolicitud || '';
        target.numeroExpediente = this.indautorModel.numeroExpediente || '';
        target.numeroCertificado = this.indautorModel.numeroCertificado || '';
        target.estatus = (this.indautorModel.estatus as EstatusModUtil) || target.estatus;
        target.medioIngreso = this.indautorModel.medioIngreso || '';
        target.tecnologicoOrigen = this.indautorModel.tecnologicoOrigen || '';
        target.cePat = this.indautorModel.cePat || '';
        target.anioRenovacion = this.indautorModel.anioRenovacion || '';
        target.tipoSector = this.indautorModel.tipoSector || '';
        target.sector = this.indautorModel.sector || '';
        target.subsector = this.indautorModel.subsector || '';
        target.fechaExpedicion = this.indautorModel.fechaExpedicion || '';
        target.archivo = this.indautorModel.archivo || '';
        target.observaciones = this.indautorModel.observaciones || '';
        target.descripcion = this.indautorModel.descripcion || '';
        target.inventores = (this.indautorModel.inventores || []).map(i => ({...i}));

        if (this.dtInstance) {
          const updatedRow = {
            id: target.id,
            rama: target.rama,
            titulo: target.titulo,
            institucion: target.institucion,
            fechaSolicitud: target.fechaSolicitud,
            numeroExpediente: target.numeroExpediente,
            numeroCertificado: target.numeroCertificado,
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
      // Fallback a backend si aplica
      this.showAlert({ icon: 'info', title: 'Sin backend', text: 'Guardado solo disponible en modo local.' });
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

  getValidStatusOptions(): { value: EstatusModUtil, label: string }[] {
    const currentStatus = this.modUtilModel.estatus;

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
      estatus: this.editedStatus as EstatusModUtil,
      observaciones: this.editedObservations
    };

    this.service.updateModUtilStatusAndObservations(this.modUtilModel.id, updateData).subscribe({
      next: (response) => {
        this.isSaving = false;
        this.modUtilModel.estatus = updateData.estatus;
        this.modUtilModel.observaciones = updateData.observaciones;
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
    const estadoActual = this.modUtilModel.estatus;
    const siguienteEstado = this.secuenciaEstados[estadoActual as EstatusModUtil];

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

  private actualizarEstatus(nuevoEstatus: EstatusModUtil): void {
    this.service.updateModUtilStatus(this.modUtilModel.id, nuevoEstatus).subscribe({
      next: (response) => {
        this.modUtilModel.estatus = nuevoEstatus;

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

  onObservacionesChange(): void {
    this.observacionesChanged = true;
  }

  guardarObservaciones(): void {
    this.service.updateModUtilObservations(this.modUtilModel.id, this.modUtilModel.observaciones || '').subscribe({
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

    // Reset modelo INDAUTOR
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
      inventores: []
    };
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

  // ===== Helpers INDAUTOR =====
  addInventor(): void {
    if (!this.indautorModel.inventores) this.indautorModel.inventores = [];
    this.indautorModel.inventores.push({
      curp: '',
      nombreCompleto: '',
      sexo: '',
      tipoInvestigador: '',
      institucion: '',
      programaEducativo: '',
      cuerpoAcademico: '',
      departamento: '',
      fechaAfiliacion: '',
      fechaFin: ''
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
    return invs.filter(i => !!(i && (i.curp || i.nombreCompleto || i.institucion)));
  }

  // Dataset local con ejemplos (1 inventor en id=1, 2 inventores en id=2)
  private readonly FAKE_INDAUTOR_DATA_LOCAL: IndautorLocalItem[] = [
    { id: 1, rama: 'INDAUTOR', titulo: 'Colección de Cuentos Cortos', institucion: 'TecNM / Instituto Tecnológico de Ensenada', fechaSolicitud: '2025-09-08', numeroExpediente: 'IND-EXP-0001', numeroCertificado: 'IND-CERT-0001', estatus: 'En trámite', descripcion: 'Obra literaria', observaciones: '', inventores: [
      { curp: 'PEAJ900101HDFRRN01', nombreCompleto: 'Pedro Álvarez Juárez', sexo: 'M', tipoInvestigador: 'Autor', institucion: 'TecNM / Instituto Tecnológico de Ensenada', programaEducativo: 'Lengua y Literatura', cuerpoAcademico: 'Humanidades', departamento: 'Sociales', fechaAfiliacion: '2020-03-15', fechaFin: '' }
    ] },
    { id: 2, rama: 'INDAUTOR', titulo: 'Suite para Piano en Re menor', institucion: 'TecNM / Instituto Tecnológico de La Paz', fechaSolicitud: '2025-09-05', numeroExpediente: 'IND-EXP-0002', numeroCertificado: 'IND-CERT-0002', estatus: 'Registrada', descripcion: 'Obra musical', observaciones: '', inventores: [
      { curp: 'LOPR920202MDFRRS02', nombreCompleto: 'Lourdes Pérez Ríos', sexo: 'F', tipoInvestigador: 'Compositora', institucion: 'TecNM / Instituto Tecnológico de La Paz', programaEducativo: 'Música', cuerpoAcademico: 'Artes', departamento: 'Música', fechaAfiliacion: '2023-01-10', fechaFin: '' },
      { curp: 'HOGM850606HDFTRN03', nombreCompleto: 'Hugo Gómez Martínez', sexo: 'M', tipoInvestigador: 'Arreglista', institucion: 'TecNM / Instituto Tecnológico de La Paz', programaEducativo: 'Ingeniería de Audio', cuerpoAcademico: 'Artes', departamento: 'Música', fechaAfiliacion: '2021-09-01', fechaFin: '' }
    ] },
    { id: 3, rama: 'INDAUTOR', titulo: 'Aplicación Educativa Interactiva', institucion: 'TecNM / Instituto Tecnológico de Campeche', fechaSolicitud: '2025-09-01', numeroExpediente: 'IND-EXP-0003', numeroCertificado: 'IND-CERT-0003', estatus: 'En trámite', descripcion: '', observaciones: '', inventores: [] },
    { id: 4, rama: 'Invención', titulo: 'Manual de Robótica Educativa', institucion: 'TecNM / Instituto Tecnológico Superior de Calkiní', fechaSolicitud: '2025-08-30', numeroExpediente: 'IND-EXP-0004', numeroCertificado: 'IND-CERT-0004', estatus: 'En trámite', descripcion: 'Material educativo', observaciones: '', inventores: [] },
    { id: 5, rama: 'Modelo de Utilidad', titulo: 'Cómic: Aventuras en el Laboratorio', institucion: 'TecNM / Instituto Tecnológico de la Selva', fechaSolicitud: '2025-08-28', numeroExpediente: 'IND-EXP-0005', numeroCertificado: 'IND-CERT-0005', estatus: 'Registrada', descripcion: 'Obra gráfica', observaciones: '', inventores: [] },
    { id: 6, rama: 'Diseño Industrial', titulo: 'Álbum Fotográfico de Arquitectura', institucion: 'TecNM / Instituto Tecnológico de Tapachula', fechaSolicitud: '2025-08-26', numeroExpediente: 'IND-EXP-0006', numeroCertificado: 'IND-CERT-0006', estatus: 'En trámite', descripcion: 'Obra fotográfica', observaciones: '', inventores: [] },
    { id: 7, rama: 'Invención', titulo: 'Suite de Software para Laboratorio', institucion: 'TecNM / Instituto Tecnológico de Tuxtla Gutiérrez', fechaSolicitud: '2025-08-24', numeroExpediente: 'IND-EXP-0007', numeroCertificado: 'IND-CERT-0007', estatus: 'Aprobada', descripcion: 'Software', observaciones: '', inventores: [
      { curp: 'LARC930303HDFABC04', nombreCompleto: 'Luis Álvarez Rocha', sexo: 'M', tipoInvestigador: 'Desarrollador', institucion: 'TecNM / Instituto Tecnológico de Tuxtla Gutiérrez', programaEducativo: 'Ingeniería en Sistemas', cuerpoAcademico: 'Cómputo Aplicado', departamento: 'Sistemas y Computación', fechaAfiliacion: '2022-02-01', fechaFin: '' }
    ] },
    { id: 8, rama: 'Modelo de Utilidad', titulo: 'Cancionero Popular Vol. I', institucion: 'TecNM / Instituto Tecnológico Superior de Cintalapa', fechaSolicitud: '2025-08-22', numeroExpediente: 'IND-EXP-0008', numeroCertificado: 'IND-CERT-0008', estatus: 'En trámite', descripcion: 'Obra musical', observaciones: '', inventores: [] },
    { id: 9, rama: 'Diseño Industrial', titulo: 'Guía de Diseño de Interfaz de Usuario', institucion: 'TecNM / Instituto Tecnológico Superior de Comitán', fechaSolicitud: '2025-08-20', numeroExpediente: 'IND-EXP-0009', numeroCertificado: 'IND-CERT-0009', estatus: 'Trámite con observaciones', descripcion: 'Manual técnico', observaciones: 'Revisar derechos de imágenes', inventores: [] },
    { id: 10, rama: 'Invención', titulo: 'Documental: Voces del Campo', institucion: 'TecNM / Instituto Tecnológico Superior de Palenque', fechaSolicitud: '2025-08-18', numeroExpediente: 'IND-EXP-0010', numeroCertificado: 'IND-CERT-0010', estatus: 'En trámite', descripcion: 'Obra audiovisual', observaciones: '', inventores: [] },
    { id: 11, rama: 'Modelo de Utilidad', titulo: 'Material Didáctico de Matemáticas', institucion: 'TecNM / Instituto Tecnológico de Chihuahua', fechaSolicitud: '2025-08-16', numeroExpediente: 'IND-EXP-0011', numeroCertificado: 'IND-CERT-0011', estatus: 'Registrada', descripcion: 'Material educativo', observaciones: '', inventores: [] },
    { id: 12, rama: 'Diseño Industrial', titulo: 'Antología de Relatos Cortos', institucion: 'TecNM / Instituto Tecnológico de Chihuahua II', fechaSolicitud: '2025-08-14', numeroExpediente: 'IND-EXP-0012', numeroCertificado: 'IND-CERT-0012', estatus: 'En trámite', descripcion: 'Obra literaria', observaciones: '', inventores: [] },
    { id: 13, rama: 'Invención', titulo: 'Guion Cinematográfico: Horizonte Azul', institucion: 'TecNM / Instituto Tecnológico de Ciudad Juárez', fechaSolicitud: '2025-08-12', numeroExpediente: 'IND-EXP-0013', numeroCertificado: 'IND-CERT-0013', estatus: 'En trámite', descripcion: 'Guion', observaciones: '', inventores: [
      { curp: 'MORJ940404MDFXYZ05', nombreCompleto: 'María Ortiz Ramírez', sexo: 'F', tipoInvestigador: 'Guionista', institucion: 'TecNM / Instituto Tecnológico de Ciudad Juárez', programaEducativo: 'Cine', cuerpoAcademico: 'Artes', departamento: 'Comunicación', fechaAfiliacion: '2021-05-15', fechaFin: '' }
    ] },
    { id: 14, rama: 'Modelo de Utilidad', titulo: 'Libro de Texto: Programación I', institucion: 'TecNM / Instituto Tecnológico de Delicias', fechaSolicitud: '2025-08-10', numeroExpediente: 'IND-EXP-0014', numeroCertificado: 'IND-CERT-0014', estatus: 'Aprobada', descripcion: 'Libro de texto', observaciones: '', inventores: [] },
    { id: 15, rama: 'Diseño Industrial', titulo: 'Colección de Ilustraciones Botánicas', institucion: 'TecNM / Instituto Tecnológico de Parral', fechaSolicitud: '2025-08-08', numeroExpediente: 'IND-EXP-0015', numeroCertificado: 'IND-CERT-0015', estatus: 'En trámite', descripcion: 'Obra artística', observaciones: '', inventores: [] },
    { id: 16, rama: 'Invención', titulo: 'Curso en Línea: Fundamentos de IA', institucion: 'TecNM / Instituto Tecnológico Superior de Nuevo Casas Grandes', fechaSolicitud: '2025-08-06', numeroExpediente: 'IND-EXP-0016', numeroCertificado: 'IND-CERT-0016', estatus: 'Registrada', descripcion: 'Curso en línea', observaciones: '', inventores: [
      { curp: 'GALA950505HDFQWE06', nombreCompleto: 'Gabriel Alvarado', sexo: 'M', tipoInvestigador: 'Instructor', institucion: 'TecNM / Instituto Tecnológico Superior de Nuevo Casas Grandes', programaEducativo: 'Ing. Sistemas', cuerpoAcademico: 'Cómputo Aplicado', departamento: 'Sistemas', fechaAfiliacion: '2020-09-01', fechaFin: '' },
      { curp: 'SULP970707MDFQWE07', nombreCompleto: 'Susana López', sexo: 'F', tipoInvestigador: 'Coautora', institucion: 'TecNM / Instituto Tecnológico Superior de Nuevo Casas Grandes', programaEducativo: 'Ing. Sistemas', cuerpoAcademico: 'Cómputo Aplicado', departamento: 'Sistemas', fechaAfiliacion: '2022-01-10', fechaFin: '' }
    ] },
    { id: 17, rama: 'Modelo de Utilidad', titulo: 'Recetario de Cocina Tradicional', institucion: 'TecNM / Instituto Tecnológico de Gustavo A. Madero', fechaSolicitud: '2025-08-04', numeroExpediente: 'IND-EXP-0017', numeroCertificado: 'IND-CERT-0017', estatus: 'En trámite', descripcion: 'Compilación culinaria', observaciones: '', inventores: [] },
    { id: 18, rama: 'Diseño Industrial', titulo: 'Poesía Reunida: 2019-2025', institucion: 'TecNM / Instituto Tecnológico de Gustavo A. Madero II', fechaSolicitud: '2025-08-02', numeroExpediente: 'IND-EXP-0018', numeroCertificado: 'IND-CERT-0018', estatus: 'Concluida', descripcion: 'Obra literaria', observaciones: '', inventores: [] },
    { id: 19, rama: 'Invención', titulo: 'Base de Datos de Flora Local', institucion: 'TecNM / Instituto Tecnológico José Mario Molina Pasquel y Henríquez', fechaSolicitud: '2025-07-31', numeroExpediente: 'IND-EXP-0019', numeroCertificado: 'IND-CERT-0019', estatus: 'En trámite', descripcion: 'Base de datos', observaciones: 'Falta carta de autenticidad', inventores: [] },
    { id: 20, rama: 'Modelo de Utilidad', titulo: 'Audiolibro: Historias del Mar', institucion: 'TecNM / Instituto Tecnológico de Celaya', fechaSolicitud: '2025-07-29', numeroExpediente: 'IND-EXP-0020', numeroCertificado: 'IND-CERT-0020', estatus: 'En trámite', descripcion: 'Obra sonora', observaciones: '', inventores: [] },
    { id: 21, rama: 'Diseño Industrial', titulo: 'Catálogo de Arte Digital', institucion: 'TecNM / Instituto Tecnológico de León', fechaSolicitud: '2025-07-27', numeroExpediente: 'IND-EXP-0021', numeroCertificado: 'IND-CERT-0021', estatus: 'Trámite con observaciones', descripcion: 'Obra artística', observaciones: 'Adjuntar permisos de uso', inventores: [] },
    { id: 22, rama: 'Invención', titulo: 'Tutoriales Interactivos de Física', institucion: 'TecNM / Instituto Tecnológico de Irapuato', fechaSolicitud: '2025-07-25', numeroExpediente: 'IND-EXP-0022', numeroCertificado: 'IND-CERT-0022', estatus: 'Registrada', descripcion: 'Material educativo', observaciones: '', inventores: [] },
    { id: 23, rama: 'Modelo de Utilidad', titulo: 'Monografía de la Región Sierra', institucion: 'TecNM / Instituto Tecnológico de Morelia', fechaSolicitud: '2025-07-23', numeroExpediente: 'IND-EXP-0023', numeroCertificado: 'IND-CERT-0023', estatus: 'En trámite', descripcion: 'Investigación', observaciones: '', inventores: [] }
  ];
}
