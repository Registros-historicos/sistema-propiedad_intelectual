import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SolicitantesComponent } from './solicitantes.component';
import { ModalsModule, WidgetsModule } from '../../../template/widgets';
import { SharedModule } from 'src/app/template/shared/shared.module';
import { CrudModule } from 'src/app/modules/crud/crud.module';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import { FormsModule } from '@angular/forms';
import { NgbCollapseModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
    declarations: [SolicitantesComponent],
    imports: [
        CommonModule,
        FormsModule,
        RouterModule.forChild([
            {
                path: '',
                component: SolicitantesComponent,
            },
        ]),
        WidgetsModule,
        ModalsModule,
        SharedModule,
        NgbCollapseModule,
        CrudModule,
        SweetAlert2Module.forChild(),
    ],
})
export class SolicitantesModule { }
