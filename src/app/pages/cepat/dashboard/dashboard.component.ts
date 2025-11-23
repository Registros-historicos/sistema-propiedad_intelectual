import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ExportExcelService } from 'src/app/api/services/export-excel.service';
import { TablerosService, Top10Instituciones } from 'src/app/api/services/tableros.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent implements OnInit{
  dataTop10Institutions: Top10Instituciones[] = [];
  dataFederalInstitutes: any[] = [];
  dataDecentralizedInstitutes: any[] = [];

  constructor(
      private tablerosService: TablerosService,
      private cdRef: ChangeDetectorRef,
       private exportExcelService: ExportExcelService
    ) {}

  ngOnInit(): void {
    this.loadTop10Institutions();
    // Cargar datos reales desde el servicio (igual que en AdminDashboard)
    this.loadRegisterInstitutes(123);
    this.loadRegisterInstitutes(122);
  }

  loadRegisterInstitutes(tipo: number): void {
  console.log(`🔍 Cargando instituciones tipo: ${tipo}`);
  
  this.tablerosService.getInstitucionesFiltradas(tipo).subscribe({
    next: (data) => {
      console.log(`✅ Datos recibidos para tipo ${tipo}:`, data);
      
      if (tipo === 122) {
        this.dataDecentralizedInstitutes = [...data];
        console.log('📊 Descentralizadas:', this.dataDecentralizedInstitutes);
      } else {
        this.dataFederalInstitutes = [...data];
        console.log('📊 Federales:', this.dataFederalInstitutes);
      }
      this.cdRef.detectChanges();
    },
    error: (error: any) => {
      console.error(`❌ ERROR cargando instituciones tipo ${tipo}:`, error);
      
      if (tipo === 122) {
        this.dataDecentralizedInstitutes = [];
      } else {
        this.dataFederalInstitutes = [];
      }
      this.cdRef.detectChanges();
    }
  });
}


  private loadTop10Institutions(): void {
  this.tablerosService.getTopInstitutions().subscribe({
    next: (data) => {
      this.dataTop10Institutions = data;
      this.cdRef.detectChanges();
    },
    error: (error) => {
      console.error('ERROR cargando top instituciones:', error);
    },
   });
  }

   exportExcelFederalInstitutes() {
    this.exportExcelService.downloadExcelReport('/excel/institutos/federales');
  }

  exportExcelDecentralizedInstitutes() {
    this.exportExcelService.downloadExcelReport('/excel/institutos/descentralizados');
  }

  exportExcelTop10Institutions() {
    this.exportExcelService.downloadExcelReport('/excel/institutos/top10');
  }

  exportExcelAllInstitutions() {
    this.exportExcelService.downloadExcelReport('/excel/institutos/todos');
  }

  exportExcelSector() {
    this.exportExcelService.downloadExcelReport('/excel/sectores/economicos');
  }

  exportExcelRegisterImpi() {
    this.exportExcelService.downloadExcelReport('/excel/registros/impi');
  }

  exportExcelRegisterIndautor() {
    this.exportExcelService.downloadExcelReport('/excel/registros/indautor');
  }
  
  exportExcelRegisterByGender() {
    this.exportExcelService.downloadExcelReport('/excel/registros/sexo');
  }

  exportExcelRegisterByStatus() {
    this.exportExcelService.downloadExcelReport('/excel/registros/estatus');
  }

  exportExcelReportByYear(year: number) {
  this.exportExcelService.downloadExcelReport(`/excel/registros/mes/?anio=${year}`);
  }
}
