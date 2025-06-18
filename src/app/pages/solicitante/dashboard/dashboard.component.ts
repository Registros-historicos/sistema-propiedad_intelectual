import { Component, OnInit, OnDestroy, EventEmitter, ViewChild } from '@angular/core';
import { SwalComponent } from '@sweetalert2/ngx-sweetalert2';
import { SweetAlertOptions } from 'sweetalert2';
import { getCSSVariableValue } from 'src/app/template/kt/_utils';

/**
 * DashboardComponent
 *
 * Componente principal del dashboard del solicitante.
 * Muestra estadísticas, gráficos y una tabla paginada de solicitudes.
 */
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit, OnDestroy {
  /**
   * Instancia de DataTables (si aplica).
   */
  dtInstance: any;

  /**
   * Evento para recargar la tabla de solicitudes.
   */
  reloadEvent: EventEmitter<boolean> = new EventEmitter();

  /**
   * Configuración para el componente <app-crud>.
   */
  datatableConfig: any = {};

  /**
   * Opciones de configuración para el gráfico de barras.
   */
  chartOptions: any;

  /**
   * Opciones para el selector de cantidad de elementos por página.
   */
  lengthMenu: number[] = [5, 10, 15, 20];

  /**
   * Cantidad de elementos por página seleccionada.
   */
  pageLength: number = 10;

  /**
   * Página current del paginador.
   */
  currentPage: number = 1;

  /**
   * Total de páginas calculadas según los elementos visibles y el tamaño de página.
   */
  totalPages: number = 1;

  /**
   * Solicitudes que se muestran en la página actual (después de filtrar y paginar).
   */
  pagedSolicitudes: any[] = [];

  /**
   * Lista completa de solicitudes (puede venir de un servicio en una app real).
   */
  solicitudes: any[] = [
    {
      tipo: 'Patente',
      titulo:
        'Sistema Computacional para Gestión de Energía Solar en Zonas Rurales',
      estado: 'En trámite',
      fecha: '12-01-2025',
    },
    {
      tipo: 'Marca',
      titulo: 'Marca Registrada para Soluciones de Inteligencia Artificial',
      estado: 'Registrada',
      fecha: '28-05-2025',
    },
    {
      tipo: 'Modelo de utilidad',
      titulo: 'Dispositivo de Seguridad Basado en Redes Neuronales',
      estado: 'Trámite con Observaciones',
      fecha: '20-05-2025',
    },
    {
      tipo: 'Diseño industrial',
      titulo: 'Diseño de Muebles Inteligentes para Oficinas Modernas',
      estado: 'Aprobada',
      fecha: '10-06-2025',
    },
    {
      tipo: 'Derechos de autor',
      titulo:
        'Libro de Investigación sobre Algoritmos de Aprendizaje Automático',
      estado: 'Concluida',
      fecha: '15-06-2025',
    },
    {
      tipo: 'Marca',
      titulo: 'Marca de Ropa Ecológica y Sostenible',
      estado: 'Pendiente',
      fecha: '20-06-2025',
    },
    {
      tipo: 'Patente',
      titulo: 'Método Innovador para la Producción de Biocombustibles',
      estado: 'En trámite',
      fecha: '25-06-2025',
    },
    {
      tipo: 'Modelo de utilidad',
      titulo: 'Herramienta Multifuncional para el Hogar',
      estado: 'Aprobada',
      fecha: '30-06-2025',
    },
    {
      tipo: 'Patente',
      titulo: 'Sistema de Monitoreo de Calidad del Agua en Tiempo Real',
      estado: 'En trámite',
      fecha: '05-07-2025',
    },
    {
      tipo: 'Marca',
      titulo: 'Marca de Bebidas Energéticas Naturales',
      estado: 'Registrada',
      fecha: '28-06-2025',
    },
    {
      tipo: 'Modelo de utilidad',
      titulo: 'Dispositivo Portátil para Diagnóstico Médico Rápido',
      estado: 'Trámite con Observaciones',
      fecha: '01-07-2025',
    },
    {
      tipo: 'Diseño industrial',
      titulo: 'Diseño de Lámparas Solares Modulares',
      estado: 'Aprobada',
      fecha: '10-07-2025',
    },
    {
      tipo: 'Derechos de autor',
      titulo: 'Software de Gestión de Proyectos con IA Integrada',
      estado: 'Concluida',
      fecha: '15-07-2025',
    },
    {
      tipo: 'Marca',
      titulo: 'Marca de Zapatos Deportivos Biodegradables',
      estado: 'Pendiente',
      fecha: '20-07-2025',
    },
    {
      tipo: 'Patente',
      titulo: 'Tecnología de Purificación de Aire con Nanomateriales',
      estado: 'En trámite',
      fecha: '25-07-2025',
    },
    {
      tipo: 'Modelo de utilidad',
      titulo: 'Sistema de Riego Automatizado para Agricultura Urbana',
      estado: 'Aprobada',
      fecha: '01-08-2025',
    },
    {
      tipo: 'Diseño industrial',
      titulo: 'Diseño de Envases Reutilizables para Alimentos',
      estado: 'En trámite',
      fecha: '05-08-2025',
    },
    {
      tipo: 'Derechos de autor',
      titulo: 'Novela de Ciencia Ficción sobre Realidad Virtual',
      estado: 'Concluida',
      fecha: '10-08-2025',
    },
    {
      tipo: 'Marca',
      titulo: 'Marca de Suplementos Alimenticios Veganos',
      estado: 'Registrada',
      fecha: '15-08-2025',
    },
    {
      tipo: 'Patente',
      titulo: 'Método de Reciclaje de Plásticos con Enzimas Modificadas',
      estado: 'En trámite',
      fecha: '20-08-2025',
    },
    {
      tipo: 'Modelo de utilidad',
      titulo: 'Dispositivo para Generación de Energía Eólica Doméstica',
      estado: 'Aprobada',
      fecha: '25-08-2025',
    },
    {
      tipo: 'Diseño industrial',
      titulo: 'Diseño de Sillas Ergonómicas para Espacios Reducidos',
      estado: 'Pendiente',
      fecha: '01-09-2025',
    },
    {
      tipo: 'Derechos de autor',
      titulo: 'Documental sobre Conservación de Ecosistemas Marinos',
      estado: 'Concluida',
      fecha: '05-09-2025',
    },
    {
      tipo: 'Marca',
      titulo: 'Marca de Tecnología Vestible para Monitoreo de Salud',
      estado: 'Registrada',
      fecha: '10-09-2025',
    },
    {
      tipo: 'Patente',
      titulo: 'Sistema de Blockchain para Transacciones Seguras en IoT',
      estado: 'En trámite',
      fecha: '15-09-2025',
    },
    {
      tipo: 'Modelo de utilidad',
      titulo: 'Herramienta para Reparación de Pantallas Táctiles',
      estado: 'Trámite con Observaciones',
      fecha: '20-09-2025',
    },
    {
      tipo: 'Diseño industrial',
      titulo: 'Diseño de Vehículos Eléctricos Compactos',
      estado: 'Aprobada',
      fecha: '25-09-2025',
    },
    {
      tipo: 'Derechos de autor',
      titulo: 'Videojuego Educativo sobre Historia Universal',
      estado: 'Concluida',
      fecha: '30-09-2025',
    },
  ];

  /**
   * Total de solicitudes (para estadísticas).
   */
  totalSolicitudes: number = 0;

  /**
   * Total de solicitudes pendientes.
   */
  solicitudesPendientes: number = 0;

  /**
   * Total de solicitudes en trámite.
   */
  solicitudesEnTramite: number = 0;

  /**
   * Total de solicitudes registradas.
   */
  solicitudesRegistradas: number = 0;

  /**
   * Total de solicitudes con observaciones.
   */
  solicitudesConObservaciones: number = 0;

  /**
   * Total de solicitudes aprobadas.
   */
  solicitudesAprobadas: number = 0;

  /**
   * Referencia al componente SweetAlert2 para mostrar alertas.
   */
  @ViewChild('noticeSwal') noticeSwal!: SwalComponent;

  /**
   * Opciones para la alerta SweetAlert2.
   */
  swalOptions: SweetAlertOptions = {};

  /**
   * Inicializa el componente, configura el gráfico y la paginación.
   */
  ngOnInit(): void {
    // Configuración de la tabla para <app-crud>
    this.datatableConfig = {
      data: this.solicitudes,
      lengthMenu: this.lengthMenu,
      pageLength: this.pageLength,
      columns: [
        { title: 'Tipo', data: 'tipo' },
        { title: 'Título', data: 'titulo' },
        { title: 'Estado', data: 'estado' },
        { title: 'Fecha', data: 'fecha' },
      ],
      initComplete: (settings: any, json: any) => {
        // Puedes guardar la instancia si lo necesitas
      }
    };

    // Datos de ejemplo para la gráfica
    const solicitudesData = [
      { tipo: 'DA', data: [12, 18, 24, 19, 15, 21] },
      { tipo: 'PA', data: [8, 12, 15, 11, 9, 14] },
      { tipo: 'MU', data: [25, 32, 28, 35, 41, 38] },
      { tipo: 'DI', data: [6, 9, 11, 8, 12, 10] },
      { tipo: 'MA', data: [45, 52, 48, 56, 63, 59] },
    ];

    // Calcula el total de solicitudes y pendientes
    this.totalSolicitudes = solicitudesData.reduce(
      (acc, item) => acc + item.data.reduce((sum, val) => sum + val, 0),
      0
    );
    this.solicitudesPendientes = this.solicitudes.filter(
      (solicitud) => solicitud.estado === 'Pendiente'
    ).length;

    // Calcula totales por estado
    this.solicitudesEnTramite = this.solicitudes.filter(
      (solicitud) => solicitud.estado === 'En trámite'
    ).length;
    this.solicitudesRegistradas = this.solicitudes.filter(
      (solicitud) => solicitud.estado === 'Registrada'
    ).length;
    this.solicitudesConObservaciones = this.solicitudes.filter(
      (solicitud) => solicitud.estado === 'Trámite con Observaciones'
    ).length;
    this.solicitudesAprobadas = this.solicitudes.filter(
      (solicitud) => solicitud.estado === 'Aprobada'
    ).length;

    this.chartOptions = this.getChartOptions(350);
    this.updatePagedSolicitudes();
  }

  /**
   * Devuelve las opciones de configuración para el gráfico de barras.
   * @param height Altura del gráfico en píxeles.
   */
  getChartOptions(height: number) {
    const labelColor = getCSSVariableValue('--bs-gray-500');
    const borderColor = getCSSVariableValue('--bs-gray-200');
    const seriesColors = [
      getCSSVariableValue('--bs-primary'),
      getCSSVariableValue('--bs-success'),
      getCSSVariableValue('--bs-warning'),
      getCSSVariableValue('--bs-danger'),
      getCSSVariableValue('--bs-info'),
    ];

    return {
      series: [
        { name: 'DA', data: [12, 18, 24, 19, 15, 21] },
        { name: 'PA', data: [8, 12, 15, 11, 9, 14] },
        { name: 'MU', data: [25, 32, 28, 35, 41, 38] },
        { name: 'DI', data: [6, 9, 11, 8, 12, 10] },
        { name: 'MA', data: [45, 52, 48, 56, 63, 59] },
      ],
      chart: {
        fontFamily: 'inherit',
        type: 'bar',
        height: height,
        toolbar: { show: false },
      },
      plotOptions: {
        bar: {
          horizontal: false,
          columnWidth: '30%',
          borderRadius: 5,
        },
      },
      legend: { show: false },
      dataLabels: { enabled: false },
      stroke: {
        show: true,
        width: 2,
        colors: ['transparent'],
      },
      xaxis: {
        categories: ['Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul'],
        axisBorder: { show: false },
        axisTicks: { show: false },
        labels: {
          style: {
            colors: labelColor,
            fontSize: '12px',
          },
        },
      },
      yaxis: {
        title: {
          text: 'Total de solicitudes',
          style: {
            color: labelColor,
            fontSize: '12px',
          },
        },
        labels: {
          style: {
            colors: labelColor,
            fontSize: '12px',
          },
        },
      },
      fill: { opacity: 1 },
      states: {
        normal: { filter: { type: 'none', value: 0 } },
        hover: { filter: { type: 'none', value: 0 } },
        active: {
          allowMultipleDataPointsSelection: false,
          filter: { type: 'none', value: 0 },
        },
      },
      tooltip: {
        style: { fontSize: '12px' },
        y: {
          formatter: function (val: number) {
            return val + ' solicitudes';
          },
        },
      },
      colors: seriesColors,
      grid: {
        borderColor: borderColor,
        strokeDashArray: 4,
        yaxis: { lines: { show: true } },
      },
    };
  }

  /**
   * Muestra un alert con los detalles de la solicitud seleccionada.
   * @param solicitud Solicitud a mostrar
   */
  verDetalles(solicitud: any): void {
    alert(
      `Detalles de la solicitud:\nTipo: ${solicitud.tipo}\nTítulo: ${solicitud.titulo}\nEstado: ${solicitud.estado}\nFecha: ${solicitud.fecha}`
    );
  }

  /**
   * Evento al cambiar la cantidad de elementos por página desde el selector.
   * Actualiza la propiedad pageLength y recarga la tabla.
   * @param event Evento del select
   */
  onPageLengthChange(event: any): void {
    const newLength = parseInt(event.target.value, 10);
    this.pageLength = newLength;

    if (this.dtInstance) {
      // Si tienes instancia de DataTables, actualiza y redibuja
      this.dtInstance.page.len(newLength).draw();
    } else {
      // Si no, actualiza la paginación manual y recarga la tabla
      this.currentPage = 1; // Opcional: regresa a la primera página
      this.updatePagedSolicitudes();
      this.reloadEvent.emit(true); // Si usas <app-crud>
    }
  }

  /**
   * Cambia la página actual y actualiza la paginación.
   * @param page Número de página a mostrar
   */
  goToPage(page: number): void {
    if (page < 1 || page > this.totalPages) return;
    this.currentPage = page;
    this.updatePagedSolicitudes();
  }

  /**
   * Actualiza el arreglo pagedSolicitudes según la página y el tamaño de página.
   * Filtra primero las solicitudes para excluir las 'Concluida'.
   * Corrige la página actual si se sale del rango.
   */
  updatePagedSolicitudes(): void {
    // Filtra las solicitudes visibles (no 'Concluida')
    const visibles = this.solicitudes.filter((s) => s.estado !== 'Concluida');
    this.totalPages = Math.ceil(visibles.length / this.pageLength) || 1;

    // Corrige la página si se sale del rango
    if (this.currentPage > this.totalPages) {
      this.currentPage = this.totalPages;
    }
    if (this.currentPage < 1) {
      this.currentPage = 1;
    }

    // Calcula el rango de elementos a mostrar
    const start = (this.currentPage - 1) * this.pageLength;
    const end = start + this.pageLength;
    this.pagedSolicitudes = visibles.slice(start, end);
  }

  /**
   * Muestra una alerta de confirmación para eliminar una solicitud.
   * @param event Evento de eliminación recibido de <app-crud>
   */
  delete(event: any): void {
    this.showAlert({
      title: '¿Estás seguro?',
      text: 'Esta acción eliminará la solicitud.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar'
    });
  }

  /**
   * Muestra una alerta informativa para editar una solicitud.
   * @param event Evento de edición recibido de <app-crud>
   */
  editarSolicitud(event: any): void {
    this.showAlert({
      title: 'Editar solicitud',
      text: `Editar: ${event.titulo}`,
      icon: 'info',
      confirmButtonText: 'Aceptar'
    });
  }

  /**
   * Muestra una alerta personalizada usando SweetAlert2.
   * @param options Opciones de la alerta
   */
  showAlert(options: SweetAlertOptions): void {
    this.swalOptions = options;
    setTimeout(() => {
      this.noticeSwal.fire();
    });
  }

  /**
   * Limpieza de recursos al destruir el componente.
   */
  ngOnDestroy(): void {}
}
