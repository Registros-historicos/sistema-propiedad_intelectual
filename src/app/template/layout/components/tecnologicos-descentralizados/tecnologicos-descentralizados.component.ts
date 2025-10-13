import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { TablerosService, Instituto } from 'src/app/api/services/tableros.service';

@Component({
  selector: 'app-tecnologicos-descentralizados',
  templateUrl: './tecnologicos-descentralizados.component.html',
  styleUrls: ['./tecnologicos-descentralizados.component.scss']
})
export class TecnologicosDescentralizadosComponent implements OnInit {
  @Input() titulo: string = ''

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

    console.log('📡 Cargando instituciones descentralizadas (122)...');

    this.tablerosService.getInstitucionesFiltradas(122).subscribe({
      next: (data) => {
        console.log('✅ INSTITUCIONES DESCENTRALIZADAS RECIBIDAS:', data);
        this.data = Array.isArray(data) ? data : [];
        this.calculateTotals();
        this.loading = false;
      },
      error: (error) => {
        console.error('❌ ERROR cargando instituciones descentralizadas:', error);
        this.loading = false;
        this.error = true;
        this.errorMessage = 'Error al cargar los datos de instituciones descentralizadas';
        this.data = [];
        this.calculateTotals();
      }
    });
  }

  private calculateTotals(): void {
    this.totalInstitutes = this.data.length;
    this.totalRegistros = this.data.reduce((sum, current) => sum + (current.total_registros || 0), 0);
    console.log(`📊 Totales descentralizados: ${this.totalInstitutes} institutos, ${this.totalRegistros} registros`);
  }

  retryLoad(): void {
    this.loadData();
  }
}