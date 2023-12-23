import { inject } from "@angular/core";
import { CanActivateFn, Router, UrlTree } from "@angular/router";
import { CookieService } from "../../Services/http/Auth/cookie.service";

export const loggedInGuard: CanActivateFn = () => {
  const cookieService = inject(CookieService);
  const router = inject(Router);
  return !!cookieService.getToken() || router.parseUrl("/login");
};
