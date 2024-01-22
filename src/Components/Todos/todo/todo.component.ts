import { Component, Input, inject } from "@angular/core";
import { TruncatePipe } from "../../../Pipes/truncate.pipe";
import { ITodo } from "../../../Models/Todo/ITodo";
import { NgIconComponent, provideIcons } from "@ng-icons/core";
import { faTrashCan, faStar } from "@ng-icons/font-awesome/regular";
import { faSolidStar, faSolidXmark } from "@ng-icons/font-awesome/solid";
import { CommonModule } from "@angular/common";
import { Router } from "@angular/router";
import { TodoService } from "../../../Services/http/Todos/todo.service";
import { ILabel } from "../../../Models/Label/Label";
import { AddLabelModalComponent } from "../../add-label-modal/add-label-modal.component";

@Component({
  selector: "todo",
  standalone: true,
  imports: [
    TruncatePipe,
    NgIconComponent,
    CommonModule,
    AddLabelModalComponent,
  ],
  templateUrl: "./todo.component.html",
  styleUrl: "./todo.component.css",
  providers: [provideIcons({ faTrashCan, faStar, faSolidStar, faSolidXmark })],
})
export class TodoComponent {
  private router = inject(Router);
  @Input({ required: true }) todo!: ITodo;
  private todoService = inject(TodoService);

  navigateToTodo() {
    this.router.navigate(["todos", this.todo.id]);
  }
  deleteTodo() {
    if (this.todo.id) {
      this.todoService.deleteData(this.todo.id, "Todo deleted successfully");
    }
  }

  visibleEntries() {
    if (this.todo.entries.length <= 3) return this.todo.entries;
    return this.todo.entries.slice(0, 2);
  }

  toggleFavourite(event: Event) {
    event.stopPropagation();
    this.todoService.toggleFavourite(this.todo);
  }

  openAddLabel(event: Event) {
    event.stopPropagation();
    (
      document.getElementById(
        "addLabelModal" + "todo" + this.todo.id
      ) as HTMLDialogElement
    ).showModal();
  }

  deleteLabel(event: Event, label: ILabel) {
    event.stopPropagation();
    this.todoService.removeFromLabel(this.todo, label);
  }
}
