// instituciones.service.ts
import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

export interface Institucion {
    id_institucion: number;
    nombre: string;

    // Estos campos los expone el serializer del backend (serializer.py)
    id_cepat?: number | null;
    ent_federativa_param?: number | null;
    tipo_institucion_param?: number | null;
    ciudad_param?: number | null;
}

@Injectable({
    providedIn: 'root'
})
export class InstitucionesService {

    private apiUrl = `${environment.apiUrl}/api/institucion`;

    constructor(private http: HttpClient) { }

    /**
     * 🔹 Obtiene TODAS las instituciones.
     * El backend devuelve, entre otros:
     *  - id_institucion
     *  - nombre
     *  - id_cepat
     */
    getAll(): Observable<Institucion[]> {
        return this.http.get<Institucion[]>(`${this.apiUrl}/`);
    }

    /**
     * 🔹 Se mantiene por compatibilidad si en otro lado
     * aún usan el endpoint filtrado por CEPat.
     */
    getByCepat(idCepat: number): Observable<Institucion[]> {
        const params = new HttpParams().set('id_cepat', idCepat.toString());
        return this.http.get<Institucion[]>(`${this.apiUrl}/con-cepat/`, { params });
    }
}
