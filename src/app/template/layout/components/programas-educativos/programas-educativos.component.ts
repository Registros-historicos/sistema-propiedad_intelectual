import { Component } from '@angular/core';

@Component({
  selector: 'app-programas-educativos',
  templateUrl: './programas-educativos.component.html',
  styleUrl: './programas-educativos.component.scss'
})
export class ProgramasEducativosComponent {
  programasEducativos = [
    { nombre: 'Ingeniería en Sistemas Computacionales', solicitudes: 1247 },
    { nombre: 'Ingeniería Industrial', solicitudes: 968 },
    { nombre: 'Ingeniería Electromecánica', solicitudes: 756 },
    { nombre: 'Ingeniería en Gestión Empresarial', solicitudes: 892 },
    { nombre: 'Ingeniería Civil', solicitudes: 634 },
    { nombre: 'Ingeniería Química', solicitudes: 523 },
    { nombre: 'Ingeniería Mecánica', solicitudes: 678 },
    { nombre: 'Ingeniería en Tecnologías de la Información y Comunicaciones', solicitudes: 1156 },
    { nombre: 'Ingeniería Electrónica', solicitudes: 445 },
    { nombre: 'Ingeniería en Energías Renovables', solicitudes: 387 },
    { nombre: 'Ingeniería Bioquímica', solicitudes: 312 },
    { nombre: 'Ingeniería en Materiales', solicitudes: 289 },
    { nombre: 'Ingeniería Ambiental', solicitudes: 567 },
    { nombre: 'Ingeniería Mecatrónica', solicitudes: 723 },
    { nombre: 'Ingeniería en Logística', solicitudes: 434 },
    { nombre: 'Ingeniería Petrolera', solicitudes: 198 },
    { nombre: 'Ingeniería en Desarrollo Comunitario', solicitudes: 276 },
    { nombre: 'Ingeniería Forestal', solicitudes: 156 },
    { nombre: 'Ingeniería en Industrias Alimentarias', solicitudes: 345 },
    { nombre: 'Ingeniería Agroindustrial', solicitudes: 412 },
    { nombre: 'Ingeniería en Nanotecnología', solicitudes: 234 },
    { nombre: 'Contador Público', solicitudes: 678 },
    { nombre: 'Licenciatura en Administración', solicitudes: 534 },
    { nombre: 'Arquitectura', solicitudes: 467 },
    { nombre: 'Ingeniería en Animación Digital y Efectos Visuales', solicitudes: 389 }
  ];
}
