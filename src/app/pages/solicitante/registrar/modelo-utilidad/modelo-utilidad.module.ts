import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModeloUtilidadComponent } from './modelo-utilidad.component';
import { RouterModule } from '@angular/router';
import { ModalsModule, WidgetsModule } from 'src/app/template/widgets';

@NgModule({
  declarations: [ModeloUtilidadComponent],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: '',
        component: ModeloUtilidadComponent,
      },
    ]),
    WidgetsModule,
    ModalsModule,
  ],
})
export class ModeloUtilidadModule {}
