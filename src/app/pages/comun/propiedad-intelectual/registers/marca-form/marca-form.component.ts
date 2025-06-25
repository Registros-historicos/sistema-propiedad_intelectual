import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { SwalComponent } from '@sweetalert2/ngx-sweetalert2';
import { DatosMarca, ProductoServicio } from 'src/app/api/models/marca.model';
import { TrademarksService } from 'src/app/api/services/trademarks.service';
import { ENTIDADES_FEDERATIVAS_DATA, ENTIDADES_FEDERATIVAS_MAP } from 'src/app/pages/administrador/shared-services';
import { SweetAlertOptions } from 'sweetalert2';

@Component({
  selector: 'app-marca-form',
  templateUrl: './marca-form.component.html',
})
export class MarcaFormComponent implements OnInit {
  isCollapsed1 = false;
  isCollapsed2 = true;
  isLoading = false;
  selectedFiles: File[] = [];

  marcaModel: DatosMarca = {
    denominacion: '',
    expediente: 0,
    registro: 0,
    fechaPresentacion: '',
    fechaConcesion: '',
    fechaTerminacion: '',
    tipoSolicitud: '',
    inicioUso: '',
    marca: '',
    productosServicios: [],
    titular: '',
    estatus: 'Registrada'
  };

  tiposSolicitud: string[] = [
    'SOLICITUD DE REGISTRO',
    'PUBLICACIÓN DE NOMBRE COMERCIAL',
    'RENOVACIÓN DE REGISTRO',
    'MODIFICACIÓN DE REGISTRO'
  ];

  nuevoProductoServicio: ProductoServicio = {
    clase: 0,
    descripcion: ''
  };

  @ViewChild('noticeSwal')
  noticeSwal!: SwalComponent;

  @ViewChild('myForm')
  myForm!: NgForm;

  swalOptions: SweetAlertOptions = {
    title: '¡Registro Exitoso!',
    text: 'La marca ha sido registrada correctamente.',
    icon: 'success',
    showCancelButton: false,
    confirmButtonText: 'Continuar'
  };

  entidadesFederativas = ENTIDADES_FEDERATIVAS_DATA;
  instituciones: any[] = [];

  constructor(
    private router: Router,
    private cdr: ChangeDetectorRef,
    private trademarksService: TrademarksService
  ) { }

  ngOnInit(): void {
    this.generateSolicitudId();
    this.setCurrentDate();
    this.initializeOptionalFields();
  }

  private initializeOptionalFields(): void {
    if (!this.marcaModel.inicioUso) this.marcaModel.inicioUso = '';
    if (!this.marcaModel.fechaConcesion) this.marcaModel.fechaConcesion = '';
    if (!this.marcaModel.fechaTerminacion) this.marcaModel.fechaTerminacion = '';
    if (!this.marcaModel.marca) this.marcaModel.marca = '';
    if (this.marcaModel.registro === undefined || this.marcaModel.registro === null) {
      this.marcaModel.registro = 0;
    }
  }

  private generateSolicitudId(): void {
    const timestamp = Date.now();
    const random = Math.floor(Math.random() * 1000);
    this.marcaModel.expediente = parseInt(`${timestamp}${random}`.slice(-8));
  }

  private setCurrentDate(): void {
    const today = new Date();
    this.marcaModel.fechaPresentacion = today.toISOString().split('T')[0];
  }

  onSubmit(event: Event): void {
    event.preventDefault();

    console.log('Estado del formulario:', this.myForm.valid);
    console.log('Valores del modelo:', this.marcaModel);

    if (this.myForm.invalid) {
      console.log('Formulario inválido. Errores:');
      this.debugFormErrors();
      this.markFormGroupTouched();
      return;
    }

    if (!this.validateRequiredFields()) {
      console.log('Validación manual fallida');
      this.markFormGroupTouched();
      return;
    }

    this.isLoading = true;

    setTimeout(() => {
      this.trademarksService.create(this.marcaModel).subscribe({
        next: (response) => {
          this.isLoading = false;
          this.showSuccessAlert();
        },
        error: (error) => {
          this.isLoading = false;
          console.error('Error al registrar la marca:', error);
          this.showErrorAlert();
        }
      });
    }, 1000);
  }

  private validateRequiredFields(): boolean {
    const denominacionValid = this.marcaModel.denominacion &&
      this.marcaModel.denominacion.trim().length >= 2 &&
      this.marcaModel.denominacion.trim().length <= 100;

    const titularValid = this.marcaModel.titular &&
      this.marcaModel.titular.trim().length >= 3 &&
      this.marcaModel.titular.trim().length <= 150;

    const tipoSolicitudValid = this.marcaModel.tipoSolicitud &&
      this.marcaModel.tipoSolicitud.trim().length > 0;

    console.log('Validaciones manuales:');
    console.log('Denominación válida:', denominacionValid, this.marcaModel.denominacion);
    console.log('Titular válido:', titularValid, this.marcaModel.titular);
    console.log('Tipo solicitud válido:', tipoSolicitudValid, this.marcaModel.tipoSolicitud);

    if (denominacionValid && titularValid && tipoSolicitudValid) {
      return true
    } else {
      return false
    }
  }

  private debugFormErrors(): void {
    Object.keys(this.myForm.controls).forEach(key => {
      const control = this.myForm.controls[key];
      if (control.invalid) {
        console.log(`Campo ${key}:`, control.errors);
      }
    });
  }

  private markFormGroupTouched(): void {
    Object.keys(this.myForm.controls).forEach(key => {
      const control = this.myForm.controls[key];
      control.markAsTouched();
    });
    this.cdr.detectChanges();
  }

  private showSuccessAlert(): void {
    this.noticeSwal.fire().then((result) => {
      if (result.isConfirmed) {
        this.router.navigate(['/administrador/propiedades/marca']);
      }
    });
  }

  private showErrorAlert(): void {
    const errorSwal: SweetAlertOptions = {
      title: 'Error',
      text: 'Ocurrió un error al registrar la marca. Por favor, inténtelo nuevamente.',
      icon: 'error',
      showCancelButton: false,
      confirmButtonText: 'Aceptar'
    };

    this.noticeSwal.swalOptions = errorSwal;
    this.noticeSwal.fire();
  }

  onFileSelected(event: any): void {
    const files = event.target.files;
    if (files && files.length > 0) {
      this.selectedFiles = Array.from(files);
    }
  }

  removeFile(index: number): void {
    this.selectedFiles.splice(index, 1);
  }

  agregarProductoServicio(): void {
    if (this.nuevoProductoServicio.clase > 0 && this.nuevoProductoServicio.descripcion.trim()) {
      this.marcaModel.productosServicios.push({
        clase: this.nuevoProductoServicio.clase,
        descripcion: this.nuevoProductoServicio.descripcion
      });

      this.nuevoProductoServicio = {
        clase: 0,
        descripcion: ''
      };
    }
  }

  removerProductoServicio(index: number): void {
    this.marcaModel.productosServicios.splice(index, 1);
  }

  onEntidadChange(entidadId: string): void {
    const entidadIdNumber = parseInt(entidadId);
    this.instituciones = ENTIDADES_FEDERATIVAS_MAP[entidadIdNumber] || [];
  }

  onCancel(): void {
    this.router.navigate(['/administrador/propiedades/marca']);
  }
}