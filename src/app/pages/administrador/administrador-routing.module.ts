import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {CoordinatorListingComponent} from './coordinator-listing/coordinator-listing.component';
import {ApplicantListingComponent} from './applicant-listing/applicant-listing.component';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'dashboard',
        loadChildren: () => import('../dashboard/dashboard.module').then((m) => m.DashboardModule),
      },
      {
        path: 'propiedad-intelectual',
        loadChildren: () => import('./propiedad-intelectual/propiedad-intelectual.module').then(m => m.PropiedadIntelectualModule)
      },
      {
        path: 'coordinadores',
        loadComponent: () => import('./coordinator-listing/coordinator-listing.component').then(m => m.CoordinatorListingComponent)
      },
      {
        path: 'solicitantes',
        loadComponent: () => import('./applicant-listing/applicant-listing.component').then(m => m.ApplicantListingComponent)
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdministradorRoutingModule { }
