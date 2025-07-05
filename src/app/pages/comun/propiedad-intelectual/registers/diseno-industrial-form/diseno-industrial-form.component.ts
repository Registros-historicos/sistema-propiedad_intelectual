import { ChangeDetectorRef, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
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
  isCollapsed3 = true;
  isCollapsed4 = true;
  isCollapsed5 = true;
  isLoading = false;

  allSelectedFiles: any[] = [];

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
    documentos: [],
    modalidadSolicitud: '',
    nombreCompleto: '',
    nacionalidad: '',
    celular: '',
    domicilio: '',
    curpRfc: '',
    disenadorDiferente: 'no',
    tipoDiseno: '',
    claseProductos: '',
    elementosNuevos: '',
    caracteristicasVisuales: '',
    resumen: '',
    declaracionOriginalidad: false,
    declaracionVeracidad: false,
    divulgacionPrevia: 'no',
    detallesDivulgacion: '',
  };

  nombreRazonError: string | null = null;
  nacionalidadError: string | null = null;
  correoError: string | null = null;
  celularError: string | null = null;
  domicilioError: string | null = null;
  curpRfcError: string | null = null;
  nombreDisenoError: string | null = null;
  claseProductosError: string | null = null;
  elementosNuevosError: string | null = null;
  caracteristicasVisualesError: string | null = null;
  descripcionGeneralError: string | null = null;
  resumenError: string | null = null;

  entidadesFederativas = ENTIDADES_FEDERATIVAS_DATA;
  institucionesFiltradas: any[] = [];
  estadoSeleccionado: number | null = null;
  institucionSeleccionada: number | null = null;

  placeholderNombre: string;
  placeholderNacionalidad: string;
  placeholderCorreo: string;
  placeholderDireccion: string;
  placeholderCurpRfc: string;
  placeholderDenominacion: string;
  placeholderClaseProductos: string;
  placeholderElementosNuevos: string;
  placeholderCaracteristicasVisuales: string;
  placeholderDescripcionGeneral: string;
  placeholderResumen: string;
  placeholderDivulgacion: string;

  @ViewChild('noticeSwal')
  noticeSwal!: SwalComponent;

  @ViewChild('myForm')
  myForm!: NgForm;

  @ViewChild('nombreRazonInput') nombreRazonInput!: ElementRef;
  @ViewChild('nacionalidadInput') nacionalidadInput!: ElementRef;
  @ViewChild('correoInput') correoInput!: ElementRef;
  @ViewChild('celularInput') celularInput!: ElementRef;
  @ViewChild('domicilioInput') domicilioInput!: ElementRef;
  @ViewChild('curpRfcInput') curpRfcInput!: ElementRef;
  @ViewChild('nombreDisenoInput') nombreDisenoInput!: ElementRef;
  @ViewChild('claseProductosInput') claseProductosInput!: ElementRef;
  @ViewChild('elementosNuevosInput') elementosNuevosInput!: ElementRef;
  @ViewChild('caracteristicasVisualesInput') caracteristicasVisualesInput!: ElementRef;
  @ViewChild('descripcionGeneralInput') descripcionGeneralInput!: ElementRef;
  @ViewChild('resumenInput') resumenInput!: ElementRef;

  swalOptions: SweetAlertOptions = {};

  constructor(
    private service: IndustrialDesignsService,
    private router: Router,
    private cdr: ChangeDetectorRef,
    private translate: TranslateService
  ) {
    const today = new Date();
    this.disIndModel.fechaSolicitud = today.toISOString().split('T')[0];
    this.disIndModel.solicitudId = this.generateSolicitudId();
  }

  ngOnInit(): void {
    this.placeholderNombre = this.translate.instant('FORMS.INDUSTRIAL_DESIGN.GENERAL_SECTION.NAME_COMPANY.PLACEHOLDER');
    this.placeholderNacionalidad = this.translate.instant('FORMS.INDUSTRIAL_DESIGN.GENERAL_SECTION.NATIONALITY.PLACEHOLDER');
    this.placeholderCorreo = this.translate.instant('FORMS.INDUSTRIAL_DESIGN.GENERAL_SECTION.EMAIL.PLACEHOLDER');
    this.placeholderDireccion = this.translate.instant('FORMS.INDUSTRIAL_DESIGN.GENERAL_SECTION.ADDRESS.PLACEHOLDER');
    this.placeholderCurpRfc = this.translate.instant('FORMS.INDUSTRIAL_DESIGN.GENERAL_SECTION.CURP_RFC.PLACEHOLDER');
    this.placeholderDenominacion = this.translate.instant('FORMS.INDUSTRIAL_DESIGN.DESIGN_SECTION.DESIGN_NAME.PLACEHOLDER');
    this.placeholderClaseProductos = this.translate.instant('FORMS.INDUSTRIAL_DESIGN.DESIGN_SECTION.PRODUCT_CLASS.PLACEHOLDER');
    this.placeholderElementosNuevos = this.translate.instant('FORMS.INDUSTRIAL_DESIGN.TECHNICAL_DESCRIPTION_SECTION.NEW_ELEMENTS.PLACEHOLDER');
    this.placeholderCaracteristicasVisuales = this.translate.instant('FORMS.INDUSTRIAL_DESIGN.TECHNICAL_DESCRIPTION_SECTION.VISUAL_CHARACTERISTICS.PLACEHOLDER');
    this.placeholderDescripcionGeneral = this.translate.instant('FORMS.INDUSTRIAL_DESIGN.TECHNICAL_DESCRIPTION_SECTION.GENERAL_DESCRIPTION.PLACEHOLDER');
    this.placeholderResumen = this.translate.instant('FORMS.INDUSTRIAL_DESIGN.TECHNICAL_DESCRIPTION_SECTION.SUMMARY.PLACEHOLDER');
    this.placeholderDivulgacion = this.translate.instant('FORMS.INDUSTRIAL_DESIGN.STATEMENTS_SECTION.DISCLOSURE_DETAILS.PLACEHOLDER');
  }

  private generateSolicitudId(): string {
    const today = new Date();
    const year = today.getFullYear();
    const random = Math.floor(Math.random() * 1000).toString().padStart(3, '0');
    return `DI-${year}-${random}`;
  }

  onEstadoChange(estadoId: any): void {
    this.estadoSeleccionado = Number(estadoId);
    this.institucionSeleccionada = null;
    this.disIndModel.institucion = '';

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
        this.disIndModel.institucion = institucion.nombre;
      }
    } else {
      this.disIndModel.institucion = '';
    }
  }

  onFormatoOficialSelected(event: any): void {
    this.handleFileSelection(event, this.translate.instant('FORMS.INDUSTRIAL_DESIGN.DOCUMENTATION_SECTION.IMPI.LABEL'));
  }

  onDibujosSelected(event: any): void {
    this.handleFileSelection(event, this.translate.instant('FORMS.INDUSTRIAL_DESIGN.DOCUMENTATION_SECTION.TECHNICAL_DRAWINGS.LABEL'));
  }

  onComprobantePagoSelected(event: any): void {
    this.handleFileSelection(event, this.translate.instant('FORMS.INDUSTRIAL_DESIGN.DOCUMENTATION_SECTION.PAYMENT_FEES.LABEL'));
  }

  onDocumentosAdicionalesSelected(event: any): void {
    this.handleFileSelection(event, this.translate.instant('FORMS.INDUSTRIAL_DESIGN.DOCUMENTATION_SECTION.ADDITIONAL_DOCUMENTS.LABEL'));
  }

  private handleFileSelection(event: any, tipo: string): void {
    const files = event.target.files;

    for (let i = 0; i < files.length; i++) {
      const file = files[i];

      if (this.isValidFileType(file, tipo)) {
        if (file.size <= 10 * 1024 * 1024) {
          this.allSelectedFiles.push({
            file: file,
            tipo: tipo
          });

          if (!this.disIndModel.documentos) {
            this.disIndModel.documentos = [];
          }
          this.disIndModel.documentos.push(`${tipo}: ${file.name}`);
        } else {
          this.showAlert({
            icon: 'error',
            title: 'Error!',
            text: this.translate.instant('FORMS.INDUSTRIAL_DESIGN.ERRORS.FILE_MAX_SIZE_PART_1') + file.name + this.translate.instant('FORMS.INDUSTRIAL_DESIGN.ERRORS.FILE_MAX_SIZE_PART_2')
          });
        }
      } else {
        this.showAlert({
          icon: 'error',
          title: 'Error!',
          text: this.translate.instant('FORMS.INDUSTRIAL_DESIGN.ERRORS.FILE_MAX_SIZE_PART_1') + file.name + this.translate.instant('FORMS.INDUSTRIAL_DESIGN.ERRORS.FILE_FORMAT_PART_2') + tipo
        });
      }
    }

    event.target.value = '';
  }

  private isValidFileType(file: File, tipo: string): boolean {
    const allowedTypes: { [key: string]: string[] } = {
      'Formato oficial IMPI-00-009': ['application/pdf'],
      'Dibujos técnicos y vistas del diseño': ['application/pdf', 'image/jpeg', 'image/jpg', 'image/png'],
      'Comprobante de pago de derechos': ['application/pdf'],
      'Documentos adicionales': ['application/pdf']
    };

    return allowedTypes[tipo]?.includes(file.type) || false;
  }

  removeFile(index: number): void {
    this.allSelectedFiles.splice(index, 1);
    if (this.disIndModel.documentos) {
      this.disIndModel.documentos.splice(index, 1);
    }
  }

  private validateNombreCompleto(value: string): { isValid: boolean; error?: string } {
    if (!value || value.trim().length === 0) {
      return { isValid: false, error: this.translate.instant('FORMS.INDUSTRIAL_DESIGN.ERRORS.NAME_REQUIRED') };
    }

    if (value.trim().length < 3) {
      return { isValid: false, error: this.translate.instant('FORMS.INDUSTRIAL_DESIGN.ERRORS.NAME_SIZE_MIN') };
    }

    if (value.length > 200) {
      return { isValid: false, error: this.translate.instant('FORMS.INDUSTRIAL_DESIGN.ERRORS.NAME_SIZE_MAX') };
    }

    const pattern = /^[a-zA-ZáéíóúÁÉÍÓÚñÑüÜ0-9\s\.\,\&\-\(\)\/\'\"\°]+$/;
    if (!pattern.test(value)) {
      return { isValid: false, error: this.translate.instant('FORMS.INDUSTRIAL_DESIGN.ERRORS.NAME_FORMAT') };
    }

    if (value !== value.trim()) {
      return { isValid: false, error: this.translate.instant('FORMS.INDUSTRIAL_DESIGN.ERRORS.NAME_SPACES') };
    }

    if (/\s{2,}/.test(value)) {
      return { isValid: false, error: this.translate.instant('FORMS.INDUSTRIAL_DESIGN.ERRORS.NAME_MULTIPLE_SPACES') };
    }

    return { isValid: true };
  }

  onNombreCompletoChange(ev: any): void {
    const value = ev.target.value;
    const cleanValue = value.replace(/[^a-zA-ZáéíóúÁÉÍÓÚñÑüÜ0-9\s\.\,\&\-\(\)\/\'\"\°]/g, '');

    if (cleanValue !== value) {
      this.disIndModel.nombreCompleto = cleanValue;
      if (this.nombreRazonInput) {
        this.nombreRazonInput.nativeElement.value = cleanValue;
      }
      setTimeout(() => {
        this.nombreRazonError = null;
      }, 100);
      return;
    }

    const validation = this.validateNombreCompleto(value);
    this.nombreRazonError = validation.isValid ? null : validation.error || null;
  }

  private validateNacionalidad(value: string): { isValid: boolean; error?: string } {
    if (!value || value.trim().length === 0) {
      return { isValid: false, error: this.translate.instant('FORMS.INDUSTRIAL_DESIGN.ERRORS.NATIONALITY_REQUIRED') };
    }

    if (value.trim().length < 4) {
      return { isValid: false, error: this.translate.instant('FORMS.INDUSTRIAL_DESIGN.ERRORS.NATIONALITY_SIZE_MIN') };
    }

    if (value.length > 50) {
      return { isValid: false, error: this.translate.instant('FORMS.INDUSTRIAL_DESIGN.ERRORS.NATIONALITY_SIZE_MAX') };
    }

    const pattern = /^[a-zA-ZáéíóúÁÉÍÓÚñÑüÜ]+$/;
    if (!pattern.test(value)) {
      return { isValid: false, error: this.translate.instant('FORMS.INDUSTRIAL_DESIGN.ERRORS.NATIONALITY_FORMAT') };
    }

    return { isValid: true };
  }

  onNacionalidadChange(ev: any): void {
    const value = ev.target.value;
    const cleanValue = value.replace(/[^a-zA-ZáéíóúÁÉÍÓÚñÑüÜ]/g, '');

    if (cleanValue !== value) {
      this.disIndModel.nacionalidad = cleanValue;
      if (this.nacionalidadInput) {
        this.nacionalidadInput.nativeElement.value = cleanValue;
      }
      setTimeout(() => {
        this.nacionalidadError = null;
      }, 100);
      return;
    }

    const validation = this.validateNacionalidad(value);
    this.nacionalidadError = validation.isValid ? null : validation.error || null;

    if (!this.isCurpRfcEnabled) {
      this.disIndModel.curpRfc = '';
      this.curpRfcError = null;
      if (this.curpRfcInput) {
        this.curpRfcInput.nativeElement.value = '';
      }
    }
  }

  private validateCorreo(value: string): { isValid: boolean; error?: string } {
    if (!value || value.trim().length === 0) {
      return { isValid: false, error: this.translate.instant('FORMS.INDUSTRIAL_DESIGN.ERRORS.EMAIL_REQUIRED') };
    }

    if (value.length > 100) {
      return { isValid: false, error: this.translate.instant('FORMS.INDUSTRIAL_DESIGN.ERRORS.EMAIL_SIZE_MAX') };
    }

    value = value.trim().toLowerCase();

    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailPattern.test(value)) {
      return { isValid: false, error: this.translate.instant('FORMS.INDUSTRIAL_DESIGN.ERRORS.EMAIL_INVALID') };
    }

    if (value.includes('..')) {
      return { isValid: false, error: this.translate.instant('FORMS.INDUSTRIAL_DESIGN.ERRORS.EMAIL_FORMAT') };
    }

    if (value.includes(' ')) {
      return { isValid: false, error: this.translate.instant('FORMS.INDUSTRIAL_DESIGN.ERRORS.EMAIL_BLANK') };
    }

    return { isValid: true };
  }

  onCorreoChange(ev: any): void {
    const value = ev.target.value;
    this.disIndModel.correo = value.trim().toLowerCase();

    const validation = this.validateCorreo(value);
    this.correoError = validation.isValid ? null : validation.error || null;
  }

  private validateCelular(value: string): { isValid: boolean; error?: string } {
    if (!value || value.trim().length === 0) {
      return { isValid: false, error: this.translate.instant('FORMS.INDUSTRIAL_DESIGN.ERRORS.PHONE_REQUIRED') };
    }

    const cleanValue = value.replace(/\D/g, '');

    if (cleanValue.length !== 10) {
      return { isValid: false, error: this.translate.instant('FORMS.INDUSTRIAL_DESIGN.ERRORS.PHONE_FORMAT') };
    }

    if (!/^[0-9]{10}$/.test(cleanValue)) {
      return { isValid: false, error: this.translate.instant('FORMS.INDUSTRIAL_DESIGN.ERRORS.PHONE_FORMAT_NUMBERS') };
    }

    if (/^(.)\1{9}$/.test(cleanValue)) {
      return { isValid: false, error: this.translate.instant('FORMS.INDUSTRIAL_DESIGN.ERRORS.PHONE_FORMAT_DIGIT') };
    }

    if (!['2', '3', '4', '5', '6', '7', '8', '9'].includes(cleanValue[0])) {
      return { isValid: false, error: this.translate.instant('FORMS.INDUSTRIAL_DESIGN.ERRORS.PHONE_FORMAT_DIGIT_VALID') };
    }

    return { isValid: true };
  }

  onCelularChange(ev: any): void {
    const value = ev.target.value;
    const cleanValue = value.replace(/\D/g, '');

    this.disIndModel.celular = cleanValue;
    if (this.celularInput) {
      this.celularInput.nativeElement.value = cleanValue;
    }

    const validation = this.validateCelular(cleanValue);
    this.celularError = validation.isValid ? null : validation.error || null;
  }

  private validateDomicilio(value: string): { isValid: boolean; error?: string } {
    if (!value || value.trim().length === 0) {
      return { isValid: false, error: this.translate.instant('FORMS.INDUSTRIAL_DESIGN.ERRORS.ADDRESS_REQUIRED') };
    }

    if (value.trim().length < 10) {
      return { isValid: false, error: this.translate.instant('FORMS.INDUSTRIAL_DESIGN.ERRORS.ADDRESS_SIZE_MIN') };
    }

    if (value.length > 300) {
      return { isValid: false, error: this.translate.instant('FORMS.INDUSTRIAL_DESIGN.ERRORS.ADDRESS_SIZE_MAX') };
    }

    if (value !== value.trim()) {
      return { isValid: false, error: this.translate.instant('FORMS.INDUSTRIAL_DESIGN.ERRORS.ADDRESS_SPACES') };
    }

    if (/^\s+$/.test(value)) {
      return { isValid: false, error: this.translate.instant('FORMS.INDUSTRIAL_DESIGN.ERRORS.ADDRESS_BLANK') };
    }

    const pattern = /^[a-zA-ZáéíóúÁÉÍÓÚñÑüÜ0-9\s\.\,\#\-\(\)\/]+$/;
    if (!pattern.test(value)) {
      return { isValid: false, error: this.translate.instant('FORMS.INDUSTRIAL_DESIGN.ERRORS.ADDRESS_FORMAT') };
    }

    return { isValid: true };
  }

  onDomicilioChange(ev: any): void {
    const value = ev.target.value;
    const validation = this.validateDomicilio(value);
    this.domicilioError = validation.isValid ? null : validation.error || null;
  }

  private validateCurpRfc(value: string): { isValid: boolean; error?: string } {
    if (!this.isCurpRfcEnabled) {
      return { isValid: true };
    }

    if (!value || value.trim().length === 0) {
      return { isValid: true };
    }

    value = value.trim().toUpperCase();

    if (value.length === 18) {
      const curpPattern = /^[A-Z]{4}[0-9]{6}[HM][A-Z]{5}[0-9A-Z][0-9]$/;
      if (!curpPattern.test(value)) {
        return { isValid: false, error: this.translate.instant('FORMS.INDUSTRIAL_DESIGN.ERRORS.CURP_SIZE_MAX') };
      }
    } else if (value.length === 13) {
      const rfcPattern = /^[A-Z&Ñ]{3,4}[0-9]{6}[A-V1-9][A-Z1-9][0-9A]$/;
      if (!rfcPattern.test(value)) {
        return { isValid: false, error: this.translate.instant('FORMS.INDUSTRIAL_DESIGN.ERRORS.RFC_SIZE_MAX') };
      }
    } else {
      return { isValid: false, error: this.translate.instant('FORMS.INDUSTRIAL_DESIGN.ERRORS.RFC_CURP_SIZE_MAX') };
    }

    return { isValid: true };
  }

  onCurpRfcChange(ev: any): void {
    const value = ev.target.value;
    const cleanValue = value.replace(/[^A-Za-z0-9&Ñ]/g, '').toUpperCase();

    this.disIndModel.curpRfc = cleanValue;
    if (this.curpRfcInput) {
      this.curpRfcInput.nativeElement.value = cleanValue;
    }

    const validation = this.validateCurpRfc(cleanValue);
    this.curpRfcError = validation.isValid ? null : validation.error || null;
  }

  private validateTextoTecnico(value: string, minLength: number, maxLength: number, nombreCampo: string): { isValid: boolean; error?: string } {
    if (!value || value.trim().length === 0) {
      return { isValid: false, error: nombreCampo + this.translate.instant('FORMS.INDUSTRIAL_DESIGN.ERRORS.REQUIRED') };
    }

    if (value.trim().length < minLength) {
      return { isValid: false, error: this.translate.instant('FORMS.INDUSTRIAL_DESIGN.ERRORS.SIZE_MIN') + minLength + this.translate.instant('FORMS.INDUSTRIAL_DESIGN.ERRORS.CHAR') };
    }

    if (value.length > maxLength) {
      return { isValid: false, error: this.translate.instant('FORMS.INDUSTRIAL_DESIGN.ERRORS.SIZE_MAX') + maxLength + this.translate.instant('FORMS.INDUSTRIAL_DESIGN.ERRORS.CHAR') };
    }

    if (value !== value.trim()) {
      return { isValid: false, error: this.translate.instant('FORMS.INDUSTRIAL_DESIGN.ERRORS.SPACES') };
    }

    if (/^\s+$/.test(value)) {
      return { isValid: false, error: this.translate.instant('FORMS.INDUSTRIAL_DESIGN.ERRORS.BLANK') };
    }

    if (/^[^a-zA-ZáéíóúÁÉÍÓÚñÑüÜ]*$/.test(value)) {
      return { isValid: false, error: this.translate.instant('FORMS.INDUSTRIAL_DESIGN.ERRORS.LETTERS') };
    }

    return { isValid: true };
  }

  onNombreDisenoChange(ev: any): void {
    const value = ev.target.value;
    const validation = this.validateTextoTecnico(value, 5, 500, this.translate.instant('FORMS.INDUSTRIAL_DESIGN.ERRORS.DESIGN_NAME'));
    this.nombreDisenoError = validation.isValid ? null : validation.error || null;
  }

  onClaseProductosChange(ev: any): void {
    const value = ev.target.value;
    const validation = this.validateTextoTecnico(value, 10, 800, this.translate.instant('FORMS.INDUSTRIAL_DESIGN.ERRORS.PRODUCT_CLASS'));
    this.claseProductosError = validation.isValid ? null : validation.error || null;
  }

  onElementosNuevosChange(ev: any): void {
    const value = ev.target.value;
    const validation = this.validateTextoTecnico(value, 50, 2000, this.translate.instant('FORMS.INDUSTRIAL_DESIGN.ERRORS.NEW_ELEMENTS'));
    this.elementosNuevosError = validation.isValid ? null : validation.error || null;
  }

  onCaracteristicasVisualesChange(ev: any): void {
    const value = ev.target.value;
    const validation = this.validateTextoTecnico(value, 50, 2000, this.translate.instant('FORMS.INDUSTRIAL_DESIGN.ERRORS.VISUAL_CHARACTERISTICS'));
    this.caracteristicasVisualesError = validation.isValid ? null : validation.error || null;
  }

  onDescripcionGeneralChange(ev: any): void {
    const value = ev.target.value;
    const validation = this.validateTextoTecnico(value, 100, 3000, this.translate.instant('FORMS.INDUSTRIAL_DESIGN.ERRORS.GENERAL_DESCRIPTION'));
    this.descripcionGeneralError = validation.isValid ? null : validation.error || null;
  }

  private validateResumen(value: string): { isValid: boolean; error?: string } {
    if (!value || value.trim().length === 0) {
      return { isValid: false, error: this.translate.instant('FORMS.INDUSTRIAL_DESIGN.ERRORS.SUMMARY_REQUIRED') };
    }

    const wordCount = value.trim().split(/\s+/).length;

    if (value.trim().length < 150) {
      return { isValid: false, error: this.translate.instant('FORMS.INDUSTRIAL_DESIGN.ERRORS.SUMMARY_SIZE_MIN') };
    }

    if (value.length > 250) {
      return { isValid: false, error: this.translate.instant('FORMS.INDUSTRIAL_DESIGN.ERRORS.SUMMARY_SIZE_MAX') };
    }

    if (wordCount < 25) {
      return { isValid: false, error: this.translate.instant('FORMS.INDUSTRIAL_DESIGN.ERRORS.SUMMARY_SIZE_MIN_WORDS') };
    }

    if (wordCount > 50) {
      return { isValid: false, error: this.translate.instant('FORMS.INDUSTRIAL_DESIGN.ERRORS.SUMMARY_SIZE_MAX_WORDS') };
    }

    return { isValid: true };
  }

  onResumenChange(ev: any): void {
    const value = ev.target.value;
    const validation = this.validateResumen(value);
    this.resumenError = validation.isValid ? null : validation.error || null;
  }

  get isCurpRfcEnabled(): boolean {
    const nacionalidad = this.disIndModel.nacionalidad?.toLowerCase().trim();
    return nacionalidad === 'mexicano' || nacionalidad === 'mexicana';
  }

  onSubmit(event: Event): void {
    event.preventDefault();

    if (this.myForm && this.myForm.invalid) {
      this.markFormGroupTouched();
      this.scrollToFirstError();
      return;
    }

    if (!this.estadoSeleccionado || !this.institucionSeleccionada) {
      this.showAlert({
        icon: 'error',
        title: 'Error!',
        text: this.translate.instant('FORMS.INDUSTRIAL_DESIGN.ERRORS.ENTITY_INSTITUTION')
      });
      return;
    }

    if (!this.validateRequiredDocuments()) {
      return;
    }

    this.isLoading = true;

    this.disIndModel.estatus = 'En trámite';
    this.disIndModel.solicitante = this.disIndModel.nombreCompleto || '';

    this.service.createIndustrialDesign(this.disIndModel).subscribe({
      next: (response) => {
        this.isLoading = false;
        this.showAlert({
          icon: 'success',
          title: 'Éxito!',
          text: this.translate.instant('FORMS.INDUSTRIAL_DESIGN.INFO.SUCCESS')
        });

        setTimeout(() => {
          this.router.navigate(['/solicitante/propiedades/diseno-industrial']);
        }, 2000);
      },
      error: (error) => {
        this.isLoading = false;
        console.error('Error al enviar solicitud de diseño industrial:', error);
        this.showAlert({
          icon: 'error',
          title: 'Error!',
          text: this.translate.instant('FORMS.INDUSTRIAL_DESIGN.ERRORS.SUBMIT')
        });
      }
    });
  }

  private validateRequiredDocuments(): boolean {
    const hasFormatoOficial = this.allSelectedFiles.some(f => f.tipo === this.translate.instant('FORMS.INDUSTRIAL_DESIGN.DOCUMENTATION_SECTION.IMPI.LABEL'));
    const hasComprobantePago = this.allSelectedFiles.some(f => f.tipo === this.translate.instant('FORMS.INDUSTRIAL_DESIGN.DOCUMENTATION_SECTION.PAYMENT_FEES.LABEL'));
    const hasDibujosTecnicos = this.allSelectedFiles.some(f => f.tipo === this.translate.instant('FORMS.INDUSTRIAL_DESIGN.DOCUMENTATION_SECTION.TECHNICAL_DRAWINGS.LABEL'));

    if (!hasFormatoOficial) {
      this.showAlert({
        icon: 'error',
        title: this.translate.instant('FORMS.INDUSTRIAL_DESIGN.ERRORS.DOCUMENT_TITLE'),
        text: this.translate.instant('FORMS.INDUSTRIAL_DESIGN.ERRORS.IMPI')
      });
      return false;
    }

    if (!hasComprobantePago) {
      this.showAlert({
        icon: 'error',
        title: this.translate.instant('FORMS.INDUSTRIAL_DESIGN.ERRORS.DOCUMENT_TITLE'),
        text: this.translate.instant('FORMS.INDUSTRIAL_DESIGN.ERRORS.PAYMENT')
      });
      return false;
    }

    if (!hasDibujosTecnicos) {
      this.showAlert({
        icon: 'error',
        title: this.translate.instant('FORMS.INDUSTRIAL_DESIGN.ERRORS.DOCUMENT_TITLE'),
        text: this.translate.instant('FORMS.INDUSTRIAL_DESIGN.ERRORS.TECHNICAL_DRAWINGS')
      });
      return false;
    }

    return true;
  }

  private markFormGroupTouched(): void {
    Object.keys(this.myForm.controls).forEach(key => {
      const control = this.myForm.controls[key];
      control.markAsTouched();
    });
  }

  private scrollToFirstError(): void {
    setTimeout(() => {
      const firstError = document.querySelector('.invalid-feedback');
      if (firstError) {
        firstError.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    }, 100);
  }

  onCancel(): void {
    this.router.navigate(['/solicitante/propiedades/diseno-industrial']);
  }

  showAlert(swalOptions: SweetAlertOptions): void {
    let style = swalOptions.icon?.toString() || 'success';
    if (swalOptions.icon === 'error') {
      style = 'danger';
    }
    this.swalOptions = Object.assign({
      buttonsStyling: false,
      confirmButtonText: this.translate.instant('FORMS.INDUSTRIAL_DESIGN.INFO.CONFIRM'),
      customClass: {
        confirmButton: "btn btn-" + style
      }
    }, swalOptions);
    this.cdr.detectChanges();
    this.noticeSwal.fire();
  }

  collapse1 = { toggle: () => { this.isCollapsed1 = !this.isCollapsed1; } };
  collapse2 = { toggle: () => { this.isCollapsed2 = !this.isCollapsed2; } };
  collapse3 = { toggle: () => { this.isCollapsed3 = !this.isCollapsed3; } };
  collapse4 = { toggle: () => { this.isCollapsed4 = !this.isCollapsed4; } };
  collapse5 = { toggle: () => { this.isCollapsed5 = !this.isCollapsed5; } };
}