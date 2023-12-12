import { AsyncPipe, JsonPipe } from "@angular/common";
import { CreateNoteComponent } from "../../../Components/Notes/create-note/create-note.component";
import { NotesService } from "../../../http/Notes/notes.service";
import { NoteComponent } from "./../../../Components/Notes/note/note.component";
import { INote } from "./../../../Models/Note/INote";
import {
  AfterViewChecked,
  Component,
  OnDestroy,
  OnInit,
  inject,
} from "@angular/core";
import { LoadingSpinnerComponent } from "../../../Shared/LoadinSpinner/loading-spinner/loading-spinner.component";
import { SmallLoadingSpinnerComponent } from "../../../Shared/LoadinSpinner/small-loading-spinner/small-loading-spinner.component";
import { Subscription } from "rxjs";

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
  ],
  templateUrl: "./notes-home.component.html",
  styleUrl: "./notes-home.component.css",
})
export class NotesHomeComponent implements OnDestroy {
  notesService = inject(NotesService);
  notes: INote[] = [];
  notesSubscription: Subscription;
  isNotesLoading$ = this.notesService.isLoading$;

  constructor() {
    this.notesSubscription = this.notesService.data.subscribe(
      (n) => (this.notes = n)
    );
  }

  ngOnDestroy(): void {
    if (this.notesSubscription) {
      this.notesSubscription.unsubscribe();
    }
  }
}
