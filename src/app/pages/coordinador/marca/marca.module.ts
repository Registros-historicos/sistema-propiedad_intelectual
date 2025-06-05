import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MarcaComponent } from './marca.component';
import { ModalsModule, WidgetsModule } from '../../../template/widgets';

@NgModule({
    declarations: [MarcaComponent],
    imports: [
        CommonModule,
        RouterModule.forChild([
            {
                path: '',
                component: MarcaComponent,
            },
        ]),
        WidgetsModule,
        ModalsModule,
    ],
})
export class MarcaModule { }
