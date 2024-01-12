import { TodoService } from "./../../../Services/http/Todos/todo.service";
import { Component, OnInit, inject, effect } from "@angular/core";
import { NgIconComponent, provideIcons } from "@ng-icons/core";
import { faSolidArrowLeft } from "@ng-icons/font-awesome/solid";
import { faPenToSquare, faTrashCan } from "@ng-icons/font-awesome/regular";
import { CommonModule, DatePipe, Location } from "@angular/common";
import { LoadingSpinnerComponent } from "../../../Shared/LoadinSpinner/loading-spinner/loading-spinner.component";
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from "@angular/forms";
import { ActivatedRoute } from "@angular/router";
import { debounceTime, distinctUntilChanged } from "rxjs";
import { ErrorTextComponent } from "../../../Shared/Typography/error-text/error-text.component";
import { ITodoEntry } from "../../../Models/Todo/ITodoEntry";
import { ITodo } from "../../../Models/Todo/ITodo";

@Component({
  selector: "app-single-todo",
  standalone: true,
  imports: [
    NgIconComponent,
    DatePipe,
    LoadingSpinnerComponent,
    ReactiveFormsModule,
    CommonModule,
    ErrorTextComponent,
  ],
  templateUrl: "./single-todo.component.html",
  styleUrl: "./single-todo.component.css",
  providers: [provideIcons({ faSolidArrowLeft, faPenToSquare, faTrashCan })],
})
export class SingleTodoComponent implements OnInit {
  private location = inject(Location);
  private activatedRoute = inject(ActivatedRoute);
  private todoService = inject(TodoService);
  private fb = inject(FormBuilder);
  todoForm: FormGroup;
  todo;

  todoLoadedEffect = effect(() => {
    if (this.todo()) this.setInitialValues();
  });

  constructor() {
    const id = this.activatedRoute.snapshot.paramMap.get("id");
    this.todo = this.todoService.getSingle(Number(id));

    this.todoForm = this.fb.group({
      title: [null, Validators.required],
    });
  }

  ngOnInit(): void {
    this.setInitialValues();
    this.updateTitle();
  }
  goBack() {
    this.location.back();
  }
  addEntry(event: Event) {
    const value = (event.target as HTMLInputElement).value;
    if (!value) return;
    this.todoService.addEntry(value);
    (event.target as HTMLInputElement).value = "";
  }
  updateEntryText(event: Event, entry: ITodoEntry) {
    const value = (event.target as HTMLInputElement).value;
    if (!value) {
      this.deleteEntry(entry);
      return;
    }
    this.todoService.updateEntry(value, entry);
  }
  updateEntryIsDone(event: Event, entry: ITodoEntry) {
    const value = (event.target as HTMLInputElement).checked;
    this.todoService.updateEntry(value, entry);
  }
  deleteEntry(entry: ITodoEntry) {
    this.todoService.deleteEntry(entry);
  }
  setInitialValues() {
    this.todoForm.setValue({
      title: this.todo()?.title || "",
    });
  }
  updateTitle() {
    this.todoForm
      .get("title")
      ?.valueChanges.pipe(debounceTime(1000), distinctUntilChanged())
      .subscribe((value) => {
        if (value && value !== this.todo()?.title) {
          this.todoService.updateData(
            {
              ...this.todo(),
              title: value,
            } as ITodo,
            "title updated successfully"
          );
        }
      });
  }
}
