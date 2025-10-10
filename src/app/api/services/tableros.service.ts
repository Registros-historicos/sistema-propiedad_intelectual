import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TablerosService {
  constructor(private http: HttpClient) {}

  getTopEntities(): Observable<any[]> {
    return this.http.get<any[]>('/api/tableros/entidades/top10');
  }
    // NUEVO MÉTODO PARA INSTITUCIONES
  getTopInstitutions(): Observable<any[]> {
    return this.http.get<any[]>('/api/tableros/instituciones/top10');
  }

   //Método para Registro por Estatus
  getRegisterStatus(): Observable<any[]> {
    return this.http.get<any[]>('/api/tableros/registros/estatus');
  }

   //Método para Registro por Sectores
  getRegisterSector(): Observable<any[]> {
    return this.http.get<any[]>('/api/tableros/sectores/actividad');
  }
}