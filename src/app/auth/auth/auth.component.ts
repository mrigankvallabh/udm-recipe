import { Component } from '@angular/core';
import { NgForm, FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthResponseFireBase, AuthService } from '../auth.service';
import { NgIf } from '@angular/common';

@Component({
    selector: 'app-auth',
    templateUrl: './auth.component.html',
    styles: [],
    standalone: true,
    imports: [NgIf, FormsModule]
})
export class AuthComponent {
  isLoginMode = true;
  isLoading = false;
  error: string | undefined;

  constructor(
    private authService: AuthService,
    private router: Router
  ) { }

  onSwitchMode() { this.isLoginMode = !this.isLoginMode; }

  onSubmit(form: NgForm) {
    if (!form.valid) {
      return;
    }
    const { email, password } = form.value as { ["email"]: string, ["password"]: string };
    let auth$: Observable<AuthResponseFireBase>;
    this.isLoading = true;
    if (this.isLoginMode) {
      auth$ = this.authService.login(email, password);
    } else {
      auth$ = this.authService.signup(email, password);
    }

    auth$.subscribe({
      next: res => {
        this.isLoading = false;
        this.router.navigate(["/recipes"]);
      },
      error: (err: string) => {
        this.error = err;
        this.isLoading = false;
      }
    });

    form.reset();
  }
}
