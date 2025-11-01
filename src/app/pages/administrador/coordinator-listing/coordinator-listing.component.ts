import { CommonModule } from '@angular/common';
import { forkJoin, Observable, of } from 'rxjs';
import {
  ChangeDetectorRef,
  Component,
  EventEmitter,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { TranslateService } from '@ngx-translate/core';
import { SwalComponent, SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import { Config } from 'datatables.net';
import { SweetAlertOptions } from 'sweetalert2';
import { FormsModule } from '@angular/forms';
import { CepatService, Estado } from 'src/app/api/services/cepat.service';
import { UsersService } from 'src/app/api/services/usuarios.service';
import { TranslationModule } from 'src/app/modules/i18n';
import { CrudModule } from '../../../modules/crud/crud.module';
import { SharedModule } from '../../../template/shared/shared.module';

const ESTATUS_OPTIONS = [
  { value: 24, label: 'Activo' },
  { value: 25, label: 'Inactivo' },
];

@Component({
  selector: 'app-coordinator-listing',
  templateUrl: './coordinator-listing.component.html',
  standalone: true,
  imports: [
    CommonModule,
    SharedModule,
    SweetAlert2Module,
    CrudModule,
    FormsModule,
    TranslationModule,
  ],
  styleUrls: ['./coordinator-listing.component.scss'],
})
export class CoordinatorListingComponent implements OnInit, OnDestroy {
  datatableConfig: Config = {};
  reloadEvent: EventEmitter<boolean> = new EventEmitter();
  lengthMenu: number[] = [5, 10, 15, 20];
  pageLength: number = 10;
  dtInstance: any;
  placeholder: string = '';
  estados: Estado[] = [];
  estadosSeleccionados: Estado[] = [];

  estatusOptions = ESTATUS_OPTIONS;
  isDataReady: boolean = false;
  private allCoordinators: any[] = [];
  estadosAsignados: Estado[] = [];

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
  };

  @ViewChild('noticeSwal')
  noticeSwal!: SwalComponent;

  swalOptions: SweetAlertOptions = {};

  constructor(
    private cepatService: CepatService,
    private cdr: ChangeDetectorRef,
    private router: Router,
    private modalService: NgbModal,
    private translate: TranslateService,
    private userService: UsersService
  ) {}

  private loadCepats(isInitialLoad: boolean = false): void {
    const userType = 37;
    if (isInitialLoad) {
      this.isDataReady = false;
      this.cdr.detectChanges();
    }

    this.cepatService.getCepatUserByType(userType).subscribe({
      next: (data) => {
        this.allCoordinators = data.map((coord: any) => ({
          ...coord,
          id: coord.id_usuario,
        }));

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
      error: () => {
        this.showAlert({
          title: 'Error',
          text: 'No se pudieron cargar los datos.',
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
    // Resetea el dropdown
    event.target.value = '';
  }

  removeEstado(estadoToRemove: Estado): void {
    this.estadosSeleccionados = this.estadosSeleccionados.filter(
      (e) => e.id_entidad_federativa !== estadoToRemove.id_entidad_federativa
    );
  }

  saveNewStates(onComplete: () => void): void {
    if (this.estadosSeleccionados.length === 0) {
      onComplete();
      return;
    }

    const userId = this.coordinadorModel.id_usuario;
    if (!userId) {
      this.showAlert({
        title: 'Error',
        text: 'No se encontró ID de usuario para asignar estados.',
        icon: 'error',
      });
      onComplete();
      return;
    }

    // --- ¡IMPORTANTE! ---
    // Debes tener un método en tu servicio (ej. 'assignStateToUser')
    // que asigne un estado a un usuario.
    const observables: Observable<any>[] = this.estadosSeleccionados.map(
      (estado) => {
        console.log(
          `Asignando estado ${estado.id_entidad_federativa} a usuario ${userId}`
        );

        // REEMPLAZA ESTO con tu llamada real al servicio:
        // return this.cepatService.assignStateToUser(userId, estado.id_entidad_federativa);

        // --- INICIO CÓDIGO DE SIMULACIÓN (BORRAR DESPUÉS) ---
        return of(null); // Simula una llamada exitosa
        // --- FIN CÓDIGO DE SIMULACIÓN ---
      }
    );

    forkJoin(observables).subscribe({
      next: () => {
        // No mostramos alerta de éxito aquí, 'saveChanges' ya muestra una general.
        onComplete();
      },
      error: (err) => {
        this.showAlert({
          title: 'Error de Asignación',
          text: 'Se actualizó el usuario, pero falló la asignación de nuevos estados.',
          icon: 'error',
        });
        onComplete(); // Completa igual para cerrar el modal, etc.
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
    const cepat = this.allCoordinators.find((c) => c.id === Number(id));
    if (!cepat) return;
    this.coordinadorModel = { ...cepat };
    this.cepatService.getStatesByUserId(id).subscribe({
      next: (estados) => {
        this.estadosAsignados = estados;
        console.log('Estados cargados:', estados);
      },
      error: (err) => {
        console.error('Error al obtener estados:', err);
        this.estadosAsignados = [];
      },
    });
  }
  eliminarEstado(idEstado: number): void {
    console.log('Eliminar estado con ID:', idEstado);
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
    };
    this.estadosAsignados = [];
    this.estadosSeleccionados = [];
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

    this.userService.updateUserByEmail(email, updatedData).subscribe({
      next: () => {
        this.saveNewStates(() => {
          this.showAlert({
            title: '¡Éxito!',
            text: 'Los cambios se han guardado correctamente',
            icon: 'success',
          });
          modal.close();
          this.loadCepats(false);
          this.estadosSeleccionados = [];
        });
      },
      error: (error) => {
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
}
