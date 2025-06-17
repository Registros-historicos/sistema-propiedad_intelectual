export interface IPatentModel {
    id: number;
    solicitudId: string;
    nombrePatente: string;
    solicitante: string;
    fechaSolicitud: string;
    estatus: 'Registrada' | 'En trámite' | 'Trámite con observaciones' | 'Aprobada' | 'Concluida';
    descripcion: string;
    institucion: string;
    correo: string;
    documentos?: string[];
}