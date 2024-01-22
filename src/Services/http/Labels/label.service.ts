import { ILabel } from "./../../../Models/Label/Label";
import { Injectable, inject, signal } from "@angular/core";
import { GenericHttpService } from "../generic-http-service.service";
import { IGenericResponse } from "../../../Models/Base/igeneric-response";
import { ToastService } from "../../Toast/toast.service";
import { NotesService } from "../Notes/notes.service";
import { TodoService } from "../Todos/todo.service";
import { Router } from "@angular/router";

@Injectable({
  providedIn: "root",
})
export class LabelService {
  private endpoint = "label";
  private http = inject(GenericHttpService);
  private toast = inject(ToastService);
  private noteService = inject(NotesService);
  private todoService = inject(TodoService);
  private router = inject(Router);

  data = signal<ILabel[]>([]);

  constructor() {
    this.getUserLabels();
  }

  getUserLabels() {
    this.http.get<IGenericResponse<ILabel[]>>(this.endpoint).subscribe({
      next: (res) => {
        this.data.set(res.data);
      },
      error: (e: IGenericResponse<ILabel>) => {
        this.toast.showSuccess(e.error || e.message);
      },
    });
  }
  createLabel(label: ILabel) {
    const newLables = [label, ...this.data()];
    this.data.set(newLables);

    this.http
      .post<ILabel, IGenericResponse<ILabel>>(this.endpoint, label)
      .subscribe({
        next: (res) => {
          this.toast.showSuccess("label created successfully");
          this.getUserLabels();
        },
        error: (e: IGenericResponse<ILabel>) => {
          this.toast.showSuccess(e.error || e.message);
        },
      });
  }
  updateLabel(label: ILabel) {
    const newLables = this.data().map((l) => {
      if (l.id === label.id) {
        return label;
      }
      return l;
    });
    this.data.set(newLables);

    this.http.put<ILabel>(`${this.endpoint}/${label.id}`, label).subscribe({
      next: (res) => {
        this.toast.showSuccess("label updated successfully");
        this.getUserLabels();
      },
      error: (e: IGenericResponse<ILabel>) => {
        this.toast.showSuccess(e.error || e.message);
      },
    });
  }
  deleteLabel(id: number) {
    const newLables = this.data().filter((l) => l.id !== id);
    this.data.set(newLables);

    this.http.delete<ILabel>(`${this.endpoint}/${id}`).subscribe({
      next: (res) => {
        this.toast.showSuccess("label deleted successfully");
        this.getUserLabels();
        this.router.navigate(["/"]);
        this.todoService.fetchData();
        this.noteService.fetchData();
      },
      error: (e: IGenericResponse<ILabel>) => {
        this.toast.showSuccess(e.error || e.message);
      },
    });
  }
}
