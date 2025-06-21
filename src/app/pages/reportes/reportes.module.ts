import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReporteSelectorComponent } from './reporte-selector/reporte-selector.component';
import { VisorPdfComponent } from './visor-pdf/visor-pdf.component';
import { ReportesRoutingModule } from './reportes-routing.module';
import { SharedModule } from '../../template/shared/shared.module';
import { SafeUrlPipe } from "../../template/shared/pipes/safe-url.pipe";
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { TranslateModule } from '@ngx-translate/core';



@NgModule({
  declarations: [
    ReporteSelectorComponent,
    VisorPdfComponent
  ],
  imports: [
    CommonModule,
    ReportesRoutingModule,
    SharedModule,
    MatProgressBarModule,
    TranslateModule.forChild(),
  ]
})
export class ReportesModule {}