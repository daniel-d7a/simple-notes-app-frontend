import { Injectable, inject, signal } from "@angular/core";
import { GenericHttpService } from "../generic-http-service.service";
import { finalize } from "rxjs";
import { ToastService } from "../../Services/Toast/toast.service";
import { CookieService } from "./cookie.service";

@Injectable({
  providedIn: "root",
})
export class AuthService {
  http = inject(GenericHttpService);
  toast = inject(ToastService);
  cookie = inject(CookieService);
  isLoading = signal(false);
  private endpoint = "auth";

  login(email: string, password: string) {}

  register(email: string, username: string, password: string) {
    this.isLoading.set(true);
    this.http
      .post<IRegister, IRegisterResponse>(this.endpoint + "/register", {
        email,
        username,
        password,
      })
      .pipe(finalize(() => this.isLoading.set(false)))
      .subscribe({
        next: (data) => {
          data = data as IRegisterResponse;
          this.cookie.setData(data.token, data.roles.join(","));
          this.toast.showSuccess("User registerd successfully");
        },
        error: (e) => {
          this.toast.showError(e.message);
        },
      });
  }
}

type IRegister = {
  email: string;
  username: string;
  password: string;
};

type ILogin = {
  email: string;
  password: string;
};

type IRegisterResponse = {
  message: string;
  isAuthenticated: boolean;
  errors: string[];
  roles: string[];
  token: string;
  expiresAt: Date;
};
