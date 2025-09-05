import { NgModule } from '@angular/core';
import { KeeniconComponent } from './keenicon/keenicon.component';
import { CommonModule } from "@angular/common";
import { SafeUrlPipe } from './pipes/safe-url.pipe';
import { RegistroEstatusComponent } from '../layout/components/registro-estatus/registro-estatus.component';
import { NgApexchartsModule } from 'ng-apexcharts';
import { CuerposAcademicosComponent } from '../layout/components/cuerpos-academicos/cuerpos-academicos.component';
import { RegistrosCategoriaComponent } from '../layout/components/registros-categoria/registros-categoria.component';
import { RegistrosSexoComponent } from '../layout/components/registros-sexo/registros-sexo.component';
import { RegistrosAnioComponent } from '../layout/components/registros-anio/registros-anio.component';
import { TableroInstitucionesComponent } from '../layout/components/tablero-instituciones/tablero-instituciones.component';
import { TableroCategoriasComponent } from '../layout/components/tablero-registro-categoria/tablero-registro-categoria.component';
import { TableroInstitucionesFederalesComponent } from '../layout/components/tablero-instituciones-federales/tablero-instituciones-federales.component';
import { TableroSolicitudesComponent } from '../layout/components/tablero-solicitudes/tablero-solicitudes.component';
import { ChartComponent } from 'ng-apexcharts';
import { Routes } from '@angular/router';
import { Routing } from '../../pages/routing';
import { LayoutComponent } from '../layout/layout.component';
import { TableroInstitutosGeneralComponent } from '../layout/components/tablero-institutos-general/tablero-institutos-general.component';
import { GraficaSectorComponent } from '../layout/components/grafica-sector/grafica-sector.component';
import { GraficoInstitucionComponent } from '../layout/components/grafico-institucion/grafico-institucion.component';
import { TranslationModule } from 'src/app/modules/i18n';
import { TranslateModule } from '@ngx-translate/core';
import { MatIcon } from '@angular/material/icon';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { GraficaSolicitudesComponent } from '../layout/components/grafica-solicitudes/grafica-solicitudes.component';
import { GraficaSolicitudesInComponent } from '../layout/components/grafica-solicitudes-in/grafica-solicitudes-in.component';

@NgModule({
  declarations: [
    KeeniconComponent,
    SafeUrlPipe,
    GraficaSectorComponent,
    GraficoInstitucionComponent,
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
    GraficaSolicitudesComponent,
    GraficaSolicitudesInComponent
  ],
  imports: [
    CommonModule,
    NgApexchartsModule,
    MatIcon,
    TranslationModule,
    FormsModule,
    CommonModule,
    ChartComponent,
    TranslateModule,
    MatIcon,
    SweetAlert2Module.forChild(),
    FormsModule,
    RouterModule
  ],
  exports: [
    RouterModule,
    KeeniconComponent,
    SafeUrlPipe,
    GraficaSectorComponent,
    GraficoInstitucionComponent,
    RegistroEstatusComponent,
    CuerposAcademicosComponent,
    RegistrosCategoriaComponent,
    RegistrosSexoComponent,
    RegistrosAnioComponent,
    TableroInstitucionesComponent,
    TableroCategoriasComponent,
    TableroInstitucionesFederalesComponent,
    TableroSolicitudesComponent,
    TableroInstitutosGeneralComponent,
    GraficaSolicitudesComponent,
    GraficaSolicitudesInComponent
  ]
})
export class SharedModule {
}
