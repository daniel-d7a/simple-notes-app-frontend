import { INote } from "./../../../Models/Note/INote";
import { Injectable } from "@angular/core";
import { BaseService } from "../base.service";
import { ILabel } from "../../../Models/Label/Label";
@Injectable({
  providedIn: "root",
})
export class NotesService extends BaseService<INote> {
  constructor() {
    super("Notes");
  }

  toggleFavourite(note: INote) {
    console.log("here 1");

    if (!note.id) return;
    console.log("here 2");
    note.isFavourite = !note.isFavourite;

    console.log("here 3");

    this.updateData(note, "Note updated successfully");
  }

  addToLabel(note: INote, label: ILabel) {
    this.single.update((s) => {
      if (!s) return s;
      const labels = s.labels;
      labels.push(label);

      return {
        ...s,
        labels,
      };
    });

    this.http
      .post<ILabel, INote>(`${this.endpoint}/${note.id}/label`, {
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

  removeFromLabel(note: INote, label: ILabel) {
    this.single.update((s) => {
      if (!s) return s;
      const labels = s.labels;

      const indexToRemove = labels.findIndex((l) => l.id === label.id);
      labels.splice(indexToRemove, 1);

      return {
        ...s,
        labels,
      };
    });

    this.http
      .delete<INote>(`${this.endpoint}/${note.id}/label/${label.id}`)
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
