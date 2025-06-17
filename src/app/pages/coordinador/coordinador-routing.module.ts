import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';

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
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class CoordinadorRoutingModule { }
