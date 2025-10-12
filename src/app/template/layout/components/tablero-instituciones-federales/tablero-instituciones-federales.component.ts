import { Component, OnInit } from '@angular/core';
import { TablerosService } from 'src/app/api/services/tableros.service';

@Component({
  selector: 'app-tablero-instituciones-federales',
  templateUrl: './tablero-instituciones-federales.component.html',
  styleUrls: ['./tablero-instituciones-federales.component.scss']
})
export class TableroInstitucionesFederalesComponent implements OnInit {
  instituciones: any[] = [];
  loading: boolean = true;
  error: boolean = false;
  errorMessage: string = '';

  constructor(private tablerosService: TablerosService) {}

  ngOnInit(): void {
    this.loadTopInstitutions();
  }

private loadTopInstitutions(): void {
  this.loading = true;
  this.error = false;
  this.errorMessage = '';

  console.log('📡 Cargando top instituciones...');

  this.tablerosService.getTopInstitutions().subscribe({
    next: (data) => {
      console.log('✅ TOP INSTITUCIONES RECIBIDAS:', data);
      console.log('🔍 PRIMERA INSTITUCIÓN:', data[0]);
      console.log('📊 Número de instituciones:', data.length);
      
      // Tomar solo las top 10 instituciones
      this.instituciones = data.slice(0, 10);
      console.log('🎯 Instituciones después de slice:', this.instituciones);
      
      this.loading = false;
      console.log('🏁 Loading terminado');
    },
    error: (error) => {
      console.error('❌ ERROR cargando top instituciones:', error);
      this.loading = false;
      this.error = true;
      this.errorMessage = 'Error al cargar los datos';
      this.instituciones = [];
    }
  });
}

  retryLoad(): void {
    this.loadTopInstitutions();
  }
}