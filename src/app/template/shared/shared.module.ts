import { NgModule } from '@angular/core';
import { KeeniconComponent } from './keenicon/keenicon.component';
import { CommonModule } from "@angular/common";
import { SafeUrlPipe } from './pipes/safe-url.pipe';
import { GraficaSectorComponent } from '../layout/components/grafica-sector/grafica-sector.component';
import { GraficoInstitucionComponent } from '../layout/components/grafico-institucion/grafico-institucion.component';
import { TranslationModule } from 'src/app/modules/i18n';
import { TranslateModule } from '@ngx-translate/core';
import { MatIcon } from '@angular/material/icon';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [
    KeeniconComponent,
    SafeUrlPipe,
    GraficaSectorComponent,
    GraficoInstitucionComponent
  ],
  imports: [
    CommonModule,
    TranslationModule,
    TranslateModule,
    MatIcon,
    SweetAlert2Module.forChild(),
    FormsModule,
    RouterModule
  ],
  exports: [
    KeeniconComponent,
    SafeUrlPipe,
    GraficaSectorComponent,
    GraficoInstitucionComponent
  ]
})
export class SharedModule {
}
