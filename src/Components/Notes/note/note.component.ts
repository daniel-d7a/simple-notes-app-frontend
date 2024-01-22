import { INote } from "../../../Models/Note/INote";
import { Component, Input, inject } from "@angular/core";
import { TruncatePipe } from "../../../Pipes/truncate.pipe";
import { NgIconComponent, provideIcons } from "@ng-icons/core";
import { faTrashCan, faStar } from "@ng-icons/font-awesome/regular";
import { faSolidStar, faSolidXmark } from "@ng-icons/font-awesome/solid";
import { Router } from "@angular/router";
import { DatePipe } from "@angular/common";
import { NotesService } from "../../../Services/http/Notes/notes.service";
import { AddLabelModalComponent } from "../../add-label-modal/add-label-modal.component";
import { ILabel } from "../../../Models/Label/Label";

@Component({
  selector: "note",
  standalone: true,
  imports: [TruncatePipe, NgIconComponent, DatePipe, AddLabelModalComponent],
  templateUrl: "./note.component.html",
  styleUrl: "./note.component.css",
  viewProviders: [
    provideIcons({ faTrashCan, faStar, faSolidStar, faSolidXmark }),
  ],
})
export class NoteComponent {
  private notesService = inject(NotesService);
  private router = inject(Router);
  @Input() note!: INote;

  navigateToNote() {
    this.router.navigate(["notes", this.note.id]);
  }

  deleteNote() {
    this.notesService.deleteData(this.note.id, "Note deleted successfully");
  }

  toggleFavourite(event: Event) {
    event.stopPropagation();
    this.notesService.toggleFavourite(this.note);
  }

  deleteLabel(event: Event, label: ILabel) {
    event.stopPropagation();
    this.notesService.removeFromLabel(this.note, label);
  }

  openAddLabel(event: Event) {
    event.stopPropagation();
    (
      document.getElementById(
        "addLabelModal" + "note" + this.note.id
      ) as HTMLDialogElement
    ).showModal();
  }
}
