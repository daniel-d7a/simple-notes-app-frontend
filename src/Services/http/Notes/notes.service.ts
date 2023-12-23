import { INote } from "./../../../Models/Note/INote";
import { Injectable, OnInit, inject, signal } from "@angular/core";
import { GenericHttpService } from "../generic-http-service.service";
import { finalize } from "rxjs";
import { ToastService } from "../../Toast/toast.service";
@Injectable({
  providedIn: "root",
})
export class NotesService {
  private http = inject(GenericHttpService);
  private toast = inject(ToastService);
  private endpoint = "Notes";

  data = signal<INote[]>([]);
  single = signal<INote | undefined>(undefined);
  isLoading = signal<boolean>(false);

  private initialLoad = true;

  constructor() {
    this.fetchNotes();
    this.initialLoad = false;
  }

  private fetchNotes() {
    if (this.initialLoad) {
      this.isLoading.set(true);
    }
    this.http
      .get<INote[]>(this.endpoint)
      .pipe(finalize(() => this.isLoading.set(false)))
      .subscribe({
        next: (n) => {
          this.data.set(n as INote[]);
        },
      });
  }

  createNote(note: INote) {
    const newNotes = [...this.data(), note];
    this.data.set(newNotes);
    this.http.post<INote>(this.endpoint, note).subscribe({
      next: () => {
        this.fetchNotes();
        this.toast.showSuccess("Note created successfully");
      },
      error: (e) => {
        this.toast.showError(e.message);
      },
    });
  }

  deleteNote(id: number) {
    this.data.set(this.data().filter((n) => n.id !== id));
    this.http.delete<INote>(`${this.endpoint}/${id}`).subscribe({
      next: () => {
        this.fetchNotes();
        this.toast.showSuccess("Note deleted successfully");
      },
      error: (e) => {
        this.toast.showError(e.message);
      },
    });
  }

  updateNote(note: INote) {
    const newNotes = this.data().map((n) => {
      if (n.id === note.id) {
        return note;
      }
      return n;
    });
    this.data.set(newNotes);

    if (this.single()?.id === note.id) {
      this.single.set(note);
    }

    this.http.put<INote>(`${this.endpoint}/${note.id}`, note).subscribe({
      next: () => {
        this.fetchNotes();
        this.getNote(note.id);
        this.toast.showSuccess("Note updated successfully");
      },
      error: (e) => {
        this.toast.showError(e.message);
      },
    });
  }

  getNote(id: number) {
    this.http.get<INote>(`${this.endpoint}/${id}`).subscribe({
      next: (n) => {
        this.single.set(n as INote);
      },
    });
    return this.single;
  }

  resetNote() {
    this.single.set(undefined);
  }
}
