import { ITodo } from "./../../../Models/Todo/ITodo";
import { Injectable } from "@angular/core";
import { BaseService } from "../base.service";
import { ITodoEntry } from "../../../Models/Todo/ITodoEntry";
import { IGenericResponse } from "../../../Models/Base/igeneric-response";

@Injectable({
  providedIn: "root",
})
export class TodoService extends BaseService<ITodo> {
  constructor() {
    super("todos");
  }

  addEntry(text: string) {
    const newEntry = {
      text: text,
      isDone: false,
      priority: 0,
      position: 0,
    } as ITodoEntry;

    this.single.update((t) => {
      if (!t) return undefined;
      const prevEntries = t?.entries || [];
      prevEntries.push(newEntry);
      return { ...t, entries: prevEntries };
    });

    this.http
      .post<ITodoEntry>(`${this.endpoint}/${this.single()?.id}/entry`, newEntry)
      .subscribe({
        next: () => {
          this.fetchData();
          this.getSingle(this.single()?.id!);
          this.toast.showSuccess("Entry added successfully");
        },
        error: (e: IGenericResponse<ITodoEntry>) => {
          this.toast.showError(e.message);
        },
      });
  }

  deleteEntry(entry: ITodoEntry) {
    this.single.update((t) => {
      if (!t) return undefined;
      const prevEntries = t?.entries || [];
      const filteredEntries = prevEntries.filter((n) => n.id !== entry.id);
      return { ...t, entries: filteredEntries };
    });

    this.http.delete(`${this.endpoint}/entry/${entry.id}`).subscribe({
      next: () => {
        this.fetchData();
        this.getSingle(this.single()?.id!);
        this.toast.showSuccess("Entry deleted successfully");
      },
      error: (e: IGenericResponse<ITodoEntry>) => {
        this.toast.showError(e.message);
      },
    });
  }

  updateEntry(newValue: string | boolean, entry: ITodoEntry) {
    const newEntry = this.single()?.entries.find((e) => e.id === entry.id)!;
    if (typeof newValue === "string") {
      newEntry.text = newValue;
    } else {
      newEntry.isDone = newValue;
    }

    this.single.update((t) => {
      if (!t) return undefined;
      const prevEntries = t?.entries || [];
      const newEntries = prevEntries.map((n) => {
        if (n.id === entry.id) {
          return newEntry;
        }
        return n;
      });
      return { ...t, entries: newEntries };
    });

    this.http
      .put<ITodoEntry>(
        `${this.endpoint}/${this.single()?.id}/entry/${entry.id}`,
        newEntry
      )
      .subscribe({
        next: () => {
          this.fetchData();
          this.getSingle(this.single()?.id!);
          this.toast.showSuccess("Entry updated successfully");
        },
        error: (e: IGenericResponse<ITodoEntry>) => {
          this.toast.showError(e.message);
        },
      });
  }

  updateEntryIsDone(isDone: boolean, entry: ITodoEntry) {
    const newEntry = this.single()?.entries.find((e) => e.id === entry.id)!;
    newEntry.isDone = isDone;
  }
}
