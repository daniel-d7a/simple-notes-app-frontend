import { AsyncPipe, JsonPipe } from "@angular/common";
import { CreateNoteComponent } from "../../../Components/Notes/create-note/create-note.component";
import { NoteComponent } from "./../../../Components/Notes/note/note.component";
import { Component, inject } from "@angular/core";
import { LoadingSpinnerComponent } from "../../../Shared/LoadinSpinner/loading-spinner/loading-spinner.component";
import { SmallLoadingSpinnerComponent } from "../../../Shared/LoadinSpinner/small-loading-spinner/small-loading-spinner.component";
import { HeaderComponent } from "../../../Shared/Typography/header/header.component";
import { NotesService } from "../../../Services/http/Notes/notes.service";
import { TopHeaderComponent } from "../../../Components/Layout/top-header/top-header.component";
import { PaginationComponent } from "../../../Components/Layout/pagination/pagination.component";

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
    PaginationComponent,
  ],
  templateUrl: "./notes-home.component.html",
  styleUrl: "./notes-home.component.css",
})
export class NotesHomeComponent {
  private notesService = inject(NotesService);
  notes;
  pagination = this.notesService.pagination;
  isNotesLoading = this.notesService.isLoading;

  constructor() {
    this.notes = this.notesService.data;
  }

  onClicks = {
    increment: () => {
      this.notesService.incrementPage();
    },
    decrement: () => {
      this.notesService.decrementPage();
    },
    set: (page: number) => {
      this.notesService.setPage(page);
    },
  };
}
