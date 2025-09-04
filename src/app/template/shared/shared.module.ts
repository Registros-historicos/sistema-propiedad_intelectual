import {NgModule} from '@angular/core';
import {KeeniconComponent} from './keenicon/keenicon.component';
import {CommonModule} from "@angular/common";
import { SafeUrlPipe } from './pipes/safe-url.pipe';
import { RegistroEstatusComponent } from '../layout/components/registro-estatus/registro-estatus.component';
import { NgApexchartsModule } from 'ng-apexcharts';
import { TranslationModule } from 'src/app/modules/i18n';
import { CuerposAcademicosComponent } from '../layout/components/cuerpos-academicos/cuerpos-academicos.component';
import { RegistrosCategoriaComponent } from '../layout/components/registros-categoria/registros-categoria.component';
import { RegistrosSexoComponent } from '../layout/components/registros-sexo/registros-sexo.component';
import { RegistrosAnioComponent } from '../layout/components/registros-anio/registros-anio.component';
import { FormsModule } from '@angular/forms';
import { TableroInstitucionesComponent } from '../layout/components/tablero-instituciones/tablero-instituciones.component';
import { TableroCategoriasComponent } from '../layout/components/tablero-registro-categoria/tablero-registro-categoria.component';
import { TableroInstitucionesFederalesComponent } from '../layout/components/tablero-instituciones-federales/tablero-instituciones-federales.component';
import { TableroSolicitudesComponent } from '../layout/components/tablero-solicitudes/tablero-solicitudes.component';
import { ChartComponent } from 'ng-apexcharts';
import { TranslateModule } from '@ngx-translate/core';
import {MatIcon} from '@angular/material/icon';
import { RouterModule, Routes } from '@angular/router';
import { Routing } from '../../pages/routing';
import { LayoutComponent } from '../layout/layout.component';
import { TableroInstitutosGeneralComponent } from '../layout/components/tablero-institutos-general/tablero-institutos-general.component';

const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: Routing,
  },
];


@NgModule({
  declarations: [
    KeeniconComponent,
    SafeUrlPipe,
    RegistroEstatusComponent,
    CuerposAcademicosComponent,
    RegistrosCategoriaComponent,
    RegistrosSexoComponent,
    RegistrosAnioComponent,
    TableroCategoriasComponent,
    TableroInstitucionesFederalesComponent,
    TableroSolicitudesComponent,
    TableroInstitutosGeneralComponent,
    TableroInstitucionesComponent,
  ],
  imports: [
    CommonModule,
    NgApexchartsModule,
    MatIcon,
    TranslationModule,
    FormsModule,
    CommonModule,
    RouterModule.forChild(routes),
    ChartComponent,
    TranslateModule,
    MatIcon
    
  ],
  exports: [
    RouterModule,
    KeeniconComponent,
    SafeUrlPipe,
    RegistroEstatusComponent,
    CuerposAcademicosComponent,
    RegistrosCategoriaComponent,
    RegistrosSexoComponent,
    RegistrosAnioComponent,
    TableroInstitucionesComponent,
    TableroCategoriasComponent,
    TableroInstitucionesFederalesComponent,
    TableroSolicitudesComponent,
    TableroInstitutosGeneralComponent
  ]
})
export class SharedModule {
}
