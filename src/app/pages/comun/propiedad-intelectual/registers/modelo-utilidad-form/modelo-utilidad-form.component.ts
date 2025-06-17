import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { SwalComponent } from '@sweetalert2/ngx-sweetalert2';
import { IModUtilModel } from 'src/app/api/models/mod-util.model';
import { UtilityModelsService } from 'src/app/api/services/utility-models.service';
import { ENTIDADES_FEDERATIVAS_DATA, ENTIDADES_FEDERATIVAS_MAP } from 'src/app/pages/administrador/shared-services';
import { SweetAlertOptions } from 'sweetalert2';

@Component({
  selector: 'app-modelo-utilidad-form',
  templateUrl: './modelo-utilidad-form.component.html',
})
export class ModeloUtilidadFormComponent implements OnInit {
  isCollapsed1 = false;
  isCollapsed2 = true;
  isLoading = false;
  selectedFiles: File[] = [];

  modUtilModel: IModUtilModel = {
    id: 0,
    solicitudId: '',
    nombreModUtil: '',
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
    private service: UtilityModelsService,
    private router: Router,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.generarSolicitudId();
    this.establecerFechaActual();
  }

  private generarSolicitudId(): void {
    const fecha = new Date();
    const timestamp = fecha.getTime().toString().slice(-6);
    this.modUtilModel.solicitudId = `MU-${timestamp}`;
  }

  private establecerFechaActual(): void {
    const fecha = new Date();
    this.modUtilModel.fechaSolicitud = fecha.toISOString().split('T')[0];
  }

  onEstadoChange(estadoId: number): void {
    this.estadoSeleccionado = estadoId;
    this.institucionSeleccionada = null;
    this.modUtilModel.institucion = '';
    
    if (estadoId && ENTIDADES_FEDERATIVAS_MAP[estadoId]) {
      this.institucionesFiltradas = ENTIDADES_FEDERATIVAS_MAP[estadoId];
    } else {
      this.institucionesFiltradas = [];
    }
  }

  onInstitucionChange(institucionId: number): void {
    this.institucionSeleccionada = institucionId;
    if (institucionId && this.institucionesFiltradas.length > 0) {
      const institucion = this.institucionesFiltradas.find(inst => Number(inst.id) === Number(institucionId));
      if (institucion) {
        this.modUtilModel.institucion = institucion.nombre;
      }
    } else {
      this.modUtilModel.institucion = '';
    }
  }

  onFileSelected(event: any): void {
    const files = Array.from(event.target.files) as File[];
    
    for (let file of files) {
      if (file.type === 'application/pdf') {
        if (!this.selectedFiles.find(f => f.name === file.name)) {
          this.selectedFiles.push(file);
        }
      } else {
        const errorAlert: SweetAlertOptions = {
          icon: 'error',
          title: 'Archivo no válido',
          text: 'Solo se permiten archivos PDF',
        };
        this.showAlert(errorAlert);
      }
    }
    event.target.value = '';
  }

  removeFile(index: number): void {
    this.selectedFiles.splice(index, 1);
  }

  onSubmit(event: Event): void {
    event.preventDefault();
    
    if (this.myForm.valid) {
      this.isLoading = true;
      
      this.modUtilModel.documentos = this.selectedFiles.map(file => file.name);
      
      this.service.createModUtil(this.modUtilModel).subscribe({
        next: (response) => {
          this.isLoading = false;
          const successAlert: SweetAlertOptions = {
            icon: 'success',
            title: '¡Registrado exitosamente!',
            text: 'El modelo de utilidad ha sido registrado correctamente.',
          };
          this.showAlert(successAlert);
          
          setTimeout(() => {
            this.router.navigate(['/coordinador/propiedades/modelo-utilidad']);
          }, 2000);
        },
        error: (error) => {
          this.isLoading = false;
          const errorAlert: SweetAlertOptions = {
            icon: 'error',
            title: 'Error al registrar',
            text: 'Ocurrió un error al registrar el modelo de utilidad. Inténtelo nuevamente.',
          };
          this.showAlert(errorAlert);
        }
      });
    } else {
      this.marcarCamposComoTocados();
    }
  }

  private marcarCamposComoTocados(): void {
    Object.keys(this.myForm.controls).forEach(key => {
      this.myForm.controls[key].markAsTouched();
    });
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

  resetForm(): void {
    this.modUtilModel = {
      id: 0,
      solicitudId: '',
      nombreModUtil: '',
      solicitante: '',
      fechaSolicitud: '',
      estatus: 'En trámite',
      descripcion: '',
      institucion: '',
      correo: '',
      documentos: []
    };
    
    this.selectedFiles = [];
    this.estadoSeleccionado = null;
    this.institucionSeleccionada = null;
    this.institucionesFiltradas = [];
    this.myForm.resetForm();
    this.generarSolicitudId();
    this.establecerFechaActual();
  }

  toggleCollapse(section: number): void {
    if (section === 1) {
      this.isCollapsed1 = !this.isCollapsed1;
    } else if (section === 2) {
      this.isCollapsed2 = !this.isCollapsed2;
    }
  }

  getFileSize(bytes: number): string {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  }

  navigateBack(): void {
    this.router.navigate(['/coordinador/propiedades/modelo-utilidad']);
  }
}