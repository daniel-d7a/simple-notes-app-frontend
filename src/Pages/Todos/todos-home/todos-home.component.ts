import { Component, OnChanges, computed, inject } from "@angular/core";
import { TopHeaderComponent } from "../../../Components/Layout/top-header/top-header.component";
import { TodoComponent } from "../../../Components/Todos/todo/todo.component";
import { CreateTodoComponent } from "../../../Components/Todos/create-todo/create-todo.component";
import { TodoService } from "../../../Services/http/Todos/todo.service";
import { LoadingSpinnerComponent } from "../../../Shared/LoadinSpinner/loading-spinner/loading-spinner.component";
import { PaginationComponent } from "../../../Components/Layout/pagination/pagination.component";
import { getClickHandlers } from "../../../Shared/Pagination/getClickHandlers";

@Component({
  selector: "app-todos-home",
  standalone: true,
  imports: [
    TopHeaderComponent,
    TodoComponent,
    CreateTodoComponent,
    LoadingSpinnerComponent,
    PaginationComponent,
  ],
  templateUrl: "./todos-home.component.html",
  styleUrl: "./todos-home.component.css",
})
export class TodosHomeComponent {
  private todoService = inject(TodoService);
  isTodosLoading = computed(() => this.todoService.isLoading());
  todos = this.todoService.data;
  pagination = this.todoService.pagination;
  onClicks = getClickHandlers(this.todoService);
}
