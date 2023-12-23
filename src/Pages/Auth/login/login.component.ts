import { Component, inject } from "@angular/core";
import { HeaderComponent } from "../../../Shared/Typography/header/header.component";
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from "@angular/forms";
import { AuthService } from "../../../Services/http/Auth/auth.service";
import { ErrorTextComponent } from "../../../Shared/Typography/error-text/error-text.component";
import { SmallLoadingSpinnerComponent } from "../../../Shared/LoadinSpinner/small-loading-spinner/small-loading-spinner.component";
import { passwordRules } from "../../../constants/passwordRules";
import { RouterLink } from "@angular/router";

@Component({
  selector: "app-login",
  standalone: true,
  imports: [
    HeaderComponent,
    ReactiveFormsModule,
    ErrorTextComponent,
    SmallLoadingSpinnerComponent,
    RouterLink,
  ],
  templateUrl: "./login.component.html",
  styleUrl: "./login.component.css",
})
export class LoginComponent {
  private authService = inject(AuthService);
  isLoading = this.authService.isLoading;

  loginPasswordRules = passwordRules;

  loginForm = new FormGroup({
    email: new FormControl<string>("", {
      nonNullable: true,
      validators: [Validators.email, Validators.required],
    }),
    password: new FormControl<string>("", {
      nonNullable: true,
      validators: [
        Validators.minLength(6),
        Validators.pattern(
          /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%#*?&])[A-Za-z\d@$!#%*?&]{6,}$/
        ),
        Validators.required,
      ],
    }),
  });

  onSubmit() {
    this.authService.login(
      this.loginForm.value.email!,
      this.loginForm.value.password!
    );
  }
}
