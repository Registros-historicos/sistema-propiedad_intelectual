import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ReporteSelectorComponent } from './reporte-selector/reporte-selector.component';
import { VisorPdfComponent } from './visor-pdf/visor-pdf.component';

const routes: Routes = [
  { path: '', component: ReporteSelectorComponent },
  { path: ':archivo', component: VisorPdfComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReportesRoutingModule {}
