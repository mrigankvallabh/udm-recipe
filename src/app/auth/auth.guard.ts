import { inject } from "@angular/core";
import { Router } from "@angular/router";
import { map, take } from "rxjs";
import { AuthService } from "./auth.service";

export function authGuard() {
  const authService = inject(AuthService);
  const router = inject(Router);
  return authService.user$
    .pipe(
      take(1),
      map(user => !!user ? true : router.parseUrl('/auth'))
    );
}