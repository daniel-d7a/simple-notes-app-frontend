import { defaultPaginationData } from "./../../constants/Pagination/defaultPaginationData";
import { INote } from "../../Models/Note/INote";
import { ITodo } from "./../../Models/Todo/ITodo";
import { IBaseItem } from "./../../Models/Base/IBaseItem";
import { Component, Signal, computed, inject, untracked } from "@angular/core";
import { TopHeaderComponent } from "../../Components/Layout/top-header/top-header.component";
import { TodoService } from "../../Services/http/Todos/todo.service";
import { NotesService } from "../../Services/http/Notes/notes.service";
import { LoadingSpinnerComponent } from "../../Shared/LoadinSpinner/loading-spinner/loading-spinner.component";
import { NoteComponent } from "../../Components/Notes/note/note.component";
import { TodoComponent } from "../../Components/Todos/todo/todo.component";
import { PaginationComponent } from "../../Components/Layout/pagination/pagination.component";
import { IPagination } from "../../Models/utils/paginationData";
import { BaseService } from "../../Services/http/base.service";
import { ActivatedRoute } from "@angular/router";

@Component({
  selector: "app-home-page",
  standalone: true,
  imports: [
    TopHeaderComponent,
    LoadingSpinnerComponent,
    NoteComponent,
    TodoComponent,
    PaginationComponent,
  ],
  templateUrl: "./home-page.component.html",
  styleUrl: "./home-page.component.css",
})
export class HomePageComponent {
  private todoService = inject(TodoService);
  private noteService = inject(NotesService);
  private activatedRoute = inject(ActivatedRoute);
  isLoading: Signal<boolean>;
  data: Signal<(INote | ITodo)[]>;
  pagination: Signal<Omit<IPagination, "total" | "pageSize">>;

  constructor() {
    this.data = computed(() => this.loadData());
    this.isLoading = computed(
      () => this.noteService.isLoading() || this.todoService.isLoading()
    );
    this.pagination = computed(() => this.getInitialPaginationData());
  }

  getInitialPaginationData() {
    const lastPage = Math.max(
      this.noteService.pagination().lastPage,
      this.todoService.pagination().lastPage
    );
    return {
      ...defaultPaginationData,
      page: Number(this.activatedRoute.snapshot.queryParamMap.get("page")) || 1,
      lastPage,
      hasNext: lastPage > 1,
    };
  }

  isTodo(item: IBaseItem): item is ITodo {
    return (item as ITodo).entries ? true : false;
  }

  loadData() {
    const notes = this.getServiceDataPaginated(this.noteService);
    const todos = this.getServiceDataPaginated(this.todoService);
    return [...notes, ...todos].sort(
      (a, b) =>
        new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
    );
  }

  onClicks = {
    increment: () => {
      this.noteService.incrementPage();
      this.todoService.incrementPage();
    },
    decrement: () => {
      this.noteService.decrementPage();
      this.todoService.decrementPage();
    },
    set: (page: number) => {
      this.noteService.setPage(page);
      this.todoService.setPage(page);
    },
  };

  getServiceDataPaginated<T extends IBaseItem>(service: BaseService<T>) {
    return service.pagination().page !== this.pagination().page
      ? []
      : service.data().data;
  }
}
