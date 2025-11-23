import { Component, OnInit } from '@angular/core';
import { TablerosService, Departamento } from 'src/app/api/services/tableros.service';

interface DepartamentoDisplay {
  icono: string;
  nombre: string;
  totalSolicitudes: number;
}

@Component({
  selector: 'app-departamentos',
  templateUrl: './departamentos.component.html',
  styleUrl: './departamentos.component.scss'
})
export class DepartamentosComponent implements OnInit {
  departamentos: DepartamentoDisplay[] = [];
  isLoading: boolean = true;

  // Mapeo de iconos por palabras clave en el nombre del departamento
  private iconosPorDepartamento: { [key: string]: string } = {
    'Sistemas': 'computer',
    'Computación': 'computer',
    'Industrial': 'precision_manufacturing',
    'Química': 'science',
    'Mecánica': 'engineering',
    'Electrónica': 'memory',
    'Civil': 'architecture',
    'Bioquímica': 'biotech',
    'Ambiental': 'eco',
    'Administración': 'business_center',
    'Gestión': 'groups',
    'Materiales': 'category',
    'Alimentos': 'restaurant',
    'Alimentarias': 'restaurant',
    'Básicas': 'functions',
    'Ciencias': 'functions',
    'Profesionales': 'school',
    'Posgrado': 'account_balance',
    'Eléctrica': 'bolt',
    'Metalmecánica': 'build',
    'Económico': 'request_quote',
    'Económicas': 'request_quote'
  };

  constructor(private tablerosService: TablerosService) {}

  ngOnInit(): void {
    this.cargarDepartamentos();
  }

  cargarDepartamentos(): void {
    this.isLoading = true;
    
    this.tablerosService.getDepartamentos().subscribe({
      next: (data: Departamento[]) => {
        console.log('✅ Departamentos desde backend:', data);
        
        // Mapear datos del backend al formato del componente
        this.departamentos = data.map(depto => ({
          icono: this.obtenerIcono(depto.nombre_departamento),
          nombre: depto.nombre_departamento,
          totalSolicitudes: depto.total
        }));
        this.isLoading = false;
      },
      error: (error: any) => {
        this.isLoading = true;
        
        // Opcional: Mantener datos mock como fallback
        this.departamentos = [];
      }
    });
  }

  /**
   * Obtiene el icono adecuado basándose en palabras clave en el nombre del departamento
   */
  private obtenerIcono(nombreDepartamento: string): string {
    // Buscar coincidencia con palabras clave
    for (const [keyword, icono] of Object.entries(this.iconosPorDepartamento)) {
      if (nombreDepartamento.includes(keyword)) {
        return icono;
      }
    }
    
    // Icono por defecto si no hay coincidencia
    return 'school';
  }

  exportToExcel(): void {
    alert('Funcionalidad pendiente');
  }

  generatePDF(): void {
    alert('Funcionalidad pendiente');
  }
}