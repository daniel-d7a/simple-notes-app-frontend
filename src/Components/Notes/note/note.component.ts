import { INote } from "../../../Models/Note/INote";
import { Component, Input, inject } from "@angular/core";
import { TruncatePipe } from "../../../Pipes/truncate.pipe";
import { NgIconComponent, provideIcons } from "@ng-icons/core";
import { faTrashCan } from "@ng-icons/font-awesome/regular";
import { Router } from "@angular/router";
import { DatePipe } from "@angular/common";
import { NotesService } from "../../../Services/http/Notes/notes.service";

@Component({
  selector: "note",
  standalone: true,
  imports: [TruncatePipe, NgIconComponent, DatePipe],
  templateUrl: "./note.component.html",
  styleUrl: "./note.component.css",
  viewProviders: [provideIcons({ faTrashCan })],
})
export class NoteComponent {
  private notesService = inject(NotesService);
  private router = inject(Router);
  @Input() note!: INote;

  navigateToNote() {
    console.log(`note ${this.note.id} clicked`);

    this.router.navigate(["notes", this.note.id]);
  }

  deleteNote() {
    this.notesService.deleteNote(this.note.id);
  }
}
