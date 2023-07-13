import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';


import { importProvidersFrom } from '@angular/core';
import { AppComponent } from './app/app.component';
import { AppRoutingModule } from './app/app-routing.module';
import { AuthModule } from './app/auth/auth.module';
import { BrowserModule, bootstrapApplication } from '@angular/platform-browser';
import { AuthInterceptorService } from './app/auth/auth-interceptor.service';
import { HTTP_INTERCEPTORS, withInterceptorsFromDi, provideHttpClient } from '@angular/common/http';


bootstrapApplication(AppComponent, {
    providers: [
        importProvidersFrom(BrowserModule, AuthModule, AppRoutingModule),
        { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptorService, multi: true },
        provideHttpClient(withInterceptorsFromDi())
    ]
})
  .catch(err => console.error(err));
