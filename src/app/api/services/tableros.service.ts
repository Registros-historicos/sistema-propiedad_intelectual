
import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
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

@Injectable({
  providedIn: 'root'
})
export class TablerosService {
  constructor(private http: HttpClient) {}

  getTopEntities(): Observable<any[]> {
    return this.http.get<any[]>('/api/tableros/entidades/top10').pipe(
      catchError(error => {
        console.error('Error en getTopEntities:', error);
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

}