import { Component, ElementRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-trazado-circuitos',
  templateUrl: './trazado-circuitos.component.html',
  styleUrl: './trazado-circuitos.component.scss',
})
export class TrazadoCircuitosComponent {
  constructor(private router: Router) {}
  isLoading = false;
  formSubmitted = false;

  documentosOpciones = [
    { value: 'comprobantePago', label: 'Comprobante de pago' },
    {
      value: 'acreditaMandatario',
      label: 'Documento que acredite la personalidad del mandatario',
    },
    {
      value: 'acreditaCaracter',
      label:
        'Documento que acredita el carácter del causahabiente o la cesión de derechos',
    },
    {
      value: 'manifiestoVerdad',
      label:
        'Documento(s) en el (los) que manifiesta, bajo protesta de decir la verdad, de la fecha y lugar de primera explotación comercial ordinaria en alguna parte del mundo o de que no ha sido explotado',
    },
    {
      value: 'traduccion',
      label:
        'Traducción de los documentos presentados en idioma distinto al español',
    },
    {
      value: 'legalizacionExtranjero',
      label:
        'Legalización o apostilla de los documentos anexos provenientes del extranjero',
    },
    {
      value: 'descFuncion',
      label:
        'Descripción de la función electrónica que realiza el circuito integrado',
    },
    {
      value: 'reprodEsquema',
      label: 'Reproducción gráfica o fotográfica de los esquemas de trazado',
    },
    { value: 'reivindicacion', label: 'Reivindicación' },
  ];

  model: any = {
    solicitanteFisica: {
      curp: '',
      nombres: '',
      primerApellido: '',
      segundoApellido: '',
      nacionalidad: '',
      telefono: '',
      correo: '',
      esCreador: '',
    },
    solicitanteMoral: {
      rfc: '',
      razonSocial: '',
      nacionalidad: '',
      telefono: '',
      correo: '',
    },
    domicilioSolicitante: {
      cp: '',
      calle: '',
      numExterior: '',
      numInterior: '',
      colonia: '',
      municipio: '',
      estado: '',
      pais: '',
    },
    creador: {
      curp: '',
      nombres: '',
      primerApellido: '',
      segundoApellido: '',
      nacionalidad: '',
      telefono: '',
      correo: '',
    },
    domicilioCreador: {
      cp: '',
      calle: '',
      numExterior: '',
      numInterior: '',
      colonia: '',
      municipio: '',
      estado: '',
      pais: '',
    },
    apoderado: {
      curp: '',
      nombres: '',
      primerApellido: '',
      segundoApellido: '',
      nacionalidad: '',
      telefono: '',
      correo: '',
    },
    domicilioNotif: {
      cp: '',
      calle: '',
      numExterior: '',
      numInterior: '',
      colonia: '',
      municipio: '',
      estado: '',
      pais: '',
    },
    personaNotif: {
      nombres: '',
      primerApellido: '',
      segundoApellido: '',
    },
    datosSolicitud: {
      denominacionEsquema: '',
    },
    explotacion: {
      existe: undefined,
      lugar: '',
      fecha: '',
    },
    documentos: {},
  };

  adjuntos: File[] = [];
  adjuntosError: string | null = null;

  @ViewChild('fileInput') fileInput!: ElementRef<HTMLInputElement>;

  onFileSelect(event: any) {
    this.adjuntosError = null;
    const files: FileList = event.target.files;
    for (let i = 0; i < files.length; i++) {
      const f = files.item(i);
      if (f && this.validateFile(f)) {
        this.adjuntos.push(f);
      }
    }
    if (this.adjuntos.length === 0) {
      this.adjuntosError = 'Debe adjuntar al menos un archivo válido.';
    }
    if (this.fileInput?.nativeElement) {
      this.fileInput.nativeElement.value = '';
    }
  }

  removeAdjunto(index: number) {
    this.adjuntos.splice(index, 1);
    if (this.adjuntos.length === 0) {
      this.adjuntosError = 'Debe adjuntar al menos un archivo válido.';
    }
  }

  validateFile(file: File): boolean {
    const allowedTypes = [
      'application/pdf',
      'application/msword',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      'image/jpeg',
      'image/png',
    ];
    const maxSize = 10 * 1024 * 1024; // 10MB
    if (!allowedTypes.includes(file.type)) {
      this.adjuntosError = 'Formato de archivo no permitido.';
      return false;
    }
    if (file.size > maxSize) {
      this.adjuntosError =
        'El archivo excede el tamaño máximo permitido (10MB).';
      return false;
    }
    return true;
  }

  campoInvalido(valor: any): boolean {
    return this.formSubmitted && (!valor || valor === '');
  }

  onDadoConocerChange(val: boolean) {
    this.model.explotacion.existe = val;
    if (!val) {
      this.model.explotacion.lugar = '';
      this.model.explotacion.fecha = '';
    }
  }

  onSubmit() {
    this.formSubmitted = true;
    // Aquí deberías validar los obligatorios y mostrar error visual (ya lo hace el html)
    // Puedes agregar validación adicional aquí si lo deseas
    if (this.adjuntos.length === 0) {
      this.adjuntosError = 'Debe adjuntar al menos un archivo válido.';
      return;
    }
    this.isLoading = true;
    setTimeout(() => {
      this.isLoading = false;
      this.formSubmitted = false;
      // Aquí puedes procesar el modelo o redirigir
      this.router.navigate(['/solicitante/registrar']);
    }, 1500);
  }
}
