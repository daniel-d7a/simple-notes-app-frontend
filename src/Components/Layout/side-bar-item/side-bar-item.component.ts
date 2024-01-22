import { CommonModule } from "@angular/common";
import { Component, Input, inject } from "@angular/core";
import {
  IsActiveMatchOptions,
  Router,
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
import { TruncatePipe } from "../../../Pipes/truncate.pipe";

@Component({
  selector: "side-bar-item",
  standalone: true,
  imports: [NgIconComponent, CommonModule, RouterModule, TruncatePipe],
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
  @Input() params: { [key: string]: string } = {};

  private router = inject(Router);

  matchOptions: IsActiveMatchOptions = {
    paths: "exact",
    queryParams: "ignored",
    fragment: "ignored",
    matrixParams: "ignored",
  };

  navigate() {
    if (this.params) {
      this.params = { ...this.params };
    }
    this.router.navigate([this.to], { queryParams: this.params });
  }
}
