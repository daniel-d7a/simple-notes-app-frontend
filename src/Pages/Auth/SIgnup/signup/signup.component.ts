import { AfterViewChecked, Component, OnChanges, inject } from "@angular/core";
import { HeaderComponent } from "../../../../Shared/Typography/header/header.component";
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from "@angular/forms";
import { AuthService } from "../../../../http/Auth/auth.service";
import { JsonPipe } from "@angular/common";
import { ErrorTextComponent } from "../../../../Shared/Typography/error-text/error-text.component";
import { SmallLoadingSpinnerComponent } from "../../../../Shared/LoadinSpinner/small-loading-spinner/small-loading-spinner.component";

@Component({
  selector: "app-signup",
  standalone: true,
  imports: [
    HeaderComponent,
    ReactiveFormsModule,
    JsonPipe,
    ErrorTextComponent,
    SmallLoadingSpinnerComponent,
  ],
  templateUrl: "./signup.component.html",
  styleUrl: "./signup.component.css",
})
export class SignupComponent {
  authService = inject(AuthService);

  isLoading = this.authService.isLoading;

  passwordRules = [
    "must have at least one uppercase",
    "must have at least one lowercase",
    "must have at least one special character",
  ];

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
    this.signupForm.reset();
  }
}
