import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SolicitantesComponent } from './solicitantes.component';
import { ModalsModule, WidgetsModule } from '../../../template/widgets';

@NgModule({
    declarations: [SolicitantesComponent],
    imports: [
        CommonModule,
        RouterModule.forChild([
            {
                path: '',
                component: SolicitantesComponent,
            },
        ]),
        WidgetsModule,
        ModalsModule,
    ],
})
export class SolicitantesModule { }
