import { Routes } from "@angular/router";
import { NotesHomeComponent } from "../Pages/Notes/notes-home/notes-home.component";
import { SingleNoteComponent } from "../Pages/Notes/single-note/single-note.component";

export const routes: Routes = [
  {
    path: "",
    component: NotesHomeComponent,
  },
  {
    path: "notes/:id",
    component: SingleNoteComponent,
  },
];
