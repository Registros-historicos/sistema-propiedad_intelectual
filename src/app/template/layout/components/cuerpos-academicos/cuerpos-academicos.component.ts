import { Component, Input } from '@angular/core';

interface CuerpoAcademico {
  nombre: string;
  solicitudes: number;
}

@Component({
  selector: 'app-cuerpos-academicos',
  templateUrl: './cuerpos-academicos.component.html',
  styleUrl: './cuerpos-academicos.component.scss'
})
export class CuerposAcademicosComponent {
  @Input() cuerposAcademicos: CuerpoAcademico[];

}
