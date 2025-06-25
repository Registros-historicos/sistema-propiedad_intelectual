export interface ICopyrightModel {
    id: number;
    solicitudId: string;
    nombreObra: string;
    solicitante: string;
    autor: string;
    fechaSolicitud: string;
    estado: string;
    descripcion: string;
    institucion: string;
    correo: string;
    documentos?: string[];
    observaciones?: string;
    modalidadSolicitud?: string;
    nacionalidad?: string;
    celular?: string;
    domicilio?: string;
    curpRfc?: string;
    rama?: string;
    esDerivada?: string;
    tipoDerivada?: string;
    datosObraPrimigenia?: string;
    urlObra?: string;
    sintesisObra?: string;
    declaracionOriginalidad?: boolean;
    declaracionVeracidad?: boolean;
    declaracionTitularidad?: boolean;
}
