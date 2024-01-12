import { Component } from "@angular/core";
import { RouterModule } from "@angular/router";
import { SideBarComponent } from "../../Components/Layout/side-bar/side-bar.component";
import { NgIconComponent, provideIcons } from "@ng-icons/core";
import { ionMenu } from "@ng-icons/ionicons";

@Component({
  selector: "app-home-page",
  standalone: true,
  imports: [RouterModule, SideBarComponent, NgIconComponent],
  templateUrl: "./home-page.component.html",
  styleUrl: "./home-page.component.css",
  viewProviders: [provideIcons({ ionMenu })],
})
export class HomePageComponent {}
