import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CoordinatorListingComponent } from './coordinator-listing/coordinator-listing.component';
import { CoordinatorFormComponent } from './coordinator-form/coordinator-form.component';
import { ApplicantListingComponent } from './applicant-listing/applicant-listing.component';
import {ApplicantFormComponent} from './applicant-form/applicant-form.component';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'dashboard',
        loadChildren: () => import('../dashboard/dashboard.module').then((m) => m.DashboardModule),
      },
      {
        path: 'propiedades',
        loadChildren: () => import('./propiedad-intelectual/propiedad-intelectual.module').then(m => m.PropiedadIntelectualModule)
      },
      {
        path: 'coordinadores',
        component: CoordinatorListingComponent
      },
      {
        path: 'coordinadores/create',
        component: CoordinatorFormComponent
      },
      {
        path: 'coordinadores/edit/:id',
        component: CoordinatorFormComponent
      },
      {
        path: 'solicitantes',
        component: ApplicantListingComponent
      },
      {
        path: 'solciitantes/create',
        component: ApplicantFormComponent
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdministradorRoutingModule { }
