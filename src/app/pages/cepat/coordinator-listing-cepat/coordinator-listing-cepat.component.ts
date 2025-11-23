import { CommonModule } from '@angular/common';
import {
  ChangeDetectorRef,
  Component,
  EventEmitter,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { HttpClient } from '@angular/common/http';
import { SwalComponent, SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import { Config } from 'datatables.net';
import { forkJoin, Observable } from 'rxjs';
import {
  CepatService,
  Estado,
  Institucion,
} from 'src/app/api/services/cepat.service';
import { CoordinatorHttpService } from 'src/app/api/services/coordinador.service';
import { UsersService } from 'src/app/api/services/usuarios.service';
import { TranslationModule } from 'src/app/modules/i18n';
import Swal, { SweetAlertOptions } from 'sweetalert2';
import { CrudModule } from '../../../modules/crud/crud.module';
import { SharedModule } from '../../../template/shared/shared.module';

const ESTATUS_OPTIONS = [
  { value: 24, label: 'Activo' },
  { value: 25, label: 'Inactivo' },
];

@Component({
  selector: 'app-coordinator-listing-cepat',
  templateUrl: './coordinator-listing-cepat.component.html',
  standalone: true,
  imports: [
    CommonModule,
    SharedModule,
    SweetAlert2Module,
    CrudModule,
    FormsModule,
    TranslationModule,
  ],
  styleUrls: ['./coordinator-listing-cepat.component.scss'],
})
export class CoordinatorListingCepatComponent implements OnInit, OnDestroy {
  datatableConfig: Config = {};
  reloadEvent: EventEmitter<boolean> = new EventEmitter();
  lengthMenu: number[] = [5, 10, 15, 20];
  pageLength: number = 10;
  dtInstance: any;
  placeholder: string = '';
  estados: Estado[] = [];
  estadosSeleccionados: Estado[] = [];
  institutoList: Institucion[] = [];
  selectedStateForInstitucion: number | null = null;
  selectedInstitutoId: number | null = null;
  selectedInstitutoName: string | null = null;
  showAddInstitucion: boolean = false;

  estatusOptions = ESTATUS_OPTIONS;
  isDataReady: boolean = false;
  private allCoordinators: any[] = [];
  rawResponse: any = null;
  estadosAsignados: Estado[] = [];
  cepatName: string = '';
  estadosAEliminar: number[] = [];

  coordinadorModel: any = {
    id_usuario: 0,
    nombre: '',
    ape_pat: '',
    ape_mat: '',
    url_foto: '',
    correo: '',
    telefono: '',
    tipo_usuario_param: 0,
    estatus: 24,
    id_cepa: 0,
  };

  @ViewChild('noticeSwal')
  noticeSwal!: SwalComponent;

  swalOptions: SweetAlertOptions = {};

  constructor(
    private cepatService: CepatService,
    private cdr: ChangeDetectorRef,
    private translate: TranslateService,
    private userService: UsersService,
    private http: HttpClient,
    private coordinatorService: CoordinatorHttpService
  ) {}

  onEstadoChangeForInstitucion(): void {
    const selectedStateId = this.selectedStateForInstitucion;
    this.selectedInstitutoId = null;
    this.institutoList = [];
    if (selectedStateId) {
      this.cepatService.getInstitucionesPorEstado(selectedStateId).subscribe({
        next: (instituciones) => {
          this.institutoList = instituciones;
          console.log('[DEBUG] CEPAT: instituciones cargadas para estado', selectedStateId, 'count=', Array.isArray(instituciones) ? instituciones.length : 0);
          this.cdr.detectChanges();
        },
        error: () => {
          this.institutoList = [];
          this.cdr.detectChanges();
        },
      });
    }
  }

  onInstitutoSelect(): void {
    // Log del id y nombre (si está disponible) cuando el usuario selecciona una institución
    const id = this.selectedInstitutoId;
    const seleccion = this.institutoList.find((i) => i.id_institucion === id as any);
    console.log('[DEBUG] CEPAT: onInstitutoSelect -> selectedInstitutoId =', id, 'selectedInstitutoName =', seleccion?.nombre_institucion || null);
  }

  assignInstitucion(): void {
    const idInstitucion = this.selectedInstitutoId;
    const idUsuario = this.coordinadorModel?.id_usuario;
    if (!idInstitucion || !idUsuario) {
      this.showAlert({
        title: 'Error',
        text: 'Debes seleccionar un estado e institución, y el usuario debe existir.',
        icon: 'error',
      });
      return;
    }

    // Construir URL absoluto al endpoint indicado y enviar el body { id_coordinador }
    const externalUrl = `http://20.14.208.230:8000/api/institucion/usuario/${idInstitucion}/`;
    const body = { id_coordinador: idUsuario };
    console.log('[DEBUG] CEPAT: assignInstitucion -> PUT', externalUrl, 'body=', body);

    this.http.put<any>(externalUrl, body).subscribe({
      next: (resp) => {
        console.log('[DEBUG] CEPAT: assignInstitucion response =', resp);

        // Actualizar UI si el backend devuelve la institución asignada
        if (resp && typeof resp === 'object') {
          this.selectedInstitutoId = resp.id_institucion || this.selectedInstitutoId || idInstitucion;
          this.selectedInstitutoName = resp.nombre || resp.nombre_institucion || this.selectedInstitutoName;
          this.coordinadorModel.id_institucion = this.selectedInstitutoId;
        }

        this.showAlert({
          title: '¡Éxito!',
          text: 'Institución asignada al coordinador correctamente.',
          icon: 'success',
        });
        // Limpiar los controles de selección (pero conservar la institución asignada en el modelo/visualización)
        this.selectedStateForInstitucion = null;
        this.institutoList = [];
        // dejar selectedInstitutoName para mostrar la institución asignada; limpiar el dropdown seleccionado
        this.selectedInstitutoId = null;
        this.showAddInstitucion = false;
        this.cdr.detectChanges();
        this.loadCepats(false);
      },
      error: (err) => {
        console.error('Error asignando institución:', err);
        this.showAlert({
          title: 'Error',
          text: 'No se pudo asignar la institución.',
          icon: 'error',
        });
      },
    });
  }

  unassignInstitucion(): void {
    const idInstitucion = this.selectedInstitutoId;
    if (!idInstitucion) {
      this.showAlert({
        title: 'Error',
        text: 'Selecciona la institución a desvincular primero.',
        icon: 'error',
      });
      return;
    }

    this.coordinatorService
      .updateInstitutionByIdCoordinator(idInstitucion, null)
      .subscribe({
        next: () => {
          this.showAlert({
            title: '¡Éxito!',
            text: 'Institución desvinculada correctamente.',
            icon: 'success',
          });
          // Limpiar selección local y actualizar listado
          this.selectedInstitutoId = null;
          this.selectedInstitutoName = null;
          this.selectedStateForInstitucion = null;
          this.institutoList = [];
          this.cdr.detectChanges();
          this.loadCepats(false);
        },
        error: (err) => {
          console.error('Error desvinculando institución:', err);
          this.showAlert({
            title: 'Error',
            text: 'No se pudo desvincular la institución.',
            icon: 'error',
          });
        },
      });
  }

  private loadCepats(isInitialLoad: boolean = false): void {
    // Usar el endpoint externo para tipo 36 según solicitud
    const userType = 36;
    if (isInitialLoad) {
      this.isDataReady = false;
      this.cdr.detectChanges();
    }

    // Endpoint absoluto solicitado (coordinadores por CEPAT)
    const externalUrl = 'http://20.14.208.230:8000/api/tableros/coordinadores/por-cepat/';

    console.log('[DEBUG] CEPAT: requesting external URL ->', externalUrl);

    // Mostrar estado de 'loading' en la UI para pruebas
    this.rawResponse = { status: 'loading', url: externalUrl };
    this.cdr.detectChanges();

    this.http.get<any[]>(externalUrl).subscribe({
      next: (data) => {
        // Guardar la respuesta cruda para impresión en la UI
        this.rawResponse = data;
        console.log('[DEBUG] CEPAT: rawResponse saved, length =', Array.isArray(data) ? data.length : 'not-array');
        console.log('[DEBUG] CEPAT: raw response length =', Array.isArray(data) ? data.length : 'not-array', 'firstItem =', Array.isArray(data) && data.length ? data[0] : data);
        // Normalizar respuesta: mapear id y estatus (no filtrar, usar exactamente lo que devuelve el endpoint)
        const transformed = (Array.isArray(data) ? data : []).map((coord: any) => ({
          ...coord,
          id: coord.id_usuario,
          estatus: coord.estatus || coord.estatus_param || coord.status || null,
        }));

        console.log('[DEBUG] CEPAT: transformed coordinators ->', transformed);

        this.allCoordinators = transformed;

        if (isInitialLoad) {
          this.initializeDataTables(this.allCoordinators);
          this.isDataReady = true;
        } else if (this.dtInstance) {
          this.dtInstance.clear();
          this.dtInstance.rows.add(this.allCoordinators);
          this.dtInstance.draw();
        } else {
          this.datatableConfig.data = [...this.allCoordinators];
          this.reloadEvent.emit(true);
        }

        this.cdr.detectChanges();
      },
      error: (error) => {
        console.error('Error cargando usuarios desde endpoint externo:', error);

        // Mostrar el error en la UI (rawResponse) para facilitar pruebas
        this.rawResponse = {
          status: 'error',
          message: error?.message || 'Error desconocido',
          details: error,
        };
        this.cdr.detectChanges();

        this.showAlert({
          title: 'Error',
          text: 'No se pudieron cargar los datos desde el endpoint externo.',
          icon: 'error',
        });

        if (isInitialLoad) {
          this.initializeDataTables([]);
          this.isDataReady = true;
          this.cdr.detectChanges();
        }
      },
    });
  }

  ngOnInit(): void {
    this.placeholder = this.translate.instant('TABLE.PLACEHOLDER_SEARCH');
    this.loadCepats(true);
    this.loadStates();
  }

  loadStates(): void {
    this.cepatService.getEstados().subscribe({
      next: (data) => {
        this.estados = data;
        this.cdr.detectChanges();
      },
      error: () => {
        this.estados = [];
        this.showAlert({
          title: 'Error',
          text: 'No se pudo cargar la lista de estados.',
          icon: 'error',
        });
      },
    });
  }

  get availableStates(): Estado[] {
    const assignedIds = new Set(
      this.estadosAsignados.map((e) => e.id_entidad_federativa)
    );
    const selectedIds = new Set(
      this.estadosSeleccionados.map((e) => e.id_entidad_federativa)
    );

    return this.estados.filter(
      (e) =>
        !assignedIds.has(e.id_entidad_federativa) &&
        !selectedIds.has(e.id_entidad_federativa)
    );
  }

  onSelectEstado(event: any): void {
    const idSeleccionado = Number(event.target.value);
    if (!idSeleccionado) return;

    const estado = this.estados.find(
      (e) => e.id_entidad_federativa === idSeleccionado
    );
    if (estado) {
      const yaSeleccionado = this.estadosSeleccionados.some(
        (e) => e.id_entidad_federativa === estado.id_entidad_federativa
      );
      if (!yaSeleccionado) {
        this.estadosSeleccionados.push(estado);
      }
    }
    event.target.value = '';
  }

  removeEstado(estadoToRemove: Estado): void {
    this.estadosSeleccionados = this.estadosSeleccionados.filter(
      (e) => e.id_entidad_federativa !== estadoToRemove.id_entidad_federativa
    );
  }

  saveNewStates(onComplete: () => void): void {
    const id_cepat = this.coordinadorModel.id_cepat;
    if (this.estadosSeleccionados.length === 0) {
      onComplete();
      return;
    }
    if (!id_cepat) {
      this.showAlert({
        title: 'Error',
        text: 'No se encontró ID de CEPAT para asignar instituciones.',
        icon: 'error',
      });
      onComplete();
      return;
    }
    const observablesGet: Observable<Institucion[]>[] =
      this.estadosSeleccionados.map((estado) =>
        this.cepatService.getInstitucionesPorEstado(
          estado.id_entidad_federativa
        )
      );

    forkJoin(observablesGet).subscribe({
      next: (resultados) => {
        const todasLasInstituciones: Institucion[] = resultados.reduce(
          (acc, val) => acc.concat(val),
          []
        );

        if (todasLasInstituciones.length === 0) {
          onComplete();
          return;
        }

        const observablesPut: Observable<any>[] = todasLasInstituciones.map(
          (institucion) =>
            this.cepatService.actualizarInstitucionByIdCepat(
              institucion.id_institucion,
              id_cepat
            )
        );

        forkJoin(observablesPut).subscribe({
          next: () => {
            onComplete();
          },
          error: () => {
            this.showAlert({
              title: 'Error',
              text: 'Ocurrió un error al asignar las instituciones al CEPAT.',
              icon: 'error',
            });
            onComplete();
          },
        });
      },
      error: (errGet) => {
        this.showAlert({
          title: 'Error',
          text: 'No se pudieron obtener las instituciones de los estados seleccionados.',
          icon: 'error',
        });
        onComplete();
      },
    });
  }

  initializeDataTables(data: any[]): void {
    this.datatableConfig = {
      serverSide: false,
      processing: true,
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
      data: data,
      initComplete: (settings, json) => {
        this.dtInstance = settings.oInstance.api();
        this.cdr.detectChanges();
      },
      columns: [
        {
          title: 'Usuario',
          data: 'nombre',
          render: (data, type, row) => {
            const fullName = `${data} ${row.ape_pat} ${row.ape_mat}`.trim();
            const colorClasses = ['success', 'info', 'warning', 'danger'];
            const randomColorClass =
              colorClasses[Math.floor(Math.random() * colorClasses.length)];
            const initials = (
              data[0] + (row.apellidos ? row.apellidos[0] : '')
            ).toUpperCase();
            const symbol = `
              <div class="symbol-label mx-5 fs-1 bg-light-${randomColorClass} text-${randomColorClass}" style="height: 60px; width: 60px;">
              ${initials}
              </div>
            `;
            const nameAndName = `
              <div class="d-flex flex-column" data-action="view" data-id="${row.id_usuario}">
                <a href="javascript:;" class="text-gray-800 text-hover-primary mb-1">${fullName}</a>
              </div>
            `;
            return `
              <div class="symbol symbol-circle symbol-50px overflow-hidden me-3" data-action="view" data-id="${row.id_usuario}">
                <a href="javascript:;">
                  ${symbol}
                </a>
              </div>
              ${nameAndName}
            `;
          },
        },
        {
          title: 'Correo',
          data: 'correo',
          className: 'text-left px-4',
          render: (data) => data || 'N/A',
        },
        {
          title: 'Teléfono',
          data: 'telefono',
          className: 'text-center',
          render: (data) => data || 'N/A',
        },
        {
          title: 'Estatus',
          data: 'estatus',
          className: 'text-center',
          render: (data) => {
            const isActive = data === 24;
            const badgeClass = isActive
              ? 'badge-light-success'
              : 'badge-light-danger';
            const statusText = isActive ? 'Activo' : 'Inactivo';
            return `<span class="badge ${badgeClass} fw-bold">${statusText}</span>`;
          },
        },
      ],
      createdRow: (row, data, dataIndex) => {
        $('td:eq(0)', row).addClass('d-flex align-items-center');
      },
    };
  }

  onPageLengthChange(event: any): void {
    const newLength = parseInt(event.target.value);
    this.pageLength = newLength;
    if (this.dtInstance) {
      this.dtInstance.page.len(newLength).draw();
    }
  }

  delete(id: number) {
    this.userService.deleteUserById(id).subscribe({
      next: () => {
        this.showAlert({
          title: '¡Éxito!',
          text: 'El usuario CEPAT ha sido eliminado',
          icon: 'success',
        });
        this.loadCepats(false);
      },
      error: (error) => {
        this.showAlert({
          title: 'Error',
          text: `No se pudo eliminar el usuario: ${error.message}`,
          icon: 'error',
        });
      },
    });
  }

  edit(id: number) {
    console.log('[DEBUG] CEPAT: edit() called with id =', id);
    const cepat = this.allCoordinators.find((c) => c.id === Number(id));
    if (!cepat) return;

    // Usar únicamente los datos ya provistos por el endpoint por-estados-cepat
    this.coordinadorModel = { ...cepat };

    // Intentar obtener estados asignados e información de institución desde el objeto de listado
    this.estadosAsignados = (cepat as any).estados || (cepat as any).estados_asignados || (cepat as any).assigned_states || [];

    this.coordinadorModel.id_cepat = (cepat as any).id_cepat || this.coordinadorModel.id_cepat || 0;
    this.cepatName = (cepat as any).nombre_cepat || (cepat as any).nombre || this.cepatName;

    this.selectedInstitutoId = (cepat as any).id_institucion || (cepat as any).id_instituto || null;
    this.selectedInstitutoName = (cepat as any).nombre_institucion || (cepat as any).institucion_nombre || null;

    console.log('[DEBUG] CEPAT: coordinadorModel populated from listing ->', this.coordinadorModel, 'estadosAsignados:', this.estadosAsignados);
  }

  eliminarEstado(idEstado: number): void {
    if (!this.estadosAEliminar.includes(idEstado)) {
      this.estadosAEliminar.push(idEstado);
    }
    this.estadosAsignados = this.estadosAsignados.filter(
      (e) => e.id_entidad_federativa !== idEstado
    );
  }

  closeForm(modal: any) {
    modal.dismiss('cancel');
    this.coordinadorModel = {
      id_usuario: 0,
      nombre: '',
      ape_pat: '',
      ape_mat: '',
      url_foto: '',
      correo: '',
      telefono: '',
      tipo_usuario_param: 37,
      estatus: 24,
      id_cepa: 0,
    };
    this.estadosAsignados = [];
    this.estadosSeleccionados = [];
    this.showAddInstitucion = false;
    // Limpieza de selects/internos para evitar valores residuales
    this.selectedStateForInstitucion = null;
    this.institutoList = [];
    this.selectedInstitutoId = null;
    // No tocar selectedInstitutoName aquí: si se cerró el modal queremos conservar la visualización hasta reload
  }

  toggleAddInstitucion(): void {
    // Si estamos cerrando el panel, limpiar los selects para evitar que queden opciones seleccionadas
    if (this.showAddInstitucion) {
      this.selectedStateForInstitucion = null;
      this.institutoList = [];
      this.selectedInstitutoId = null;
    }
    this.showAddInstitucion = !this.showAddInstitucion;
  }

  saveChanges(modal: any) {
    if (!this.coordinadorModel?.correo) {
      this.showAlert({
        title: 'Error',
        text: 'No se encontró el correo del usuario a actualizar.',
        icon: 'error',
      });
      return;
    }

    const email = this.coordinadorModel.correo;
    const updatedData = {
      nombre: this.coordinadorModel.nombre,
      ape_pat: this.coordinadorModel.ape_pat,
      ape_mat: this.coordinadorModel.ape_mat,
      telefono: this.coordinadorModel.telefono,
      tipo_usuario_param: this.coordinadorModel.tipo_usuario_param,
      estatus: this.coordinadorModel.estatus,
    };

    Swal.fire({
      title: 'Guardando cambios...',
      text: 'Por favor espera mientras se actualizan los datos.',
      allowOutsideClick: false,
      didOpen: () => {
        Swal.showLoading();
      },
    });

    this.userService.updateUserByEmail(email, updatedData).subscribe({
      next: () => {
        this.saveNewStates(() => {
          this.desvincularEstados(() => {
            Swal.close();
            this.showAlert({
              title: '¡Éxito!',
              text: 'Los cambios se han guardado correctamente',
              icon: 'success',
            });
            modal.close();
            this.loadCepats(false);
            this.estadosSeleccionados = [];
            this.estadosAEliminar = [];
          });
        });
      },
      error: (error) => {
        Swal.close();
        this.showAlert({
          title: 'Error',
          text: `No se pudo actualizar el usuario: ${error.message}`,
          icon: 'error',
        });
      },
    });
  }

  showAlert(swalOptions: SweetAlertOptions) {
    let style = swalOptions.icon?.toString() || 'success';
    if (swalOptions.icon === 'error') {
      style = 'danger';
    }
    this.swalOptions = Object.assign(
      {
        buttonsStyling: false,
        confirmButtonText: 'Ok, entendido!',
        customClass: {
          confirmButton: 'btn btn-' + style,
        },
      },
      swalOptions
    );
    this.cdr.detectChanges();
    this.noticeSwal.fire();
  }

  ngOnDestroy(): void {
    this.reloadEvent.unsubscribe();
  }

  desvincularEstados(onComplete: () => void): void {
    if (this.estadosAEliminar.length === 0) {
      onComplete();
      return;
    }

    const observablesGet: Observable<Institucion[]>[] =
      this.estadosAEliminar.map((idEstado) =>
        this.cepatService.getInstitucionesPorEstado(idEstado)
      );

    forkJoin(observablesGet).subscribe({
      next: (resultados) => {
        const todasLasInstituciones: Institucion[] = resultados.reduce(
          (acc, val) => acc.concat(val),
          []
        );

        if (todasLasInstituciones.length === 0) {
          onComplete();
          return;
        }

        const observablesPut: Observable<any>[] = todasLasInstituciones.map(
          (institucion) =>
            this.cepatService.actualizarInstitucionByIdCepat(
              institucion.id_institucion,
              null
            )
        );

        forkJoin(observablesPut).subscribe({
          next: () => {
            this.estadosAEliminar = [];
            onComplete();
          },
          error: () => {
            this.showAlert({
              title: 'Error',
              text: 'Ocurrió un error al desvincular las instituciones.',
              icon: 'error',
            });
            onComplete();
          },
        });
      },
      error: () => {
        this.showAlert({
          title: 'Error',
          text: 'No se pudieron obtener las instituciones de los estados a desvincular.',
          icon: 'error',
        });
        onComplete();
      },
    });
  }
}
