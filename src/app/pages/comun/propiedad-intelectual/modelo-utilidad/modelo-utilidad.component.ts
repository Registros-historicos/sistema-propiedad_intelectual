import {  AfterViewInit, ChangeDetectorRef, Component, EventEmitter, OnDestroy, OnInit, ViewChild  } from '@angular/core';
import {  SweetAlertOptions  } from 'sweetalert2';
import {  DataTablesResponse, ENTIDADES_FEDERATIVAS_DATA, ENTIDADES_FEDERATIVAS_MAP  } from '../../../administrador/shared-services';
import {  Config  } from 'datatables.net';
import {  SwalComponent  } from '@sweetalert2/ngx-sweetalert2';
import {  UtilityModelsService  } from '../../../../api/services/utility-models.service';
import moment from 'moment';
import { Observable } from 'rxjs';
import { IModUtilModel } from 'src/app/api/models/mod-util.model';
import { FederalEntity } from 'src/app/api/models/entity.model';
import { TranslateService } from '@ngx-translate/core';

// 🆕 Definir tipo para el estatus
type EstatusModUtil = 'Registrada' | 'En trámite' | 'Trámite con observaciones' | 'Aprobada' | 'Concluida';

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
    documentos: [""],
    observaciones: ""
  };

  entidadesFederativas: FederalEntity[] = ENTIDADES_FEDERATIVAS_DATA
  institucionesFiltradas: any[] = []
  estadoSeleccionado: number | null = null
  institucionSeleccionada: number | null = null

  selectedFile: File | null = null;
  isViewMode: boolean = true;

  // 🆕 Nuevas propiedades para el modo de edición
  isEditingStatus: boolean = false;
  isSaving: boolean = false;
  statusError: boolean = false;
  editedStatus: string = '';
  editedObservations: string = '';
  originalStatus: string = '';
  originalObservations: string = '';

  // 🆕 SOLUCIÓN 2: Key para forzar recreación del select
  editingSelectKey: boolean = false;

  // Mantener la propiedad existente para compatibilidad
  observacionesChanged: boolean = false;

  // 🆕 Secuencia de estados (mantener para referencia)
  private secuenciaEstados: { [key in EstatusModUtil]?: EstatusModUtil } = {
    'Registrada': 'En trámite',
    'En trámite': 'Concluida',
    'Trámite con observaciones': 'En trámite'
  };

  constructor(
    private service: UtilityModelsService,
    private cdr: ChangeDetectorRef,
    private translate: TranslateService
  ) {
  }

  ngAfterViewInit(): void {
  }

  ngOnInit(): void {
    this.placeholder = this.translate.instant('TABLE.PLACEHOLDER_SEARCH')

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
        this.service.getModUtiles(dataTablesParameters).subscribe({
          next: (resp) => {
            callback(resp);
          },
          error: (error) => {
            console.error('Error loading data:', error);
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
          title: this.translate.instant('TABLE.APPLICANT_NAME'),
          data: 'solicitante',
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
                <span class="text-muted">${full.correo || ''}</span>
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
          data: 'nombreModUtil',
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

  delete(id: number) {
    this.service.deleteModUtil(id).subscribe(() => {
      this.reloadEvent.emit(true);
    });
  }

  view(id: number) {
    this.isViewMode = true;
    this.cdr.detectChanges();

    this.service.getModUtil(id).subscribe((modUtil: IModUtilModel) => {
      this.modUtilModel = { ...modUtil };
      this.inicializarSeleccionesDesdeModUtil();
    });
  }

  follow(id: number) {
    this.isViewMode = false;
    this.cdr.detectChanges();

    this.service.getModUtil(id).subscribe((modUtil: IModUtilModel) => {
      this.modUtilModel = { ...modUtil };
      this.inicializarSeleccionesDesdeModUtil();
      this.observacionesChanged = false;
      this.resetEditMode();
    });
  }

  // 🆕 Obtener clase CSS para el badge de estatus
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

  /**
   * Obtener las opciones válidas de estatus según el estado actual
   */
  getValidStatusOptions(): { value: EstatusModUtil, label: string }[] {
    const currentStatus = this.modUtilModel.estatus;

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

  /**
   * Verificar si el estatus actual permite edición
   */
  canEditStatus(): boolean {
    return this.getValidStatusOptions().length > 0;
  }

  // 🔧 SOLUCIÓN 2: Método enableEditMode actualizado
  enableEditMode(): void {
    this.isEditingStatus = true;
    this.originalStatus = this.modUtilModel.estatus;
    this.originalObservations = this.modUtilModel.observaciones || '';

    // 🆕 Destruir el select y recrearlo
    this.editingSelectKey = false;
    this.editedStatus = '';
    this.editedObservations = this.originalObservations;
    this.statusError = false;

    // 🆕 Recrear el select en el siguiente ciclo
    setTimeout(() => {
      this.editingSelectKey = true;
      this.cdr.detectChanges();
    }, 10);
  }

  // 🔧 SOLUCIÓN 2: Método resetEditMode actualizado
  private resetEditMode(): void {
    this.isEditingStatus = false;
    this.editingSelectKey = false; // 🆕 Resetear key
    this.editedStatus = '';
    this.editedObservations = this.originalObservations;
    this.statusError = false;
    this.isSaving = false;
  }

  // 🆕 Verificar si hay cambios
  private hasChanges(): boolean {
    return this.editedStatus !== this.originalStatus ||
      this.editedObservations !== this.originalObservations;
  }

  // 🆕 Validar formulario
  private validateForm(): boolean {
    this.statusError = false;

    if (!this.editedStatus || this.editedStatus.trim() === '') {
      this.statusError = true;
      return false;
    }

    return true;
  }

  // 🆕 Guardar cambios
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

    // Mostrar confirmación
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

  // 🆕 Realizar el guardado
  private performSave(): void {
    this.isSaving = true;

    const updateData = {
      estatus: this.editedStatus as EstatusModUtil,
      observaciones: this.editedObservations
    };

    this.service.updateModUtilStatusAndObservations(this.modUtilModel.id, updateData).subscribe({
      next: (response) => {
        this.isSaving = false;

        // Actualizar el modelo local
        this.modUtilModel.estatus = updateData.estatus;
        this.modUtilModel.observaciones = updateData.observaciones;

        // Actualizar valores originales
        this.originalStatus = this.editedStatus;
        this.originalObservations = this.editedObservations;

        // Salir del modo edición
        this.isEditingStatus = false;

        // Mostrar éxito
        const alertaExito: SweetAlertOptions = {
          icon: 'success',
          title: '¡Éxito!',
          text: 'Los cambios se han guardado correctamente',
          timer: 2000,
          showConfirmButton: false
        };
        this.showAlert(alertaExito);

        // Recargar tabla
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

  // MÉTODOS EXISTENTES (mantener para compatibilidad)

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
    if (this.isEditingStatus) {
      this.resetEditMode();
    }

    this.performCloseForm(modal);
  }

  private performCloseForm(modal: any): void {
    modal.dismiss('cancel');

    this.modUtilModel = {
      id: 0,
      solicitudId: '',
      nombreModUtil: '',
      solicitante: '',
      correo: '',
      fechaSolicitud: '',
      institucion: '',
      estatus: 'En trámite',
      descripcion: '',
      documentos: [],
      observaciones: ''
    };

    this.estadoSeleccionado = 0;
    this.institucionSeleccionada = 0;
    this.institucionesFiltradas = [];
    this.observacionesChanged = false;
    this.resetEditMode();
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
