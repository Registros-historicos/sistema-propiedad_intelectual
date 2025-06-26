import { Component, OnInit, EventEmitter, ViewChild } from '@angular/core';
import { getCSSVariableValue } from 'src/app/template/kt/_utils';
import { SwalComponent } from '@sweetalert2/ngx-sweetalert2';
import { SweetAlertOptions } from 'sweetalert2';

@Component({
  selector: 'app-solicitudes',
  templateUrl: './solicitudes.component.html',
  styleUrls: ['./solicitudes.component.scss']
})
export class SolicitudesComponent implements OnInit {
  tiposSolicitudes = [
    { nombre: 'Patentes', total: 90, icono: 'emoji_objects' },
    { nombre: 'Marcas', total: 80, icono: 'credit_card' },
    { nombre: 'Modelos de Utilidad', total: 70, icono: 'build' },
    { nombre: 'Derechos de Autor', total: 60, icono: 'copyright' },
    { nombre: 'Diseños Industriales', total: 50, icono: 'architecture' },
  ];

  solicitudes: any[] = [];
  datatableConfig: any = {};
  reloadEvent: EventEmitter<boolean> = new EventEmitter();
  lengthMenu: number[] = [5, 10, 15, 20];
  pageLength: number = 10;

  totalSolicitudes: number = 0;
  solicitudesPendientes: number = 0;
  solicitudesEnTramite: number = 0;
  solicitudesRegistradas: number = 0;
  solicitudesConObservaciones: number = 0;
  solicitudesAprobadas: number = 0;

  solicitudSeleccionada: any = null;
  swalOptions: SweetAlertOptions = {};
  @ViewChild('noticeSwal') noticeSwal!: SwalComponent;

  ngOnInit(): void {
    // Simulación de datos de solicitudes
    this.solicitudes = [
      {
        titulo: 'Patente de invención A',
        solicitante: 'Juan Pérez',
        correo: 'juan@correo.com',
        fechaSolicitud: '2024-06-01',
        estado: 'Aprobada',
        descripcion: 'Descripción de la patente A'
      },
      {
        titulo: 'Modelo de utilidad B',
        solicitante: 'Ana Gómez',
        correo: 'ana@correo.com',
        fechaSolicitud: '2024-05-15',
        estado: 'En trámite',
        descripcion: 'Descripción del modelo B'
      }
      // ...más datos de ejemplo...
    ];

    this.datatableConfig = {
      data: this.solicitudes,
      lengthMenu: this.lengthMenu,
      pageLength: this.pageLength,
      columns: [
        { title: 'Título', data: 'titulo' },
        { title: 'Solicitante', data: 'solicitante' },
        { title: 'Correo', data: 'correo' },
        { title: 'Fecha', data: 'fechaSolicitud' },
        { title: 'Estado', data: 'estado' }
      ]
    };
  }

  onPageLengthChange(event: any): void {
    const newLength = parseInt(event.target.value, 10);
    this.pageLength = newLength;
    this.datatableConfig.pageLength = newLength;
    this.reloadEvent.emit(true);
  }

  delete(event: any): void {
    this.swalOptions = {
      title: '¿Estás seguro?',
      text: 'Esta acción eliminará la solicitud.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar'
    };
    setTimeout(() => this.noticeSwal.fire());
  }

  view(event: any): void {
    this.solicitudSeleccionada = event;
    // Aquí puedes abrir el modal si usas un servicio o lógica adicional
  }
}
