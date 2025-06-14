import { ChangeDetectorRef, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { SwalComponent, SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import { Observable } from 'rxjs';
import { SweetAlertOptions } from 'sweetalert2';
import {NgbCollapse, NgbDatepicker, NgbInputDatepicker} from '@ng-bootstrap/ng-bootstrap';
import { SharedModule } from '../../../template/shared/shared.module';
import {
  CoordinatorService,
  ICoordinatorModel,
  IInstitucionModel,
  ENTIDADES_FEDERATIVAS,
  SEXO_OPTIONS,
  InstitucionService
} from '../shared-services';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-coordinator-form',
  templateUrl: './coordinator-form.component.html',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    NgbCollapse,
    NgbDatepicker,
    SharedModule,
    SweetAlert2Module,
    NgClass,
    NgbInputDatepicker
  ],
  styleUrls: ['./coordinator-form.component.scss']
})
export class CoordinatorFormComponent implements OnInit {
  isCollapsed1 = false;
  isCollapsed2 = true;
  isLoading = false;
  isEdit = false;

  coordinatorModel: ICoordinatorModel & { fecha_inicio_vigencia?: any } = {
    id: 0,
    nombre: '',
    apellidos: '',
    edad: 0,
    entidad_federativa: '',
    institucion_adscripcion: '',
    sexo: '',
    telefono: '',
    email: '',
    rfc: '',
    curp: '',
    fecha_inicio_vigencia: null
  };

  @ViewChild('noticeSwal')
  noticeSwal!: SwalComponent;

  @ViewChild('oficioAsignacion')
  oficioAsignacion: ElementRef;

  @ViewChild('myForm')
  myForm: NgForm;

  swalOptions: SweetAlertOptions = {};

  entidadesFederativas: string[] = ENTIDADES_FEDERATIVAS;
  sexoOptions: string[] = SEXO_OPTIONS;

  institucionesFiltradas: IInstitucionModel[] = [];
  selectedFile: File | null = null;

  constructor(
    private coordinatorService: CoordinatorService,
    private institucionService: InstitucionService,
    private cdr: ChangeDetectorRef,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.entidadesFederativas = ENTIDADES_FEDERATIVAS;
    this.sexoOptions = SEXO_OPTIONS;
  }

  ngOnInit(): void {
    // Verificar si estamos en modo edición
    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      if (id && id !== '0') {
        this.isEdit = true;
        this.loadCoordinator(+id);
      }
    });
  }

  loadCoordinator(id: number): void {
    this.coordinatorService.getCoordinator(id).subscribe((coordinator: ICoordinatorModel) => {
      this.coordinatorModel = { ...coordinator };
      this.onEntidadChange(); // Cargar instituciones de la entidad seleccionada
    });
  }

  onEntidadChange() {
    console.log('Entidad seleccionada:', this.coordinatorModel.entidad_federativa);
    this.coordinatorModel.institucion_adscripcion = '';

    this.institucionService.getInstitucionesByEntidad(this.coordinatorModel.entidad_federativa)
      .subscribe(instituciones => {
        this.institucionesFiltradas = instituciones;
        console.log('Instituciones filtradas:', this.institucionesFiltradas);
        this.cdr.detectChanges();
      });
  }

  onFileSelected(event: any) {
    const file = event.target.files[0];
    if (file && file.type === 'application/pdf') {
      this.selectedFile = {
        name: file.name,
        size: file.size,
        type: file.type
      } as File;
    } else if (file) {
      // Mostrar error si no es PDF
      const errorAlert: SweetAlertOptions = {
        icon: 'error',
        title: 'Error!',
        text: 'Solo se permiten archivos PDF',
      };
      this.showAlert(errorAlert);
      event.target.value = '';
    }
  }

  onSubmit(event: Event) {
    if (this.myForm && this.myForm.invalid) {
      return;
    }

    this.isLoading = true;

    const successAlert: SweetAlertOptions = {
      icon: 'success',
      title: 'Éxito!',
      text: this.coordinatorModel.id > 0 ? 'Coordinador actualizado exitosamente!' : 'Coordinador registrado exitosamente!',
    };
    const errorAlert: SweetAlertOptions = {
      icon: 'error',
      title: 'Error!',
      text: '',
    };

    const completeFn = () => {
      this.isLoading = false;
    };

    if (this.coordinatorModel.id > 0) {
      this.coordinatorService.updateCoordinator(this.coordinatorModel.id, this.coordinatorModel).subscribe({
        next: () => {
          this.showAlert(successAlert);
          // Redirigir después de mostrar la alerta
          setTimeout(() => this.router.navigate(['/administrador/coordinadores']), 1500);
        },
        error: (error) => {
          errorAlert.text = this.extractText(error.error);
          this.showAlert(errorAlert);
          this.isLoading = false;
        },
        complete: completeFn,
      });
    } else {
      this.coordinatorService.createCoordinator(this.coordinatorModel).subscribe({
        next: () => {
          this.showAlert(successAlert);
          // Redirigir después de mostrar la alerta
          setTimeout(() => this.router.navigate(['/administrador/coordinadores']), 1500);
        },
        error: (error) => {
          errorAlert.text = this.extractText(error.error);
          this.showAlert(errorAlert);
          this.isLoading = false;
        },
        complete: completeFn,
      });
    }
  }

  extractText(obj: any): string {
    var textArray: string[] = [];

    for (var key in obj) {
      if (typeof obj[key] === 'string') {
        textArray.push(obj[key]);
      } else if (typeof obj[key] === 'object') {
        textArray = textArray.concat(this.extractText(obj[key]));
      }
    }

    var uniqueTextArray = Array.from(new Set(textArray));
    var text = uniqueTextArray.join('\n');

    return text;
  }

  showAlert(swalOptions: SweetAlertOptions) {
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

  cancel() {
    this.router.navigate(['/apps/coordinators']);
  }
}
