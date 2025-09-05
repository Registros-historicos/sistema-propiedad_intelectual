import { Component } from '@angular/core';

@Component({
  selector: 'app-investigadores',
  templateUrl: './investigadores.component.html',
  styleUrl: './investigadores.component.scss'
})
export class InvestigadoresComponent {
  investigadores = [
    { nombre: 'Dr. Carlos Méndez', departamento: 'Sistemas', solicitudes: 15 },
    { nombre: 'Dra. Ana Ruiz', departamento: 'Industrial', solicitudes: 22 },
    { nombre: 'Dr. Roberto Sánchez', departamento: 'Química', solicitudes: 28 },
    { nombre: 'Dra. María Torres', departamento: 'Mecánica', solicitudes: 12 },
    { nombre: 'Dr. José Hernández', departamento: 'Electrónica', solicitudes: 18 },
    { nombre: 'Dra. Patricia López', departamento: 'Civil', solicitudes: 14 },
    { nombre: 'Dr. Luis Ramírez', departamento: 'Bioquímica', solicitudes: 20 },
    { nombre: 'Dra. Sofía Martínez', departamento: 'Ambiental', solicitudes: 11 },
    { nombre: 'Dr. Mario Gómez', departamento: 'Administración', solicitudes: 17 },
    { nombre: 'Dra. Laura Torres', departamento: 'Gestión Empresarial', solicitudes: 13 },
    { nombre: 'Dr. Juan Pérez', departamento: 'Materiales', solicitudes: 16 },
    { nombre: 'Dra. Elena García', departamento: 'Alimentos', solicitudes: 10 }
  ];

  filtroNombre: string = '';
  get investigadoresFiltrados() {
    if (!this.filtroNombre.trim()) return this.investigadores;
    return this.investigadores.filter(i => i.nombre.toLowerCase().includes(this.filtroNombre.toLowerCase()));
  }

  ngOnInit(): void {}

  exportToExcel(): void {
    alert('Funcionalidad pendiente');
  }

  generatePDF(): void {
    alert('Funcionalidad pendiente');
  }
}
