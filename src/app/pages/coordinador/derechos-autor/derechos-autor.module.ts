import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { DerechosAutorComponent } from './derechos-autor.component';
import { ModalsModule, WidgetsModule } from '../../../template/widgets';

@NgModule({
    declarations: [DerechosAutorComponent],
    imports: [
        CommonModule,
        RouterModule.forChild([
            {
                path: '',
                component: DerechosAutorComponent,
            },
        ]),
        WidgetsModule,
        ModalsModule,
    ],
})
export class DerechosAutorModule { }
