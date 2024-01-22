import { CreateNoteComponent } from "../../../Components/Notes/create-note/create-note.component";
import { NoteComponent } from "./../../../Components/Notes/note/note.component";
import { Component, inject } from "@angular/core";
import { LoadingSpinnerComponent } from "../../../Shared/LoadinSpinner/loading-spinner/loading-spinner.component";
import { SmallLoadingSpinnerComponent } from "../../../Shared/LoadinSpinner/small-loading-spinner/small-loading-spinner.component";
import { HeaderComponent } from "../../../Shared/Typography/header/header.component";
import { NotesService } from "../../../Services/http/Notes/notes.service";
import { TopHeaderComponent } from "../../../Components/Layout/top-header/top-header.component";
import { PaginationComponent } from "../../../Components/Layout/pagination/pagination.component";
import { getClickHandlers } from "../../../Shared/Pagination/getClickHandlers";
import { NoDataComponent } from "../../../Components/Layout/no-data/no-data.component";

@Component({
  selector: "app-notes-home",
  standalone: true,
  imports: [
    NoteComponent,
    CreateNoteComponent,
    LoadingSpinnerComponent,
    SmallLoadingSpinnerComponent,
    HeaderComponent,
    TopHeaderComponent,
    PaginationComponent,
    NoDataComponent,
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
  onClicks = getClickHandlers(this.notesService);
}
