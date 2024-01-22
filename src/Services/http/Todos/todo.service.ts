import { ITodo } from "./../../../Models/Todo/ITodo";
import { Injectable } from "@angular/core";
import { BaseService } from "../base.service";
import { ITodoEntry } from "../../../Models/Todo/ITodoEntry";
import { ILabel } from "../../../Models/Label/Label";

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
        error: this.baseErrorHandler,
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
      error: this.baseErrorHandler,
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
        error: this.baseErrorHandler,
      });
  }

  updateEntryIsDone(isDone: boolean, entry: ITodoEntry) {
    const newEntry = this.single()?.entries.find((e) => e.id === entry.id)!;
    newEntry.isDone = isDone;
  }

  toggleFavourite(todo: ITodo) {
    if (!todo.id) return;
    todo.isFavourite = !todo.isFavourite;
    this.updateData(todo, "Todo updated successfully");
  }

  addToLabel(todo: ITodo, label: ILabel) {
    this.single.update((s) => {
      if (!s) return s;
      const labels = s.labels;
      labels.push(label);

      return {
        ...s,
        entries: [...s.entries],
        labels,
      };
    });

    this.http
      .post<ILabel, ITodo>(`${this.endpoint}/${todo.id}/label`, {
        id: label.id,
      } as ILabel)
      .subscribe({
        next: () => {
          this.fetchData();
          this.single() && this.getSingle(this.single()?.id!);
          this.toast.showSuccess("label added successfully");
        },
        error: this.baseErrorHandler,
      });
  }

  removeFromLabel(todo: ITodo, label: ILabel) {
    this.single.update((s) => {
      if (!s) return s;
      const labels = s.labels;

      const indexToRemove = labels.findIndex((l) => l.id === label.id);
      labels.splice(indexToRemove, 1);

      return {
        ...s,
        entries: [...s.entries],
        labels,
      };
    });

    this.http
      .delete<ITodo>(`${this.endpoint}/${todo.id}/label/${label.id}`)
      .subscribe({
        next: () => {
          this.fetchData();
          this.single() && this.getSingle(this.single()?.id!);
          this.toast.showSuccess("label removed successfully");
        },
        error: this.baseErrorHandler,
      });
  }
}
