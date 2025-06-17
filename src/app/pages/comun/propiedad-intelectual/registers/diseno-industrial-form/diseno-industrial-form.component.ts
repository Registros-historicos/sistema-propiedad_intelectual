import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { SwalComponent } from '@sweetalert2/ngx-sweetalert2';
import { IDisIndModel } from 'src/app/api/models/dis-ind.model';
import { IndustrialDesignsService } from 'src/app/api/services/industrial-design.service';
import { ENTIDADES_FEDERATIVAS_DATA, ENTIDADES_FEDERATIVAS_MAP } from 'src/app/pages/administrador/shared-services';
import { SweetAlertOptions } from 'sweetalert2';

@Component({
  selector: 'app-diseno-industrial-form',
  templateUrl: './diseno-industrial-form.component.html',
})
export class DisenoIndustrialFormComponent implements OnInit {
  isCollapsed1 = false;
  isCollapsed2 = true;
  isLoading = false;
  selectedFiles: File[] = [];

  disIndModel: IDisIndModel = {
    id: 0,
    solicitudId: '',
    nombreDisInd: '',
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
    private service: IndustrialDesignsService,
    private cdr: ChangeDetectorRef,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.generateSolicitudId();
    this.setCurrentDate();
  }

  generateSolicitudId(): void {
    const timestamp = Date.now();
    const randomNum = Math.floor(Math.random() * 1000);
    this.disIndModel.solicitudId = `DI-${timestamp}-${randomNum}`;
  }

  setCurrentDate(): void {
    const today = new Date();
    this.disIndModel.fechaSolicitud = today.toISOString().split('T')[0];
  }

  onEstadoChange(estadoId: number): void {
    this.estadoSeleccionado = estadoId;
    this.institucionesFiltradas = ENTIDADES_FEDERATIVAS_MAP[estadoId] || [];
    this.institucionSeleccionada = null;
    this.disIndModel.institucion = '';
  }

  onInstitucionChange(institucionId: number): void {
    this.institucionSeleccionada = institucionId;
    const institucion = this.institucionesFiltradas.find(inst => Number(inst.id) === Number(institucionId));
    if (institucion) {
      this.disIndModel.institucion = institucion.nombre;
    }
  }

  onFileSelected(event: any): void {
    const files = Array.from(event.target.files) as File[];
    
    for (const file of files) {
      if (file.type === 'application/pdf') {
        if (!this.selectedFiles.some(f => f.name === file.name)) {
          this.selectedFiles.push(file);
        }
      } else {
        this.showAlert({
          icon: 'error',
          title: 'Error de archivo',
          text: `El archivo ${file.name} no es un PDF válido. Solo se permiten archivos PDF.`
        });
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
      
      this.disIndModel.documentos = this.selectedFiles.map(file => file.name);
      
      this.service.createIndustrialDesign(this.disIndModel).subscribe({
        next: (response) => {
          this.isLoading = false;
          this.showAlert({
            icon: 'success',
            title: '¡Éxito!',
            text: 'El diseño industrial se ha registrado correctamente. Será redirigido a la tabla de registros.'
          });
          
          setTimeout(() => {
            this.router.navigate(['/coordinador/propiedades/diseno-industrial']);
          }, 2000);
        },
        error: (error) => {
          this.isLoading = false;
          this.showAlert({
            icon: 'error',
            title: 'Error',
            text: 'Ocurrió un error al registrar el diseño industrial. Intente nuevamente.'
          });
        }
      });
    } else {
      let errorMessage = 'Por favor complete todos los campos obligatorios.';
      
      if (this.disIndModel.correo && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(this.disIndModel.correo)) {
        errorMessage = 'Por favor ingrese un correo electrónico válido.';
      } else if (this.selectedFiles.length === 0) {
        errorMessage = 'Debe adjuntar al menos un documento PDF.';
      }
      
      this.showAlert({
        icon: 'warning',
        title: 'Formulario incompleto',
        text: errorMessage
      });
    }
  }

  resetForm(): void {
    this.disIndModel = {
      id: 0,
      solicitudId: '',
      nombreDisInd: '',
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
    
    this.generateSolicitudId();
    this.setCurrentDate();
    
    this.myForm.resetForm();
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

  formatFileSize(bytes: number): string {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  }
}