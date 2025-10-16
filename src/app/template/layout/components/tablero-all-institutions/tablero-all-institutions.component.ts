import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
} from '@angular/core';
import {
  Institutions,
  TablerosService,
} from 'src/app/api/services/tableros.service';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-tablero-all-institutions',
  templateUrl: './tablero-all-institutions.component.html',
  styleUrl: './tablero-all-institutions.component.scss',
})
export class TableroAllInstitutionsComponent implements OnInit {
  @Input() titulo: string = '';

  data: Institutions[] = [];
  loading: boolean = true;
  error: boolean = false;
  errorMessage: string = '';
  totalInstitutes: number = 0;

  constructor(private tablerosService: TablerosService) {}

  ngOnInit(): void {
    this.loadData();
  }

  // private loadData(): void {
  //   this.loading = true;
  //   this.error = false;
  //   this.errorMessage = '';
  //   const observable = this.tablerosService.getAllInstitutions();

  //   observable.subscribe({
  //     next: (data) => {
  //       this.data = Array.isArray(data) ? data : [];
  //       this.loading = false;
  //       this.totalInstitutes = this.data.length;
  //     },
  //     error: (error) => {
  //       console.error('❌ ERROR cargando instituciones:', error);
  //       this.loading = false;
  //       this.error = true;
  //       this.errorMessage = 'Error al cargar los datos';
  //       this.data = [];
  //       this.totalInstitutes = this.data.length;
  //     },
  //   });
  // }

  private loadData(): void {
    this.loading = true;
    this.error = false;
    this.errorMessage = '';

    this.tablerosService
      .getAllInstitutions()
      .pipe(take(1))
      .subscribe({
        next: (data) => {
          this.data = Array.isArray(data) ? data : [];
          this.loading = false;
          this.totalInstitutes = this.data.length;
        },
        error: (error) => {
          console.error('❌ ERROR cargando instituciones:', error);
          this.loading = false;
          this.error = true;
          this.errorMessage = 'Error al cargar los datos';
          this.data = [];
          this.totalInstitutes = this.data.length;
        },
      });
  }

  retryLoad(): void {
    this.loadData();
  }

  trackByInstitutionId(index: number, item: Institutions): number {
    return item.id_institucion;
  }
}
