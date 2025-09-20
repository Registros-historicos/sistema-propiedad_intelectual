import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/template/shared/shared.module';
import {
  RegistroCard,
  REGISTROS_POR_CEPAT,
} from './constants/registro-usuario.constant';
import { Router, ActivatedRoute } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-register-cepat',
  standalone: true,
  imports: [CommonModule, SharedModule, TranslateModule],
  templateUrl: './register-cepat.component.html',
  styleUrl: './register-cepat.component.scss',
})
export class RegisterCepatComponent {
  registros: RegistroCard[] = [];

  constructor(private router: Router, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.registros = Object.values(REGISTROS_POR_CEPAT);
  }

  verRegistro(archivo: string): void {
    this.router.navigate([archivo], { relativeTo: this.route });
  }
}
