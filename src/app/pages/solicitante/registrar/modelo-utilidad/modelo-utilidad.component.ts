import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-modelo-utilidad',
  templateUrl: './modelo-utilidad.component.html',
  styleUrls: ['./modelo-utilidad.component.scss'],
})
export class ModeloUtilidadComponent {
  isLoading = false;
  formSubmitted = false;

  model: any = {
    tipoSolicitante: 'fisica',
    modalidad: '',
    tipoInvencion: '',
    // Persona física
    curp: '',
    nombres: '',
    primerApellido: '',
    segundoApellido: '',
    nacionalidadFisica: '',
    telefonoFisica: '',
    correoFisica: '',
    // Persona moral
    rfc: '',
    razonSocial: '',
    nacionalidadMoral: '',
    telefonoMoral: '',
    correoMoral: '',
    // Domicilio
    cp: '',
    calle: '',
    numExterior: '',
    numInterior: '',
    colonia: '',
    municipio: '',
    localidad: '',
    entidadFederativa: '',
    entreCalles: '',
    pais: '',
    callePosterior: '',
    // Datos de la invención
    tituloInvencion: '',
    campoTecnico: '',
    estadoTecnica: '',
    problemaTecnico: '',
    descripcionDetallada: '',
    ejemplosRealizacion: '',
    aplicacionIndustrial: '',
    reivindicaciones: '',
    tituloDiseno: '',
    // Documentos y declaraciones
    formatoOficial: '',
    descripcionTecnica: '',
    resumen: '',
    declaracionOriginalidad: '',
    pagoDerechos: '',
    traduccion: '',
    originalCopia: '',
    documentosAdicionales: {
      poderNotarial: false,
      cesionDerechos: false,
      prioridadExtranjera: false,
      divulgacionPrevia: false,
    },
  };

  formError: string | null = null;

  constructor(private router: Router) {}

  onSubmit() {
    this.formSubmitted = true;
    this.formError = null;

    // Validación básica obligatoria
    if (!this.model.modalidad || !this.model.tipoInvencion) {
      this.formError = 'Selecciona la modalidad y el tipo de invención.';
      return;
    }
    if (this.model.tipoSolicitante === 'fisica') {
      if (
        !this.model.nombres ||
        !this.model.primerApellido ||
        !this.model.nacionalidadFisica ||
        !this.model.telefonoFisica
      ) {
        this.formError =
          'Completa todos los campos obligatorios de persona física.';
        return;
      }
    } else {
      if (
        !this.model.razonSocial ||
        !this.model.nacionalidadMoral ||
        !this.model.telefonoMoral
      ) {
        this.formError =
          'Completa todos los campos obligatorios de persona moral.';
        return;
      }
    }
    if (
      !this.model.cp ||
      !this.model.calle ||
      !this.model.numExterior ||
      !this.model.colonia ||
      !this.model.municipio ||
      !this.model.localidad ||
      !this.model.entidadFederativa ||
      !this.model.pais
    ) {
      this.formError = 'Completa todos los campos obligatorios del domicilio.';
      return;
    }
    if (
      this.model.tipoInvencion === 'patente' ||
      this.model.tipoInvencion === 'modelo_utilidad'
    ) {
      if (
        !this.model.tituloInvencion ||
        !this.model.campoTecnico ||
        !this.model.estadoTecnica ||
        !this.model.problemaTecnico ||
        !this.model.descripcionDetallada ||
        !this.model.ejemplosRealizacion ||
        !this.model.aplicacionIndustrial ||
        !this.model.reivindicaciones
      ) {
        this.formError = 'Completa todos los campos de invención.';
        return;
      }
    }
    if (this.model.tipoInvencion === 'diseno_industrial') {
      if (!this.model.tituloDiseno) {
        this.formError = 'Completa los campos del diseño industrial.';
        return;
      }
    }
    if (
      !this.model.formatoOficial ||
      !this.model.descripcionTecnica ||
      !this.model.resumen ||
      !this.model.declaracionOriginalidad ||
      !this.model.pagoDerechos ||
      !this.model.originalCopia
    ) {
      this.formError =
        'Completa todos los campos obligatorios de documentos y declaraciones.';
      return;
    }
    // Simula envío
    this.isLoading = true;
    setTimeout(() => {
      this.isLoading = false;
      this.router.navigate(['/solicitante/registrar']);
    }, 1500);
  }

  // Función de ayuda para saber si mostrar error visual
  campoInvalido(valor: any): boolean {
    return this.formSubmitted && (!valor || valor === '');
  }
}
