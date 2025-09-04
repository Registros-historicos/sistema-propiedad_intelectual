import {NgModule} from '@angular/core';
import {KeeniconComponent} from './keenicon/keenicon.component';
import {CommonModule} from "@angular/common";
import { SafeUrlPipe } from './pipes/safe-url.pipe';
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
    TableroInstitucionesComponent,
    TableroCategoriasComponent,
    TableroInstitucionesFederalesComponent,
    TableroSolicitudesComponent,
    TableroInstitutosGeneralComponent
  ],
  imports: [
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
    TableroInstitucionesComponent,
    TableroCategoriasComponent,
    TableroInstitucionesFederalesComponent,
    TableroSolicitudesComponent,
    TableroInstitutosGeneralComponent
  ]
})
export class SharedModule {
}
