import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormsModule } from '@angular/forms';
import { NgbCollapseModule, NgbModalModule, NgbTooltipModule } from '@ng-bootstrap/ng-bootstrap';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import { SharedModule } from '../../template/shared/shared.module';
import { DropdownMenusModule } from '../../template/widgets';
import { TranslationModule } from '../../modules/i18n';
import { TranslateModule } from '@ngx-translate/core';
import { DashboardComponent } from './dashboard/dashboard.component';
import { CepatRoutingModule } from './cepat-routing.module';
import { NgApexchartsModule } from 'ng-apexcharts';
import {MatIcon} from "@angular/material/icon";
import { GraficaSolicitudesComponent } from '../../template/layout/components/grafica-solicitudes/grafica-solicitudes.component';
import { TecnologicosDescentralizadosComponent } from '../../template/layout/components/tecnologicos-descentralizados/tecnologicos-descentralizados.component';
import { GraficaSolicitudesInComponent } from '../../template/layout/components/grafica-solicitudes-in/grafica-solicitudes-in.component';


@NgModule({
    declarations: [
        DashboardComponent, 
        TecnologicosDescentralizadosComponent
    ],
    imports: [
        CommonModule,
        FormsModule,
        CepatRoutingModule,
        SharedModule,

        NgbCollapseModule,
        NgbTooltipModule,
        NgbModalModule,

        SweetAlert2Module.forChild(),
        DropdownMenusModule,
        TranslationModule,
        TranslateModule,
        NgApexchartsModule,
        MatIcon,
        GraficaSolicitudesComponent,
        GraficaSolicitudesInComponent
    ],
    providers: []
})
export class CepatModule {
}
