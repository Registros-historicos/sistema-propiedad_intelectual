import {NgModule} from '@angular/core';
import {KeeniconComponent} from './keenicon/keenicon.component';
import {CommonModule} from "@angular/common";
import { SafeUrlPipe } from './pipes/safe-url.pipe';
import { RegistroEstatusComponent } from '../layout/components/registro-estatus/registro-estatus.component';
import { NgApexchartsModule } from 'ng-apexcharts';
import { MatIcon } from '@angular/material/icon';
import { TranslationModule } from 'src/app/modules/i18n';
import { CuerposAcademicosComponent } from '../layout/components/cuerpos-academicos/cuerpos-academicos.component';
import { RegistrosCategoriaComponent } from '../layout/components/registros-categoria/registros-categoria.component';
import { RegistrosSexoComponent } from '../layout/components/registros-sexo/registros-sexo.component';
import { RegistrosAnioComponent } from '../layout/components/registros-anio/registros-anio.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    KeeniconComponent,
    SafeUrlPipe,
    RegistroEstatusComponent,
    CuerposAcademicosComponent,
    RegistrosCategoriaComponent,
    RegistrosSexoComponent,
    RegistrosAnioComponent,
  ],
  imports: [
    CommonModule,
    NgApexchartsModule,
    MatIcon,
    TranslationModule,
    FormsModule
  ],
  exports: [
    KeeniconComponent,
    SafeUrlPipe,
    RegistroEstatusComponent,
    CuerposAcademicosComponent,
    RegistrosCategoriaComponent,
    RegistrosSexoComponent,
    RegistrosAnioComponent,
  ]
})
export class SharedModule {
}
