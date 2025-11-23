// instituciones.service.ts
import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

export interface Institucion {
    id_institucion: number;
    nombre: string;
}

@Injectable({
    providedIn: 'root'
})
export class InstitucionesService {

    private apiUrl = `${environment.apiUrl}/api/institucion`;

    constructor(private http: HttpClient) { }

    getByCepat(idCepat: number): Observable<Institucion[]> {
        const params = new HttpParams().set('id_cepat', idCepat.toString());

        return this.http.get<Institucion[]>(`${this.apiUrl}/con-cepat/`, { params });
    }
}
