export interface IAplicantModel {
    id: number;
    titulo: string;
    solicitante: string;
    autor: string;
    fechaSolicitud: string;
    estado: 'Registrada' | 'En trámite' | 'Trámite con observaciones' | 'Aprobada' | 'Concluida';
    descripcion: string;
    institucion: string;
    correo: string;
    documentos?: string[];
}