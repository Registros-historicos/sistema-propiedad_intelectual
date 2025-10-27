import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

export interface UserCepat {
  id_usuario?: number;
  nombre: string;
  ape_pat: string;
  ape_mat: string;
  url_foto: string;
  correo: string;
  password?: string;
  telefono: string;
  tipo_usuario_param: number;
  estatus: number;
}

export interface Cepat {
  id_cepat: number;
  nombre: string;
}

@Injectable({
  providedIn: 'root',
})
export class CepatService {
  constructor(private http: HttpClient) {}
  createNewUserCepat(usuario: UserCepat): Observable<UserCepat> {
    return this.http.post<UserCepat>("/api/usuarios/", usuario).pipe(
      catchError((error: any) => {
        const mensaje = error?.error?.message || error.message || 'Error desconocido';
        return throwError(() => new Error(mensaje));
      })
    );
  }

  createNewCepat(nameCepat: string): Observable<Cepat> {
    return this.http
      .post<Cepat>('/api/cepat/', { nombre: nameCepat })
      .pipe(
        catchError((error: any) => {
          const mensaje =
            error?.error?.message || error.message || 'Error desconocido';
          return throwError(() => new Error(mensaje));
        })
      );
  }

  getCepatUserByType(userType: number): Observable<UserCepat[]> {
    return this.http
      .get<UserCepat[]>(`/api/usuarios/tipo/${userType}/`)
      .pipe(
        map((data) => {
          return data;
        }),
        catchError((error) => {
          console.error('❌ Error en getCepatUserByType:', error);
          return of([]);
        })
      );
  }
}
