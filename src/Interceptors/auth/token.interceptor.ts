import { HttpInterceptorFn } from "@angular/common/http";
import { inject } from "@angular/core";
import { CookieService } from "../../Services/http/Auth/cookie.service";

export const tokenInterceptor: HttpInterceptorFn = (req, next) => {
  const cookieService = inject(CookieService);

  const cloneReq = req.clone({
    setHeaders: { Authorization: `Bearer ${cookieService.getToken()}` },
  });
  return next(cloneReq);
};
