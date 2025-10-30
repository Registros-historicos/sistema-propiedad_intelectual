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
    return this.http.get<Users[]>(`${this.baseUrl}?correo=${email}`).pipe(
      map((users) => (users.length > 0 ? users[0] : null)),
      catchError(() => {
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
}
