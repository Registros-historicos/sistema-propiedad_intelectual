export interface IPatentModel {
  // ========================================
  // CAMPOS DEL BACKEND (PRIORITARIOS)
  // ========================================
  id_registro?: number;
  no_expediente?: string;
  titulo?: string;
  tipo_ingreso_param?: string;
  rama_param?: string;
  fec_expedicion?: string;
  observaciones?: string;
  archivo?: string;
  estatus_param?: string;
  medio_ingreso_param?: string;
  tipo_registro_param?: string;
  fec_solicitud?: string;
  descripcion?: string;
  tipo_sector_param?: string;
  
  // ========================================
  // CAMPOS EXISTENTES (FRONTEND)
  // ========================================
  id: number;
  solicitudId: string;
  nombrePatente: string;
  solicitante: string;
  fechaSolicitud: string;
  estatus: 'Registrada' | 'En trámite' | 'Trámite con observaciones' | 'Aprobada' | 'Concluida';
  institucion: string;
  correo: string;
  documentos: string[];

  // ========================================
  // CAMPOS ADICIONALES DEL FORMULARIO
  // ========================================
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

// Respuesta de paginación del backend
export interface IPaginatedPatentsResponse {
  total: number;
  page: number;
  limit: number;
  results: IPatentModel[];
}