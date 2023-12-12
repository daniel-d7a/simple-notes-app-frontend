import { ApplicationConfig } from "@angular/core";
import { provideRouter } from "@angular/router";
import { routes } from "./app.routes";
import { provideHttpClient } from "@angular/common/http";
import { provideAnimations } from "@angular/platform-browser/animations";
import { provideToastr } from "ngx-toastr";
import { toastConfig } from "../Services/Toast/toast.config";

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideHttpClient(),
    provideAnimations(),
    provideToastr(toastConfig),
  ],
};
