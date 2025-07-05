import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import { NgApexchartsModule } from 'ng-apexcharts';
import { ApplicantsService } from 'src/app/api/services/applicant.service';
import { CrudModule } from 'src/app/modules/crud/crud.module';
import { SharedModule } from 'src/app/template/shared/shared.module';
import { ModalsModule, WidgetsModule } from 'src/app/template/widgets';
import { ProfileComponent } from './profile.component';

@NgModule({
  declarations: [ProfileComponent],
  imports: [
    CommonModule,
    FormsModule,
    WidgetsModule,
    ModalsModule,
    NgApexchartsModule,
    SharedModule,
    CrudModule,
    SweetAlert2Module,
    RouterModule.forChild([
      {
        path: '',
        component: ProfileComponent,
      },
    ]),
  ],
  providers: [ApplicantsService],
})
export class ProfileModule {}
