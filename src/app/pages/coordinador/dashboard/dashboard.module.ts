import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard.component';
import { DropdownMenusModule, ModalsModule, WidgetsModule } from '../../../template/widgets';
import { SharedModule } from 'src/app/template/shared/shared.module';
import { NgApexchartsModule } from 'ng-apexcharts';
import { TranslationModule } from 'src/app/modules/i18n/translation.module';

@NgModule({
    declarations: [DashboardComponent],
    imports: [
        CommonModule,
        RouterModule.forChild([
            {
                path: '',
                component: DashboardComponent,
            },
        ]),
        WidgetsModule,
        ModalsModule,
        SharedModule,
        DropdownMenusModule,
        NgApexchartsModule,
        TranslationModule
    ],
})
export class DashboardModule { }
