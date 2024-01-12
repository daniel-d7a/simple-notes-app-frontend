import { Component, inject } from "@angular/core";
import {
  FormArray,
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from "@angular/forms";
import { SmallLoadingSpinnerComponent } from "../../../Shared/LoadinSpinner/small-loading-spinner/small-loading-spinner.component";
import { TodoService } from "../../../Services/http/Todos/todo.service";
import { CommonModule } from "@angular/common";
import { NgIconComponent, provideIcons } from "@ng-icons/core";
import { faTrashCan } from "@ng-icons/font-awesome/regular";
import { ClickOutsideDirective } from "../../../Directives/click-outside.directive";
import { ITodo } from "../../../Models/Todo/ITodo";
import { ITodoEntry } from "../../../Models/Todo/ITodoEntry";
import { CookieService } from "../../../Services/http/Auth/cookie.service";

@Component({
  selector: "create-todo",
  standalone: true,
  imports: [
    ReactiveFormsModule,
    SmallLoadingSpinnerComponent,
    CommonModule,
    NgIconComponent,
    ClickOutsideDirective,
  ],
  templateUrl: "./create-todo.component.html",
  styleUrl: "./create-todo.component.css",
  providers: [provideIcons({ faTrashCan })],
})
export class CreateTodoComponent {
  private todoservice = inject(TodoService);
  private cookieService = inject(CookieService);
  private fb = inject(FormBuilder);
  isLoading = false;
  formClicked = false;
  todoForm: FormGroup;

  constructor() {
    this.todoForm = this.fb.group({
      title: ["", Validators.required],
      entries: this.fb.array([]),
    });
  }

  get entries() {
    return this.todoForm.get("entries") as FormArray;
  }

  onSubmit() {
    if (this.entries.length === 0) return;
    console.log(this.todoForm.value);
    const newTodo = {
      title: this.todoForm.value.title as string,
      entries: this.todoForm.value.entries as ITodoEntry[],
      isDone: this.entries.value.every(
        (e: unknown) => (e as ITodoEntry).isDone
      ),
      userId: this.cookieService.getData()?.user?.id,
    } as ITodo;

    this.todoservice.createData(newTodo, "todo created successfully");

    this.shrinkForm();
  }

  expandForm() {
    this.formClicked = true;
  }
  shrinkForm() {
    this.todoForm.reset();
    this.entries.clear();
    this.formClicked = false;
  }
  deleteEntry(index: number) {
    this.entries.removeAt(index);
  }

  cancel($event: Event) {
    $event.stopPropagation();
    this.shrinkForm();
  }

  addEntry(event: Event) {
    const value = (event.target as HTMLInputElement).value;
    if (!value) return;

    console.log("entry added");
    const newEntry = this.fb.group({
      text: [value, Validators.required],
      isDone: [false],
      priority: [0],
      position: [this.entries.length],
    });

    console.log(this.entries.value);

    this.entries.push(newEntry);
    (event.target as HTMLInputElement).value = "";
  }
}
