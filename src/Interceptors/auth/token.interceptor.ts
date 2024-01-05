import { HttpInterceptorFn } from "@angular/common/http";
import { inject } from "@angular/core";
import { CookieService } from "../../Services/http/Auth/cookie.service";

export const tokenInterceptor: HttpInterceptorFn = (req, next) => {
  const cookieService = inject(CookieService);
  console.log("added token", cookieService.getToken());
  console.log("to url", req.method, req.urlWithParams);
  
  const cloneReq = req.clone({
    setHeaders: { Authorization: `Bearer ${cookieService.getToken()}` },
  });
  return next(cloneReq);
};
