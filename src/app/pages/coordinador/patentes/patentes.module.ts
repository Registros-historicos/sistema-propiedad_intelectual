import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { PatentesComponent } from './patentes.component';
import { ModalsModule, WidgetsModule } from '../../../template/widgets';
import { FormsModule } from '@angular/forms';
import { CrudModule } from 'src/app/modules/crud/crud.module';
import { TableComponent } from './table/table.component';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import { SharedModule } from 'src/app/template/shared/shared.module';
import { NgbCollapseModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
    declarations: [PatentesComponent, TableComponent],
    imports: [
        CommonModule,
        FormsModule,
        RouterModule.forChild([
            {
                path: '',
                component: PatentesComponent,
            },
        ]),
        WidgetsModule,
        ModalsModule,
        CrudModule,
        SweetAlert2Module.forChild(),
        SharedModule,
        NgbCollapseModule
    ],
})
export class PatentesModule { }
