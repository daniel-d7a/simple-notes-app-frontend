import { Component, Input, inject } from "@angular/core";
import { TruncatePipe } from "../../../Pipes/truncate.pipe";
import { ITodo } from "../../../Models/Todo/ITodo";
import { NgIconComponent, provideIcons } from "@ng-icons/core";
import { faTrashCan } from "@ng-icons/font-awesome/regular";
import { CommonModule } from "@angular/common";
import { Router } from "@angular/router";
import { TodoService } from "../../../Services/http/Todos/todo.service";

@Component({
  selector: "todo",
  standalone: true,
  imports: [TruncatePipe, NgIconComponent, CommonModule],
  templateUrl: "./todo.component.html",
  styleUrl: "./todo.component.css",
  providers: [provideIcons({ faTrashCan })],
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
}
