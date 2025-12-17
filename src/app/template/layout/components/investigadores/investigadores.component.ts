import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-investigadores',
  templateUrl: './investigadores.component.html',
  styleUrl: './investigadores.component.scss'
})
export class InvestigadoresComponent implements OnInit {
  investigadores: Array<{ nombre: string; departamento: string; solicitudes: number }> = [];
  @Output() exportExcel = new EventEmitter<void>();

  constructor(private http: HttpClient) {}

  filtroNombre: string = '';
  get investigadoresFiltrados() {
    if (!this.filtroNombre.trim()) return this.investigadores;
    return this.investigadores.filter(i => i.nombre.toLowerCase().includes(this.filtroNombre.toLowerCase()));
  }

  ngOnInit(): void {
    const url = '/api/tableros/investigadores/por-coordinador/';
    this.http.get<any[]>(url).subscribe({
      next: (data) => {
        // Suponemos que el endpoint devuelve un array de objetos con la forma proporcionada
        this.investigadores = (Array.isArray(data) ? data : []).map((it: any) => ({
          nombre: it.nombre || 'Sin nombre',
          departamento: it.departamento || 'Sin departamento',
          solicitudes: Number(it.solicitudes) || 0,
        }));
      },
      error: (err) => {
        console.error('Error cargando investigadores por coordinador:', err);
      },
    });
  }

  exportToExcel(): void {
     this.exportExcel.emit();
  }

  generatePDF(): void {
    alert('Funcionalidad pendiente');
  }
}
