export interface IDisIndModel {
    id: number;
    solicitudId: string;
    nombreDisInd: string;
    solicitante: string;
    fechaSolicitud: string;
    estatus: 'Registrada' | 'En trámite' | 'Trámite con observaciones' | 'Aprobada' | 'Concluida';
    descripcion: string;
    institucion: string;
    correo: string;
    documentos?: string[];
    modalidadSolicitud?: string;
    nombreCompleto?: string;
    nacionalidad?: string;
    celular?: string;
    domicilio?: string;
    curpRfc?: string;
    disenadorDiferente?: string;
    tipoDiseno?: string;
    claseProductos?: string;
    elementosNuevos?: string;
    caracteristicasVisuales?: string;
    resumen?: string;
    declaracionOriginalidad?: boolean;
    declaracionVeracidad?: boolean;
    divulgacionPrevia?: string;
    detallesDivulgacion?: string;
}