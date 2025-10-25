import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

// Define una interfaz para el modelo de usuario, para tener un tipado fuerte.
export interface UserCepat {
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

export interface Cepat{
  id_cepat: number
  nombre: string
}

@Injectable({
  providedIn: 'root',
})
export class CepatService {
  constructor(private http: HttpClient) {}
  private token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI1MTAiLCJjb3JyZW8iOiJhZG1pbkB0ZXN0LmNvbSIsInRpcG9fdXN1YXJpb19wYXJhbSI6MzUsImVzdGF0dXMiOm51bGwsIm5vbWJyZSI6ImFkbWluIiwiaWF0IjoxNzYxNDI1OTE3LCJleHAiOjE3NjE0MjYyMTd9.KUjLRbDJ8AyOncaLyDY9kzI6rMjqZhx6HfVMnZnym6s';

  /**
   * Envía una petición POST para crear un nuevo usuario.
   * @param usuario El objeto con los datos del nuevo usuario.
   * @returns Un Observable con la respuesta de la API.
   */
  // createNewUserCepat(usuario: UserCepat): Observable<UserCepat> {
  //   return this.http.post<UserCepat>("/api/usuarios/", usuario).pipe(
  //     catchError((error: any) => {
  //       const mensaje = error?.error?.message || error.message || 'Error desconocido';
  //       return throwError(() => new Error(mensaje));
  //     })
  //   );
  // }

  createNewUserCepat(usuario: UserCepat): Observable<UserCepat> {
    // 👇 Configuración de cabeceras
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${this.token}`, // <- el token se pasa aquí
    });

    return this.http.post<UserCepat>('/api/usuarios/', usuario, { headers }).pipe(
      catchError((error: any) => {
        const mensaje =
          error?.error?.message || error.message || 'Error desconocido';
        return throwError(() => new Error(mensaje));
      })
    );
  }

  createNewCepat(nameCepat: string): Observable<Cepat> {
    // 👇 Configuración de cabeceras
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${this.token}`, // <- el token se pasa aquí
    });

    return this.http.post<Cepat>('/api/cepat/', { nombre: nameCepat }, { headers }).pipe(
      catchError((error: any) => {
        const mensaje =
          error?.error?.message || error.message || 'Error desconocido';
        return throwError(() => new Error(mensaje));
      })
    );
  }
}
