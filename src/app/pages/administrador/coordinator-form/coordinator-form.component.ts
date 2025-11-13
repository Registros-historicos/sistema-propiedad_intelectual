import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import {
  CepatService,
  Estado,
  Institucion,
} from 'src/app/api/services/cepat.service';
import { SharedModule } from '../../../template/shared/shared.module';
import { CoordinatorHttpService } from 'src/app/api/services/coordinador.service';
import { Router } from '@angular/router';

interface UserModel {
  nombre: string;
  ape_pat: string;
  ape_mat: string;
  correo: string;
  telefono: string;
  password: string;
  id_estado: number | null;
  id_instituto: number | null;
  estatus: number;
  tipo_usuario_param: number;
  url_foto: string;
}
interface CoordinatorPayload {
  nombre: string;
  ape_pat: string;
  ape_mat: string;
  url_foto: string;
  correo: string;
  password: string;
  telefono: string;
  tipo_usuario_param: number;
  estatus: number;
}

@Component({
  selector: 'app-coordinator-form',
  templateUrl: './coordinator-form.component.html',
  standalone: true,
  imports: [CommonModule, FormsModule, SharedModule, SweetAlert2Module],
  styleUrls: ['./coordinator-form.component.scss'],
})
export class CoordinatorFormComponent implements OnInit {
  coordinadorCreated: boolean = false;
  userModel: UserModel = {
    nombre: '',
    ape_pat: '',
    ape_mat: '',
    correo: '',
    telefono: '',
    password: '',
    id_estado: null,
    id_instituto: null,
    estatus: 24, // 24 es un usuario habilitado
    tipo_usuario_param: 36, // 36 es para coordinador.
    url_foto: 'https://example.com/foto.png',
  };
  confirmPassword: string = '';
  passwordVisible: boolean = false;
  confirmPasswordVisible: boolean = false;

  institutoList: Institucion[] = [];
  estados: Estado[] = [];

  constructor(
    private cepatService: CepatService,
    private cdr: ChangeDetectorRef,
    private coordinatorService: CoordinatorHttpService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadStates();
  }

  loadStates(): void {
    this.cepatService.getEstados().subscribe({
      next: (data) => {
        this.estados = data;
        this.cdr.detectChanges();
      },
      error: () => {
        this.estados = [];
      },
    });
  }

  onEstadoChange(): void {
    const selectedStateId = this.userModel.id_estado;
    this.userModel.id_instituto = null;
    this.institutoList = [];
    if (selectedStateId) {
      this.cepatService.getInstitucionesPorEstado(selectedStateId).subscribe({
        next: (instituciones) => {
          this.institutoList = instituciones;
          this.cdr.detectChanges();
        },
        error: () => {
          this.institutoList = [];
          this.cdr.detectChanges();
        },
      });
    }
  }

  createNewCoordinator(): void {
    const { id_estado, id_instituto, ...payload } = this.userModel;

    this.coordinatorService
      .createNewUserCoordinator(payload as CoordinatorPayload)
      .subscribe({
        next: () => {
          this.coordinadorCreated = true;
          this.cdr.detectChanges();
          this.router.navigate(['/cepat/coordinador/list']);
        },
        error: (err) => {
          this.coordinadorCreated = false;
          console.error('Error al crear el coordinador', err);
          this.cdr.detectChanges();
        },
      });
  }

  onSubmit(form: NgForm): void {
    const f = form.form;
    f.markAllAsTouched();
    if (
      f.invalid ||
      this.userModel.password !== this.confirmPassword ||
      !this.userModel.id_estado ||
      !this.userModel.id_instituto
    ) {
      return;
    }
    this.createNewCoordinator();
  }

  onCancel(): void {
    console.log('Operación cancelada');
    this.router.navigate(['/cepat/registro']);
  }
}
