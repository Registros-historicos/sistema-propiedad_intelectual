import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

export interface UserCoordinator {
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

@Injectable({
  providedIn: 'root',
})
export class CoordinatorHttpService {
  constructor(private http: HttpClient) {}

  createNewUserCoordinator(usuario: UserCoordinator): Observable<UserCoordinator> {
    return this.http.post<UserCoordinator>('/api/usuarios/', usuario).pipe(
      catchError((error: any) => {
        const mensaje =
          error?.error?.message || error.message || 'Error desconocido';
        return throwError(() => new Error(mensaje));
      })
    );
  }
}
