import {NgModule} from '@angular/core';
import {KeeniconComponent} from './keenicon/keenicon.component';
import {CommonModule} from "@angular/common";
import { SafeUrlPipe } from './pipes/safe-url.pipe';

@NgModule({
  declarations: [
    KeeniconComponent,
    SafeUrlPipe
  ],
  imports: [
    CommonModule,
  ],
  exports: [
    KeeniconComponent,
    SafeUrlPipe
  ]
})
export class SharedModule {
}
