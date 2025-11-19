import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { Error503Component } from '../../modules/errors/error503/error503.component';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'dashboard',
        component: DashboardComponent
      },
      {
        path: 'perfil',
        loadChildren: () => import('../../modules/profile/profile.module').then((m) => m.ProfileModule),
      },
      {
        path: 'propiedades',
        loadChildren: () => import('../comun/propiedad-intelectual/propiedad-intelectual.module').then(m => m.PropiedadIntelectualModule)
      },
      {
        path: 'registros/historicos',
        loadComponent: () => import('../comun/historical-register/historical-register.component').then(m => m.HistoricalRegisterComponent)
      },
      {
        path: 'registros/historicos/indautor',
        loadComponent: () => import('../comun/historical-indautor/historical-indautor.component')
          .then(m => m.HistoricalIndautorComponent)
      },
      {
        path: 'registros/historicos/impi',
        loadComponent: () => import('../comun/historical-impi/historical-impi.component')
          .then(m => m.HistoricalImpiComponent)
      },
      {
        path: 'registro',
        loadComponent: () => import('./register-cepat/register-cepat.component').then(m => m.RegisterCepatComponent)
      },
      {
        path: 'coordinador/registro',
        loadComponent: () => import('../administrador/coordinator-form/coordinator-form.component').then(m => m.CoordinatorFormComponent)
      },
      {
        path: 'coordinador/list',
        loadComponent: () => import('./coordinator-listing-cepat/coordinator-listing-cepat.component').then(m => m.CoordinatorListingCepatComponent)
      },
      {
        path: 'reportes',
        loadChildren: () => import('../reportes/reportes.module').then((m) => m.ReportesModule),
      },
      {
        path: 'ayuda',
        component: Error503Component
      },
      {
        path: '',
        redirectTo: 'dashboard',
        pathMatch: 'full'
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CepatRoutingModule { }
