import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import { NgbCollapseModule } from '@ng-bootstrap/ng-bootstrap';
import { RegistersRoutingModule } from './registers-routing.module';
import { SharedModule } from 'src/app/template/shared/shared.module';
import { TranslationModule } from 'src/app/modules/i18n';
import { PatenteFormComponent } from './patente-form/patente-form.component';
import { DerechoAutorFormComponent } from './derecho-autor-form/derecho-autor-form.component';
import { DisenoIndustrialFormComponent } from './diseno-industrial-form/diseno-industrial-form.component';
import { MarcaFormComponent } from './marca-form/marca-form.component';
import { ModeloUtilidadFormComponent } from './modelo-utilidad-form/modelo-utilidad-form.component';

@NgModule({
  declarations: [
    PatenteFormComponent,
    DerechoAutorFormComponent,
    DisenoIndustrialFormComponent,
    MarcaFormComponent,
    ModeloUtilidadFormComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    RegistersRoutingModule,
    SharedModule,
    TranslationModule,
    SweetAlert2Module.forChild(),
    NgbCollapseModule,
  ]
})
export class RegistersModule { }
