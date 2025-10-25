import { NgModule, APP_INITIALIZER } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';
import { ClipboardModule } from 'ngx-clipboard';
import { TranslateModule } from '@ngx-translate/core';
import { InlineSVGModule } from 'ng-inline-svg-2';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthService } from './modules/auth/services/auth.service';
import { environment } from 'src/environments/environment';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
// #fake-start#
import { FakeAPIService } from './api/fake-api.service';
import {FormsModule} from '@angular/forms';
import { JwtInterceptor } from './modules/auth/services/jwt.interceptor';
import { IdleService } from './api/services/idle.service';
// #fake-end#

export function appInitializer(auth: AuthService, idle: IdleService) {
  return () => new Promise<void>(resolve => {
    auth.getUserByToken().subscribe(() => {
      idle.start(3 * 60 * 1000); // 3 minutos de inactividad

      // Auto-logout por inactividad
      idle.onIdle().subscribe(() => {
        auth.logout();
        // Opcional: inyecta Router y navega a /auth/login
      });

      // Sliding refresh: si hay actividad y al access le faltan <60s, refresca
      idle.onActivity().subscribe(() => {
        const secs = auth.secondsToExpiry();
        if (secs > 0 && secs < 60) auth.refreshAccess().subscribe();
      });

      resolve();
    });
  });
}

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    TranslateModule.forRoot(),
    HttpClientModule,
    ClipboardModule,
    // #fake-start#
    environment.isMockEnabled
      ? HttpClientInMemoryWebApiModule.forRoot(FakeAPIService, {
        passThruUnknownUrl: true,
        dataEncapsulation: false,
      })
      : [],
    // #fake-end#
    AppRoutingModule,
    InlineSVGModule.forRoot(),
    NgbModule,
    SweetAlert2Module.forRoot(),
    FormsModule,
  ],
  providers: [
    {
      provide: APP_INITIALIZER,
      useFactory: appInitializer,
      multi: true,
      deps: [AuthService, IdleService],
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: JwtInterceptor,
      multi: true
    },
    provideClientHydration(),
  ],
  bootstrap: [AppComponent],
})
export class AppModule { }
