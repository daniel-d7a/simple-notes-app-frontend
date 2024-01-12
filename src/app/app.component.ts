import { Component } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterOutlet } from "@angular/router";
import { NotesHomeComponent } from "../Pages/Notes/notes-home/notes-home.component";
import { SideBarComponent } from "../Components/Layout/side-bar/side-bar.component";
@Component({
  selector: "app-root",
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    NotesHomeComponent,
    SideBarComponent
  ],
  templateUrl: "./app.component.html",
  styleUrl: "./app.component.css",
})
export class AppComponent {
  title = "todo-app";
}
