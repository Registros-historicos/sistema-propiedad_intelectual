import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {AdministradorRoutingModule} from './administrador-routing.module';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {NgbCollapseModule, NgbModalModule, NgbTooltipModule} from '@ng-bootstrap/ng-bootstrap';
import {SweetAlert2Module} from '@sweetalert2/ngx-sweetalert2';
import {ApplicantListingComponent} from './applicant-listing/applicant-listing.component';
import {ApplicantFormComponent} from './applicant-form/applicant-form.component';
import {CoordinatorListingComponent} from './coordinator-listing/coordinator-listing.component';
import {CoordinatorFormComponent} from './coordinator-form/coordinator-form.component';
import {ApplicantService, CoordinatorService, InstitucionService} from './shared-services';
import {AdminDashboardComponent} from './admin-dashboard/admin-dashboard.component';
import {SharedModule} from '../../template/shared/shared.module';
import {DropdownMenusModule} from '../../template/widgets';
import {TranslationModule} from '../../modules/i18n';
import {TranslateModule} from '@ngx-translate/core';
import {MatIcon} from '@angular/material/icon';
import { HistoricalImpiComponent } from './historical-impi/historical-impi.component';
import { NgApexchartsModule } from 'ng-apexcharts';
import { CepatFormComponent } from './cepat-form/cepat-form.component';

@NgModule({
  declarations: [
    AdminDashboardComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    AdministradorRoutingModule,
    SharedModule,

    NgbCollapseModule,
    NgbTooltipModule,
    NgbModalModule,

    SweetAlert2Module.forChild(),
    ApplicantListingComponent,
    ApplicantFormComponent,
    CoordinatorListingComponent,
    CoordinatorFormComponent,
    DropdownMenusModule,
    TranslationModule,
    TranslateModule,
    MatIcon,
    CepatFormComponent,
    HistoricalImpiComponent,
    NgApexchartsModule
  ],
  providers: [
    CoordinatorService,
    ApplicantService,
    InstitucionService
  ]
})
export class AdministradorModule {
}
