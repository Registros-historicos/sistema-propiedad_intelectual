import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PropiedadIntelectualRoutingModule } from './propiedad-intelectual-routing.module';
import { PatenteComponent } from './patente/patente.component';
import { MarcaComponent } from './marca/marca.component';
import { ModeloUtilidadComponent } from './modelo-utilidad/modelo-utilidad.component';
import { DerechoAutorComponent } from './derecho-autor/derecho-autor.component';
import { DisenoIndustrialComponent } from './diseno-industrial/diseno-industrial.component';


@NgModule({
  declarations: [
    PatenteComponent,
    MarcaComponent,
    ModeloUtilidadComponent,
    DerechoAutorComponent,
    DisenoIndustrialComponent
  ],
  imports: [
    CommonModule,
    PropiedadIntelectualRoutingModule
  ]
})
export class PropiedadIntelectualModule { }
