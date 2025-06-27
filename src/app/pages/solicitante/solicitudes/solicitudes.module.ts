import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SolicitudesComponent } from './solicitudes.component';
import { FormsModule } from '@angular/forms';
import { WidgetsModule } from '../../../template/widgets/content/widgets/widgets.module';
import { ModalsModule } from '../../../template/widgets/layout/modals/modals.module';
import { NgApexchartsModule } from 'ng-apexcharts';
import { SharedModule } from 'src/app/template/shared/shared.module';
import { CrudModule } from 'src/app/modules/crud/crud.module';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import { DropdownMenusModule } from '../../../template/widgets/content/dropdown-menus/dropdown-menus.module';
import { MatIconModule } from '@angular/material/icon';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [SolicitudesComponent],
  imports: [
    CommonModule,
    MatIconModule,
    FormsModule,
    WidgetsModule,
    ModalsModule,
    NgApexchartsModule,
    SharedModule,
    CrudModule,
    SweetAlert2Module.forChild(), // <-- Usa forChild() para módulos hijos
    RouterModule.forChild([
      {
        path: '',
        component: SolicitudesComponent,
      },
    ]),
    DropdownMenusModule,
    TranslateModule,
  ],
})
export class SolicitudesModule { }
