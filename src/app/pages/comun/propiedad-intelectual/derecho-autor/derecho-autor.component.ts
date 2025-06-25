import { AfterViewInit, ChangeDetectorRef, Component, EventEmitter, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { CopyrightsService } from '../../../../api/services/copyright.service';
import { DataTablesResponse, ENTIDADES_FEDERATIVAS_DATA, ENTIDADES_FEDERATIVAS_MAP } from '../../../administrador/shared-services';
import { Config } from 'datatables.net';
import { SwalComponent } from '@sweetalert2/ngx-sweetalert2';
import { SweetAlertOptions } from 'sweetalert2';
import moment from 'moment';
import { FederalEntity } from 'src/app/api/models/entity.model';
import { Observable } from 'rxjs';
import { ICopyrightModel } from 'src/app/api/models/copyrigth.model';
import { TranslateService } from '@ngx-translate/core';

// 🆕 Definir tipo para el estado
type EstadoCopyright = 'Registrada' | 'En trámite' | 'Trámite con observaciones' | 'Aprobada' | 'Concluida';

@Component({
  selector: 'app-derecho-autor',
  templateUrl: './derecho-autor.component.html',
  styleUrl: './derecho-autor.component.scss'
})
export class DerechoAutorComponent implements OnInit, AfterViewInit, OnDestroy {
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

  aCopyright: Observable<ICopyrightModel>
  copyrightModel: ICopyrightModel = {
    id: 0,
    solicitudId: "",
    nombreObra: "",
    solicitante: "",
    autor: "",
    fechaSolicitud: "",
    estado: "En trámite",
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
  private secuenciaEstados: { [key in EstadoCopyright]?: EstadoCopyright } = {
    'Registrada': 'En trámite',
    'En trámite': 'Concluida',
    'Trámite con observaciones': 'En trámite'
  };

  constructor(
    private service: CopyrightsService,
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
        this.service.getCopyrights(dataTablesParameters).subscribe({
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
          data: 'nombreObra',
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
    this.copyrightModel.institucion = '';

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
        this.copyrightModel.institucion = institucion.nombre;
      }
    } else {
      this.copyrightModel.institucion = '';
    }
  }

  private inicializarSeleccionesDesdeDerechoAutor(): void {
    if (this.copyrightModel.institucion) {
      for (const [estadoId, instituciones] of Object.entries(ENTIDADES_FEDERATIVAS_MAP)) {
        const institucionEncontrada = instituciones.find((inst: { nombre: string; }) => inst.nombre === this.copyrightModel.institucion);
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
    this.copyrightModel.institucion = '';
  }

  delete(id: number) {
    this.service.deleteCopyright(id).subscribe(() => {
      this.reloadEvent.emit(true);
    });
  }

  view(id: number) {
    this.service.getCopyright(id).subscribe((copyright: ICopyrightModel) => {
      this.copyrightModel = { ...copyright };
      this.inicializarSeleccionesDesdeDerechoAutor();
      this.isViewMode = true;
      this.observacionesChanged = false;
      this.resetEditMode();
    });
  }

  // 🆕 Obtener clase CSS para el badge de estado
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
   * Obtener las opciones válidas de estado según el estado actual
   */
  getValidStatusOptions(): { value: EstadoCopyright, label: string }[] {
    const currentStatus = this.copyrightModel.estado;

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
   * Verificar si el estado actual permite edición
   */
  canEditStatus(): boolean {
    return this.getValidStatusOptions().length > 0;
  }

  // 🔧 SOLUCIÓN 2: Método enableEditMode actualizado
  enableEditMode(): void {
    this.isEditingStatus = true;
    this.originalStatus = this.copyrightModel.estado;
    this.originalObservations = this.copyrightModel.observaciones || '';

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
        text: 'Por favor selecciona un estado válido',
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
          <p><strong>Estado:</strong> ${this.editedStatus}</p>
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
      estado: this.editedStatus as EstadoCopyright,
      observaciones: this.editedObservations
    };

    this.service.updateCopyrightStatusAndObservations(this.copyrightModel.id, updateData).subscribe({
      next: (response) => {
        this.isSaving = false;

        // Actualizar el modelo local
        this.copyrightModel.estado = updateData.estado;
        this.copyrightModel.observaciones = updateData.observaciones;

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

  editarEstado(): void {
    const estadoActual = this.copyrightModel.estado;
    const siguienteEstado = this.secuenciaEstados[estadoActual];

    if (!siguienteEstado) {
      const alertaError: SweetAlertOptions = {
        icon: 'warning',
        title: 'Aviso',
        text: 'Este estado no puede ser modificado o ya se encuentra en el estado final.',
      };
      this.showAlert(alertaError);
      return;
    }

    const alertaConfirmacion: SweetAlertOptions = {
      icon: 'question',
      title: '¿Actualizar estado?',
      text: `¿Deseas cambiar el estado de "${estadoActual}" a "${siguienteEstado}"?`,
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
          this.actualizarEstado(siguienteEstado);
        }
      });
    });
  }

  private actualizarEstado(nuevoEstado: EstadoCopyright): void {
    this.service.updateCopyrightStatus(this.copyrightModel.id, nuevoEstado).subscribe({
      next: (response) => {
        this.copyrightModel.estado = nuevoEstado;

        const alertaExito: SweetAlertOptions = {
          icon: 'success',
          title: '¡Actualizado!',
          text: `El estado ha sido actualizado a "${nuevoEstado}"`,
        };
        this.showAlert(alertaExito);

        this.reloadEvent.emit(true);
      },
      error: (error) => {
        console.error('Error al actualizar estado:', error);
        const alertaError: SweetAlertOptions = {
          icon: 'error',
          title: 'Error',
          text: 'Hubo un problema al actualizar el estado. Inténtalo de nuevo.',
        };
        this.showAlert(alertaError);
      }
    });
  }

  onObservacionesChange(): void {
    this.observacionesChanged = true;
  }

  guardarObservaciones(): void {
    this.service.updateCopyrightObservations(this.copyrightModel.id, this.copyrightModel.observaciones || '').subscribe({
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

  create() {
    this.showAlert(
      {
        icon: 'info',
        title: 'Nueva Solicitud',
        text: 'Función en desarrollo'
      }
    );
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

    this.copyrightModel = {
      id: 0,
      solicitudId: '',
      nombreObra: '',
      solicitante: '',
      autor: '',
      correo: '',
      fechaSolicitud: '',
      institucion: '',
      estado: 'En trámite',
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

  ngOnDestroy(): void {
    this.reloadEvent.unsubscribe();
  }
}
