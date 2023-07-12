import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthInterceptorService } from './auth/auth-interceptor.service';
import { AuthModule } from './auth/auth.module';
import { HeaderComponent } from './header/header.component';


@NgModule({
    declarations: [AppComponent],
    imports: [
    BrowserModule,
    HttpClientModule,
    AuthModule,
    AppRoutingModule,
    HeaderComponent,
],
    providers: [{ provide: HTTP_INTERCEPTORS, useClass: AuthInterceptorService, multi: true }],
    bootstrap: [AppComponent]
})
export class AppModule { }
