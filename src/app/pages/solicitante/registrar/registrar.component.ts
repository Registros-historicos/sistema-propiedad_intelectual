import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { REGISTRO_PROPIEDAD_INTELECTUAL, RegistroPropiedadIntelectual } from '../constants/propiedad-intelectual.constants';
import { SharedModule } from 'src/app/template/shared/shared.module';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-registrar',
  templateUrl: './registrar.component.html',
  styleUrl: './registrar.component.scss'
})
export class RegistrarComponent {
  registros: RegistroPropiedadIntelectual[] = [];

  constructor(private router: Router, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.registros = Object.values(REGISTRO_PROPIEDAD_INTELECTUAL);
  }

  verRegistro(archivo: string): void {
    this.router.navigate([archivo], { relativeTo: this.route });
  }
}