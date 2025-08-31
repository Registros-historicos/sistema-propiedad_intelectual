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
                path: 'perfil',
                loadChildren: () => import('../../modules/profile/profile.module').then((m) => m.ProfileModule),
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
