import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ReportesComponent } from './reportes.component';
import { ModalsModule, WidgetsModule } from '../../../template/widgets';

@NgModule({
    declarations: [ReportesComponent],
    imports: [
        CommonModule,
        RouterModule.forChild([
            {
                path: '',
                component: ReportesComponent,
            },
        ]),
        WidgetsModule,
        ModalsModule,
    ],
})
export class ReportesModule { }
