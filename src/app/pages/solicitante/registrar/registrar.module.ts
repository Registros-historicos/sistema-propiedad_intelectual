import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { RegistrarComponent } from './registrar.component';
import { ModalsModule, WidgetsModule } from '../../../template/widgets';
import { TranslateModule  } from '@ngx-translate/core';
@NgModule({
  declarations: [RegistrarComponent],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: '',
        component: RegistrarComponent,
      },
    ]),
    WidgetsModule,
    ModalsModule,
    TranslateModule.forChild(),
    
  ],
})
export class RegistrarModule { }
