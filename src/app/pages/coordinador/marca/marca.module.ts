import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MarcaComponent } from './marca.component';
import { FormsModule } from '@angular/forms';
import { ModalsModule, WidgetsModule } from 'src/app/template/widgets';
import { SharedModule } from 'src/app/template/shared/shared.module';
import { NgbCollapseModule } from '@ng-bootstrap/ng-bootstrap';
import { CrudModule } from 'src/app/modules/crud/crud.module';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';

@NgModule({
    declarations: [MarcaComponent],
    imports: [
        CommonModule,
        FormsModule,
        RouterModule.forChild([
            {
                path: '',
                component: MarcaComponent,
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
export class MarcaModule { }
