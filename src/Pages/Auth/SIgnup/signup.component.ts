import { passwordRules } from "./../../../constants/passwordRules";
import { Component, inject } from "@angular/core";
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from "@angular/forms";
import { JsonPipe } from "@angular/common";
import { HeaderComponent } from "../../../Shared/Typography/header/header.component";
import { AuthService } from "../../../Services/http/Auth/auth.service";
import { ErrorTextComponent } from "../../../Shared/Typography/error-text/error-text.component";
import { SmallLoadingSpinnerComponent } from "../../../Shared/LoadinSpinner/small-loading-spinner/small-loading-spinner.component";
import { RouterLink } from "@angular/router";

@Component({
  selector: "app-signup",
  standalone: true,
  imports: [
    HeaderComponent,
    ReactiveFormsModule,
    JsonPipe,
    ErrorTextComponent,
    SmallLoadingSpinnerComponent,
    RouterLink,
  ],
  templateUrl: "./signup.component.html",
  styleUrl: "./signup.component.css",
})
export class SignupComponent {
  private authService = inject(AuthService);
  signupPasswordRules = passwordRules;

  isLoading = this.authService.isLoading;

  signupForm = new FormGroup({
    email: new FormControl<string>("", {
      nonNullable: true,
      validators: [Validators.email, Validators.required],
    }),
    username: new FormControl<string>("", {
      nonNullable: true,
      validators: [
        Validators.minLength(4),
        Validators.maxLength(50),
        Validators.required,
      ],
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
    this.authService.register(
      this.signupForm.value.email!,
      this.signupForm.value.username!,
      this.signupForm.value.password!
    );
  }
}
