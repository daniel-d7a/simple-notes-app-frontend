import { Component, Input, inject } from "@angular/core";
import { HeaderComponent } from "../../../Shared/Typography/header/header.component";
import { IAuthResponse } from "../../../Services/http/Auth/Types/auth.types";
import { CookieService } from "../../../Services/http/Auth/cookie.service";
import { Router } from "@angular/router";

@Component({
  selector: "app-top-header",
  standalone: true,
  imports: [HeaderComponent],
  templateUrl: "./top-header.component.html",
  styleUrl: "./top-header.component.css",
})
export class TopHeaderComponent {
  private cookieService = inject(CookieService);
  private router = inject(Router);

  @Input({ required: true }) title!: string;
  user!: IAuthResponse;

  constructor() {
    this.user = this.cookieService.getData()!;
  }

  logout() {
    this.cookieService.clearData();
    this.router.navigate(["login"]);
  }
}
