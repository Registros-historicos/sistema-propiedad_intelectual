import { Injectable, OnDestroy } from '@angular/core';
import { Observable, BehaviorSubject, of, Subscription, throwError } from 'rxjs';
import { map, catchError, switchMap, finalize } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { StorageService } from 'src/app/api/Storage.service';
import { Router } from '@angular/router';

export interface LoginResponse {
  access: string;
  access_exp: string;
  refresh: string;
  refresh_exp: string;
  user: {
    id_usuario: number;
    correo: string;
    tipo_usuario_param: number;
    estatus: number | null;
    nombre: string | null;
  };
  //AGREGA contexto a la interfaz
  contexto?: {
    id_usuario: number;
    correo: string;
    rol_id: number;
    rol_nombre: string;
    id_institucion: number;
    institucion_nombre: string;
    id_cepat: number;
    cepat_nombre: string;
  };
}

enum Rol {
  ADMINISTRADOR = 1,
  COORDINADOR   = 2,
  CEPAT         = 4,
}

function mapTipoUsuarioParamToRol(tipo: number): Rol {
  if (tipo === 37) return Rol.CEPAT;
  if (tipo === 36) return Rol.COORDINADOR;
  if (tipo === 35) return Rol.ADMINISTRADOR;
  return 0 as any;
}

export interface CurrentUser {
  id: number;
  email: string; 
  name: string | null;
  roles: number[]; 
  token: string; 
  exp?: string;
  refresh?: string; 
  refresh_exp?: string;
// AGREGADO
  contexto?: {
    id_usuario: number;
    correo: string;
    rol_id: number;
    rol_nombre: string;
    id_institucion: number;
    institucion_nombre: string;
    id_cepat: number;
    cepat_nombre: string;
  };
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private currentUserSubject = new BehaviorSubject<CurrentUser | null>(null);
  private userProfileSubject = new BehaviorSubject<any>(null);
  public currentUser$ = this.currentUserSubject.asObservable();

  private readonly STORAGE_KEY = 'auth.user';

  private _isLoading$ = new BehaviorSubject<boolean>(false);
  public  isLoading$  = this._isLoading$.asObservable();
  
  setUserProfile(profile: any) {
  this.userProfileSubject.next(profile);
}

getUserProfile(): any {
  return this.userProfileSubject.value;
}

  constructor(
    private http: HttpClient,
    private store: StorageService,
    private router: Router
  ) {
    const saved = this.store.getLocal(this.STORAGE_KEY);
    if (saved) this.currentUserSubject.next(saved);
  }

  get currentUserValue(): CurrentUser | null {
    return this.currentUserSubject.value;
  }

login(email: string, password: string): Observable<CurrentUser> {
  const body = { correo: email, password };
  this._isLoading$.next(true);

  return this.http.post<LoginResponse>('/api/usuarios/auth/login/', body).pipe(
    map(res => {
      console.log('🔍 RESPUESTA COMPLETA DEL LOGIN:', res);
      const role = mapTipoUsuarioParamToRol(res.user.tipo_usuario_param);
      const user: CurrentUser = {
        id: res.user.id_usuario,
        email: res.user.correo,
        name: res.user.nombre ?? null,
        roles: role ? [role] : [],
        token: res.access,
        exp: res.access_exp,
        refresh: res.refresh,
        refresh_exp: res.refresh_exp,
        // CORRECCIÓN: Usar res.contexto directamente 
        contexto: res.contexto
      };
      this.store.setLocal(this.STORAGE_KEY, user);
      this.currentUserSubject.next(user);
      return user;
    }),
    catchError(err => {
      this.logout();
      return throwError(() => err);
    }),
    finalize(() => this._isLoading$.next(false))
  );
}

  getUserByToken(): Observable<CurrentUser | null> {
    const saved = this.store.getLocal(this.STORAGE_KEY);
    if (!saved?.token) {
      this.logout();
      return of(null);
    }
    this.currentUserSubject.next(saved);
    return of(saved);
  }

  refreshAccess(): Observable<string | null> {
    const saved = this.currentUserValue;
    if (!saved?.refresh) return of(null);
    return this.http.post<{access: string; access_exp: string}>('/api/usuarios/auth/refresh/', { refresh: saved.refresh }).pipe(
      map(r => {
        const updated: CurrentUser = { ...saved, token: r.access, exp: r.access_exp };
        this.store.setLocal(this.STORAGE_KEY, updated);
        this.currentUserSubject.next(updated);
        return r.access;
      }),
      catchError(() => { this.logout(); return of(null); })
    );
  }

  secondsToExpiry(): number {
    const expIso = this.currentUserValue?.exp;
    if (!expIso) return 0;
    const ms = new Date(expIso).getTime() - Date.now();
    return Math.floor(ms / 1000);
  }

  logout() {
    this.store.localDeleteByKey(this.STORAGE_KEY);
    this.currentUserSubject.next(null);
    this.router.navigate(['/auth/login'], {
      queryParams: {},
    });
  }

  
}
