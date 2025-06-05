import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PropiedadIntelectualRoutingModule } from './propiedad-intelectual-routing.module';
import { PatenteComponent } from './patente/patente.component';
import { MarcaComponent } from './marca/marca.component';
import { ModeloUtilidadComponent } from './modelo-utilidad/modelo-utilidad.component';
import { DerechoAutorComponent } from './derecho-autor/derecho-autor.component';
import { DisenoIndustrialComponent } from './diseno-industrial/diseno-industrial.component';
import {CrudModule} from '../../../modules/crud/crud.module';
import {SharedModule} from '../../../template/shared/shared.module';
import {TranslationModule} from '../../../modules/i18n';


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
    PropiedadIntelectualRoutingModule,
    CrudModule,
    SharedModule,
    TranslationModule
  ]
})
export class PropiedadIntelectualModule { }
