import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { NgbCollapseModule, NgbTooltipModule, NgbModalModule } from '@ng-bootstrap/ng-bootstrap';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import { CoordinatorListingComponent } from './coordinator-listing/coordinator-listing.component';
import { ApplicantListingComponent } from './applicant-listing/applicant-listing.component';
import { CoordinatorService, ApplicantService, InstitucionService } from './shared-services';

@NgModule({
  declarations: [
  ],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forChild([
      {
        path: 'coordinators',
        component: CoordinatorListingComponent,
        data: {title: 'Gestión de Coordinadores'}
      },
      {
        path: 'applicants',
        component: ApplicantListingComponent,
        data: {title: 'Gestión de Solicitantes'}
      },
      {
        path: '',
        redirectTo: 'coordinators',
        pathMatch: 'full'
      },
      {
        path: '**',
        redirectTo: 'coordinators'
      }
    ]),

    NgbCollapseModule,
    NgbTooltipModule,
    NgbModalModule,

    SweetAlert2Module.forChild(),
    ApplicantListingComponent,
    CoordinatorListingComponent,
  ],
  providers: [
    CoordinatorService,
    ApplicantService,
    InstitucionService
  ]
})
export class AdministradorModule { }
