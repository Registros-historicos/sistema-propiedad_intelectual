import { ChangeDetectorRef, Component, EventEmitter, Input, OnInit, Output, SimpleChanges } from '@angular/core';
import { TablerosService } from 'src/app/api/services/tableros.service';

interface Instituto {
  id_institucion: number;
  institucion_nombre: string;
  total: number;
}

@Component({
  selector: 'app-tablero-institutos-general',
  templateUrl: './tablero-institutos-general.component.html',
  styleUrls: ['./tablero-institutos-general.component.scss']
})
export class TableroInstitutosGeneralComponent implements OnInit {
  @Input() titulo: string = '';
  @Input() tipoInstitucion?: number; // 122 Descentralizado, 123 Federal
  @Input() data:Instituto[] = [];

  @Output() retry = new EventEmitter<void>();

  loading: boolean = true;
  error: boolean = false;
  errorMessage: string = '';
  totalInstitutes: number = 0;
  totalRegistros: number = 0;

  constructor() {}

  ngOnInit(): void {
    this.getTotals();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['data']) {
      this.getTotals();
      this.loading = false
    }
  }

  retryLoad(): void {
    this.retry.emit();
  }

  getTotals() {
    if (this.data && this.data.length > 0) {
      this.totalInstitutes = this.data.length;
      this.totalRegistros = this.data.reduce((sum, item) => sum + item.total, 0);
    } else {
      this.totalInstitutes = 0;
      this.totalRegistros = 0;
    }
  }
}