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
import { CoordinatorListingCepatComponent } from './coordinator-listing-cepat/coordinator-listing-cepat.component';
import { CepatRoutingModule } from './cepat-routing.module';
import { NgApexchartsModule } from 'ng-apexcharts';
import {MatIcon} from "@angular/material/icon";
import { TecnologicosDescentralizadosComponent } from '../../template/layout/components/tecnologicos-descentralizados/tecnologicos-descentralizados.component';


@NgModule({
    declarations: [
        DashboardComponent, 
        TecnologicosDescentralizadosComponent,
    ],
    imports: [
        CommonModule,
        FormsModule,
        CepatRoutingModule,
        SharedModule,

        // Standalone component import to allow using its selector in templates
        CoordinatorListingCepatComponent,

        NgbCollapseModule,
        NgbTooltipModule,
        NgbModalModule,

        SweetAlert2Module.forChild(),
        DropdownMenusModule,
        TranslationModule,
        TranslateModule,
        NgApexchartsModule,
        MatIcon
    ],
    providers: []
})
export class CepatModule {
}
