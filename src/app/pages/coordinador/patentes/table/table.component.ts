import { ChangeDetectorRef, Component, EventEmitter, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { SwalComponent } from '@sweetalert2/ngx-sweetalert2';
import { Config } from 'datatables.net';
import moment from 'moment';
import { PATENT_DATA } from 'src/app/api/data/patent.data';
import { IPatentModel } from 'src/app/api/models/patent.model';
import { SweetAlertOptions } from 'sweetalert2';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
})
export class TableComponent {
  isCollapsed1 = false;
  isCollapsed2 = true;

  isLoading = false;

  patents: IPatentModel[] = PATENT_DATA;
  filteredPatents: IPatentModel[] = PATENT_DATA;

  datatableConfig: Config = {};

  reloadEvent: EventEmitter<boolean> = new EventEmitter();

  patentModel: IPatentModel = {
    id: 0,
    solicitudId: '',
    nombrePatente: '',
    solicitante: '',
    fechaSolicitud: '',
    estado: 'Registrada',
    descripcion: '',
    institucion: '',
    email: '',
    documentos: []
  };

  @ViewChild('noticeSwal')
  noticeSwal!: SwalComponent;

  swalOptions: SweetAlertOptions = {};

  estados: string[] = ['Registrada', 'En trámite', 'Trámite con observaciones', 'Aprobada', 'Concluida'];

  constructor(private cdr: ChangeDetectorRef) { }

  ngOnInit(): void {
    this.initializeDataTable();
  }

  initializeDataTable(): void {
    this.datatableConfig = {
      data: this.filteredPatents,
      columns: [
        {
          title: 'Solicitud',
          data: 'solicitudId',
          render: (data: string, type: any, full: IPatentModel) => {
            return `
              <div data-action="view" data-id="${full.id}">
                <div class="d-flex flex-column">
                  <a href="javascript:;" class="text-gray-800 text-hover-primary mb-1 fw-bold">${data}</a>
                </div>
              </div>
            `;
          }
        },
        {
          title: 'Nombre',
          data: 'nombrePatente',
          render: (data: string, type: any, full: IPatentModel) => {
            const shortDesc = full.descripcion.length > 80
              ? full.descripcion.substring(0, 80) + '...'
              : full.descripcion;
            return `
              <div data-action="view" data-id="${full.id}">
                <a href="javascript:;" class="text-gray-800 text-hover-primary fw-bold">${data}</a>
                <div class="text-muted fs-7 mt-1">${shortDesc}</div>
              </div>
            `;
          }
        },
        {
          title: 'Solicitante',
          data: 'solicitante',
          render: (data: string, type: any, full: IPatentModel) => {
            const initials = data.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase();
            const colorClasses = ['success', 'info', 'warning', 'danger', 'primary'];
            const randomColorClass = colorClasses[Math.floor(Math.random() * colorClasses.length)];

            return `
              <div class="d-flex align-items-center" data-action="view" data-id="${full.id}">
                <div class="symbol symbol-circle symbol-50px overflow-hidden me-3">
                  <div class="symbol-label fs-3 bg-light-${randomColorClass} text-${randomColorClass}">
                    ${initials}
                  </div>
                </div>
                <div class="d-flex flex-column">
                  <a href="javascript:;" class="text-gray-800 text-hover-primary mb-1">${data}</a>
                  <span class="text-muted fs-7">${full.institucion}</span>
                  <span class="text-muted fs-8">${full.email}</span>
                </div>
              </div>
            `;
          }
        },
        {
          title: 'Fecha Solicitud',
          data: 'fechaSolicitud',
          render: (data: string) => {
            return moment(data).format('DD/MM/YYYY');
          }
        },
        {
          title: 'Estatus',
          data: 'estado',
          render: (data: string) => {
            return this.getStatusBadge(data);
          }
        }
      ],
      pageLength: 10,
      searching: true,
      ordering: true,
      paging: true
    };
  }

  getStatusBadge(estado: string): string {
    const badges = {
      'Registrada': '<span class="badge badge-light-info">Registrada</span>',
      'En trámite': '<span class="badge badge-light-warning">En trámite</span>',
      'Trámite con observaciones': '<span class="badge badge-light-danger">Con observaciones</span>',
      'Aprobada': '<span class="badge badge-light-success">Aprobada</span>',
      'Concluida': '<span class="badge badge-light-primary">Concluida</span>'
    };
    return badges[estado as keyof typeof badges] || `<span class="badge badge-light-secondary">${estado}</span>`;
  }

  filterPatents(searchTerm: string): void {
    if (!searchTerm) {
      this.filteredPatents = this.patents;
    } else {
      this.filteredPatents = this.patents.filter(patent =>
        patent.nombrePatente.toLowerCase().includes(searchTerm.toLowerCase()) ||
        patent.solicitante.toLowerCase().includes(searchTerm.toLowerCase()) ||
        patent.solicitudId.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    this.initializeDataTable();
    this.reloadEvent.emit(true);
  }

  delete(id: number): void {
    const index = this.patents.findIndex(p => p.id === id);
    if (index > -1) {
      this.patents.splice(index, 1);
      this.filteredPatents = [...this.patents];
      this.initializeDataTable();
      this.reloadEvent.emit(true);
    }
  }

  edit(id: number): void {
    const patent = this.patents.find(p => p.id === id);
    if (patent) {
      this.patentModel = { ...patent };
    }
  }

  create(): void {
    this.patentModel = {
      id: 0,
      solicitudId: '',
      nombrePatente: '',
      solicitante: '',
      fechaSolicitud: '',
      estado: 'Registrada',
      descripcion: '',
      institucion: '',
      email: '',
      documentos: []
    };
  }

  onSubmit(event: Event, myForm: NgForm): void {
    if (myForm && myForm.invalid) {
      return;
    }

    this.isLoading = true;

    const successAlert: SweetAlertOptions = {
      icon: 'success',
      title: '¡Éxito!',
      text: this.patentModel.id > 0 ? 'Patente actualizada correctamente!' : 'Patente creada correctamente!',
    };

    if (this.patentModel.id > 0) {
      const index = this.patents.findIndex(p => p.id === this.patentModel.id);
      if (index > -1) {
        this.patents[index] = { ...this.patentModel };
      }
    } else {
      const newId = Math.max(...this.patents.map(p => p.id)) + 1;
      this.patentModel.id = newId;
      if (!this.patentModel.solicitudId) {
        const prefix = 'PAT';
        this.patentModel.solicitudId = `${prefix}-2025-${String(newId).padStart(3, '0')}`;
      }
      this.patents.push({ ...this.patentModel });
    }

    this.filteredPatents = [...this.patents];
    this.initializeDataTable();
    this.showAlert(successAlert);
    this.reloadEvent.emit(true);
    this.isLoading = false;
  }

  showAlert(swalOptions: SweetAlertOptions): void {
    let style = swalOptions.icon?.toString() || 'success';
    if (swalOptions.icon === 'error') {
      style = 'danger';
    }
    this.swalOptions = Object.assign({
      buttonsStyling: false,
      confirmButtonText: "¡Entendido!",
      customClass: {
        confirmButton: "btn btn-" + style
      }
    }, swalOptions);
    this.cdr.detectChanges();
    this.noticeSwal.fire();
  }

  ngOnDestroy(): void {
    this.reloadEvent.unsubscribe();
  }
}
