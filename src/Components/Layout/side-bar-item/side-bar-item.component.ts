import { CommonModule } from "@angular/common";
import { Component, Input } from "@angular/core";
import {
  IsActiveMatchOptions,
  RouterLink,
  RouterModule,
} from "@angular/router";
import { NgIconComponent, provideIcons } from "@ng-icons/core";
import {
  faNoteSticky,
  faPenToSquare,
  faTrashCan,
  faBookmark,
  faStar,
} from "@ng-icons/font-awesome/regular";
import { heroHome, heroArchiveBoxArrowDown } from "@ng-icons/heroicons/outline";

@Component({
  selector: "side-bar-item",
  standalone: true,
  imports: [NgIconComponent, CommonModule, RouterModule],
  templateUrl: "./side-bar-item.component.html",
  styleUrl: "./side-bar-item.component.css",
  viewProviders: [
    provideIcons({
      faNoteSticky,
      faPenToSquare,
      heroHome,
      heroArchiveBoxArrowDown,
      faTrashCan,
      faBookmark,
      faStar,
    }),
  ],
})
export class SideBarItemComponent {
  @Input({ required: true }) icon!: string;
  @Input({ required: true }) tooltip!: string;
  @Input({ required: true }) to!: string;

  matchOptions: IsActiveMatchOptions = {
    paths: "exact",
    queryParams: "ignored",
    fragment: "ignored",
    matrixParams: "ignored",
  };
}
