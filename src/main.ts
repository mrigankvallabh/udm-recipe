import { HTTP_INTERCEPTORS, provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { importProvidersFrom } from '@angular/core';
import { BrowserModule, bootstrapApplication } from '@angular/platform-browser';
import { AppRoutingModule } from './app/app-routing.module';
import { AppComponent } from './app/app.component';
import { AuthInterceptorService } from './app/auth/auth-interceptor.service';
import { AuthModule } from './app/auth/auth.module';


bootstrapApplication(AppComponent, {
    providers: [
        importProvidersFrom(BrowserModule, AuthModule, AppRoutingModule),
        { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptorService, multi: true },
        provideHttpClient(withInterceptorsFromDi())
    ]
})
    .catch(err => console.error(err));
