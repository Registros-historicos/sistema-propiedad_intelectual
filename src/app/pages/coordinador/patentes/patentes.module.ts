import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { PatentesComponent } from './patentes.component';
import { ModalsModule, WidgetsModule } from '../../../template/widgets';

@NgModule({
    declarations: [PatentesComponent],
    imports: [
        CommonModule,
        RouterModule.forChild([
            {
                path: '',
                component: PatentesComponent,
            },
        ]),
        WidgetsModule,
        ModalsModule,
    ],
})
export class PatentesModule { }
