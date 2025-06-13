import { ChangeDetectorRef, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { SwalComponent, SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import { Observable } from 'rxjs';
import { SweetAlertOptions } from 'sweetalert2';
import { NgbCollapse } from '@ng-bootstrap/ng-bootstrap';
import {
  ApplicantService,
  IApplicantModel,
  IInstitucionModel,
  ENTIDADES_FEDERATIVAS,
  SEXO_OPTIONS,
  DEPARTAMENTOS,
  PROGRAMAS_EDUCATIVOS,
  IProgramaEducativo,
  ProgramaEducativoService,
  InstitucionService
} from '../shared-services';
import { NgClass } from '@angular/common';
import { SharedModule } from '../../../template/shared/shared.module';

@Component({
  selector: 'app-applicant-form',
  templateUrl: './applicant-form.component.html',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    NgbCollapse,
    SharedModule,
    SweetAlert2Module,
    NgClass
  ],
  styleUrls: ['./applicant-form.component.scss']
})
export class ApplicantFormComponent implements OnInit {
  isCollapsed1 = false;
  isCollapsed2 = true;
  isLoading = false;
  isEdit = false;

  applicantModel: IApplicantModel = {
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
    departamento:'',
    programa_educativo:'',
  };

  @ViewChild('noticeSwal')
  noticeSwal!: SwalComponent;

  @ViewChild('myForm')
  myForm: NgForm;

  swalOptions: SweetAlertOptions = {};

  entidadesFederativas: string[] = ENTIDADES_FEDERATIVAS;
  sexoOptions: string[] = SEXO_OPTIONS;
  departamentos: string[] = DEPARTAMENTOS;
  programasEducativosFiltrados: IProgramaEducativo[] = [];

  institucionesFiltradas: IInstitucionModel[] = [];

  constructor(
    private applicantService: ApplicantService,
    private institucionService: InstitucionService,
    private programaEducativoService: ProgramaEducativoService,
    private cdr: ChangeDetectorRef,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.entidadesFederativas = ENTIDADES_FEDERATIVAS;
    this.sexoOptions = SEXO_OPTIONS;
    this.departamentos = DEPARTAMENTOS;
  }

  ngOnInit(): void {
    // Verificar si estamos en modo edición
    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      if (id && id !== '0') {
        this.isEdit = true;
        this.loadApplicant(+id);
      }
    });
  }

  loadApplicant(id: number): void {
    this.applicantService.getApplicant(id).subscribe((applicant: IApplicantModel) => {
      this.applicantModel = { ...applicant };
      this.onEntidadChange(); // Cargar instituciones de la entidad seleccionada
    });
  }

  onEntidadChange() {
    console.log('Entidad seleccionada:', this.applicantModel.entidad_federativa);
    this.applicantModel.institucion_adscripcion = '';

    this.institucionService.getInstitucionesByEntidad(this.applicantModel.entidad_federativa)
      .subscribe(instituciones => {
        this.institucionesFiltradas = instituciones;
        console.log('Instituciones filtradas:', this.institucionesFiltradas);
        this.cdr.detectChanges();
      });
  }

  onDepartamentoChange() {
    console.log('Departamento seleccionado:', this.applicantModel.departamento);
    this.applicantModel.programa_educativo = '';

    this.programaEducativoService.getProgramasByDepartamento(this.applicantModel.departamento)
      .subscribe(programas => {
        this.programasEducativosFiltrados = programas;
        console.log('Programas filtrados:', this.programasEducativosFiltrados);
        this.cdr.detectChanges();
      });
  }

  onSubmit(event: Event) {
    if (this.myForm && this.myForm.invalid) {
      return;
    }

    this.isLoading = true;

    const successAlert: SweetAlertOptions = {
      icon: 'success',
      title: 'Éxito!',
      text: this.applicantModel.id > 0 ? 'Solicitante actualizado exitosamente!' : 'Solicitante registrado exitosamente!',
    };
    const errorAlert: SweetAlertOptions = {
      icon: 'error',
      title: 'Error!',
      text: '',
    };

    const completeFn = () => {
      this.isLoading = false;
    };

    if (this.applicantModel.id > 0) {
      this.applicantService.updateApplicant(this.applicantModel.id, this.applicantModel).subscribe({
        next: () => {
          this.showAlert(successAlert);
          // Redirigir después de mostrar la alerta
          setTimeout(() => this.router.navigate(['/administrador/solicitantes']), 1500);
        },
        error: (error) => {
          errorAlert.text = this.extractText(error.error);
          this.showAlert(errorAlert);
          this.isLoading = false;
        },
        complete: completeFn,
      });
    } else {
      this.applicantService.createApplicant(this.applicantModel).subscribe({
        next: () => {
          this.showAlert(successAlert);
          // Redirigir después de mostrar la alerta
          setTimeout(() => this.router.navigate(['/administrador/solicitantes']), 1500);
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
    this.router.navigate(['/apps/solicitantes']);
  }
}
