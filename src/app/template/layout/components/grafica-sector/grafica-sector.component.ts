import { ChangeDetectorRef, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TablerosService } from 'src/app/api/services/tableros.service';


interface Sector {
  sector_nombre: string;
  actividad_nombre: string;
  total: number;
}

@Component({
  selector: 'app-grafica-sector',
  templateUrl: './grafica-sector.component.html',
  styleUrl: './grafica-sector.component.scss'
})
export class GraficaSectorComponent {

  sectoresList: Sector[];

  constructor(
    private tablerosService: TablerosService,
    private cdRef: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.loadRegisterSector();
  }

  private loadRegisterSector(): void {
    this.tablerosService.getRegisterSector().subscribe({
      next: (data) => {
        this.sectoresList = data;
        this.cdRef.detectChanges();
      },
      error: (error: any) => {
        console.error('ERROR:', error);
      }
    });
  }
}