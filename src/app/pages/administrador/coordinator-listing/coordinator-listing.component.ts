import { CommonModule } from '@angular/common';
import {
  ChangeDetectorRef,
  Component,
  EventEmitter,
  OnDestroy,
  OnInit,
  TemplateRef,
  ViewChild,
} from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { TranslateService } from '@ngx-translate/core';
import { SwalComponent, SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import { Config } from 'datatables.net';
import { SweetAlertOptions } from 'sweetalert2';

import { FormsModule } from '@angular/forms';
import { CepatService } from 'src/app/api/services/cepat.service';
import { TranslationModule } from 'src/app/modules/i18n';
import { CrudModule } from '../../../modules/crud/crud.module';
import { SharedModule } from '../../../template/shared/shared.module';

// Opciones para el selector de estatus en el modal
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

  estatusOptions = ESTATUS_OPTIONS;

  // NUEVO: Esta es la bandera para el *ngIf
  isDataReady: boolean = false;

  private allCoordinators: any[] = [];

  @ViewChild('noticeSwal')
  noticeSwal!: SwalComponent;

  swalOptions: SweetAlertOptions = {};

  constructor(
    // MODIFICADO: Inyectamos tu servicio
    private cepatService: CepatService,
    private cdr: ChangeDetectorRef,
    private router: Router,
    private modalService: NgbModal,
    private translate: TranslateService
  ) {}

  ngOnInit(): void {
    this.placeholder = this.translate.instant('TABLE.PLACEHOLDER_SEARCH');

    // MODIFICADO: Usamos el valor 37 que especificaste
    const userType = 37;

    // MODIFICADO: Llamamos a tu servicio
    this.cepatService.getCepatUserByType(userType).subscribe(
      (data) => {
        console.log('Datos recibidos:', data);
        this.allCoordinators = data;

        // Preparamos la config
        this.initializeDataTables(this.allCoordinators);

        // MODIFICADO: Activamos el interruptor
        this.isDataReady = true;

        this.cdr.detectChanges(); // Forzamos la detección de cambios
      },
      (error) => {
        console.error('Error al cargar coordinadores:', error);
        this.showAlert({
          title: 'Error',
          text: 'No se pudieron cargar los datos.',
          icon: 'error',
        });
        this.initializeDataTables([]); // Inicializar tabla vacía

        this.isDataReady = true;
        this.cdr.detectChanges();
      }
    );
  }

  // Método para configurar DataTables después de recibir los datos
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
      // Usamos los datos locales
      data: data,
      initComplete: (settings, json) => {
        this.dtInstance = settings.oInstance.api();
        this.cdr.detectChanges();
      },
      // Columnas adaptadas a tu JSON
      columns: [
        {
          title: 'Usuario',
          data: 'nombre',
          render: (data, type, row) => {
            const fullName = `${data} ${row.ape_pat} ${row.ape_mat}`.trim();
            const colorClasses = ['success', 'info', 'warning', 'danger'];
            const randomColorClass = colorClasses[Math.floor(Math.random() * colorClasses.length)];
            const initials = (data[0] + (row.apellidos ? row.apellidos[0] : '')).toUpperCase();
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
            const isActive = data === 25;
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
    // 1. Aquí llamas a tu servicio de API DELETE
    // this.cepatService.deleteUser(id).subscribe(() => {

    this.showAlert({
      title: '¡Éxito!',
      text: 'El coordinador ha sido eliminado',
      icon: 'success',
    });

    // 2. Actualizar el arreglo local
    this.allCoordinators = this.allCoordinators.filter(
      (u) => u.id_usuario !== Number(id)
    );

    // 3. Actualizar los datos en la config y recargar
    this.datatableConfig.data = this.allCoordinators;
    this.reloadEvent.emit(true);
    this.cdr.detectChanges();

    // }, error => { ... });
  }

  edit(id: number) {
    const numericId = Number(id);
    this.cdr.detectChanges();

    // Buscar el coordinador en el arreglo local
    const foundCoordinator = this.allCoordinators.find(
      (c) => c.id_usuario === numericId
    );

    if (foundCoordinator) {
      this.coordinadorModel = { ...foundCoordinator };
      this.cdr.detectChanges();
    } else {
      this.showAlert({
        title: 'No encontrado',
        text: `El coordinador con ID ${id} no existe en la lista.`,
        icon: 'warning',
      });
    }
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
      tipo_usuario_param: 0,
      estatus: 24,
    };
  }

  saveChanges(modal: any) {
    // 1. Aquí llamas a tu servicio de API PUT/PATCH
    // this.cepatService.updateUser(this.coordinadorModel).subscribe((updatedUser) => {

    this.showAlert({
      title: '¡Éxito!',
      text: 'Los cambios se han guardado correctamente',
      icon: 'success',
    });

    // 2. Actualizar el arreglo local
    const index = this.allCoordinators.findIndex(
      (u) => u.id_usuario === this.coordinadorModel.id_usuario
    );
    if (index !== -1) {
      this.allCoordinators[index] = { ...this.coordinadorModel };
    }

    // 3. Actualizar datos en config y recargar tabla
    this.datatableConfig.data = this.allCoordinators;
    this.reloadEvent.emit(true);
    this.cdr.detectChanges();
    modal.close();

    // }, error => { ... });
  }

  async navigateToEdit(id: number, modalTemplate: TemplateRef<any>) {
    this.edit(id);
  }

  navigateToCreate() {
    this.router.navigate(['/administrador/coordinador/registro']);
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
