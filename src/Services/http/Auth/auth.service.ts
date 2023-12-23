import { Injectable, inject, signal } from "@angular/core";
import { GenericHttpService } from "../generic-http-service.service";
import { finalize } from "rxjs";
import { CookieService } from "./cookie.service";
import { ILogin, IRegister, IAuthResponse } from "./Types/auth.types";
import { ToastService } from "../../Toast/toast.service";
import { Router } from "@angular/router";
@Injectable({
  providedIn: "root",
})
export class AuthService {
  private http = inject(GenericHttpService);
  private toast = inject(ToastService);
  private cookie = inject(CookieService);
  private router = inject(Router);
  private endpoint = "auth";

  isLoading = signal(false);

  login(email: string, password: string) {
    this.isLoading.set(true);
    this.http
      .post<ILogin, IAuthResponse>(this.endpoint + "/login", {
        email,
        password,
      })
      .pipe(finalize(() => this.isLoading.set(false)))
      .subscribe({
        next: (data) => {
          data = data as IAuthResponse;
          this.cookie.setData(data);
          this.toast.showSuccess("User logged in successfully");
          this.router.navigate(["/"]);
        },
        error: (e) => {
          this.toast.showError(e.message);
        },
      });
  }

  register(email: string, username: string, password: string) {
    this.isLoading.set(true);
    this.http
      .post<IRegister, IAuthResponse>(this.endpoint + "/register", {
        email,
        username,
        password,
      })
      .pipe(finalize(() => this.isLoading.set(false)))
      .subscribe({
        next: (data) => {
          data = data as IAuthResponse;
          this.cookie.setData(data);
          this.toast.showSuccess("User registerd successfully");
          this.router.navigate(["/"]);
        },
        error: (e) => {
          this.toast.showError(e.message);
        },
      });
  }
}
