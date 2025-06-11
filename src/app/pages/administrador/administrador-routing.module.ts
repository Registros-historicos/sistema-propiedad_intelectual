import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {CoordinatorListingComponent} from './coordinator-listing/coordinator-listing.component';
import {ApplicantListingComponent} from './applicant-listing/applicant-listing.component';
import {AdminDashboardComponent} from './admin-dashboard/admin-dashboard.component';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'dashboard',
        component: AdminDashboardComponent
      },
      {
        path: 'propiedades',
        loadChildren: () => import('./propiedad-intelectual/propiedad-intelectual.module').then(m => m.PropiedadIntelectualModule)
      },
      {
        path: 'coordinadores',
        loadComponent: () => import('./coordinator-listing/coordinator-listing.component').then(m => m.CoordinatorListingComponent)
      },
      {
        path: 'coordinador/registro',
        loadComponent: () => import('./coordinator-form/coordinator-form.component').then(m => m.CoordinatorFormComponent)
      },
      {
        path: 'solicitantes',
        loadComponent: () => import('./applicant-listing/applicant-listing.component').then(m => m.ApplicantListingComponent)
      },
      {
        path: 'solicitante/registro',
        loadComponent: () => import('./applicant-form/applicant-form.component').then(m => m.ApplicantFormComponent)
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdministradorRoutingModule { }
