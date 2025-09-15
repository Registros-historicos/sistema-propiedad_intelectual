import { Component } from '@angular/core';

@Component({
  selector: 'app-programas-educativos',
  templateUrl: './programas-educativos.component.html',
  styleUrl: './programas-educativos.component.scss'
})
export class ProgramasEducativosComponent {
programasEducativos = [
  { icono: 'computer', nombre: 'Ingeniería en Sistemas Computacionales', solicitudes: 1247 },
  { icono: 'precision_manufacturing', nombre: 'Ingeniería Industrial', solicitudes: 968 },
  { icono: 'engineering', nombre: 'Ingeniería Electromecánica', solicitudes: 756 },
  { icono: 'groups', nombre: 'Ingeniería en Gestión Empresarial', solicitudes: 892 },
  { icono: 'architecture', nombre: 'Ingeniería Civil', solicitudes: 634 },
  { icono: 'science', nombre: 'Ingeniería Química', solicitudes: 523 },
  { icono: 'build', nombre: 'Ingeniería Mecánica', solicitudes: 678 },
  { icono: 'router', nombre: 'Ingeniería en Tecnologías de la Información y Comunicaciones', solicitudes: 1156 },
  { icono: 'memory', nombre: 'Ingeniería Electrónica', solicitudes: 445 },
  { icono: 'solar_power', nombre: 'Ingeniería en Energías Renovables', solicitudes: 387 },
  { icono: 'biotech', nombre: 'Ingeniería Bioquímica', solicitudes: 312 },
  { icono: 'category', nombre: 'Ingeniería en Materiales', solicitudes: 289 },
  { icono: 'eco', nombre: 'Ingeniería Ambiental', solicitudes: 567 },
  { icono: 'smart_toy', nombre: 'Ingeniería Mecatrónica', solicitudes: 723 },
  { icono: 'local_shipping', nombre: 'Ingeniería en Logística', solicitudes: 434 },
  { icono: 'oil_barrel', nombre: 'Ingeniería Petrolera', solicitudes: 198 },
  { icono: 'diversity_3', nombre: 'Ingeniería en Desarrollo Comunitario', solicitudes: 276 },
  { icono: 'park', nombre: 'Ingeniería Forestal', solicitudes: 156 },
  { icono: 'restaurant', nombre: 'Ingeniería en Industrias Alimentarias', solicitudes: 345 },
  { icono: 'agriculture', nombre: 'Ingeniería Agroindustrial', solicitudes: 412 },
  { icono: 'blur_on', nombre: 'Ingeniería en Nanotecnología', solicitudes: 234 },
  { icono: 'calculate', nombre: 'Contador Público', solicitudes: 678 },
  { icono: 'business_center', nombre: 'Licenciatura en Administración', solicitudes: 534 },
  { icono: 'domain', nombre: 'Arquitectura', solicitudes: 467 },
  { icono: 'movie', nombre: 'Ingeniería en Animación Digital y Efectos Visuales', solicitudes: 389 }
];
}
