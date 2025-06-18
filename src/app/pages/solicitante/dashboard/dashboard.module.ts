import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard.component';
import { FormsModule } from '@angular/forms';
import { WidgetsModule } from '../../../template/widgets/content/widgets/widgets.module';
import { ModalsModule } from '../../../template/widgets/layout/modals/modals.module';
import { NgApexchartsModule } from 'ng-apexcharts';
import { SharedModule } from 'src/app/template/shared/shared.module';

@NgModule({
  declarations: [DashboardComponent],
  imports: [
    CommonModule,
    FormsModule,
    WidgetsModule,
    ModalsModule,
    NgApexchartsModule,
    SharedModule,
    RouterModule.forChild([
      {
        path: '',
        component: DashboardComponent,
      },
    ]),
  ],
})
export class DashboardModule {}
