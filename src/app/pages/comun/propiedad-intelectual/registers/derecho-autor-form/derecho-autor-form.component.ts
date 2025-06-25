import { ChangeDetectorRef, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { SwalComponent } from '@sweetalert2/ngx-sweetalert2';
import { ICopyrightModel } from 'src/app/api/models/copyrigth.model';
import { CopyrightsService } from 'src/app/api/services/copyright.service';
import { ENTIDADES_FEDERATIVAS_DATA, ENTIDADES_FEDERATIVAS_MAP } from 'src/app/pages/administrador/shared-services';
import { SweetAlertOptions } from 'sweetalert2';

@Component({
  selector: 'app-derecho-autor-form',
  templateUrl: './derecho-autor-form.component.html',
})
export class DerechoAutorFormComponent implements OnInit {
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
    sintesisObra: false
  };

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
  };

  tituloObraError: string | null = null;
  nombreCompletoError: string | null = null;
  nacionalidadError: string | null = null;
  correoError: string | null = null;
  celularError: string | null = null;
  domicilioError: string | null = null;
  curpRfcError: string | null = null;
  descripcionError: string | null = null;

  entidadesFederativas = ENTIDADES_FEDERATIVAS_DATA;
  institucionesFiltradas: any[] = [];
  estadoSeleccionado: number | null = null;
  institucionSeleccionada: number | null = null;

  placeholderTituloObra: string;
  placeholderNombreCompleto: string;
  placeholderNacionalidad: string;
  placeholderCorreo: string;
  placeholderDomicilio: string;
  placeholderCurpRfc: string;
  placeholderAutor: string;
  placeholderObraPrimigenia: string;
  placeholderDescripcion: string;
  placeholderUrlObra: string;
  placeholderSintesisObra: string;

  @ViewChild('noticeSwal')
  noticeSwal!: SwalComponent;

  @ViewChild('myForm')
  myForm!: NgForm;

  @ViewChild('tituloObraInput') tituloObraInput!: ElementRef;
  @ViewChild('nombreCompletoInput') nombreCompletoInput!: ElementRef;
  @ViewChild('nacionalidadInput') nacionalidadInput!: ElementRef;
  @ViewChild('correoInput') correoInput!: ElementRef;
  @ViewChild('celularInput') celularInput!: ElementRef;
  @ViewChild('domicilioInput') domicilioInput!: ElementRef;
  @ViewChild('curpRfcInput') curpRfcInput!: ElementRef;
  @ViewChild('descripcionInput') descripcionInput!: ElementRef;

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
    this.placeholderTituloObra = this.translate.instant('FORMS.COPYRIGHT.GENERAL_SECTION.WORK_TITLE.PLACEHOLDER');
    this.placeholderNombreCompleto = this.translate.instant('FORMS.COPYRIGHT.GENERAL_SECTION.NAME_COMPANY.PLACEHOLDER');
    this.placeholderNacionalidad = this.translate.instant('FORMS.COPYRIGHT.GENERAL_SECTION.NATIONALITY.PLACEHOLDER');
    this.placeholderCorreo = this.translate.instant('FORMS.COPYRIGHT.GENERAL_SECTION.EMAIL.PLACEHOLDER');
    this.placeholderDomicilio = this.translate.instant('FORMS.COPYRIGHT.GENERAL_SECTION.ADDRESS.PLACEHOLDER');
    this.placeholderCurpRfc = this.translate.instant('FORMS.COPYRIGHT.GENERAL_SECTION.CURP_RFC.PLACEHOLDER');
    this.placeholderAutor = this.translate.instant('FORMS.COPYRIGHT.GENERAL_SECTION.AUTHOR_NAME.PLACEHOLDER');
    this.placeholderObraPrimigenia = this.translate.instant('FORMS.COPYRIGHT.WORK_SECTION.ORIGINAL_WORK_DATA.PLACEHOLDER');
    this.placeholderDescripcion = this.translate.instant('FORMS.COPYRIGHT.WORK_SECTION.DESCRIPTION.PLACEHOLDER');
    this.placeholderUrlObra = this.translate.instant('FORMS.COPYRIGHT.EXEMPLAR_SECTION.URL_FIELD.PLACEHOLDER');
    this.placeholderSintesisObra = this.translate.instant('FORMS.COPYRIGHT.EXEMPLAR_SECTION.SYNTHESIS_FIELD.PLACEHOLDER');
    this.copyrightModel.estado = 'En trámite';
  }

  private generateSolicitudId(): string {
    const today = new Date();
    const year = today.getFullYear();
    const random = Math.floor(Math.random() * 1000).toString().padStart(3, '0');
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
      const institucion = this.institucionesFiltradas.find(inst => inst.id === Number(institucionId));
      if (institucion) {
        this.copyrightModel.institucion = institucion.nombre;
      }
    } else {
      this.copyrightModel.institucion = '';
    }
  }

  onObraDerivadaChange(): void {
    if (this.copyrightModel.esDerivada === 'no') {
      this.copyrightModel.tipoDerivada = '';
      this.copyrightModel.datosObraPrimigenia = '';
    }
  }

  onFormatoOficialSelected(event: any): void {
    this.handleFileSelection(event, this.translate.instant('FORMS.COPYRIGHT.DOCUMENTATION_SECTION.INDAUTOR_FORMAT.LABEL'));
  }

  onIdentificacionSelected(event: any): void {
    this.handleFileSelection(event, this.translate.instant('FORMS.COPYRIGHT.DOCUMENTATION_SECTION.OFFICIAL_ID.LABEL'));
  }

  onTitularidadSelected(event: any): void {
    this.handleFileSelection(event, this.translate.instant('FORMS.COPYRIGHT.DOCUMENTATION_SECTION.OWNERSHIP_DOCUMENT.LABEL'));
  }

  onComprobantePagoSelected(event: any): void {
    this.handleFileSelection(event, this.translate.instant('FORMS.COPYRIGHT.DOCUMENTATION_SECTION.PAYMENT_RECEIPT.LABEL'));
  }

  onEjemplarObraSelected(event: any): void {
    this.handleFileSelection(event, this.translate.instant('FORMS.COPYRIGHT.DOCUMENTATION_SECTION.WORK_EXEMPLAR.LABEL'));
  }

  onDocumentosAdicionalesSelected(event: any): void {
    this.handleFileSelection(event, this.translate.instant('FORMS.COPYRIGHT.DOCUMENTATION_SECTION.ADDITIONAL_DOCUMENTS.LABEL'));
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

          if (!this.copyrightModel.documentos) {
            this.copyrightModel.documentos = [];
          }
          this.copyrightModel.documentos.push(`${tipo}: ${file.name}`);
        } else {
          this.showAlert({
            icon: 'error',
            title: 'Error!',
            text: this.translate.instant('FORMS.COPYRIGHT.ERRORS.FILE_MAX_SIZE_PART_1') + file.name + this.translate.instant('FORMS.COPYRIGHT.ERRORS.FILE_MAX_SIZE_PART_2')
          });
        }
      } else {
        this.showAlert({
          icon: 'error',
          title: 'Error!',
          text: this.translate.instant('FORMS.COPYRIGHT.ERRORS.FILE_MAX_SIZE_PART_1') + file.name + this.translate.instant('FORMS.COPYRIGHT.ERRORS.FILE_FORMAT_PART_2') + tipo
        });
      }
    }

    event.target.value = '';
  }

  private isValidFileType(file: File, tipo: string): boolean {
    const indautorLabel = this.translate.instant('FORMS.COPYRIGHT.DOCUMENTATION_SECTION.INDAUTOR_FORMAT.LABEL');
    const idLabel = this.translate.instant('FORMS.COPYRIGHT.DOCUMENTATION_SECTION.OFFICIAL_ID.LABEL');
    const ownershipLabel = this.translate.instant('FORMS.COPYRIGHT.DOCUMENTATION_SECTION.OWNERSHIP_DOCUMENT.LABEL');
    const paymentLabel = this.translate.instant('FORMS.COPYRIGHT.DOCUMENTATION_SECTION.PAYMENT_RECEIPT.LABEL');
    const exemplarLabel = this.translate.instant('FORMS.COPYRIGHT.DOCUMENTATION_SECTION.WORK_EXEMPLAR.LABEL');
    const additionalLabel = this.translate.instant('FORMS.COPYRIGHT.DOCUMENTATION_SECTION.ADDITIONAL_DOCUMENTS.LABEL');

    const allowedTypes: { [key: string]: string[] } = {
      [indautorLabel]: ['application/pdf'],
      [idLabel]: ['application/pdf', 'image/jpeg', 'image/jpg', 'image/png'],
      [ownershipLabel]: ['application/pdf'],
      [paymentLabel]: ['application/pdf'],
      [exemplarLabel]: ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document', 'text/plain'],
      [additionalLabel]: ['application/pdf']
    };

    return allowedTypes[tipo]?.includes(file.type) || false;
  }

  removeFile(index: number): void {
    this.allSelectedFiles.splice(index, 1);
    if (this.copyrightModel.documentos) {
      this.copyrightModel.documentos.splice(index, 1);
    }
  }

  private validateTituloObra(value: string): { isValid: boolean; error?: string } {
    if (!value || value.trim().length === 0) {
      return { isValid: false, error: this.translate.instant('FORMS.COPYRIGHT.ERRORS.WORK_TITLE_REQUIRED') };
    }

    if (value.trim().length < 5) {
      return { isValid: false, error: this.translate.instant('FORMS.COPYRIGHT.ERRORS.WORK_TITLE_MIN_LENGTH') };
    }

    if (value.length > 500) {
      return { isValid: false, error: this.translate.instant('FORMS.COPYRIGHT.ERRORS.WORK_TITLE_MAX_LENGTH') };
    }

    if (value !== value.trim()) {
      return { isValid: false, error: this.translate.instant('FORMS.COPYRIGHT.ERRORS.WORK_TITLE_SPACES') };
    }

    if (/^\s+$/.test(value)) {
      return { isValid: false, error: this.translate.instant('FORMS.COPYRIGHT.ERRORS.WORK_TITLE_BLANK') };
    }

    return { isValid: true };
  }

  onTituloObraChange(ev: any): void {
    const value = ev.target.value;
    const validation = this.validateTituloObra(value);
    this.tituloObraError = validation.isValid ? null : validation.error || null;
  }

  private validateNombreCompleto(value: string): { isValid: boolean; error?: string } {
    if (!value || value.trim().length === 0) {
      return { isValid: false, error: this.translate.instant('FORMS.COPYRIGHT.ERRORS.NAME_REQUIRED') };
    }

    if (value.trim().length < 3) {
      return { isValid: false, error: this.translate.instant('FORMS.COPYRIGHT.ERRORS.NAME_SIZE_MIN') };
    }

    if (value.length > 200) {
      return { isValid: false, error: this.translate.instant('FORMS.COPYRIGHT.ERRORS.NAME_SIZE_MAX') };
    }

    const pattern = /^[a-zA-ZáéíóúÁÉÍÓÚñÑüÜ0-9\s\.\,\&\-\(\)\/\'\"\°]+$/;
    if (!pattern.test(value)) {
      return { isValid: false, error: this.translate.instant('FORMS.COPYRIGHT.ERRORS.NAME_FORMAT') };
    }

    if (value !== value.trim()) {
      return { isValid: false, error: this.translate.instant('FORMS.COPYRIGHT.ERRORS.NAME_SPACES') };
    }

    if (/\s{2,}/.test(value)) {
      return { isValid: false, error: this.translate.instant('FORMS.COPYRIGHT.ERRORS.NAME_MULTIPLE_SPACES') };
    }

    return { isValid: true };
  }

  onNombreCompletoChange(ev: any): void {
    const value = ev.target.value;
    const cleanValue = value.replace(/[^a-zA-ZáéíóúÁÉÍÓÚñÑüÜ0-9\s\.\,\&\-\(\)\/\'\"\°]/g, '');

    if (cleanValue !== value) {
      this.copyrightModel.solicitante = cleanValue;
      if (this.nombreCompletoInput) {
        this.nombreCompletoInput.nativeElement.value = cleanValue;
      }
      setTimeout(() => {
        this.nombreCompletoError = null;
      }, 100);
      return;
    }

    const validation = this.validateNombreCompleto(value);
    this.nombreCompletoError = validation.isValid ? null : validation.error || null;
  }

  private validateNacionalidad(value: string): { isValid: boolean; error?: string } {
    if (!value || value.trim().length === 0) {
      return { isValid: false, error: this.translate.instant('FORMS.COPYRIGHT.ERRORS.NATIONALITY_REQUIRED') };
    }

    if (value.trim().length < 4) {
      return { isValid: false, error: this.translate.instant('FORMS.COPYRIGHT.ERRORS.NATIONALITY_SIZE_MIN') };
    }

    if (value.length > 50) {
      return { isValid: false, error: this.translate.instant('FORMS.COPYRIGHT.ERRORS.NATIONALITY_SIZE_MAX') };
    }

    const pattern = /^[a-zA-ZáéíóúÁÉÍÓÚñÑüÜ]+$/;
    if (!pattern.test(value)) {
      return { isValid: false, error: this.translate.instant('FORMS.COPYRIGHT.ERRORS.NATIONALITY_FORMAT') };
    }

    return { isValid: true };
  }

  onNacionalidadChange(ev: any): void {
    const value = ev.target.value;
    const cleanValue = value.replace(/[^a-zA-ZáéíóúÁÉÍÓÚñÑüÜ]/g, '');

    if (cleanValue !== value) {
      this.copyrightModel.nacionalidad = cleanValue;
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
      this.copyrightModel.curpRfc = '';
      this.curpRfcError = null;
      if (this.curpRfcInput) {
        this.curpRfcInput.nativeElement.value = '';
      }
    }
  }

  private validateCorreo(value: string): { isValid: boolean; error?: string } {
    if (!value || value.trim().length === 0) {
      return { isValid: false, error: this.translate.instant('FORMS.COPYRIGHT.ERRORS.EMAIL_REQUIRED') };
    }

    if (value.length > 100) {
      return { isValid: false, error: this.translate.instant('FORMS.COPYRIGHT.ERRORS.EMAIL_SIZE_MAX') };
    }

    value = value.trim().toLowerCase();

    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailPattern.test(value)) {
      return { isValid: false, error: this.translate.instant('FORMS.COPYRIGHT.ERRORS.EMAIL_INVALID') };
    }

    if (value.includes('..')) {
      return { isValid: false, error: this.translate.instant('FORMS.COPYRIGHT.ERRORS.EMAIL_FORMAT') };
    }

    if (value.includes(' ')) {
      return { isValid: false, error: this.translate.instant('FORMS.COPYRIGHT.ERRORS.EMAIL_BLANK') };
    }

    return { isValid: true };
  }

  onCorreoChange(ev: any): void {
    const value = ev.target.value;
    this.copyrightModel.correo = value.trim().toLowerCase();

    const validation = this.validateCorreo(value);
    this.correoError = validation.isValid ? null : validation.error || null;
  }

  private validateCelular(value: string): { isValid: boolean; error?: string } {
    if (!value || value.trim().length === 0) {
      return { isValid: false, error: this.translate.instant('FORMS.COPYRIGHT.ERRORS.PHONE_REQUIRED') };
    }

    const cleanValue = value.replace(/\D/g, '');

    if (cleanValue.length !== 10) {
      return { isValid: false, error: this.translate.instant('FORMS.COPYRIGHT.ERRORS.PHONE_FORMAT') };
    }

    if (!/^[0-9]{10}$/.test(cleanValue)) {
      return { isValid: false, error: this.translate.instant('FORMS.COPYRIGHT.ERRORS.PHONE_FORMAT_NUMBERS') };
    }

    if (/^(.)\1{9}$/.test(cleanValue)) {
      return { isValid: false, error: this.translate.instant('FORMS.COPYRIGHT.ERRORS.PHONE_FORMAT_DIGIT') };
    }

    if (!['2', '3', '4', '5', '6', '7', '8', '9'].includes(cleanValue[0])) {
      return { isValid: false, error: this.translate.instant('FORMS.COPYRIGHT.ERRORS.PHONE_FORMAT_DIGIT_VALID') };
    }

    return { isValid: true };
  }

  onCelularChange(ev: any): void {
    const value = ev.target.value;
    const cleanValue = value.replace(/\D/g, '');

    this.copyrightModel.celular = cleanValue;
    if (this.celularInput) {
      this.celularInput.nativeElement.value = cleanValue;
    }

    const validation = this.validateCelular(cleanValue);
    this.celularError = validation.isValid ? null : validation.error || null;
  }

  private validateDomicilio(value: string): { isValid: boolean; error?: string } {
    if (!value || value.trim().length === 0) {
      return { isValid: false, error: this.translate.instant('FORMS.COPYRIGHT.ERRORS.ADDRESS_REQUIRED') };
    }

    if (value.trim().length < 10) {
      return { isValid: false, error: this.translate.instant('FORMS.COPYRIGHT.ERRORS.ADDRESS_SIZE_MIN') };
    }

    if (value.length > 300) {
      return { isValid: false, error: this.translate.instant('FORMS.COPYRIGHT.ERRORS.ADDRESS_SIZE_MAX') };
    }

    if (value !== value.trim()) {
      return { isValid: false, error: this.translate.instant('FORMS.COPYRIGHT.ERRORS.ADDRESS_SPACES') };
    }

    if (/^\s+$/.test(value)) {
      return { isValid: false, error: this.translate.instant('FORMS.COPYRIGHT.ERRORS.ADDRESS_BLANK') };
    }

    const pattern = /^[a-zA-ZáéíóúÁÉÍÓÚñÑüÜ0-9\s\.\,\#\-\(\)\/]+$/;
    if (!pattern.test(value)) {
      return { isValid: false, error: this.translate.instant('FORMS.COPYRIGHT.ERRORS.ADDRESS_FORMAT') };
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
        return { isValid: false, error: this.translate.instant('FORMS.COPYRIGHT.ERRORS.CURP_SIZE_MAX') };
      }
    } else if (value.length === 13) {
      const rfcPattern = /^[A-Z&Ñ]{3,4}[0-9]{6}[A-V1-9][A-Z1-9][0-9A]$/;
      if (!rfcPattern.test(value)) {
        return { isValid: false, error: this.translate.instant('FORMS.COPYRIGHT.ERRORS.RFC_SIZE_MAX') };
      }
    } else {
      return { isValid: false, error: this.translate.instant('FORMS.COPYRIGHT.ERRORS.RFC_CURP_SIZE_MAX') };
    }

    return { isValid: true };
  }

  onCurpRfcChange(ev: any): void {
    const value = ev.target.value;
    const cleanValue = value.replace(/[^A-Za-z0-9&Ñ]/g, '').toUpperCase();

    this.copyrightModel.curpRfc = cleanValue;
    if (this.curpRfcInput) {
      this.curpRfcInput.nativeElement.value = cleanValue;
    }

    const validation = this.validateCurpRfc(cleanValue);
    this.curpRfcError = validation.isValid ? null : validation.error || null;
  }

  private validateDescripcion(value: string): { isValid: boolean; error?: string } {
    if (!value || value.trim().length === 0) {
      return { isValid: false, error: this.translate.instant('FORMS.COPYRIGHT.ERRORS.DESCRIPTION_REQUIRED') };
    }

    if (value.trim().length < 20) {
      return { isValid: false, error: this.translate.instant('FORMS.COPYRIGHT.ERRORS.DESCRIPTION_SIZE_MIN') };
    }

    if (value.length > 2000) {
      return { isValid: false, error: this.translate.instant('FORMS.COPYRIGHT.ERRORS.DESCRIPTION_SIZE_MAX') };
    }

    if (value !== value.trim()) {
      return { isValid: false, error: this.translate.instant('FORMS.COPYRIGHT.ERRORS.DESCRIPTION_SPACES') };
    }

    if (/^\s+$/.test(value)) {
      return { isValid: false, error: this.translate.instant('FORMS.COPYRIGHT.ERRORS.DESCRIPTION_BLANK') };
    }

    return { isValid: true };
  }

  onDescripcionChange(ev: any): void {
    const value = ev.target.value;
    const validation = this.validateDescripcion(value);
    this.descripcionError = validation.isValid ? null : validation.error || null;
  }

  get isCurpRfcEnabled(): boolean {
    const nacionalidad = this.copyrightModel.nacionalidad?.toLowerCase().trim();
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
        text: this.translate.instant('FORMS.COPYRIGHT.ERRORS.ENTITY_INSTITUTION')
      });
      return;
    }

    if (!this.validateRequiredDocuments()) {
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
          text: this.translate.instant('FORMS.COPYRIGHT.INFO.SUCCESS')
        });

        setTimeout(() => {
          this.router.navigate(['/solicitante/propiedades/derecho-autor']);
        }, 2000);
      },
      error: (error) => {
        this.isLoading = false;
        console.error('Error al enviar solicitud de derecho de autor:', error);
        this.showAlert({
          icon: 'error',
          title: 'Error!',
          text: this.translate.instant('FORMS.COPYRIGHT.ERRORS.SUBMIT')
        });
      }
    });
  }

  private validateRequiredDocuments(): boolean {
    const indautorLabel = this.translate.instant('FORMS.COPYRIGHT.DOCUMENTATION_SECTION.INDAUTOR_FORMAT.LABEL');
    const hasFormatoOficial = this.allSelectedFiles.some(f => f.tipo === indautorLabel);

    if (!hasFormatoOficial) {
      this.showAlert({
        icon: 'error',
        title: this.translate.instant('FORMS.COPYRIGHT.ERRORS.DOCUMENT_TITLE'),
        text: this.translate.instant('FORMS.COPYRIGHT.ERRORS.INDAUTOR_FORMAT')
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
    this.router.navigate(['/solicitante/propiedades/derecho-autor']);
  }

  showAlert(swalOptions: SweetAlertOptions): void {
    let style = swalOptions.icon?.toString() || 'success';
    if (swalOptions.icon === 'error') {
      style = 'danger';
    }
    this.swalOptions = Object.assign({
      buttonsStyling: false,
      confirmButtonText: this.translate.instant('FORMS.COPYRIGHT.INFO.CONFIRM'),
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