import { Component } from '@angular/core';
import {
  HISTORICAL_REGISTERS,
  HistoricalRegisterCard,
} from './constants/historical-register.constant';
import { Router, ActivatedRoute } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/template/shared/shared.module';
import { NavigationService } from 'src/app/pages/comun/navigation.service';

@Component({
  selector: 'app-historical-register',
  standalone: true,
  imports: [CommonModule, SharedModule, TranslateModule],
  templateUrl: './historical-register.component.html',
  styleUrl: './historical-register.component.scss',
})
export class HistoricalRegisterComponent {
  registers: HistoricalRegisterCard[] = [];

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private navigationService: NavigationService
  ) {}

  ngOnInit(): void {
    this.registers = Object.values(HISTORICAL_REGISTERS);
  }

  verRegistro(archivo: string): void {
    const baseRoute = this.navigationService.getHistoricalRecordsRoute();
    this.router.navigate([`${baseRoute}/${archivo}`]);
  }
}
