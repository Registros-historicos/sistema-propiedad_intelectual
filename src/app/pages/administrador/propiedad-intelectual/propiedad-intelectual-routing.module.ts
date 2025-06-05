import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'patente',
        loadChildren: () => import('./patente/patente.component').then(m => m.PatenteComponent)
      },
      {
        path: 'marca',
        loadChildren: () => import('./marca/marca.component').then(m => m.MarcaComponent)
      },
      {
        path: 'modelo-utilidad',
        loadChildren: () => import('./modelo-utilidad/modelo-utilidad.component').then(m => m.ModeloUtilidadComponent)
      },
      {
        path: 'derecho-autor',
        loadChildren: () => import('./derecho-autor/derecho-autor.component').then(m => m.DerechoAutorComponent)
      },
      {
        path: 'diseno-industrial',
        loadChildren: () => import('./diseno-industrial/diseno-industrial.component').then(m => m.DisenoIndustrialComponent)
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PropiedadIntelectualRoutingModule {
}
