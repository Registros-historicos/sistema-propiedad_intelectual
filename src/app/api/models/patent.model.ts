export interface Inventor {
  curp: string;
  nombreCompleto: string;
  sexo: 'M' | 'F' | '';
  tipoInvestigador: string;
  institucion: string;
  programaEducativo: string;
  cuerpoAcademico: string;
  departamento: string;
  fechaAfiliacion: string; // YYYY-MM-DD
  fechaFin: string;        // YYYY-MM-DD
}

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

export type PatenteUIModel = IPatentModel & {
  numeroExpediente?: string;
  numeroTitulo?: string;
  denominacion?: string; // alias de nombrePatente
  rama?: string;
  medioIngreso?: string;
  tecnologicoOrigen?: string;
  cePat?: string;
  anioRenovacion?: string;
  tipoSector?: string;
  sector?: string;
  subsector?: string;
  fechaExpedicion?: string;
  archivo?: string;
  observaciones?: string;
  descripcion?: string;
  inventores?: Inventor[];
  id_institucion?: number | null;  // ID de la institucion (para edicion)
  id_cepat?: number | null;        // ID del CePat (para edicion)
  id_subsector?: number | null;    // ID del subsector (para cascada de sectores)
  sector_param?: number | null;    // ID de sector (si se recibe desde el backend)
  tipo_sector_param?: number | string | null; // ID de tipo de sector
};

// Respuesta de paginación del backend
export interface IPaginatedPatentsResponse {
  total: number;
  page: number;
  limit: number;
  results: IPatentModel[];
}

// Respuesta de paginación del backend
export interface IPaginatedPatentsResponse {
  total: number;
  page: number;
  limit: number;
  results: IPatentModel[];
}