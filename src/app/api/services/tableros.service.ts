
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
    return this.http.get<CategoriaInvestigador[]>('/api/tableros/investigadores/categorias/');
  }
  
   getRegisterStatus(): Observable<any[]> {
    return this.http.get<any[]>('/api/tableros/registros/estatus');
  }

   //Método para Registro por Sectores
  getRegisterSector(): Observable<any[]> {
    return this.http.get<any[]>('/api/tableros/sectores/actividad');
  }
}