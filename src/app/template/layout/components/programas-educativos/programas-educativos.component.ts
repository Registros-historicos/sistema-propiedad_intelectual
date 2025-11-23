import { Component, Output, EventEmitter, Input } from '@angular/core';

interface ProgramaEducativoAPI {
  programa_educativo: string;
  total_registros: number;
}

@Component({
  selector: 'app-programas-educativos',
  templateUrl: './programas-educativos.component.html',
  styleUrl: './programas-educativos.component.scss',
})
export class ProgramasEducativosComponent {
  @Output() exportExcel = new EventEmitter<void>();
  @Input() datos: ProgramaEducativoAPI[] = [];

  private iconMapping: { [key: string]: string } = {
    // Sistemas e Informática
    'Ingeniería en Sistemas Computacionales': 'computer',
    'Maestría en Sistemas Computacionales': 'computer',
    'Ingeniería Informática': 'router',
    'Ingeniería en Ciencia de Datos': 'storage', // O 'analytics'
    'Ingeniería en Semiconductores': 'memory',
    'Especialidad en Semiconductores': 'memory',

    // Industrial y Gestión
    'Ingeniería Industrial': 'precision_manufacturing',
    'Ingeniería Industrial en línea': 'precision_manufacturing',
    'Maestría en Ingeniería Industrial': 'precision_manufacturing',
    'Ingeniería en Gestión Empresarial': 'groups',
    'Maestría en Ingeniería Administrativa': 'business_center',
    'Licenciatura en Administración': 'business_center',
    'Maestría en Economía Social y Solidaria': 'diversity_3',

    // Electrónica y Eléctrica
    'Ingeniería Electrónica': 'memory',
    'Maestría en Ingeniería Electrónica': 'memory',
    'Ingeniería Eléctrica': 'solar_power', // O 'flash_on'
    'Ingeniería Electromecánica': 'engineering',

    // Química y Bioquímica
    'Ingeniería Química': 'science',
    'Maestría en Ciencias de la Ingeniería Química': 'science',
    'Doctorado en Ciencias de la Ingeniería Química': 'science',
    'Ingeniería Bioquímica': 'biotech',

    // Mecánica y Mecatrónica
    'Ingeniería Mecánica': 'build',
    'Ingeniería Mecatrónica': 'smart_toy',

    // Otros (Doctorados generales, etc.)
    'Doctorado en Ciencias de la Ingeniería': 'school',
  };

  onExportExcel(): void {
    this.exportExcel.emit();
  }

  getIcono(nombrePrograma: string): string {
    // Busca el icono en el mapa, si no existe retorna 'factory'
    return this.iconMapping[nombrePrograma] || 'factory';
  }

}