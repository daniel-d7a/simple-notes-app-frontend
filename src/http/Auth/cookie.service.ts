import { Injectable, inject } from "@angular/core";
import { CookieService as ngxCookie } from "ngx-cookie-service";

@Injectable({
  providedIn: "root",
})
export class CookieService {
  cookieService = inject(ngxCookie);

  setData(token: string, roles: string): void {
    this.cookieService.set("jwtToken", token, {
      expires: 365,
      sameSite: "Strict",
    });
    this.cookieService.set("roles", roles, {
      expires: 365,
      sameSite: "Strict",
    });
  }

  getData(): { token: string; roles: string[] } | undefined {
    return {
      token: this.cookieService.get("jwtToken"),
      roles: this.cookieService.get("roles").split(",") || [],
    };
  }

  clearData(): void {
    this.cookieService.delete("jwtToken");
    this.cookieService.delete("roles");
  }
}
