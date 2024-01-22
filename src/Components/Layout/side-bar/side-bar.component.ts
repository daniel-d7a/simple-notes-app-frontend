import {
  AfterViewChecked,
  Component,
  ElementRef,
  ViewChild,
  WritableSignal,
  inject,
} from "@angular/core";
import { SideBarItemComponent } from "../side-bar-item/side-bar-item.component";
import { NgIconComponent, provideIcons } from "@ng-icons/core";
import { ionMenu } from "@ng-icons/ionicons";
import { bootstrapBookmarkPlus } from "@ng-icons/bootstrap-icons";
import { CommonModule } from "@angular/common";
import { LabelService } from "../../../Services/http/Labels/label.service";
import { ILabel } from "../../../Models/Label/Label";
import { faTrashCan } from "@ng-icons/font-awesome/regular";
import { LabelItemComponent } from "../../label-item/label-item.component";

@Component({
  selector: "app-side-bar",
  standalone: true,
  imports: [
    SideBarItemComponent,
    NgIconComponent,
    CommonModule,
    LabelItemComponent,
  ],
  templateUrl: "./side-bar.component.html",
  styleUrl: "./side-bar.component.css",
  viewProviders: [provideIcons({ ionMenu, faTrashCan, bootstrapBookmarkPlus })],
})
export class SideBarComponent implements AfterViewChecked {
  private labelService = inject(LabelService);
  isClosed = true;
  labels: WritableSignal<ILabel[]>;
  addLabel = false;
  editLabels = false;
  @ViewChild("labelInput") labelInput!: ElementRef<HTMLInputElement>;

  constructor() {
    this.labels = this.labelService.data;
  }

  ngAfterViewChecked(): void {
    if (this.addLabel) {
      this.labelInput.nativeElement.focus();
    }
  }

  toggleSideBar() {
    this.isClosed = !this.isClosed;
  }

  toggleAddLable() {
    this.addLabel = !this.addLabel;
  }

  toggleEdit() {
    this.editLabels = !this.editLabels;
  }

  createLabel(event: Event) {
    const value = (event.target as HTMLInputElement).value;
    if (!value) {
      this.toggleAddLable();
      return;
    }
    this.labelService.createLabel({
      name: value,
    } as ILabel);
    (event.target as HTMLInputElement).value = "";
    this.toggleAddLable();
  }
}
