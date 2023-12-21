import { Injectable, OnInit, inject } from "@angular/core";
import { GenericHttpService } from "../generic-http-service.service";
import { INote } from "../../Models/Note/INote";
import { ToastService } from "../../Services/Toast/toast.service";
import { BehaviorSubject, finalize } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class NotesService {
  private http = inject(GenericHttpService);
  private toast = inject(ToastService);
  private endpoint = "Notes";

  private _data = new BehaviorSubject<INote[]>([]);
  data = this._data.asObservable();

  private _single = new BehaviorSubject<INote | undefined>(undefined);
  single = this._single.asObservable();

  private _isLoading = new BehaviorSubject<boolean>(false);
  isLoading$ = this._isLoading.asObservable();
  private initialLoad = true;

  constructor() {
    this.fetchNotes();
    this.initialLoad = false;
  }

  private fetchNotes() {
    if (this.initialLoad) {
      this._isLoading.next(true);
    }
    this.http
      .get<INote[]>(this.endpoint)
      .pipe(finalize(() => this._isLoading.next(false)))
      .subscribe({
        next: (n) => {
          this._data.next(n);
        },
      });
  }

  createNote(note: INote) {
    const newNotes = [...this._data.value, note];
    this._data.next(newNotes);
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
    this._data.next(this._data.value.filter((n) => n.id !== id));
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
    const newNotes = this._data.value.map((n) => {
      if (n.id === note.id) {
        return note;
      }
      return n;
    });
    this._data.next(newNotes);

    if (this._single.value?.id === note.id) {
      this._single.next(note);
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
        this._single.next(n);
      },
    });
    return this.single;
  }

  getSingleNote(id: number) {
    return this.http.get<INote>(`${this.endpoint}/${id}`);
  }

  resetNote() {
    this._single.next(undefined);
  }
}
