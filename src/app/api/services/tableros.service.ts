
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

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
    return this.http.get<any[]>('/api/tableros/entidades/top10');
  }

  getTopInstitutions(): Observable<any[]> {
    return this.http.get<any[]>('/api/tableros/instituciones/top10');
  }

  // NUEVO MÉTODO PARA CATEGORÍAS DE INVESTIGADORES
  getCategoriasInvestigadores(): Observable<CategoriaInvestigador[]> {
    return this.http.get<CategoriaInvestigador[]>('/api/tableros/investigadores/categorias');
  }
  
   getRegisterStatus(): Observable<any[]> {
    return this.http.get<any[]>('/api/tableros/registros/estatus');
  }

   //Método para Registro por Sectores
  getRegisterSector(): Observable<any[]> {
    return this.http.get<any[]>('/api/tableros/sectores/actividad');
  }
  //Metodo para obtener registros por sexo
  getRegistrosPorSexo(): Observable<any[]> {
    return this.http.get<any[]>('/api/tableros/investigadores/sexo');
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
getRegistrosPorPeriodo(start: string, end: string): Observable<{ mes: number; total: number }[]> {
  return this.http.get<{ mes: number; total: number }[]>(`/api/tableros/registros/periodo/?start=${start}&end=${end}`);
}



}