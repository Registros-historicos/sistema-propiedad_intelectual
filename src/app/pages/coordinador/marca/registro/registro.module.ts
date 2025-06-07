import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { RegistroComponent } from './registro.component';
import { ModalsModule, WidgetsModule } from '../../../../template/widgets';

@NgModule({
    declarations: [RegistroComponent],
    imports: [
        CommonModule,
        RouterModule.forChild([
            {
                path: '',
                component: RegistroComponent,
            },
        ]),
        WidgetsModule,
        ModalsModule,
    ],
})
export class RegistroModule { }
