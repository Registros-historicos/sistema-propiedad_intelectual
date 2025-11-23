
import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

export interface CategoriaInvestigador {
  categoria: string;
  total: number;
}

export interface Instituto {
  tipo_institucion_param: number;
  nombre_tipo_institucion: string;
  nombre_institucion: string;
  total_registros: number;
  // Campos alternativos que podrían venir de la API
  total?: number;
  registros?: number;
  count?: number;
}

export interface CategoriaInvestigador {
  categoria: string;
  total: number;
}

export interface Institutions {
  id_institucion: number
  institucion_nombre: string
  total: number
  tipo_institucion: string
}

interface Institute {
  id_institucion: number;
  institucion_nombre: string;
  total: number;
}
export interface Top10Instituciones {
  id_institucion: number
  institucion_nombre: string
  total: number
}
export interface ProgramaEducativo {
  programa_educativo: string;
  total_registros: number;
}

export interface Departamento {
  departamento_param: number;
  nombre_departamento: string;
  total: number;
}

@Injectable({
  providedIn: 'root'
})
export class TablerosService {
  constructor(private http: HttpClient) {}

  getTopEntities(): Observable<Top10Instituciones[]> {
    return this.http.get<Top10Instituciones[]>('/api/tableros/entidades/top10').pipe(
      catchError(error => {
        return of([]);
      })
    );
  }

  getProgramasEducativos(): Observable<ProgramaEducativo[]> {
    return this.http.get<ProgramaEducativo[]>('/api/tableros/registros/por-programa/').pipe(
      catchError(() => {
        return of([]);
      })
    );
  }

  getTopInstitutions(): Observable<any[]> {
    return this.http.get<any[]>('/api/tableros/instituciones/top10').pipe(
      catchError(error => {
        console.error('Error en getTopInstitutions:', error);
        return of([]);
      })
    );
  }

  getCategoriasInvestigadores(): Observable<CategoriaInvestigador[]> {
    return this.http.get<CategoriaInvestigador[]>('/api/tableros/investigadores/categorias/').pipe(
      catchError(error => {
        console.error('Error en getCategoriasInvestigadores:', error);
        return of([]);
      })
    );
  }

  getRegisterStatus(): Observable<any[]> {
    return this.http.get<any[]>('/api/tableros/registros/estatus').pipe(
      catchError(error => {
        console.error('Error en getRegisterStatus:', error);
        return of([]);
      })
    );
  }

  getRegisterSector(): Observable<any[]> {
    return this.http.get<any[]>('/api/tableros/sectores/actividad/all').pipe(
      catchError(error => {
        console.error('Error en getRegisterSector:', error);
        return of([]);
      })
    );
  }

  //Get all institutions
   getAllInstitutions(): Observable<Institutions[]> {
    return this.http.get<any[]>('/api/tableros/instituciones/all/').pipe(
      map(data => this.normalizeInstitutionsData(data)),
      catchError(error => {
        console.error('Error in getAllInstitutions:', error);
        return of([]);
      })
    );
  }


  private normalizeInstitutionsData(data: Institutions[]): Institutions[] {
    if (!Array.isArray(data)) return [];
    return data.map(item => ({
      id_institucion: item.id_institucion,
      institucion_nombre: item.institucion_nombre || 'Sin nombre',
      total: item.total || 0,
      tipo_institucion: this.getTypeInstitutions(item.tipo_institucion) || 'Sin tipo'
    }));
  }

  private getTypeInstitutions(type: string): string {
    switch(type) {
      case "INSTITUTO TECNOLOGICO DESCENTRALIZADO": return 'Descentralizado';
      case "INSTITUTO TECNOLOGICO FEDERAL": return 'Federal';
      default: return 'Sin tipo';
    }
  }

  // NUEVOS MÉTODOS PARA INSTITUCIONES
  getInstitucionesAll(): Observable<Instituto[]> {
    return this.http.get<any[]>('/api/tableros/instituciones/all/').pipe(
      map(data => this.normalizeInstitutoData(data)),
      catchError(error => {
        console.error('Error en getInstitucionesAll:', error);
        return of([]);
      })
    );
  }
  //Metodo para obtener registros por sexo
  getRegistrosPorSexo(): Observable<any[]> {
    return this.http.get<any[]>('/api/tableros/investigadores/sexo');
  }

  getInstitucionesFiltradas(tipoInstitucion: number): Observable<Instituto[]> {
    let params = new HttpParams();
    if (tipoInstitucion) {
      params = params.set('tipo_institucion', tipoInstitucion.toString());
    }
    return this.http.get<any[]>('/api/tableros/instituciones/filtradas/', { params }).pipe(
      map(data => this.normalizeInstitutoData(data, tipoInstitucion)),
      catchError(error => {
        console.error('Error en getInstitucionesFiltradas:', error);
        return of([]);
      })
    );
  }

