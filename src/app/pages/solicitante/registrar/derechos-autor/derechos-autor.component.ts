import {
  ChangeDetectorRef,
  Component,
  ElementRef,
  ViewChild,
} from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { SwalComponent } from '@sweetalert2/ngx-sweetalert2';
import { ICopyrightModel } from 'src/app/api/models/copyrigth.model';
import { CopyrightsService } from 'src/app/api/services/copyright.service';
import {
  ENTIDADES_FEDERATIVAS_DATA,
  ENTIDADES_FEDERATIVAS_MAP,
} from 'src/app/pages/administrador/shared-services';
import { SweetAlertOptions } from 'sweetalert2';

@Component({
  selector: 'app-derechos-autor',
  templateUrl: './derechos-autor.component.html',
  styleUrls: ['./derechos-autor.component.scss'],
})
export class DerechosAutorComponent {
  isCollapsed1 = false;
  isCollapsed2 = true;
  isCollapsed3 = true;
  isCollapsed4 = true;
  isCollapsed5 = true;
  isLoading = false;

  allSelectedFiles: any[] = [];

  tipoEjemplar = {
    codigoFuente: false,
    urlObra: false,
    sintesisObra: false,
  };

  copyrightModel: ICopyrightModel & any = {
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
    documentos: [],
    modalidadSolicitud: '',
    nacionalidad: '',
    celular: '',
    domicilio: '',
    curpRfc: '',
    rama: '',
    esDerivada: 'no',
    tipoDerivada: '',
    datosObraPrimigenia: '',
    urlObra: '',
    sintesisObra: '',
    declaracionOriginalidad: false,
    declaracionVeracidad: false,
    declaracionTitularidad: false,
    tipoSolicitud: 'autor',
    titularEsAutor: 'si',
    titular: {},
    representante: {},
    gestor: {},
    documentosCheckbox: {},
    declaracion: false,
    dadoConocer: 'no',
    tipoObra: 'primigenia',
    datosObraDerivada: {
      tipoDerivada: '',
      obrasPrimigenias: [],
    },
    rpda01a1Status: 'noEntregada',
    cp: '',
    calle: '',
    numExterior: '',
    numInterior: '',
    colonia: '',
    municipio: '',
    pais: '',
  };

  formGeneralError: string | null = null;
  rfcError: string | null = null;
  nombresError: string | null = null;
  primerApellidoError: string | null = null;
  nacionalidadError: string | null = null;
  correoError: string | null = null;
  celularError: string | null = null;

  entidadesFederativas = ENTIDADES_FEDERATIVAS_DATA;
  institucionesFiltradas: any[] = [];
  estadoSeleccionado: number | null = null;
  institucionSeleccionada: number | null = null;

  @ViewChild('myForm') myForm!: NgForm;
  @ViewChild('rfcInput') rfcInput!: ElementRef;
  @ViewChild('nombresInput') nombresInput!: ElementRef;
  @ViewChild('primerApellidoInput') primerApellidoInput!: ElementRef;
  @ViewChild('nacionalidadInput') nacionalidadInput!: ElementRef;
  @ViewChild('correoInput') correoInput!: ElementRef;
  @ViewChild('celularInput') celularInput!: ElementRef;

  swalOptions: SweetAlertOptions = {};

  constructor(
    private service: CopyrightsService,
    private router: Router,
    private cdr: ChangeDetectorRef,
    private translate: TranslateService
  ) {
    const today = new Date();
    this.copyrightModel.fechaSolicitud = today.toISOString().split('T')[0];
    this.copyrightModel.solicitudId = this.generateSolicitudId();
  }

  ngOnInit(): void {
    this.copyrightModel.estado = 'En trámite';
  }

  private generateSolicitudId(): string {
    const today = new Date();
    const year = today.getFullYear();
    const random = Math.floor(Math.random() * 1000)
      .toString()
      .padStart(3, '0');
    return `DA-${year}-${random}`;
  }

  onEstadoChange(estadoId: any): void {
    this.estadoSeleccionado = Number(estadoId);
    this.institucionSeleccionada = null;
    this.copyrightModel.institucion = '';
    if (estadoId && ENTIDADES_FEDERATIVAS_MAP[estadoId]) {
      this.institucionesFiltradas = ENTIDADES_FEDERATIVAS_MAP[estadoId];
    } else {
      this.institucionesFiltradas = [];
    }
  }

  onInstitucionChange(institucionId: any): void {
    this.institucionSeleccionada = Number(institucionId);
    if (institucionId) {
      const institucion = this.institucionesFiltradas.find(
        (inst) => inst.id === Number(institucionId)
      );
      if (institucion) {
        this.copyrightModel.institucion = institucion.nombre;
      }
    } else {
      this.copyrightModel.institucion = '';
    }
  }

