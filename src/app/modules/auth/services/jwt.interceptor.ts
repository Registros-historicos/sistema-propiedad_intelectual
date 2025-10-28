import { Injectable } from '@angular/core';
import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable, throwError, BehaviorSubject } from 'rxjs';
import { catchError, filter, switchMap, take } from 'rxjs/operators';
import { AuthService } from './auth.service';
import { Router } from '@angular/router';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
  private isRefreshing = false;
  private refreshTokenSubject = new BehaviorSubject<string | null>(null);

  constructor(private auth: AuthService, private router: Router) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const current = this.auth.currentUserValue;
    let authReq = req;

    if (current?.token) {
      authReq = req.clone({
        setHeaders: { Authorization: `Bearer ${current.token}` },
      });
    }

    return next.handle(authReq).pipe(
      catchError((err: HttpErrorResponse) => {
        if (err.status === 401 || err.status === 403 || err.status === 400) {
            return this.handle401Error(authReq, next);
            }


        return throwError(() => err);
      })
    );
  }

  private handle401Error(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (!this.isRefreshing) {
      this.isRefreshing = true;
      this.refreshTokenSubject.next(null);

      return this.auth.refreshAccess().pipe(
        switchMap((newToken) => {
          this.isRefreshing = false;

          if (!newToken) {
            this.forceLogout();
            return throwError(() => new Error('No se pudo refrescar el token'));
          }

          this.refreshTokenSubject.next(newToken);

          const cloned = req.clone({
            setHeaders: { Authorization: `Bearer ${newToken}` },
          });
          return next.handle(cloned);
        }),
        catchError((error) => {
          this.isRefreshing = false;
          this.forceLogout();
          return throwError(() => error);
        })
      );
    } else {
      return this.refreshTokenSubject.pipe(
        filter((token) => token != null),
        take(1),
        switchMap((token) => {
          const cloned = req.clone({
            setHeaders: { Authorization: `Bearer ${token}` },
          });
          return next.handle(cloned);
        })
      );
    }
  }

  private forceLogout() {
    this.auth.logout();
    this.router.navigate(['/auth/login']);
  }
}

/*

import { Injectable } from '@angular/core';
import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable, throwError, BehaviorSubject } from 'rxjs';
import { catchError, filter, switchMap, take } from 'rxjs/operators';
import { AuthService } from './auth.service';
import { Router } from '@angular/router';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
  private isRefreshing = false;
  private refreshTokenSubject = new BehaviorSubject<string | null>(null);

  constructor(private auth: AuthService, private router: Router) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const current = this.auth.currentUserValue;
    let authReq = req;

    if (current?.token) {
      authReq = req.clone({
        setHeaders: { Authorization: `Bearer ${current.token}` },
      });
    }

    return next.handle(authReq).pipe(
      catchError((err: HttpErrorResponse) => {
        if (err.status === 401 || err.status === 403 || err.status === 400) {
            return this.handle401Error(authReq, next);
            }


        return throwError(() => err);
      })
    );
  }

  private handle401Error(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (!this.isRefreshing) {
      this.isRefreshing = true;
      this.refreshTokenSubject.next(null);

      return this.auth.refreshAccess().pipe(
        switchMap((newToken) => {
          this.isRefreshing = false;

          if (!newToken) {
            this.forceLogout();
            return throwError(() => new Error('No se pudo refrescar el token'));
          }

          this.refreshTokenSubject.next(newToken);

          const cloned = req.clone({
            setHeaders: { Authorization: `Bearer ${newToken}` },
          });
          return next.handle(cloned);
        }),
        catchError((error) => {
          this.isRefreshing = false;
          this.forceLogout();
          return throwError(() => error);
        })
      );
    } else {
      return this.refreshTokenSubject.pipe(
        filter((token) => token != null),
        take(1),
        switchMap((token) => {
          const cloned = req.clone({
            setHeaders: { Authorization: `Bearer ${token}` },
          });
          return next.handle(cloned);
        })
      );
    }
  }

  private forceLogout() {
    this.auth.logout();
    this.router.navigate(['/auth/login']);
  }
}


*/