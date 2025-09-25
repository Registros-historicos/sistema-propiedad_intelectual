import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ReporteSelectorComponent } from './reporte-selector/reporte-selector.component';
import { VisorPdfComponent } from './visor-pdf/visor-pdf.component';
import { ReportesRoutingModule } from './reportes-routing.module';
import { SharedModule } from '../../template/shared/shared.module';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { TranslateModule } from '@ngx-translate/core';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    ReporteSelectorComponent,
    VisorPdfComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReportesRoutingModule,
    SharedModule,
    MatProgressBarModule,
    TranslateModule.forChild(),
    HttpClientModule
  ]
})
export class ReportesModule {}
