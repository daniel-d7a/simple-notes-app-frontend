import { Component, ElementRef, ViewChild, inject } from "@angular/core";
import { INote } from "../../../Models/Note/INote";
import { ActivatedRoute } from "@angular/router";
import { NgIcon, provideIcons } from "@ng-icons/core";
import { faSolidArrowLeft } from "@ng-icons/font-awesome/solid";
import { faPenToSquare } from "@ng-icons/font-awesome/regular";
import { DatePipe, Location } from "@angular/common";
import { FormControl, FormGroup, ReactiveFormsModule } from "@angular/forms";
import { NameOrTitleValidator } from "../../../Components/Notes/create-note/create-note.validator";
import { LoadingSpinnerComponent } from "../../../Shared/LoadinSpinner/loading-spinner/loading-spinner.component";
import { NotesService } from "../../../Services/http/Notes/notes.service";
import { CookieService } from "../../../Services/http/Auth/cookie.service";
@Component({
  selector: "app-single-note",
  standalone: true,
  imports: [NgIcon, ReactiveFormsModule, LoadingSpinnerComponent, DatePipe],
  templateUrl: "./single-note.component.html",
  styleUrl: "./single-note.component.css",
  viewProviders: [provideIcons({ faSolidArrowLeft, faPenToSquare })],
})
export class SingleNoteComponent {
  private notesService = inject(NotesService);
  private activatedRoute = inject(ActivatedRoute);
  private cookieService = inject(CookieService);
  private location = inject(Location);
  note;
  noteForm: FormGroup;
  isEditing = false;

  constructor() {
    const id = this.activatedRoute.snapshot.paramMap.get("id");
    this.note = this.notesService.getSingle(Number(id));

    this.noteForm = new FormGroup(
      {
        title: new FormControl<string>("", { nonNullable: true }),
        body: new FormControl<string>("", { nonNullable: true }),
      },
      { validators: NameOrTitleValidator() }
    );
  }

  onSubmit() {
    this.notesService.updateData(
      {
        userId: this.cookieService.getData()?.user?.id,
        title: this.noteForm.value.title,
        body: this.noteForm.value.body,
        id: this.note()?.id || 0,
      } as INote,
      "Note updated successfully"
    );
    this.isEditing = false;
  }

  goBack() {
    this.location.back();
  }

  editNote() {
    this.isEditing = !this.isEditing;
    if (this.isEditing) {
      this.noteForm.setValue({
        title: this.note()?.title || "",
        body: this.note()?.body || "",
      });
    }
  }
}
