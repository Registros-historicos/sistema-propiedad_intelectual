import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

export interface Users {
  id_usuario: number;
  nombre: string;
  ape_pat: string;
  ape_mat: string;
  url_foto: string;
  correo: string;
  telefono: string;
  tipo_usuario_param: number;
  estatus: number;
}

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  private baseUrl: string = '/api/usuarios/';

  constructor(private http: HttpClient) {}

  getAllUsers(): Observable<Users[]> {
    return this.http.get<Users[]>(this.baseUrl).pipe(
      map((data) => data),
      catchError(() => {
        return of([]);
      })
    );
  }

  getUserByEmail(email: string): Observable<Users | null> {
    const url = `${this.baseUrl}${encodeURIComponent(email)}/`;

    return this.http.get<Users>(url).pipe(
      map((user) => user),
      catchError((error) => {
        console.error('Error obteniendo usuario:', error);
        return of(null);
      })
    );
  }

  //en OverviewComponent
  getMyProfileCompleto(): Observable<any> {
    const url = `${this.baseUrl}me/profile/`;
    return this.http.get<any>(url).pipe(
      catchError((error) => {
        console.error('Error obteniendo perfil completo:', error);
        return of(null);
      })
    );
  }

  updateUserByEmail(email: string, updatedUser: Partial<Users>): Observable<Users> {
    return this.http.put<Users>(`${this.baseUrl}${email}/`, updatedUser).pipe(
      map((data) => data),
      catchError((error: any) => {
        const mensaje =
          error?.error?.message ||
          error.message ||
          'Error desconocido al actualizar el usuario';
        return throwError(() => new Error(mensaje));
      })
    );
  }

  deleteUserById(idUsuario: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}delete/${idUsuario}/`).pipe(
      catchError((error: any) => {
        const mensaje =
          error?.error?.message ||
          error.message ||
          'Error desconocido al eliminar el usuario';
        return throwError(() => new Error(mensaje));
      })
    );
  }
}
