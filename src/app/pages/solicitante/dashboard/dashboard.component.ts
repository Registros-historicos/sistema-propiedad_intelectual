import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { WidgetsModule } from '../../../template/widgets/content/widgets/widgets.module';
import { ModalsModule } from '../../../template/widgets/layout/modals/modals.module';
import { NgApexchartsModule } from 'ng-apexcharts';
import { SharedModule } from 'src/app/template/shared/shared.module';

/**
 * DashboardComponent
 *
 * Componente principal del dashboard del solicitante.
 * Muestra estadísticas, gráficos y una tabla paginada de solicitudes.
 *
 * Buenas prácticas:
 * - Documenta cada método y propiedad pública.
 * - Mantén la lógica de paginación separada y clara.
 * - Usa nombres descriptivos para variables y métodos.
 * - Incluye comentarios para fragmentos de lógica compleja.
 */
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
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
   * Página actual del paginador.
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
   * Inicializa el componente, configura el gráfico y la paginación.
   */
  ngOnInit(): void {
    this.chartOptions = {
      series: [
        {
          name: 'Solicitudes',
          data: [70, 15, 20, 10, 5], // Datos de ejemplo
        },
      ],
      chart: {
        type: 'bar',
        height: 350,
      },
      xaxis: {
        categories: [
          'Aprobadas',
          'Pendientes',
          'En trámite',
          'Observaciones',
          'Concluidas',
        ],
      },
      colors: ['#28a745', '#ffc107', '#007bff', '#dc3545', '#b0bec5'],
      dataLabels: {
        enabled: true,
      },
      plotOptions: {
        bar: {
          distributed: true,
        },
      },
      stroke: {
        show: true,
        width: 2,
        colors: ['transparent'],
      },
      tooltip: {
        y: {
          formatter: function (val: number) {
            return `${val} solicitudes`;
          },
        },
      },
    };

    this.updatePagedSolicitudes();
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
   * Muestra un alert para editar la solicitud seleccionada.
   * @param solicitud Solicitud a editar
   */
  editarSolicitud(solicitud: any): void {
    alert(
      `Editar solicitud:\nTipo: ${solicitud.tipo}\nTítulo: ${solicitud.titulo}\nEstado: ${solicitud.estado}\nFecha: ${solicitud.fecha}`
    );
    // Aquí puedes implementar la lógica para abrir un formulario de edición o realizar otra acción
  }

  /**
   * Evento al cambiar la cantidad de elementos por página.
   * Reinicia la página actual y actualiza la paginación.
   * @param event Evento del select (opcional, por compatibilidad con el template)
   */
  onPageLengthChange(): void {
    this.currentPage = 1;
    this.updatePagedSolicitudes();
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
}
