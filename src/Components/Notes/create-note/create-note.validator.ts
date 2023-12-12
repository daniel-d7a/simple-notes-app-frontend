import {
  AbstractControl,
  FormGroup,
  ValidationErrors,
  ValidatorFn,
} from "@angular/forms";

export function NameOrTitleValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const title: string | undefined = control.get("title")?.value;
    const body: string | undefined = control.get("body")?.value;

    if (title || body) return null;

    return {
      nameOrTitle: true,
    };
  };
}