  getNewInstitucionesFiltradas(tipoInstitucion: number): Observable<Institute[]> {
    if (tipoInstitucion !== 122 && tipoInstitucion !== 123) {
      return of<Institute[]>([]);
    }

    const params = new HttpParams().set('tipo_institucion', String(tipoInstitucion));

    return this.http.get<any[]>('/api/tableros/instituciones/filtradas', { params }).pipe(
      catchError(error => {
        return of<Institute[]>([]);
      })
    )
  }

  // Método para obtener registros por mes (tablero de registros por año)
  // Se acepta un parámetro year opcional para filtrar por año en el backend
  getRegistrosPorMes(year?: number): Observable<{ mes: number; total: number }[]> {
    // El backend requiere el parámetro 'anio' en la query. Si no se provee, usamos 2025 por defecto.
    const y = year !== undefined && year !== null ? year : 2025;
    const url = `/api/tableros/registros/mes/?anio=${y}`;
    return this.http.get<{ mes: number; total: number }[]>(url);
  }

  // Método para obtener registros por periodo (trimestre o rango de fechas)
  // Nota: el backend espera primero el parámetro "fin" y luego "inicio" en la query
  getRegistrosPorPeriodo(start: string, end: string): Observable<{ mes: number; total: number }[]> {
    const url = `/api/tableros/registros/periodo/?fin=${end}&inicio=${start}`;
    return this.http.get<{ mes: number; total: number }[]>(url);
  }



  private normalizeInstitutoData(data: any[], tipoFiltro?: number): Instituto[] {
    if (!Array.isArray(data)) return [];

    console.log(`🎯 Normalizando ${data.length} items con tipoFiltro: ${tipoFiltro}`);

    return data.map((item, index) => {
      // Si hay un filtro específico, forzar ese tipo
      if (tipoFiltro === 122 || tipoFiltro === 123) {
        const tipoForzado = this.getTipoInstitucion(tipoFiltro);
        console.log(`🎯 FORZANDO tipo: ${tipoForzado} para filtro ${tipoFiltro}`);

        return {
          tipo_institucion_param: tipoFiltro,
          nombre_tipo_institucion: tipoForzado,
          nombre_institucion: item.nombre_institucion || item.institucion_nombre || 'Sin nombre',
          total_registros: item.total_registros || item.total || item.registros || item.count || 0
        };
      }

      // Para "Todas las Instituciones", determinar el tipo basado en el ID
      const tipoInstitucion = this.getTipoByInstitucionId(item.id_institucion);
      const nombreTipo = this.getTipoInstitucion(tipoInstitucion);

      console.log(`📋 Item ${index} - ID: ${item.id_institucion}, Tipo detectado: ${tipoInstitucion} (${nombreTipo})`);

      return {
        tipo_institucion_param: tipoInstitucion,
        nombre_tipo_institucion: nombreTipo,
        nombre_institucion: item.nombre_institucion || item.institucion_nombre || 'Sin nombre',
        total_registros: item.total_registros || item.total || item.registros || item.count || 0
      };
    });
  }

  // Mapeo de IDs de instituciones a sus tipos
  private getTipoByInstitucionId(idInstitucion: number): number {
    // Instituciones Federales (123) - basado en los logs
    const institucionesFederales = [212, 209, 218, 211, 214, 207];

    // Instituciones Descentralizadas (122) - basado en los logs
    const institucionesDescentralizadas = [205, 216, 203, 210, 202, 204, 215, 206, 217, 213, 208, 201];

    if (institucionesFederales.includes(idInstitucion)) {
      return 123;
    } else if (institucionesDescentralizadas.includes(idInstitucion)) {
      return 122;
    } else {
      console.warn(`⚠️ ID de institución no reconocido: ${idInstitucion}`);
      return 0;
    }
  }

  private getTipoInstitucion(tipoParam: number): string {
    switch(tipoParam) {
      case 122: return 'Descentralizado';
      case 123: return 'Federal';
      default: return 'Sin tipo';
    }
  }

  getTotalIMPIApplications(): Observable<any[]> {
    return this.http.get<any[]>('/api/tableros/solicitudes/impi/').pipe(
      catchError(error => {
        return of([]);
      })
    );
  }

  getTotalINDAUTORApplications(): Observable<any[]> {
    return this.http.get<any[]>('/api/tableros/solicitudes/indautor/').pipe(
      catchError(error => {
        return of([]);
      })
    );
  }

  getRegistrosPorPeriodoFiltro(inicio: string, fin: string): Observable<{ mes: number; total: number }[]> {
  const url = `/api/tableros/registros/periodo/?inicio=${inicio}&fin=${fin}`;
  return this.http.get<{ mes: number; total: number }[]>(url);
}
  getDepartamentos(): Observable<Departamento[]> {
    return this.http.get<Departamento[]>('/api/tableros/departamentos/').pipe(
      map(data => {
        console.log('✅ Departamentos desde backend:', data);
        return data;
      }),
      catchError(error => {
        console.error('❌ Error en getDepartamentos:', error);
        return of([]);
      })
    );
  }

}
