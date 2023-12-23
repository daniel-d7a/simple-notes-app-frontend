import { AsyncPipe, JsonPipe } from "@angular/common";
import { CreateNoteComponent } from "../../../Components/Notes/create-note/create-note.component";
import { NoteComponent } from "./../../../Components/Notes/note/note.component";
import { INote } from "./../../../Models/Note/INote";
import { Component, inject } from "@angular/core";
import { LoadingSpinnerComponent } from "../../../Shared/LoadinSpinner/loading-spinner/loading-spinner.component";
import { SmallLoadingSpinnerComponent } from "../../../Shared/LoadinSpinner/small-loading-spinner/small-loading-spinner.component";
import { HeaderComponent } from "../../../Shared/Typography/header/header.component";
import { CookieService } from "../../../Services/http/Auth/cookie.service";
import { NotesService } from "../../../Services/http/Notes/notes.service";
import { TopHeaderComponent } from "../../../Components/Layout/top-header/top-header.component";

@Component({
  selector: "app-notes-home",
  standalone: true,
  imports: [
    NoteComponent,
    CreateNoteComponent,
    AsyncPipe,
    JsonPipe,
    LoadingSpinnerComponent,
    SmallLoadingSpinnerComponent,
    HeaderComponent,
    TopHeaderComponent,
  ],
  templateUrl: "./notes-home.component.html",
  styleUrl: "./notes-home.component.css",
})
export class NotesHomeComponent {
  private notesService = inject(NotesService);
  notes;
  isNotesLoading = this.notesService.isLoading;

  private cookieService = inject(CookieService);

  constructor() {
    console.log(this.cookieService.getData());
    this.notes = this.notesService.data;
  }
}
