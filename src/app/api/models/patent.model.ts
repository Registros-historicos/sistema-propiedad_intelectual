export interface IPatentModel {
    id: number;
    solicitudId: string;
    nombrePatente: string;
    solicitante: string;
    inventor?: string;
    tipoPropiedad?: string;
    fechaSolicitud: string;
    estado: 'Registrada' | 'En trámite' | 'Trámite con observaciones' | 'Aprobada' | 'Concluida';
    descripcion: string;
    institucion: string;
    email: string;
    documentos?: string[];
}