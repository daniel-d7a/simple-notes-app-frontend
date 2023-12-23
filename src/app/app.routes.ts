import { Routes } from "@angular/router";
import { NotesHomeComponent } from "../Pages/Notes/notes-home/notes-home.component";
import { SingleNoteComponent } from "../Pages/Notes/single-note/single-note.component";
import { SignupComponent } from "../Pages/Auth/SIgnup/signup.component";
import { LoginComponent } from "../Pages/Auth/login/login.component";
import { loggedInGuard } from "../Guards/auth/logged-in.guard";

export const routes: Routes = [
  {
    path: "",
    component: NotesHomeComponent,
    canActivate: [loggedInGuard],
  },
  {
    path: "register",
    component: SignupComponent,
  },
  {
    path: "login",
    component: LoginComponent,
  },
  {
    path: "notes/:id",
    component: SingleNoteComponent,
    canActivate: [loggedInGuard],
  },
];
