import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PatenteComponent } from './patente/patente.component';
import { MarcaComponent } from './marca/marca.component';
import { ModeloUtilidadComponent } from './modelo-utilidad/modelo-utilidad.component';
import { DerechoAutorComponent } from './derecho-autor/derecho-autor.component';
import { DisenoIndustrialComponent } from './diseno-industrial/diseno-industrial.component';
import { PatenteFormComponent } from './registers/patente-form/patente-form.component';
import { Error503Component } from 'src/app/modules/errors/error503/error503.component';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'patente',
        component: PatenteComponent
      },
      {
        path: 'marca',
        component: MarcaComponent
      },
      {
        path: 'modelo-utilidad',
        component: ModeloUtilidadComponent
      },
      {
        path: 'derecho-autor',
        component: DerechoAutorComponent
      },
      {
        path: 'diseno-industrial',
        component: DisenoIndustrialComponent
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
  },
  {
    path: 'registro',
    loadChildren: () => import('./registers/registers.module').then(m => m.RegistersModule)
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PropiedadIntelectualRoutingModule {
}
