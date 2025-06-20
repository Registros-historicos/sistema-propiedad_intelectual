import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ReporteCard, REPORTES_POR_ROL, Rol } from '../constants/reportes-por-rol.constant';
import { NgZone } from '@angular/core';

@Component({
  selector: 'app-reporte-selector',
  templateUrl: './reporte-selector.component.html',
  styleUrls: ['./reporte-selector.component.scss']
})
export class ReporteSelectorComponent implements OnInit {
  perfil: Rol = 'admin'; // Valor por defecto
  reportes: ReporteCard[] = [];
  isLoading: boolean = false;
  progress: number = 0;

  constructor(private router: Router, private route: ActivatedRoute, private zone: NgZone) {}

  ngOnInit(): void {
    const url = this.router.url; // Ej: /administrador/reportes
    if (url.includes('/administrador/')) {
      this.perfil = 'admin';
    } else if (url.includes('/coordinador/')) {
      this.perfil = 'coordinador';
    } else if (url.includes('/solicitante/')) {
      this.perfil = 'solicitante';
    }

    this.reportes = REPORTES_POR_ROL[this.perfil];
    console.log('Ruta:', url);
    console.log('Perfil detectado:', this.perfil);
  }

  verReporte(archivo: string): void {
    this.showLoading();
    setTimeout(() => {
      this.router.navigate([archivo], { relativeTo: this.route });
      //window.open(`assets/reportes/${archivo}`, '_blank');
  }, 4000);
  }

    showLoading(): void {
    this.isLoading = true;
    this.progress = 0;
  }
}
