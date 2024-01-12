import { Component, inject } from "@angular/core";
import { FormControl, FormGroup, ReactiveFormsModule } from "@angular/forms";
import { INote } from "../../../Models/Note/INote";
import { NameOrTitleValidator } from "./create-note.validator";
import { JsonPipe } from "@angular/common";
import { SmallLoadingSpinnerComponent } from "../../../Shared/LoadinSpinner/small-loading-spinner/small-loading-spinner.component";
import { NotesService } from "../../../Services/http/Notes/notes.service";
import { CookieService } from "../../../Services/http/Auth/cookie.service";

@Component({
  selector: "create-note",
  standalone: true,
  imports: [ReactiveFormsModule, JsonPipe, SmallLoadingSpinnerComponent],
  templateUrl: "./create-note.component.html",
  styleUrl: "./create-note.component.css",
})
export class CreateNoteComponent {
  private notesService = inject(NotesService);
  private cookieService = inject(CookieService);
  isLoading: boolean = false;
  formClicked = false;

  noteForm = new FormGroup(
    {
      title: new FormControl<string | undefined>("", { nonNullable: true }),
      body: new FormControl<string | undefined>("", { nonNullable: true }),
    },
    { validators: NameOrTitleValidator() }
  );

  onSubmit() {
    this.isLoading = true;
    this.notesService.createNote({
      title: this.noteForm.value.title,
      body: this.noteForm.value.body,
      userId: this.cookieService.getData()?.user?.id,
    } as INote);
    this.resetForm();
  }

  expandForm() {
    this.formClicked = true;
  }
  shrinkForm(event: Event) {
    event.stopPropagation();
    this.formClicked = false;
  }

  resetForm() {
    this.formClicked = false;
    this.isLoading = false;
    this.noteForm.reset();
  }
}
