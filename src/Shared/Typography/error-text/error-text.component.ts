import {
  AfterViewChecked,
  AfterViewInit,
  Component,
  Input,
} from "@angular/core";
import { FormGroup } from "@angular/forms";
import { ErrorMap } from "../../../constants/ErrorMaps/ErrorMap";

@Component({
  selector: "error-text",
  standalone: true,
  imports: [],
  templateUrl: "./error-text.component.html",
  styleUrl: "./error-text.component.css",
})
export class ErrorTextComponent implements AfterViewInit {
  @Input() form!: FormGroup;
  @Input() controlName = "";
  @Input() rules: string[] = [];
  errorMessage: string | string[] = "";
  isVisible = false;

  ngAfterViewInit(): void {
    // Subscribe to form control value changes
    const control = this.form.get(this.controlName);
    if (control) {
      control.valueChanges.subscribe(() => {
        this.getErrors();
      });
    }
  }

  isArray() {
    return Array.isArray(this.errorMessage);
  }

  getErrors() {
    const errors = this.form.get(this.controlName)?.errors;
    if (Object.keys(errors || {}).length === 0) {
      this.isVisible = false;
    } else if (this.form.get(this.controlName)?.dirty) {
      this.isVisible = true;

      //get first error
      const firstKey = Object.keys(errors || {})[0];
      const firstError = errors?.[firstKey];

      this.errorMessage = ErrorMap[firstKey](
        this.controlName,
        firstError,
        this.rules
      );
    }
  }
}
