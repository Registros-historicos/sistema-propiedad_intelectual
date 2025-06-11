import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { DisenoIndustrialComponent } from './diseno-industrial.component';
import { ModalsModule, WidgetsModule } from '../../../template/widgets';

@NgModule({
    declarations: [DisenoIndustrialComponent],
    imports: [
        CommonModule,
        RouterModule.forChild([
            {
                path: '',
                component: DisenoIndustrialComponent,
            },
        ]),
        WidgetsModule,
        ModalsModule,
    ],
})
export class DisenoIndustrialModule { }
