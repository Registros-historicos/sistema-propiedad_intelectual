import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import { MarcaFormComponent} from './marca-form/marca-form.component';
import { ModeloUtilidadFormComponent} from './modelo-utilidad-form/modelo-utilidad-form.component';
import { DerechoAutorFormComponent} from './derecho-autor-form/derecho-autor-form.component';
import { DisenoIndustrialFormComponent} from './diseno-industrial-form/diseno-industrial-form.component';
import { PatenteFormComponent } from './patente-form/patente-form.component';
import { Error503Component } from 'src/app/modules/errors/error503/error503.component';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'patente',
        component: PatenteFormComponent
      },
      {
        path: 'marca',
        component: MarcaFormComponent
      },
      {
        path: 'modelo-utilidad',
        component: ModeloUtilidadFormComponent
      },
      {
        path: 'derecho-autor',
        component: DerechoAutorFormComponent
      },
      {
        path: 'diseno-industrial',
        component: DisenoIndustrialFormComponent
      },
      {
        path: 'variedad-vegetal',
        component: Error503Component
      },
      {
        path: 'secreto-industrial',
        component: Error503Component
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RegistersRoutingModule {
}
