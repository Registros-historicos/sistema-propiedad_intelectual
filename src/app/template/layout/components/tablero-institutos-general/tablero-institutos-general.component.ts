import { Component, Input, OnInit } from '@angular/core';
import { TablerosService, Instituto } from 'src/app/api/services/tableros.service';

@Component({
  selector: 'app-tablero-institutos-general',
  templateUrl: './tablero-institutos-general.component.html',
  styleUrls: ['./tablero-institutos-general.component.scss']
})
export class TableroInstitutosGeneralComponent implements OnInit {
  @Input() titulo: string = '';
  @Input() tipoInstitucion?: number; // 122 Descentralizado, 123 Federal

  data: Instituto[] = [];
  loading: boolean = true;
  error: boolean = false;
  errorMessage: string = '';
  totalInstitutes: number = 0;
  totalRegistros: number = 0;

  constructor(private tablerosService: TablerosService) {}

  ngOnInit(): void {
    this.loadData();
  }

  private loadData(): void {
    this.loading = true;
    this.error = false;
    this.errorMessage = '';

    console.log(`📡 Cargando datos para tipoInstitucion: ${this.tipoInstitucion}`);

    const observable = this.tipoInstitucion 
      ? this.tablerosService.getInstitucionesFiltradas(this.tipoInstitucion)
      : this.tablerosService.getInstitucionesAll();

    observable.subscribe({
      next: (data) => {
        console.log('✅ DATOS RECIBIDOS:', data);
        console.log('🔍 PRIMER ELEMENTO:', data[0]);
        
        this.data = Array.isArray(data) ? data : [];
        this.calculateTotals();
        this.loading = false;
      },
      error: (error) => {
        console.error('❌ ERROR cargando instituciones:', error);
        this.loading = false;
        this.error = true;
        this.errorMessage = 'Error al cargar los datos';
        this.data = [];
        this.calculateTotals();
      }
    });
  }

  private calculateTotals(): void {
    this.totalInstitutes = this.data.length;
    
    // Usar solo total_registros que ahora está normalizado en el servicio
    this.totalRegistros = this.data.reduce((sum, current) => {
      const registros = current.total_registros || 0;
      console.log(`📊 Institución: ${current.nombre_institucion}, Registros: ${registros}`);
      return sum + registros;
    }, 0);
    
    console.log(`📊 Totales calculados: ${this.totalInstitutes} institutos, ${this.totalRegistros} registros`);
  }

  retryLoad(): void {
    this.loadData();
  }

  // Método para obtener el número de registros de una institución
  getRegistros(institute: Instituto): number {
    return institute.total_registros || 0;
  }
}