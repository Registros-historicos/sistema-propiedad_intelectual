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
    observaciones?: string;

}
