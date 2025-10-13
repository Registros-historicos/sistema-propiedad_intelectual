
import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { IPatentModel } from '../models/patent.model';

export interface IPaginatedPatentsResponse {
  total: number;
  page: number;
  limit: number;
  results: any[];
}

@Injectable({
  providedIn: 'root'
})
export class PatentsService {
  private apiUrl = '/api/registros';
  private readonly TIPO_PATENTE = '44'; // IMPI

  constructor(private http: HttpClient) { 
    console.log('✅ PatentsService inicializado - CONECTADO AL BACKEND REAL');
  }

  /**
   * 🔥 NUEVO: Obtener patentes con paginación desde el backend
   */
  public getPatents(tableParams: any): Observable<any> {
    console.log('🔵 getPatents llamado con parámetros:', tableParams);
    
    const page = Math.floor((tableParams.start || 0) / (tableParams.length || 10)) + 1;
    const limit = tableParams.length || 10;
    const searchValue = tableParams.search?.value || '';

    // Si hay búsqueda, usar endpoint de búsqueda
    if (searchValue && searchValue.trim() !== '') {
      console.log('🔍 Buscando:', searchValue);
      return this.searchPatents(searchValue, page, limit).pipe(
        map(response => this.formatForDataTables(response, tableParams.draw))
      );
    }

    // Listar normal
    console.log('📋 Listando página:', page, 'límite:', limit);
    return this.listPatents(page, limit).pipe(
      map(response => this.formatForDataTables(response, tableParams.draw))
    );
  }

  /**
   * 🔥 Listar patentes
   */
/**
 * 🔥 Listar patentes
 */
private listPatents(page: number = 1, limit: number = 10): Observable<IPaginatedPatentsResponse> {
  const params = new HttpParams()
    .set('tipo', this.TIPO_PATENTE)
    .set('page', page.toString())
    .set('limit', limit.toString());

  const url = `${this.apiUrl}/?${params.toString()}`;
  console.log('🌐 REQUEST:', url);

  return this.http.get<any>(this.apiUrl, { params }).pipe(
    map(response => {
      console.log('✅ RESPONSE RAW:', response);
      
      let total = 0;
      let results = [];
      
      // 🔥 PARSEAR EL FORMATO EXTRAÑO DEL BACKEND
      if (response.total !== undefined) {
        const totalValue = response.total;
        
        // Si es un string con formato "(44,IMPI,177,Patente,156)"
        if (typeof totalValue === 'string' && totalValue.includes(',')) {
          console.log('🔍 Parseando total string:', totalValue);
          
          // Extraer el último número del string
          // "(44,IMPI,177,Patente,156)" → ["44", "IMPI", "177", "Patente", "156"]
          const parts = totalValue.replace('(', '').replace(')', '').split(',');
          const lastPart = parts[parts.length - 1].trim();
          total = parseInt(lastPart, 10);
          
          console.log('✅ Total extraído:', total);
        } 
        // Si ya es un número
        else if (typeof totalValue === 'number') {
          total = totalValue;
        }
        // Si es un string numérico simple "156"
        else if (typeof totalValue === 'string') {
          total = parseInt(totalValue, 10);
        }
        
        results = response.results || [];
      }
      // Formato Django Rest Framework
      else if (response.count !== undefined) {
        total = response.count;
        results = response.results || [];
      }
      // Array directo
      else if (Array.isArray(response)) {
        total = response.length;
        results = response;
      }
      
      console.log('📊 Total de registros:', total);
      console.log('📊 Registros en esta página:', results.length);
      
      // 🔥 VALIDAR que total sea un número válido
      if (isNaN(total) || total < 0) {
        console.error('❌ Total inválido:', total);
        total = 0;
      }
      
      return {
        total: total,
        page: page,
        limit: limit,
        results: results
      };
    })
  );
}

  /**
   * 🔥 Buscar patentes
   */
  private searchPatents(query: string, page: number = 1, limit: number = 10): Observable<IPaginatedPatentsResponse> {
    const params = new HttpParams()
      .set('tipo', this.TIPO_PATENTE)
      .set('q', query)
      .set('page', page.toString())
      .set('limit', limit.toString());

    return this.http.get<IPaginatedPatentsResponse>(`${this.apiUrl}/search/`, { params });
  }

