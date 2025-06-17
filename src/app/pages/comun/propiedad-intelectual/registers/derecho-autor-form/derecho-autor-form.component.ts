import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { SwalComponent } from '@sweetalert2/ngx-sweetalert2';
import { ICopyrightModel } from 'src/app/api/models/copyrigth.model';
import { CopyrightsService } from 'src/app/api/services/copyright.service';
import { ENTIDADES_FEDERATIVAS_DATA, ENTIDADES_FEDERATIVAS_MAP } from 'src/app/pages/administrador/shared-services';
import { SweetAlertOptions } from 'sweetalert2';

@Component({
  selector: 'app-derecho-autor',
  templateUrl: './derecho-autor-form.component.html',
})
export class DerechoAutorFormComponent implements OnInit {
  isCollapsed1 = false;
  isCollapsed2 = true;
  isLoading = false;
  selectedFiles: File[] = [];

  copyrightModel: ICopyrightModel = {
    id: 0,
    solicitudId: '',
    nombreObra: '',
    solicitante: '',
    autor: '',
    fechaSolicitud: '',
    estado: 'En trámite',
    descripcion: '',
    institucion: '',
    correo: '',
    documentos: []
  };

  @ViewChild('noticeSwal')
  noticeSwal!: SwalComponent;

  @ViewChild('myForm')
  myForm!: NgForm;

  swalOptions: SweetAlertOptions = {};

  entidadesFederativas = ENTIDADES_FEDERATIVAS_DATA;
  estadoSeleccionado: number | null = null;
  institucionSeleccionada: number | null = null;
  institucionesFiltradas: any[] = [];

  constructor(
    private service: CopyrightsService,
    private cdr: ChangeDetectorRef,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.generateSolicitudId();
    this.setDefaultDate();
    this.copyrightModel.estado = 'En trámite';
  }

  generateSolicitudId(): void {
    const year = new Date().getFullYear();
    const random = Math.floor(Math.random() * 999999).toString().padStart(6, '0');
    this.copyrightModel.solicitudId = `DA-${year}-${random}`;
  }

  setDefaultDate(): void {
    const today = new Date();
    const day = today.getDate().toString().padStart(2, '0');
    const month = (today.getMonth() + 1).toString().padStart(2, '0');
    const year = today.getFullYear();
    this.copyrightModel.fechaSolicitud = `${year}-${month}-${day}`;
  }

  onEstadoChange(): void {
    this.institucionSeleccionada = null;
    this.copyrightModel.institucion = '';

    if (this.estadoSeleccionado && ENTIDADES_FEDERATIVAS_MAP[this.estadoSeleccionado]) {
      this.institucionesFiltradas = ENTIDADES_FEDERATIVAS_MAP[this.estadoSeleccionado];
    } else {
      this.institucionesFiltradas = [];
    }
    this.cdr.detectChanges();
  }

  onInstitucionChange(): void {
    if (this.institucionSeleccionada && this.institucionesFiltradas.length > 0) {
      const institucionSeleccionada = this.institucionesFiltradas.find(inst => Number(inst.id) === Number(this.institucionSeleccionada));
      if (institucionSeleccionada) {
        this.copyrightModel.institucion = institucionSeleccionada.nombre;
      }
    } else {
      this.copyrightModel.institucion = '';
    }
  }

  onFileSelected(event: any): void {
    const files = Array.from(event.target.files) as File[];

    for (const file of files) {
      if (file.type === 'application/pdf') {
        if (file.size <= 10485760) {
          this.selectedFiles.push(file);
          if (!this.copyrightModel.documentos) {
            this.copyrightModel.documentos = [];
          }
          this.copyrightModel.documentos.push(file.name);
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
    if (this.copyrightModel.documentos) {
      this.copyrightModel.documentos.splice(index, 1);
    }
  }

  onSubmit(event: Event): void {
    event.preventDefault();

    if (this.myForm && this.myForm.invalid) {
      this.markFormGroupTouched();
      return;
    }

    this.isLoading = true;

    if (!this.copyrightModel.autor || this.copyrightModel.autor.trim() === '') {
      this.copyrightModel.autor = this.copyrightModel.solicitante;
    }

    this.copyrightModel.estado = 'En trámite';

    this.service.createCopyright(this.copyrightModel).subscribe({
      next: (response) => {
        this.isLoading = false;
        this.showAlert({
          icon: 'success',
          title: 'Éxito!',
          text: 'Derecho de autor registrado exitosamente!'
        });

        setTimeout(() => {
          this.router.navigate(['/coordinador/propiedades/derecho-autor']);
        }, 2000);
      },
      error: (error) => {
        this.isLoading = false;
        console.error('Error al registrar derecho de autor:', error);
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
    this.router.navigate(['/coordinador/propiedades/derecho-autor']);
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