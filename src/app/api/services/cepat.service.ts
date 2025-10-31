import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
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
  id_usuario?: number | null;
}
export interface Estado {
  id_entidad_federativa: number;
  nombre_entidad: string;
}

export interface Institucion {
  id_institucion: number;
  nombre_institucion: string;
  nombre_entidad_federativa: string;
}

@Injectable({
  providedIn: 'root',
})
export class CepatService {
  constructor(private http: HttpClient) {}

  createNewUserCepat(usuario: UserCepat): Observable<UserCepat> {
    return this.http.post<UserCepat>('/api/usuarios/', usuario).pipe(
      catchError((error: any) => {
        const mensaje =
          error?.error?.message || error.message || 'Error desconocido';
        return throwError(() => new Error(mensaje));
      })
    );
  }

  createNewCepat(nameCepat: string): Observable<Cepat> {
    return this.http.post<Cepat>('/api/cepat/', { nombre: nameCepat }).pipe(
      catchError((error: any) => {
        const mensaje =
          error?.error?.message || error.message || 'Error desconocido';
        return throwError(() => new Error(mensaje));
      })
    );
  }

  getCepatUserByType(userType: number): Observable<UserCepat[]> {
    return this.http.get<UserCepat[]>(`/api/usuarios/tipo/${userType}/`).pipe(
      map((data) => {
        return data;
      }),
      catchError((error) => {
        return of([]);
      })
    );
  }

  getAllCepat(): Observable<Cepat[]> {
    return this.http.get<Cepat[]>('/api/cepat/').pipe(
      map((data) => {
        return data;
      }),
      catchError(() => {
        return of([]);
      })
    );
  }

  getEstados(): Observable<Estado[]> {
    return this.http.get<Estado[]>('api/parametrizaciones/estados/').pipe(
      map((data) => data),
      catchError(() => of([]))
    );
  }

  getInstitucionesPorEstado(idEstado: number): Observable<Institucion[]> {
    const url = `/api/parametrizaciones/instituciones/estado/${idEstado}/`;
    return this.http.get<Institucion[]>(url).pipe(
      map((data) => data),
      catchError(() => of([]))
    );
  }

  actualizarInstitucionByIdCepat(idInstitucion: number, idCepat: number): Observable<any> {
    const url = `/api/institucion/${idInstitucion}/actualizar-id-cepat/`;
    const body = { id_cepat: idCepat };
    return this.http.put(url, body).pipe(
      map(() => ({ status: 200, message: 'Actualización exitosa' })),
      catchError((error) => {
        const mensaje =
          error?.error?.message ||
          error.message ||
          'Error al actualizar el id_cepat';
        return throwError(() => new Error(mensaje));
      })
    );
  }

  updateCepatById(idCepat: number, idUsuario: number): Observable<any> {
    const url = `/api/cepat/${idCepat}/`;
    const body = { id_usuario: idUsuario };
    return this.http.patch(url, body).pipe(
      map(() => ({ status: 200, message: 'Actualización de CEPAT exitosa' })),
      catchError((error) => {
        const mensaje =
          error?.error?.message ||
          error.message ||
          'Error al actualizar el id_usuario del CEPAT';
        return throwError(() => new Error(mensaje));
      })
    );
  }
}
