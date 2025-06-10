import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-patents-listing',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './patents-listing.component.html',
  styleUrls: ['./patents-listing.component.scss']
})
export class PatentsListingComponent implements OnInit {
  patentes: any[] = [];
  selectedPatent: any = null;
  isCollapsedPersonal = false;
  isCollapsedDocs = false;

  ngOnInit(): void {
    this.patentes = [
  {
    "id": 1,
    "tipoPropiedadIntelectual": "Patente",
    "titulo": "Sistema de riego automatizado solar",
    "autores": "Juan Pérez, Ana Gómez",
    "resumen": "Sistema inteligente para riego agrícola con sensores IoT.",
    "documento": "ver-patente.pdf",
    "fechaRegistro": "2024-06-01"
  },
  {
    "id": 2,
    "tipoPropiedadIntelectual": "Modelo de Utilidad",
    "titulo": "Filtro de agua portátil ecológico",
    "autores": "María López, Jorge Díaz",
    "resumen": "Dispositivo ecológico para purificación instantánea de agua.",
    "documento": "filtro-eco.pdf",
    "fechaRegistro": "2024-05-15"
  },
  {
    "id": 3,
    "tipoPropiedadIntelectual": "Diseño Industrial",
    "titulo": "Diseño ergonómico de silla de oficina",
    "autores": "Laura Méndez, Arturo Reyes",
    "resumen": "Diseño innovador para mejorar la postura durante el trabajo prolongado.",
    "documento": "silla-ergonomica.pdf",
    "fechaRegistro": "2024-04-10"
  },
  {
    "id": 4,
    "tipoPropiedadIntelectual": "Marca",
    "titulo": "Logo de EcoFresh",
    "autores": "EcoFresh S.A.",
    "resumen": "Marca registrada para productos ecológicos de limpieza.",
    "documento": "logo-ecofresh.pdf",
    "fechaRegistro": "2024-03-25"
  },
  {
    "id": 5,
    "tipoPropiedadIntelectual": "Derecho de Autor",
    "titulo": "Manual de programación inclusiva",
    "autores": "Andrea Ríos",
    "resumen": "Libro sobre buenas prácticas en software accesible.",
    "documento": "manual-programacion.pdf",
    "fechaRegistro": "2024-02-18"
  }
]
;
  }

  verDetalle(patente: any): void {
    this.selectedPatent = { ...patente };
    this.isCollapsedPersonal = false;
    this.isCollapsedDocs = false;
  }

  cerrarDetalle(): void {
    this.selectedPatent = null;
  }

  guardar(): void {
    console.log('Guardado:', this.selectedPatent);
    this.cerrarDetalle();
  }
}
