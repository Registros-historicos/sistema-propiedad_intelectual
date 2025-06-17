import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { SwalComponent } from '@sweetalert2/ngx-sweetalert2';
import { IPatentModel } from 'src/app/api/models/patent.model';
import { PatentsService } from 'src/app/api/services/patents.service';
import { ENTIDADES_FEDERATIVAS_DATA, ENTIDADES_FEDERATIVAS_MAP } from 'src/app/pages/administrador/shared-services';
import { SweetAlertOptions } from 'sweetalert2';

@Component({
  selector: 'app-patente-form',
  templateUrl: './patente-form.component.html',
})
export class PatenteFormComponent implements OnInit {
  isCollapsed1 = false;
  isCollapsed2 = true;
  isLoading = false;
  selectedFiles: File[] = [];

  patenteModel: IPatentModel = {
    id: 0,
    solicitudId: '',
    nombrePatente: '',
    solicitante: '',
    fechaSolicitud: '',
    estatus: 'En trámite',
    descripcion: '',
    institucion: '',
    correo: '',
    documentos: []
  };

  entidadesFederativas = ENTIDADES_FEDERATIVAS_DATA;
  institucionesFiltradas: any[] = [];
  estadoSeleccionado: number | null = null;
  institucionSeleccionada: number | null = null;

  @ViewChild('noticeSwal')
  noticeSwal!: SwalComponent;

  @ViewChild('myForm')
  myForm!: NgForm;

  swalOptions: SweetAlertOptions = {};

  constructor(
    private service: PatentsService,
    private router: Router,
    private cdr: ChangeDetectorRef
  ) {
    const today = new Date();
    this.patenteModel.fechaSolicitud = today.toISOString().split('T')[0];
    this.patenteModel.solicitudId = this.generateSolicitudId();
  }

  ngOnInit(): void {}

  private generateSolicitudId(): string {
    const today = new Date();
    const year = today.getFullYear();
    const random = Math.floor(Math.random() * 1000).toString().padStart(3, '0');
    return `PAT-${year}-${random}`;
  }

  onEstadoChange(estadoId: any): void {
    this.estadoSeleccionado = Number(estadoId);
    this.institucionSeleccionada = null;
    this.patenteModel.institucion = '';

    if (estadoId && ENTIDADES_FEDERATIVAS_MAP[estadoId]) {
      this.institucionesFiltradas = ENTIDADES_FEDERATIVAS_MAP[estadoId];
    } else {
      this.institucionesFiltradas = [];
    }
  }

  onInstitucionChange(institucionId: any): void {
    this.institucionSeleccionada = Number(institucionId);
    if (institucionId) {
      const institucion = this.institucionesFiltradas.find(inst => inst.id === Number(institucionId));
      if (institucion) {
        this.patenteModel.institucion = institucion.nombre;
      }
    } else {
      this.patenteModel.institucion = '';
    }
  }

  onFileSelected(event: any): void {
    const files = event.target.files;
    
    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      
      if (file.type === 'application/pdf') {
        if (file.size <= 10 * 1024 * 1024) {
          this.selectedFiles.push(file);
          
          if (!this.patenteModel.documentos) {
            this.patenteModel.documentos = [];
          }
          this.patenteModel.documentos.push(file.name);
        } else {
          this.showAlert({
            icon: 'error',
            title: 'Error!',
            text: `El archivo ${file.name} supera el tamaño máximo permitido de 10MB.`
          });
        }
      } else {
        this.showAlert({
          icon: 'error',
          title: 'Error!',
          text: `El archivo ${file.name} no es un PDF válido. Solo se permiten archivos PDF.`
        });
      }
    }

    event.target.value = '';
  }

  removeFile(index: number): void {
    this.selectedFiles.splice(index, 1);
    if (this.patenteModel.documentos) {
      this.patenteModel.documentos.splice(index, 1);
    }
  }

  onSubmit(event: Event): void {
    event.preventDefault();

    if (this.myForm && this.myForm.invalid) {
      this.markFormGroupTouched();
      return;
    }

    if (!this.estadoSeleccionado || !this.institucionSeleccionada) {
      this.showAlert({
        icon: 'error',
        title: 'Error!',
        text: 'Debe seleccionar una entidad federativa e institución.'
      });
      return;
    }

    this.isLoading = true;

    this.patenteModel.estatus = 'En trámite';

    this.service.createPatent(this.patenteModel).subscribe({
      next: (response) => {
        this.isLoading = false;
        this.showAlert({
          icon: 'success',
          title: 'Éxito!',
          text: 'Patente registrada exitosamente!'
        });

        setTimeout(() => {
          this.router.navigate(['/coordinador/propiedades/patente']);
        }, 2000);
      },
      error: (error) => {
        this.isLoading = false;
        console.error('Error al registrar patente:', error);
        this.showAlert({
          icon: 'error',
          title: 'Error!',
          text: 'Ocurrió un error al procesar la solicitud. Intente nuevamente.'
        });
      }
    });
  }

  private markFormGroupTouched(): void {
    Object.keys(this.myForm.controls).forEach(key => {
      const control = this.myForm.controls[key];
      control.markAsTouched();
    });
  }

  onCancel(): void {
    this.router.navigate(['/coordinador/propiedades/patente']);
  }

  showAlert(swalOptions: SweetAlertOptions): void {
    let style = swalOptions.icon?.toString() || 'success';
    if (swalOptions.icon === 'error') {
      style = 'danger';
    }
    this.swalOptions = Object.assign({
      buttonsStyling: false,
      confirmButtonText: "Ok, entendido!",
      customClass: {
        confirmButton: "btn btn-" + style
      }
    }, swalOptions);
    this.cdr.detectChanges();
    this.noticeSwal.fire();
  }
}