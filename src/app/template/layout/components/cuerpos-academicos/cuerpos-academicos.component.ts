import { Component, Input } from '@angular/core';

interface CuerpoAcademico {
  icono?: string; // Ícono de Material Icons (opcional)
  nombre: string;
  solicitudes: number;
}

@Component({
  selector: 'app-cuerpos-academicos',
  templateUrl: './cuerpos-academicos.component.html',
  styleUrl: './cuerpos-academicos.component.scss'
})
export class CuerposAcademicosComponent {
  cuerposAcademicos = [
  { icono: 'computer', nombre: 'Tecnologías de la Información', solicitudes: 847 },
  { icono: 'functions', nombre: 'Matemáticas Aplicadas', solicitudes: 392 },
  { icono: 'science', nombre: 'Química Analítica', solicitudes: 715 },
  { icono: 'solar_power', nombre: 'Energías Renovables', solicitudes: 284 },
  { icono: 'memory', nombre: 'Inteligencia Artificial', solicitudes: 663 },
  { icono: 'eco', nombre: 'Ciencias Ambientales', solicitudes: 501 },
  { icono: 'agriculture', nombre: 'Desarrollo Agroindustrial', solicitudes: 778 },
  { icono: 'business_center', nombre: 'Gestión Empresarial', solicitudes: 319 },
  { icono: 'biotech', nombre: 'Bioingeniería Aplicada', solicitudes: 645 },
  { icono: 'apartment', nombre: 'Administración Moderna', solicitudes: 187 },
  { icono: 'settings', nombre: 'Optimización de Sistemas de Producción de Bienes y Servicios', solicitudes: 926 },
  { icono: 'developer_mode', nombre: 'Desarrollo de Aplicaciones Interdisciplinarias bajo Metodologías de Ingeniería de Software', solicitudes: 538 },
  { icono: 'health_and_safety', nombre: 'Sistemas Mecatrónicos Aplicados al Sector Salud e Industrial', solicitudes: 472 },
  { icono: 'water_drop', nombre: 'Ingeniería de Procesos Ambientales', solicitudes: 613 },
  { icono: 'recycling', nombre: 'Ingeniería de Procesos para la Generación de Tecnología para la Innovación y el Aprovechamiento de Recursos Naturales', solicitudes: 289 },
  { icono: 'hub', nombre: 'Ingeniería de Sistemas', solicitudes: 734 },
  { icono: 'trending_up', nombre: 'Calidad y Gestión Inteligente', solicitudes: 401 },
  { icono: 'engineering', nombre: 'Ingeniería Administrativa', solicitudes: 957 },
  { icono: 'school', nombre: 'Investigación en los Sistemas de Tecnología y la Administración del Conocimiento en las Organizaciones', solicitudes: 523 },
  { icono: 'language', nombre: 'Tecnologías Emergentes de la Web', solicitudes: 346 },
  { icono: 'energy_savings_leaf', nombre: 'Ingeniería para la Sustentabilidad Energética de la Química', solicitudes: 688 },
  { icono: 'code', nombre: 'Ingeniería de Software y Aplicaciones de la Computación', solicitudes: 219 }
];

  ngOnInit(): void {}

  exportToExcel(): void {
    alert('Funcionalidad pendiente');
  }

  generatePDF(): void {
    alert('Funcionalidad pendiente');
  }

}