  /**
/**
 * Formatear respuesta para DataTables
 */
private formatForDataTables(response: IPaginatedPatentsResponse, draw: number): any {
  console.log('📊 Formateando para DataTables:', response);
  console.log('📊 Total:', response.total);
  console.log('📊 Resultados:', response.results?.length);
  
  const formattedData = {
    draw: draw,
    recordsTotal: response.total || 0,
    recordsFiltered: response.total || 0,
    data: (response.results || []).map(patent => this.mapBackendToFrontend(patent))
  };
  
  console.log('✅ Datos formateados:', formattedData);
  console.log('✅ recordsTotal:', formattedData.recordsTotal);
  console.log('✅ data length:', formattedData.data.length);
  
  return formattedData;
}
/**
 * 🔥 Mapear campos del backend al modelo frontend
 * Basado en el JSON real del Swagger
 */
private mapBackendToFrontend(backendPatent: any): IPatentModel {
  console.log('🔄 Mapeando registro:', backendPatent.id_registro);
  
  return {
    // ========================================
    // CAMPOS BÁSICOS DEL MODELO
    // ========================================
    id: backendPatent.id_registro || 0,
    solicitudId: backendPatent.no_expediente?.toString() || 'N/A',
    nombrePatente: backendPatent.titulo || 'Sin título',
    solicitante: backendPatent.solicitante || 'TecNM',
    institucion: backendPatent.institucion || 'N/A',
    correo: backendPatent.correo || 'N/A',
    
    // 🔥 Convertir fecha ISO a formato YYYY-MM-DD
    fechaSolicitud: backendPatent.fec_solicitud 
      ? backendPatent.fec_solicitud.split('T')[0]
      : '',
    
    estatus: this.mapEstatus(backendPatent.estatus),
    descripcion: backendPatent.descripcion || '',
    documentos: backendPatent.archivo ? [backendPatent.archivo] : [],
    observaciones: backendPatent.observaciones || '',
    
    // ========================================
    // 🔥 CAMPOS ADICIONALES PARA EL MODAL
    // ========================================
    rama: backendPatent.rama || 'Invención',
    numeroExpediente: backendPatent.no_expediente?.toString() || 'N/A',
    numeroTitulo: backendPatent.id_registro?.toString() || 'N/A',
    denominacion: backendPatent.titulo || 'Sin título',
    
    // 🔥 NUEVOS CAMPOS MAPEADOS
    medioIngreso: backendPatent.medio_ingreso || 'N/A',
    tipoSector: backendPatent.tipo_sector || 'N/A',
    
    // Campos que el backend NO envía - valores por defecto
    tecnologicoOrigen: 'Instituto Tecnológico',
    cePat: 'N/A',
    anioRenovacion: 'N/A',
    sector: 'N/A',
    subsector: 'N/A',
    
    // 🔥 Fecha de expedición (puede ser null en el backend)
    fechaExpedicion: backendPatent.fec_expedicion 
      ? backendPatent.fec_expedicion.split('T')[0]
      : 'Pendiente',
    
    archivo: backendPatent.archivo || '',
    
    // 🔥 Campos extra del backend que podemos usar
    tipoIngreso: backendPatent.tipo_ingreso || 'IMPI',
    tipoRegistro: backendPatent.tipo_registro || 'IMPI',
    
  } as any;
}
  /**
   * Mapear estatus
   */
/**
 * Mapear estatus del backend al frontend
 */
private mapEstatus(estatusParam: string): IPatentModel['estatus'] {
  console.log('🔍 Estatus recibido del backend:', estatusParam);
  
  const estatusMap: { [key: string]: IPatentModel['estatus'] } = {
    'Confirmada': 'Registrada',
    'Pendiente': 'En trámite',
    'En revisión': 'Trámite con observaciones',
    'Aprobada': 'Aprobada',
    'Concluida': 'Concluida',
    'En espera de validación': 'En trámite',
    'Cancelada': 'En trámite'

  };
  
  // Si no está en el mapa, usar el valor original o 'En trámite' por defecto
  const mapped = estatusMap[estatusParam] || estatusParam || 'En trámite';
  
  console.log('✅ Estatus mapeado:', mapped);
  
  return mapped;
}

  /**
   * 🔥 Obtener una patente por ID
   */
/**
 * 🔥 Obtener una patente por ID
 */
public getPatent(id: number): Observable<IPatentModel> {
  console.log('🔍 Obteniendo patente ID:', id);
  
  return this.http.get<any>(`${this.apiUrl}/${id}/`).pipe(
    map(patent => {
      console.log('✅ Patente obtenida del backend:', patent);
      const mapped = this.mapBackendToFrontend(patent);
      console.log('✅ Patente mapeada:', mapped);
      return mapped;
    })
  );
}

  /**
   * 🔥 Crear nueva patente
   */
  public createPatent(patent: IPatentModel): Observable<IPatentModel> {
    const backendData = this.mapFrontendToBackend(patent);
    return this.http.post<any>(this.apiUrl, backendData).pipe(
      map(response => this.mapBackendToFrontend(response))
    );
  }

  /**
   * 🔥 Actualizar patente
   */
/**
 * 🔥 Actualizar patente - CORREGIDO
 */
public updatePatent(id: number, patent: IPatentModel): Observable<IPatentModel> {
  console.log('🔄 Actualizando patente ID:', id);
  
  const backendData = this.mapFrontendToBackend(patent);
  
  return this.http.put<any>(`${this.apiUrl}/${id}/`, backendData).pipe(
    map(response => {
      console.log('✅ Respuesta de actualización:', response);
      return this.mapBackendToFrontend(response);
    })
  );
}

