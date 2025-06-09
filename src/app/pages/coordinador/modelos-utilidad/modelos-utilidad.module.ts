import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ModelosUtilidadComponent } from './modelos-utilidad.component';
import { ModalsModule, WidgetsModule } from '../../../template/widgets';

@NgModule({
    declarations: [ModelosUtilidadComponent],
    imports: [
        CommonModule,
        RouterModule.forChild([
            {
                path: '',
                component: ModelosUtilidadComponent,
            },
        ]),
        WidgetsModule,
        ModalsModule,
    ],
})
export class ModelosUtilidadModule { }
