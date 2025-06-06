import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdministradorRoutingModule } from './administrador-routing.module';
import { FormsModule } from '@angular/forms';
import { NgbCollapseModule, NgbModalModule, NgbTooltipModule } from '@ng-bootstrap/ng-bootstrap';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import { ApplicantListingComponent } from './applicant-listing/applicant-listing.component';
import { ApplicantFormComponent } from './applicant-form/applicant-form.component';
import { CoordinatorListingComponent } from './coordinator-listing/coordinator-listing.component';
import { CoordinatorFormComponent } from './coordinator-form/coordinator-form.component';
import { ApplicantService, CoordinatorService, InstitucionService } from './shared-services';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    FormsModule,
    AdministradorRoutingModule,

    NgbCollapseModule,
    NgbTooltipModule,
    NgbModalModule,

    SweetAlert2Module.forChild(),
    ApplicantListingComponent,
    ApplicantFormComponent,
    CoordinatorListingComponent,
    CoordinatorFormComponent,
  ],
  providers: [
    CoordinatorService,
    ApplicantService,
    InstitucionService
  ]
})
export class AdministradorModule { }
