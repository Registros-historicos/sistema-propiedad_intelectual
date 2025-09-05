import { Component } from '@angular/core';

@Component({
  selector: 'app-departamentos',
  templateUrl: './departamentos.component.html',
  styleUrl: './departamentos.component.scss'
})
export class DepartamentosComponent {
   departamentos = [
  { nombre: 'Sistemas', totalSolicitudes: 120, estado: 'activo' },
  { nombre: 'Industrial', totalSolicitudes: 95, estado: 'activo' },
  { nombre: 'Química', totalSolicitudes: 80, estado: 'activo' },
  { nombre: 'Mecánica', totalSolicitudes: 60, estado: 'activo' },
  { nombre: 'Electrónica', totalSolicitudes: 110, estado: 'activo' },
  { nombre: 'Civil', totalSolicitudes: 70, estado: 'activo' },
  { nombre: 'Bioquímica', totalSolicitudes: 55, estado: 'activo' },
  { nombre: 'Ambiental', totalSolicitudes: 40, estado: 'activo' },
  { nombre: 'Administración', totalSolicitudes: 85, estado: 'activo' },
  { nombre: 'Gestión Empresarial', totalSolicitudes: 65, estado: 'activo' },
  { nombre: 'Materiales', totalSolicitudes: 50, estado: 'activo' },
  { nombre: 'Alimentos', totalSolicitudes: 35, estado: 'activo' },
  { nombre: 'Ciencias Básicas', totalSolicitudes: 74, estado: 'activo' },
  { nombre: 'División de Estudios Profesionales', totalSolicitudes: 58, estado: 'activo' },
  { nombre: 'División de Estudios de Posgrado', totalSolicitudes: 91, estado: 'activo' },
  { nombre: 'Ingeniería Eléctrica', totalSolicitudes: 67, estado: 'activo' },
  { nombre: 'Ingeniería Metalmecánica', totalSolicitudes: 43, estado: 'activo' },
  { nombre: 'Ciencias Económico Administrativas', totalSolicitudes: 86, estado: 'activo' }
];

  ngOnInit(): void {}

  exportToExcel(): void {
    alert('Funcionalidad pendiente');
  }

  generatePDF(): void {
    alert('Funcionalidad pendiente');
  }
}
