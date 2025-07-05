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
  documentos: string[];
  observaciones?: string;
  modalidadSolicitud?: string;
  nombreCompleto?: string;
  nacionalidad?: string;
  celular?: string;
  domicilio?: string;
  curpRfc?: string;
  inventorDiferente?: string;

  tituloInvencion?: string;
  campoTecnico?: string;
  estadoTecnica?: string;
  problemaTecnico?: string;
  aplicacionIndustrial?: string;

  descripcionDetallada?: string;
  ejemplosRealizacion?: string;
  reivindicaciones?: string;
  resumen?: string;

  declaracionOriginalidad?: boolean;
  declaracionVeracidad?: boolean;
  divulgacionPrevia?: string;
  detallesDivulgacion?: string;

  fechaCreacion?: Date;
  fechaActualizacion?: Date;
  usuarioCreacion?: string;
  vigencia?: number;
  pagoMantenimiento?: boolean;
  proximoPago?: Date;
}
