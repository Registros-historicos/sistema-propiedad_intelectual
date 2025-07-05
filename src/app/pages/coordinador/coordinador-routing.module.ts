import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import {Error503Component} from '../../modules/errors/error503/error503.component';

const routes: Routes = [
    {
        path: '',
        children: [
            {
                path: 'dashboard',
                component: DashboardComponent
            },
            {
                path: 'propiedades',
                loadChildren: () => import('../comun/propiedad-intelectual/propiedad-intelectual.module').then(m => m.PropiedadIntelectualModule)
            },
            {
                path: 'solicitantes',
                loadComponent: () => import('../administrador/applicant-listing/applicant-listing.component').then(m => m.ApplicantListingComponent)
            },
            {
                path: 'solicitante/registro',
                loadComponent: () => import('../administrador/applicant-form/applicant-form.component').then(m => m.ApplicantFormComponent)
            },
            {
                path: 'reportes',
                loadChildren: () => import('../reportes/reportes.module').then((m) => m.ReportesModule),
            },
            {
                path: 'perfil',
                loadChildren: () => import('../../modules/profile/profile.module').then((m) => m.ProfileModule),
            },
            {
                path: 'registro',
                loadComponent: () => import('./register/register.component').then(m => m.RegisterComponent)
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
export class CoordinadorRoutingModule { }