  // Validaciones individuales
  private validateRFC(value: string): { isValid: boolean; error?: string } {
    if (!value || value.trim().length === 0)
      return { isValid: false, error: 'El RFC es obligatorio.' };
    // Puedes agregar validación de formato aquí
    return { isValid: true };
  }
  onRfcChange(ev: any): void {
    const value = ev.target.value;
    const validation = this.validateRFC(value);
    this.rfcError = validation.isValid ? null : validation.error || null;
  }

  private validateNombres(value: string): { isValid: boolean; error?: string } {
    if (!value || value.trim().length === 0)
      return { isValid: false, error: 'El nombre es obligatorio.' };
    if (value.length < 2)
      return { isValid: false, error: 'El nombre es muy corto.' };
    return { isValid: true };
  }
  onNombresChange(ev: any): void {
    const value = ev.target.value;
    const validation = this.validateNombres(value);
    this.nombresError = validation.isValid ? null : validation.error || null;
  }

  private validatePrimerApellido(value: string): {
    isValid: boolean;
    error?: string;
  } {
    if (!value || value.trim().length === 0)
      return { isValid: false, error: 'El primer apellido es obligatorio.' };
    return { isValid: true };
  }
  onPrimerApellidoChange(ev: any): void {
    const value = ev.target.value;
    const validation = this.validatePrimerApellido(value);
    this.primerApellidoError = validation.isValid
      ? null
      : validation.error || null;
  }

  private validateNacionalidad(value: string): {
    isValid: boolean;
    error?: string;
  } {
    if (!value || value.trim().length === 0)
      return { isValid: false, error: 'La nacionalidad es obligatoria.' };
    return { isValid: true };
  }
  onNacionalidadChange(ev: any): void {
    const value = ev.target.value;
    const validation = this.validateNacionalidad(value);
    this.nacionalidadError = validation.isValid
      ? null
      : validation.error || null;
  }

  private validateCorreo(value: string): { isValid: boolean; error?: string } {
    if (!value || value.trim().length === 0)
      return { isValid: false, error: 'El correo es obligatorio.' };
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value))
      return { isValid: false, error: 'Correo inválido.' };
    return { isValid: true };
  }
  onCorreoChange(ev: any): void {
    const value = ev.target.value;
    const validation = this.validateCorreo(value);
    this.correoError = validation.isValid ? null : validation.error || null;
  }

  private validateCelular(value: string): { isValid: boolean; error?: string } {
    if (!value || value.trim().length === 0)
      return { isValid: false, error: 'El celular es obligatorio.' };
    if (!/^\d{10}$/.test(value))
      return { isValid: false, error: 'El celular debe tener 10 dígitos.' };
    return { isValid: true };
  }
  onCelularChange(ev: any): void {
    const value = ev.target.value;
    const validation = this.validateCelular(value);
    this.celularError = validation.isValid ? null : validation.error || null;
  }

  onSubmit(event: Event): void {
    event.preventDefault();

    // Validar campos individuales
    this.onRfcChange({ target: { value: this.copyrightModel.rfc } });
    this.onNombresChange({ target: { value: this.copyrightModel.nombres } });
    this.onPrimerApellidoChange({
      target: { value: this.copyrightModel.primerApellido },
    });
    this.onNacionalidadChange({
      target: { value: this.copyrightModel.nacionalidad },
    });
    this.onCorreoChange({ target: { value: this.copyrightModel.correo } });
    this.onCelularChange({ target: { value: this.copyrightModel.celular } });

    if (
      this.rfcError ||
      this.nombresError ||
      this.primerApellidoError ||
      this.nacionalidadError ||
      this.correoError ||
      this.celularError
    ) {
      this.formGeneralError =
        'Por favor, revisa los campos obligatorios marcados en rojo.';
      setTimeout(() => {
        const firstError = document.querySelector('.is-invalid');
        if (firstError) {
          (firstError as HTMLElement).focus();
        }
      }, 100);
      return;
    }

    if (this.myForm && this.myForm.invalid) {
      this.formGeneralError =
        'Por favor, completa todos los campos obligatorios.';
      return;
    }

    if (
      !this.copyrightModel.cp ||
      !this.copyrightModel.calle ||
      !this.copyrightModel.numExterior ||
      !this.copyrightModel.colonia ||
      !this.copyrightModel.municipio ||
      !this.copyrightModel.estado ||
      !this.copyrightModel.pais
    ) {
      this.formGeneralError =
        'Por favor, completa todos los campos del domicilio.';
      return;
    }

    this.formGeneralError = null;

    // Redirigir a la ruta solicitada
    this.router.navigate(['/solicitante/registrar']);
  }
}
