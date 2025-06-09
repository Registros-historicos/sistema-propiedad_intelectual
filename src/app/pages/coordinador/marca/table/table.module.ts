import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { TableComponent } from './table.component';
import { ModalsModule, WidgetsModule } from '../../../../template/widgets';

@NgModule({
    declarations: [TableComponent],
    imports: [
        CommonModule,
        RouterModule.forChild([
            {
                path: '',
                component: TableComponent,
            },
        ]),
        WidgetsModule,
        ModalsModule,
    ],
})
export class TableModule { }
