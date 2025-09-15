import { Component } from '@angular/core';

@Component({
  selector: 'app-departamentos',
  templateUrl: './departamentos.component.html',
  styleUrl: './departamentos.component.scss'
})
export class DepartamentosComponent {
departamentos = [
    { icono: 'computer', nombre: 'Sistemas', totalSolicitudes: 120, estado: 'activo' },
    { icono: 'precision_manufacturing', nombre: 'Industrial', totalSolicitudes: 95, estado: 'activo' },
    { icono: 'science', nombre: 'Química', totalSolicitudes: 80, estado: 'activo' },
    { icono: 'engineering', nombre: 'Mecánica', totalSolicitudes: 60, estado: 'activo' },
    { icono: 'memory', nombre: 'Electrónica', totalSolicitudes: 110, estado: 'activo' },
    { icono: 'architecture', nombre: 'Civil', totalSolicitudes: 70, estado: 'activo' },
    { icono: 'biotech', nombre: 'Bioquímica', totalSolicitudes: 55, estado: 'activo' },
    { icono: 'eco', nombre: 'Ambiental', totalSolicitudes: 40, estado: 'activo' },
    { icono: 'business_center', nombre: 'Administración', totalSolicitudes: 85, estado: 'activo' },
    { icono: 'groups', nombre: 'Gestión Empresarial', totalSolicitudes: 65, estado: 'activo' },
    { icono: 'category', nombre: 'Materiales', totalSolicitudes: 50, estado: 'activo' },
    { icono: 'restaurant', nombre: 'Alimentos', totalSolicitudes: 35, estado: 'activo' },
    { icono: 'functions', nombre: 'Ciencias Básicas', totalSolicitudes: 74, estado: 'activo' },
    { icono: 'school', nombre: 'División de Estudios Profesionales', totalSolicitudes: 58, estado: 'activo' },
    { icono: 'account_balance', nombre: 'División de Estudios de Posgrado', totalSolicitudes: 91, estado: 'activo' },
    { icono: 'bolt', nombre: 'Ingeniería Eléctrica', totalSolicitudes: 67, estado: 'activo' },
    { icono: 'build', nombre: 'Ingeniería Metalmecánica', totalSolicitudes: 43, estado: 'activo' },
    { icono: 'request_quote', nombre: 'Ciencias Económico Administrativas', totalSolicitudes: 86, estado: 'activo' }
  ];


  ngOnInit(): void {}

  exportToExcel(): void {
    alert('Funcionalidad pendiente');
  }

  generatePDF(): void {
    alert('Funcionalidad pendiente');
  }
}
