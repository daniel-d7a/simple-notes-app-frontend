import { Injectable, inject } from "@angular/core";
import { CookieService as ngxCookie } from "ngx-cookie-service";
import { IAuthResponse } from "./Types/auth.types";
import { environment } from "../../../environments/environment";

@Injectable({
  providedIn: "root",
})
export class CookieService {
  private cookieService = inject(ngxCookie);
  private tokenName = environment.production
    ? "notesAppJwtProdToken"
    : "notesAppJwtToken";

  setData(userData: IAuthResponse): void {
    this.cookieService.set(this.tokenName, JSON.stringify(userData), {
      expires: 365,
      sameSite: "Strict",
    });
  }

  getData(): IAuthResponse | undefined {
    return JSON.parse(this.cookieService.get(this.tokenName) || "{}");
  }

  getToken(): string {
    return this.getData()?.token || "";
  }
  getRoles(): string[] {
    return this.getData()?.roles || [];
  }

  clearData(): void {
    this.cookieService.delete(this.tokenName);
  }
}
