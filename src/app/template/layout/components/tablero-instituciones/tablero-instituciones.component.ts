import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { TablerosService } from 'src/app/api/services/tableros.service';

@Component({
  selector: 'app-tablero-instituciones',
  templateUrl: './tablero-instituciones.component.html',
  styleUrls: ['./tablero-instituciones.component.scss']
})
export class TableroInstitucionesComponent implements OnInit {
  
  instituciones: any[] = [];

  constructor(
    private tablerosService: TablerosService,
    private cdRef: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.loadInstitutions();
  }

  private loadInstitutions(): void {
    this.tablerosService.getTopInstitutions().subscribe({
      next: (data) => {
        console.log('✅ INSTITUCIONES RECIBIDAS:', data);
        this.instituciones = data;
        
        // DEBUG: Verificar la estructura de los datos
        if (this.instituciones.length > 0) {
          console.log('🔍 PRIMERA INSTITUCIÓN:', this.instituciones[0]);
          console.log('🔍 PROPIEDADES DISPONIBLES:', Object.keys(this.instituciones[0]));
        }
        
        this.cdRef.detectChanges();
        console.log('🔄 Change Detection forzado en instituciones');
      },
      error: (error) => {
        console.error('❌ ERROR cargando instituciones:', error);
      }
    });
  }

  // Función trackBy mejorada
  trackByInstitution(index: number, institution: any): string | number {
    // Usar id_institucion que viene de la API
    return institution.id_institucion || index;
  }




}