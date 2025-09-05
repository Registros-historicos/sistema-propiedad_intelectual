import { Component, Input } from '@angular/core';

interface CuerpoAcademico {
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
  { nombre: 'Tecnologías de la Información', solicitudes: 847 },
  { nombre: 'Matemáticas Aplicadas', solicitudes: 392 },
  { nombre: 'Química Analítica', solicitudes: 715 },
  { nombre: 'Energías Renovables', solicitudes: 284 },
  { nombre: 'Inteligencia Artificial', solicitudes: 663 },
  { nombre: 'Ciencias Ambientales', solicitudes: 501 },
  { nombre: 'Desarrollo Agroindustrial', solicitudes: 778 },
  { nombre: 'Gestión Empresarial', solicitudes: 319 },
  { nombre: 'Bioingeniería Aplicada', solicitudes: 645 },
  { nombre: 'Administración Moderna', solicitudes: 187 },
  { nombre: 'Optimización de Sistemas de Producción de Bienes y Servicios', solicitudes: 926 },
  { nombre: 'Desarrollo de Aplicaciones Interdisciplinarias bajo Metodologías de Ingeniería de Software', solicitudes: 538 },
  { nombre: 'Sistemas Mecatrónicos Aplicados al Sector Salud e Industrial', solicitudes: 472 },
  { nombre: 'Ingeniería de Procesos Ambientales', solicitudes: 613 },
  { nombre: 'Ingeniería de Procesos para la Generación de Tecnología para la Innovación y el Aprovechamiento de Recursos Naturales', solicitudes: 289 },
  { nombre: 'Ingeniería de Sistemas', solicitudes: 734 },
  { nombre: 'Calidad y Gestión Inteligente', solicitudes: 401 },
  { nombre: 'Ingeniería Administrativa', solicitudes: 957 },
  { nombre: 'Investigación en los Sistemas de Tecnología y la Administración del Conocimiento en las Organizaciones', solicitudes: 523 },
  { nombre: 'Tecnologías Emergentes de la Web', solicitudes: 346 },
  { nombre: 'Ingeniería para la Sustentabilidad Energética de la Química', solicitudes: 688 },
  { nombre: 'Ingeniería de Software y Aplicaciones de la Computación', solicitudes: 219 }
];

  ngOnInit(): void {}

  exportToExcel(): void {
    alert('Funcionalidad pendiente');
  }

  generatePDF(): void {
    alert('Funcionalidad pendiente');
  }

}
