import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PatenteComponent } from './patente.component';
import { RouterModule } from '@angular/router';
import { ModalsModule, WidgetsModule } from 'src/app/template/widgets';

@NgModule({
  declarations: [PatenteComponent],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: '',
        component: PatenteComponent,
      },
    ]),
    WidgetsModule,
    ModalsModule,
  ],
})
export class PatenteModule {}
