import { Component, OnInit, inject } from "@angular/core";
import { INote } from "../../../Models/Note/INote";
import { NotesService } from "../../../http/Notes/notes.service";
import { ActivatedRoute } from "@angular/router";
import { NgIcon, provideIcons } from "@ng-icons/core";
import { faSolidArrowLeft } from "@ng-icons/font-awesome/solid";
import { faPenToSquare } from "@ng-icons/font-awesome/regular";
import { DatePipe, Location } from "@angular/common";
import { FormControl, FormGroup, ReactiveFormsModule } from "@angular/forms";
import { NameOrTitleValidator } from "../../../Components/Notes/create-note/create-note.validator";
import { LoadingSpinnerComponent } from "../../../Shared/LoadinSpinner/loading-spinner/loading-spinner.component";
import { SmallLoadingSpinnerComponent } from "../../../Shared/LoadinSpinner/small-loading-spinner/small-loading-spinner.component";

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
  private location = inject(Location);
  note: INote | undefined;
  noteForm: FormGroup;
  isEditing = false;

  constructor() {
    const id = this.activatedRoute.snapshot.paramMap.get("id");
    this.notesService.getNote(Number(id)).subscribe({
      next: (note) => {
        this.note = note;
        this.noteForm?.get("title")?.setValue(note?.title);
        this.noteForm?.get("body")?.setValue(note?.body);
      },
    });
    this.noteForm = new FormGroup(
      {
        title: new FormControl<string | undefined>(this.note?.title || "", {
          nonNullable: true,
        }),
        body: new FormControl<string | undefined>(this.note?.body || "", {
          nonNullable: true,
        }),
      },
      { validators: NameOrTitleValidator() }
    );
  }

  onSubmit() {
    this.notesService.updateNote({
      title: this.noteForm.value.title,
      body: this.noteForm.value.body,
      id: this.note?.id || 0,
    } as INote);
    this.isEditing = false;
  }

  goBack() {
    this.notesService.resetNote();
    this.location.back();
  }
}
