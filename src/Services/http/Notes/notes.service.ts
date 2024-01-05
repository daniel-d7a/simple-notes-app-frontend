import { INote } from "./../../../Models/Note/INote";
import { Injectable, inject, signal } from "@angular/core";
import { GenericHttpService } from "../generic-http-service.service";
import { finalize } from "rxjs";
import { ToastService } from "../../Toast/toast.service";
import { NotesResponse } from "./Types/Notes.Types";
import { IGenericResponse } from "../../../Models/Base/igeneric-response";
import { IPaginatedResponse } from "../../../Models/Base/ipaginated-response";
import { HttpParams } from "@angular/common/http";
import { IPaginationData } from "../../../Models/Base/ipagination-data";
@Injectable({
  providedIn: "root",
})
export class NotesService {
  private http = inject(GenericHttpService);
  private toast = inject(ToastService);
  private endpoint = "Notes";

  data = signal<IPaginatedResponse<INote>>({} as IPaginatedResponse<INote>);
  single = signal<INote | undefined>(undefined);
  isLoading = signal<boolean>(false);
  pagination = signal<IPaginationData>({
    page: 1,
    pageSize: 15,
    total: 0,
    lastPage: 0,
    hasPrevious: false,
    hasNext: false,
  });

  private initialLoad = true;

  constructor() {
    this.fetchNotes();
    this.initialLoad = false;
  }

  private getSearchParams() {
    let params = new HttpParams()
      .append("page", this.pagination().page.toString())
      .append("pageSize", this.pagination().pageSize.toString());
    return params;
  }

  public incrementPage() {
    if (!this.pagination().hasNext) return;
    this.pagination.set({
      ...this.pagination(),
      page: this.pagination().page + 1,
    });
    this.initialLoad = true;
    this.fetchNotes();
  }

  public decrementPage() {
    if (!this.pagination().hasPrevious) return;
    this.pagination.set({
      ...this.pagination(),
      page: this.pagination().page - 1,
    });
    this.initialLoad = true;
    this.fetchNotes();
  }

  //function to set page to a number
  public setPage(page: number) {
    if (page > this.pagination().lastPage || page < 1) return;
    if (page === this.pagination().page) return;
    this.pagination.set({
      ...this.pagination(),
      page,
    });
    this.initialLoad = true;
    this.fetchNotes();
  }

  public fetchNotes() {
    if (this.initialLoad) {
      this.isLoading.set(true);
    }
    const params = this.getSearchParams();
    this.http
      .get<NotesResponse>(this.endpoint, { params })
      .pipe(finalize(() => this.isLoading.set(false)))
      .subscribe({
        next: (n) => {
          this.data.set(n.data);
          this.pagination.set({ ...n.data });
        },
      });
  }

  createNote(note: INote) {
    const newNotes = [...this.data()?.data, note];
    this.data.set({ ...this.data(), data: newNotes });

    this.http.post<INote>(this.endpoint, note).subscribe({
      next: () => {
        this.fetchNotes();
        this.toast.showSuccess("Note created successfully");
      },
      error: (e: IGenericResponse<INote>) => {
        this.toast.showError(e.message);
      },
    });
  }

  deleteNote(id: number) {
    this.data.set({
      ...this.data(),
      data: this.data().data.filter((n) => n.id !== id),
    });
    this.http.delete<INote>(`${this.endpoint}/${id}`).subscribe({
      next: () => {
        this.fetchNotes();
        this.toast.showSuccess("Note deleted successfully");
      },
      error: (e: IGenericResponse<INote>) => {
        this.toast.showError(e.message);
      },
    });
  }

  updateNote(note: INote) {
    const newNotes = this.data().data.map((n) => {
      if (n.id === note.id) {
        return note;
      }
      return n;
    });
    this.data.set({ ...this.data(), data: newNotes });

    if (this.single()?.id === note.id) {
      this.single.set(note);
    }

    this.http.put<INote>(`${this.endpoint}/${note.id}`, note).subscribe({
      next: () => {
        this.fetchNotes();
        this.getNote(note.id);
        this.toast.showSuccess("Note updated successfully");
      },
      error: (e: IGenericResponse<INote>) => {
        this.toast.showError(e.message);
      },
    });
  }

  getNote(id: number) {
    this.http.get<IGenericResponse<INote>>(`${this.endpoint}/${id}`).subscribe({
      next: (n) => {
        this.single.set(n.data);
      },
    });
    return this.single;
  }

  resetNote() {
    this.single.set(undefined);
  }
}
