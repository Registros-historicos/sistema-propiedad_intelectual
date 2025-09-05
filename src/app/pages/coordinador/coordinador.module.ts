import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbCollapseModule, NgbModalModule, NgbTooltipModule } from '@ng-bootstrap/ng-bootstrap';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import { SharedModule } from '../../template/shared/shared.module';
import { DropdownMenusModule } from '../../template/widgets';
import { TranslationModule } from '../../modules/i18n';
import { TranslateModule } from '@ngx-translate/core';
import { DashboardComponent } from './dashboard/dashboard.component';
import { CoordinadorRoutingModule } from './coordinador-routing.module';
import { NgApexchartsModule } from 'ng-apexcharts';
import {MatIcon} from "@angular/material/icon";
import { RegistroEstatusComponent } from 'src/app/template/layout/components/registro-estatus/registro-estatus.component';


@NgModule({
    declarations: [
        DashboardComponent
    ],
    imports: [
        CommonModule,
        FormsModule,
        CoordinadorRoutingModule,
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
    ],
    providers: []
})
export class CoordinadorModule {
}
