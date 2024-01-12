import { Component } from "@angular/core";
import { SideBarItemComponent } from "../side-bar-item/side-bar-item.component";
import { NgIconComponent, provideIcons } from "@ng-icons/core";
import { ionMenu } from "@ng-icons/ionicons";
import { CommonModule } from "@angular/common";

@Component({
  selector: "app-side-bar",
  standalone: true,
  imports: [SideBarItemComponent, NgIconComponent, CommonModule],
  templateUrl: "./side-bar.component.html",
  styleUrl: "./side-bar.component.css",
  viewProviders: [provideIcons({ ionMenu })],
})
export class SideBarComponent {
  isClosed = false;

  toggleSideBar() {
    this.isClosed = !this.isClosed;
  }
}
