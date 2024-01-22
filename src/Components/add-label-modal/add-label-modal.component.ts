import { TodoService } from "./../../Services/http/Todos/todo.service";
import { NotesService } from "../../Services/http/Notes/notes.service";
import { Component, Input, inject } from "@angular/core";
import { ILabel } from "../../Models/Label/Label";
import { LabelService } from "../../Services/http/Labels/label.service";
import { INote } from "../../Models/Note/INote";
import { ITodo } from "../../Models/Todo/ITodo";
import { TodoGuard } from "../../Shared/Type Guards/isTodo";

@Component({
  selector: "add-label-modal",
  standalone: true,
  imports: [],
  templateUrl: "./add-label-modal.component.html",
  styleUrl: "./add-label-modal.component.css",
})
export class AddLabelModalComponent {
  @Input() item: INote | ITodo = null!;
  totalLabels;
  private labelService = inject(LabelService);
  private todoService = inject(TodoService);
  private noteService = inject(NotesService);

  constructor() {
    this.totalLabels = this.labelService.data;
  }

  modalType() {
    return TodoGuard.isTodo(this.item) ? "todo" : "note";
  }

  doesLabelExist(label: ILabel) {
    const index = this.item.labels.findIndex((l) => l.id === label.id);
    return index !== -1;
  }

  addToLabel(event: Event, label: ILabel) {
    const value = (event.target as HTMLInputElement).checked;
    if (value === undefined) return;
    console.log("label value =>", value);

    if (TodoGuard.isTodo(this.item)) {
      if (value) {
        this.todoService.addToLabel(this.item, label);
      } else {
        this.todoService.removeFromLabel(this.item, label);
      }
    } else {
      if (value) {
        this.noteService.addToLabel(this.item, label);
      } else {
        this.noteService.removeFromLabel(this.item, label);
      }
    }
  }
}