  /**
   * 🔥 Eliminar (deshabilitar) patente
   */
  public deletePatent(id: number): Observable<void> {
    return this.http.patch<void>(`${this.apiUrl}/${id}/disable`, {});
  }

  /**
   * Mapear del frontend al backend
   */
  private mapFrontendToBackend(patent: IPatentModel): any {
  console.log('🔄 Mapeando frontend->backend:', patent);
  
  // 🔥 MAPEO CORREGIDO DE ESTATUS
  const estatusMapInverso: { [key: string]: string } = {
    'Registrada': 'Femenino',      // ← El backend espera "Femenino" para "Registrada"
    'En trámite': 'Masculino',     // ← El backend espera "Masculino" para "En trámite"  
    'Trámite con observaciones': 'En revisión',
    'Aprobada': 'Aprobada',
    'Concluida': 'Concluida'
  };

  const payload = {
    no_expediente: patent.solicitudId || patent.no_expediente,
    titulo: patent.nombrePatente || patent.titulo,
    tipo_ingreso_param: '2', // IMPI
    id_usuario: 1, // Esto debería venir del usuario autenticado
    rama_param: this.mapRamaToBackend(patent.rama_param || 'Invención'),
    fec_expedicion: patent.fec_expedicion || new Date().toISOString().split('T')[0],
    observaciones: patent.observaciones || '',
    archivo: patent.archivo || (patent.documentos?.[0] || ''),
    estatus_param: estatusMapInverso[patent.estatus] || patent.estatus,
    medio_ingreso_param: this.mapMedioIngresoToBackend(patent.medio_ingreso_param || 'VENTANILLA'),
    tipo_registro_param: this.TIPO_PATENTE,
    fec_solicitud: patent.fechaSolicitud,
    descripcion: patent.descripcion || '',
    tipo_sector_param: this.mapSectorToBackend(patent.tipo_registro_param || 'Quinario'),
    institucion: patent.institucion || ''
  };

  console.log('📤 Payload para backend:', payload);
  return payload;
}

/**
 * Mapear rama al formato del backend
 */
private mapRamaToBackend(rama: string): string {
  const ramaMap: { [key: string]: string } = {
    'Invención': '1',
    'Modelo de utilidad': '2', 
    'Diseño industrial': '3',
    'Marca': '4'
  };
  return ramaMap[rama] || '1';
}

/**
 * Mapear medio de ingreso al formato del backend
 */
private mapMedioIngresoToBackend(medioIngreso: string): string {
  const medioMap: { [key: string]: string } = {
    'VENTANILLA': '1',
    'Indautor': '2',
    'Cuenta Pase IMPI': '3'
  };
  return medioMap[medioIngreso] || '1';
}

/**
 * Mapear tipo de sector al formato del backend  
 */
private mapSectorToBackend(tipoSector: string): string {
  const sectorMap: { [key: string]: string } = {
    'Primario': '1',
    'Secundario': '2',
    'Terciario': '3',
    'Cuaternario': '4',
    'Quinario': '5'
  };
  return sectorMap[tipoSector] || '5';
}

  // MÉTODOS ADICIONALES
  public updatePatentStatus(patentId: number, newStatus: IPatentModel['estatus']): Observable<any> {
    return this.updatePatent(patentId, { estatus: newStatus } as IPatentModel);
  }

  public updatePatentObservations(patentId: number, observations: string): Observable<any> {
    return this.updatePatent(patentId, { observaciones: observations } as IPatentModel);
  }

  public updatePatentStatusAndObservations(
    patentId: number, 
    data: {
      estatus?: IPatentModel['estatus'],
      observaciones?: string
    }
  ): Observable<any> {
    return this.getPatent(patentId).pipe(
      switchMap(patent => {
        const updatedPatent = {
          ...patent,
          ...(data.estatus && { estatus: data.estatus }),
          ...(data.observaciones !== undefined && { observaciones: data.observaciones })
        };
        return this.updatePatent(patentId, updatedPatent);
      }),
      map(updatedPatent => ({
        success: true,
        message: 'Patente actualizada correctamente',
        patent: updatedPatent
      }))
    );
  }

  public getAllPatents(): Observable<IPatentModel[]> {
    return this.listPatents(1, 1000).pipe(
      map(response => response.results.map(p => this.mapBackendToFrontend(p)))
    );
  }

  public getPatentsStats(): Observable<any> {
    return this.getAllPatents().pipe(
      map(patents => ({
        total: patents.length,
        enTramite: patents.filter(p => p.estatus === 'En trámite').length,
        aprobadas: patents.filter(p => p.estatus === 'Aprobada').length,
        registradas: patents.filter(p => p.estatus === 'Registrada').length,
        concluidas: patents.filter(p => p.estatus === 'Concluida').length,
        conObservaciones: patents.filter(p => p.estatus === 'Trámite con observaciones').length
      }))
    );
  }

  
}