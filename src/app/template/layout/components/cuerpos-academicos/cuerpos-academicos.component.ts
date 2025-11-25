import { Component, Input, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';

interface CuerpoAcademicoAPI {
  nombre_cuerpo_academico: string;
  total_registros: number;
}

interface CuerpoAcademicoView {
  icono?: string;    // Ícono de Material Icons (opcional)
  nombre: string;
  solicitudes: number;
}

@Component({
  selector: 'app-cuerpos-academicos',
  templateUrl: './cuerpos-academicos.component.html',
  styleUrl: './cuerpos-academicos.component.scss'
})
export class CuerposAcademicosComponent implements OnChanges {

  @Input() datos: CuerpoAcademicoAPI[] = [];
  @Output() exportExcel = new EventEmitter<void>();

  cuerposAcademicos: CuerpoAcademicoView[] = [];

  private iconMapping: { [key: string]: string } = {
    // MAPEOS ANTERIORES 
    'Tecnologías de la Información': 'computer',
    'Matemáticas Aplicadas': 'functions',
    'Química Analítica': 'science',
    'Energías Renovables': 'solar_power',
    'Inteligencia Artificial': 'memory',
    'Ciencias Ambientales': 'eco',
    'Desarrollo Agroindustrial': 'agriculture',
    'Gestión Empresarial': 'business_center',
    'Bioingeniería Aplicada': 'biotech',
    'Administración Moderna': 'apartment',
    'Optimización de Sistemas de Producción de Bienes y Servicios': 'settings',
    'Desarrollo de Aplicaciones Interdisciplinarias bajo Metodologías de Ingeniería de Software': 'developer_mode',
    'Sistemas Mecatrónicos Aplicados al Sector Salud e Industrial': 'health_and_safety',
    'Ingeniería de Procesos Ambientales': 'water_drop',
    'Ingeniería de Procesos para la Generación de Tecnología para la Innovación y el Aprovechamiento de Recursos Naturales': 'recycling',
    'Ingeniería de Sistemas': 'hub',
    'Calidad y Gestión Inteligente': 'trending_up',
    'Ingeniería Administrativa': 'engineering',
    'Investigación en los Sistemas de Tecnología y la Administración del Conocimiento en las Organizaciones': 'school',
    'Tecnologías Emergentes de la Web': 'language',
    'Ingeniería para la Sustentabilidad Energética de la Química': 'energy_savings_leaf',
    'Ingeniería de Software y Aplicaciones de la Computación': 'code',

    // NUEVOS: nombres reales que vienen del endpoint
    'CA de Energía y Electrónica': 'solar_power',
    'CA de Ingeniería Química': 'science',
    'CA de Economía Social': 'diversity_3',
    'CA de Ingeniería Administrativa': 'engineering',
    'CA de Ciencia de Datos': 'storage',
    'CA de Electrónica': 'memory',
    'CA de Semiconductores': 'memory',
    'CA Multidisciplinarios': 'hub',
    'CA de Gestión Empresarial': 'business_center',
    'CA de Informática y Computación': 'computer',
    'CA de Sistemas Computacionales': 'computer',
    'CA de Ingeniería Industrial': 'precision_manufacturing',
    'CA de Mecánica': 'build',
  };

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['datos']) {
      this.mapeoDatos();
    }
  }

  private mapeoDatos(): void {
    this.cuerposAcademicos = (this.datos || []).map((item) => {
      const nombre = item.nombre_cuerpo_academico;
      return {
        nombre,
        solicitudes: item.total_registros,
        icono: this.getIcono(nombre),
      };
    });
  }

  private getIcono(nombre: string): string {
    return this.iconMapping[nombre] || 'group'; // Ícono por defecto si no está mapeado
  }

  exportToExcel(): void {
    this.exportExcel.emit();
  }
}