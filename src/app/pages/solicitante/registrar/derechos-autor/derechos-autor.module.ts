import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { DerechosAutorComponent } from './derechos-autor.component';
import { ModalsModule, WidgetsModule } from 'src/app/template/widgets';

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
export class DerechosAutorModule {}
