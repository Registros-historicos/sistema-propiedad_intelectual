import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, map, catchError, of, throwError } from 'rxjs';
import { environment } from '../../../environments/environment';
import { IRoleModel } from './role.service';
import { AuthService } from '../../../app/modules/auth/services/auth.service'; 


export interface DataTablesResponse {
    draw?: number;
    recordsTotal: number;
    recordsFiltered: number;
    data: any[];
}

export interface IUserModel {
    avatar?: null | string;
    created_at?: string;
    email: string;
    email_verified_at?: string;
    id: number;
    last_login_at?: null | string;
    last_login_ip?: null | string;
    name?: string;
    profile_photo_path?: null | string;
    updated_at?: string;
    password?: string;
    roles?: IRoleModel[];
    role?: string;
        // Campos adicionales para backend real
    correo?: string;
    nombre_completo?: string;
    nombre?: string;
    apellido?: string;
    puesto?: string;
    tipo_usuario?: string;
    ciudad?: string;
    estado?: string;
    direccion?: string;
    telefono?: string;
    institucion?: string;
}

@Injectable({
    providedIn: 'root'
})
export class UserService {

    ///private apiUrl = 'https://preview.keenthemes.com/starterkit/metronic/laravel/api/v1/users';
    // private apiUrl = 'http://127.0.0.1:8000/api/v1/users';
     
    private apiUrl = environment.apiUrl.replace(/\/+$/, '') + '/api/usuarios'; // API 

    constructor(private http: HttpClient,private authS: AuthService) { }

    // Métodos para  API 
    getUserByEmail(correo: string): Observable<any> {
        const headers = this.getAuthHeaders();
        
        //  URL
        const url = `${this.apiUrl}/${encodeURIComponent(correo)}/`;
        console.log('📡 Llamando a endpoint:', url);
        
        return this.http.get<any>(url, { headers }).pipe(
            catchError(error => {
                console.error('❌ Error en API:', error);
                return of(null);
            })
        );
    }

    /**updateUserByEmail(correo: string, userData: any): Observable<any> {
        return this.http.put<any>(`${this.apiUrl}/${correo}/`, userData);
    }**/

    getAllUsers(): Observable<any[]> {
        const headers = this.getAuthHeaders();
        return this.http.get<any[]>(this.apiUrl, { headers });
    }

    /**createUser(user: any): Observable<any> {
        return this.http.post<any>(this.apiUrl, user);
    }**/

    /**deleteUser(correo: string): Observable<void> {
        return this.http.delete<void>(`${this.apiUrl}/${correo}/`);
    }**/
    
    //
    getUsers(dataTablesParameters: any): Observable<DataTablesResponse> {
        const url = `${this.apiUrl}-list`;
        return this.http.post<DataTablesResponse>(url, dataTablesParameters);
    }

    getUser(id: number): Observable<IUserModel> {
        const url = `${this.apiUrl}/${id}`;
        return this.http.get<IUserModel>(url);
    }

    createUser(user: IUserModel): Observable<IUserModel> {
        return this.http.post<IUserModel>(this.apiUrl, user);
    }

    updateUser(id: number, user: IUserModel): Observable<IUserModel> {
        const url = `${this.apiUrl}/${id}`;
        return this.http.put<IUserModel>(url, user);
    }

    deleteUser(id: number): Observable<void> {
        const url = `${this.apiUrl}/${id}`;
        return this.http.delete<void>(url);
    }

        // Headers con autenticación
    private getAuthHeaders(): HttpHeaders {
        const currentUser = this.authS.currentUserValue;
        let headers = new HttpHeaders();
        
        if (currentUser && currentUser.token) {
            headers = headers.set('Authorization', `Bearer ${currentUser.token}`);
        }
        
        return headers;
    }
}