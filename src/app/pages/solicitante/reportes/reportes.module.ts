import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ModalsModule, WidgetsModule } from '../../../template/widgets';
import { ReportesComponent } from './reportes.component';

@NgModule({
  declarations: [ReportesComponent],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: '',
        component: ReportesComponent,
      },
    ]),
    WidgetsModule,
    ModalsModule,
  ],
})
export class ReporteModule {}
