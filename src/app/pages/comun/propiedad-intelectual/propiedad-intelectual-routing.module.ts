import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PatenteComponent } from './patente/patente.component';
import { MarcaComponent } from './marca/marca.component';
import { ModeloUtilidadComponent } from './modelo-utilidad/modelo-utilidad.component';
import { DerechoAutorComponent } from './derecho-autor/derecho-autor.component';
import { DisenoIndustrialComponent } from './diseno-industrial/diseno-industrial.component';
import { PatenteFormComponent } from './registers/patente-form/patente-form.component';

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
