import { Component, OnInit } from '@angular/core';
import { TablerosService, ProgramaEducativo } from 'src/app/api/services/tableros.service';

interface ProgramaEducativoDisplay {
  icono: string;
  nombre: string;
  solicitudes: number;
}

@Component({
  selector: 'app-programas-educativos',
  templateUrl: './programas-educativos.component.html',
  styleUrl: './programas-educativos.component.scss'
})
export class ProgramasEducativosComponent implements OnInit {
  programasEducativos: ProgramaEducativoDisplay[] = [];
  isLoading: boolean = true;

  // Mapeo de iconos por palabras clave en el nombre del programa
  private iconosPorPrograma: { [key: string]: string } = {
    'Sistemas': 'computer',
    'Industrial': 'precision_manufacturing',
    'Electromecánica': 'engineering',
    'Gestión': 'groups',
    'Civil': 'architecture',
    'Química': 'science',
    'Mecánica': 'build',
    'Información': 'router',
    'Comunicaciones': 'router',
    'Electrónica': 'memory',
    'Renovables': 'solar_power',
    'Bioquímica': 'biotech',
    'Materiales': 'category',
    'Ambiental': 'eco',
    'Mecatrónica': 'smart_toy',
    'Logística': 'local_shipping',
    'Petrolera': 'oil_barrel',
    'Comunitario': 'diversity_3',
    'Forestal': 'park',
    'Alimentarias': 'restaurant',
    'Agroindustrial': 'agriculture',
    'Nanotecnología': 'blur_on',
    'Contador': 'calculate',
    'Administración': 'business_center',
    'Arquitectura': 'domain',
    'Animación': 'movie',
    'Tecnologías': 'router'
  };

  constructor(private tablerosService: TablerosService) {}

  ngOnInit(): void {
    this.cargarProgramasEducativos();
  }

  cargarProgramasEducativos(): void {
    this.isLoading = true;
    
    this.tablerosService.getRegistrosPorProgramaEducativo().subscribe({
      next: (data: ProgramaEducativo[]) => {
        console.log('✅ Programas educativos desde backend:', data);
        
        // Mapear datos del backend al formato del componente
        this.programasEducativos = data.map(programa => ({
          icono: this.obtenerIcono(programa.nombre_programa_educativo),
          nombre: programa.nombre_programa_educativo,
          solicitudes: programa.total
        }));
        
        console.log('✅ Programas educativos mapeados:', this.programasEducativos);
        this.isLoading = false;
      },
      error: (error: any) => {
        console.error('❌ Error al cargar programas educativos:', error);
        this.isLoading = false;
        
        // Opcional: Mantener datos mock como fallback
        // this.programasEducativos = this.getMockData();
      }
    });
  }

  /**
   * Obtiene el icono adecuado basándose en palabras clave en el nombre del programa
   */
  private obtenerIcono(nombrePrograma: string): string {
    // Buscar coincidencia con palabras clave
    for (const [keyword, icono] of Object.entries(this.iconosPorPrograma)) {
      if (nombrePrograma.includes(keyword)) {
        return icono;
      }
    }
    
    // Icono por defecto si no hay coincidencia
    return 'school';
  }
}