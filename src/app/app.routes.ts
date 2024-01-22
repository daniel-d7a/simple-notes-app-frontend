import { Routes } from "@angular/router";
import { NotesHomeComponent } from "../Pages/Notes/notes-home/notes-home.component";
import { SingleNoteComponent } from "../Pages/Notes/single-note/single-note.component";
import { SignupComponent } from "../Pages/Auth/SIgnup/signup.component";
import { LoginComponent } from "../Pages/Auth/login/login.component";
import { loggedInGuard } from "../Guards/auth/logged-in.guard";
import { HomePageComponent } from "../Pages/home-page/home-page.component";
import { TodosHomeComponent } from "../Pages/Todos/todos-home/todos-home.component";
import { SingleTodoComponent } from "../Pages/Todos/single-todo/single-todo.component";
import { SidenavComponent } from "../Pages/sidenav/sidenav.component";

export const routes: Routes = [
  {
    path: "",
    component: SidenavComponent,
    canActivate: [loggedInGuard],
    children: [
      {
        path: "",
        component: HomePageComponent,
      },
      // {
      //   path: "?type=all",
      //   component: HomePageComponent,
      // },
      {
        path: "notes",
        component: NotesHomeComponent,
      },
      {
        path: "notes/:id",
        component: SingleNoteComponent,
      },
      {
        path: "todos",
        component: TodosHomeComponent,
      },
      {
        path: "todos/:id",
        component: SingleTodoComponent,
      },
    ],
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
    path: "**",
    redirectTo: "",
  },
];
