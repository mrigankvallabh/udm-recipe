import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, catchError, tap, throwError } from 'rxjs';
import { User } from './user.model';
// import { environment as devenv } from 'src/environments/environment.development';
import { environment } from 'src/environments/environment';

export type AuthResponseFireBase = {
  kind: string;
  idToken: string;
  email: string;
  refreshToken: string;
  expiresIn: string;
  localId: string;
  registered?: boolean;
  displayName?: string;
}

export type AuthErrorResponseFireBase = {
  ["error"]: {
    ["code"]: number,
    ["message"]: string
  }
}

@Injectable({ providedIn: 'root' })
export class AuthService {
  user$ = new BehaviorSubject<User | null>(null);
  private readonly urlbase = environment.firebaseurl;
  private readonly API_KEY = environment.firebasekey;
  private readonly urlsignup = `${this.urlbase}:signUp?key=${this.API_KEY}`;
  private readonly urllogin = `${this.urlbase}:signInWithPassword?key=${this.API_KEY}`;
  private expirationTimer!: any;

  constructor(
    private http: HttpClient,
    private router: Router
  ) { }

  signup(email: string, password: string) {
    return this.http.post<AuthResponseFireBase>(
      this.urlsignup,
      { email, password, returnSecureToken: true }
    ).pipe(
      catchError(this.handleError),
      tap(u => this.handleAuthentication(u))
    );
  }

  autoLogin() {
    const userString = localStorage.getItem("user");
    if (!userString) {
      return;
    }

    const userJson = JSON.parse(userString) as {
      id: string;
      email: string;
      _token: string;
      _tokenExpiration: Date;
    };

    const user = new User(userJson.id, userJson.email, userJson._token, new Date(userJson._tokenExpiration));

    if (user.token) {
      this.user$.next(user);
      this.autoLogout(new Date(userJson._tokenExpiration).getTime() - new Date().getTime());
    }


  }

  login(email: string, password: string) {
    return this.http.post<AuthResponseFireBase>(
      this.urllogin,
      { email, password, returnSecureToken: true }
    ).pipe(
      catchError(this.handleError),
      tap(u => this.handleAuthentication(u))
    );
  }

  autoLogout(durationMs: number) {
    this.expirationTimer = setTimeout(() => this.logout(), durationMs);
  }

  logout() {
    this.user$.next(null);
    this.router.navigate(["/auth"]);
    localStorage.removeItem("user");
    if (this.expirationTimer) {
      clearTimeout(this.expirationTimer);
    }
    this.expirationTimer = null;
  }

  private handleError(err: HttpErrorResponse) {
    let errorMessage = `An Unknown Error Occurred! Check Internet Connectivity.`;
    console.error(err);
    if (Object.hasOwn(err.error, "error")) {
      const fbError: AuthErrorResponseFireBase = (err.error);
      errorMessage = `${fbError.error.code}: ${fbError.error.message}`
    }
    return throwError(() => new Error(errorMessage));
  }

  private handleAuthentication(u: AuthResponseFireBase) {
    const expiryDate = new Date((new Date()).getTime() + (+u.expiresIn * 1000));
    const user = new User(u.localId, u.email, u.idToken, expiryDate);
    localStorage.setItem("user", JSON.stringify(user));
    this.user$.next(user);
    this.autoLogout(+u.expiresIn * 1000);
  }
}
