import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { SharedModule } from 'src/app/template/shared/shared.module';
import { RegistroCard, REGISTROS_POR_ROL } from './constants/registro-usuario.constant';
import { Router, ActivatedRoute } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
      CommonModule,
      SharedModule,
      TranslateModule,
    ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {
  registros: RegistroCard[] = [];

  constructor(private router: Router, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.registros = Object.values(REGISTROS_POR_ROL);
  }

  verRegistro(archivo: string): void {
    this.router.navigate([archivo], { relativeTo: this.route });
  }
}
