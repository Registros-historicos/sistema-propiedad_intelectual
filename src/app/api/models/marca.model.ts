export interface ProductoServicio {
  clase: number;
  descripcion: string;
}

export interface Titular {
  nombre: string;
  direccion: string;
  pais: string;
}

export interface Tramite {
  imagen?: string;
  folioEntrada: number;
  anioRecepcion: number;
  descripcion: string;
  inicio?: string;
  conclusion?: string;
}

export interface DatosMarca {
  denominacion: string;
  expediente?: number;
  registro?: number;
  fechaPresentacion: string;
  fechaConcesion?: string;
  fechaTerminacion?: string;
  tipoSolicitud: string;
  inicioUso?: string;
  marca: string;
  productosServicios: ProductoServicio[];
  titular: string;
  tramites?: Tramite[];
}
