import { INote } from "./../../../Models/Note/INote";
import { Injectable } from "@angular/core";
import { BaseService } from "../base.service";
@Injectable({
  providedIn: "root",
})
export class NotesService extends BaseService<INote> {
  constructor() {
    super("Notes");
  }
}
