import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModeloUtilidadComponent } from './modelo-utilidad.component';
import { RouterModule } from '@angular/router';
import { ModalsModule, WidgetsModule } from 'src/app/template/widgets';
import { SharedModule } from 'src/app/template/shared/shared.module';
import { NgbCollapseModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';

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
    SharedModule,
    NgbCollapseModule,
    FormsModule,
    SweetAlert2Module,
  ],
})
export class ModeloUtilidadModule {}
