export interface ICopyrightModel {
    id: number;
    solicitudId: string;
    nombreObra: string;
    solicitante: string;
    autor: string;
    fechaSolicitud: string;
    estado: 'Registrada' | 'En trámite' | 'Trámite con observaciones' | 'Aprobada' | 'Concluida';
    descripcion: string;
    institucion: string;
    correo: string;
    documentos?: string[];
}
