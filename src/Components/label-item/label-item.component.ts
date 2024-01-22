import { NotesService } from "./../../Services/http/Notes/notes.service";
import {
  Component,
  ElementRef,
  Input,
  OnChanges,
  OnInit,
  ViewChild,
  inject,
} from "@angular/core";
import { NgIconComponent, provideIcons } from "@ng-icons/core";
import { SideBarItemComponent } from "../Layout/side-bar-item/side-bar-item.component";
import { faTrashCan } from "@ng-icons/font-awesome/regular";
import { ILabel } from "../../Models/Label/Label";
import { LabelService } from "../../Services/http/Labels/label.service";
import {
  FormBuilder,
  FormControl,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from "@angular/forms";
import { debounce, debounceTime, distinctUntilChanged } from "rxjs";
import { Router } from "@angular/router";
import { TodoService } from "../../Services/http/Todos/todo.service";

@Component({
  selector: "label-item",
  standalone: true,
  imports: [SideBarItemComponent, NgIconComponent, ReactiveFormsModule],
  templateUrl: "./label-item.component.html",
  styleUrl: "./label-item.component.css",
  viewProviders: [provideIcons({ faTrashCan })],
})
export class LabelItemComponent implements OnChanges, OnInit {
  @Input({ required: true }) label!: ILabel;
  @Input() isEditing = false;
  @ViewChild("updateLabelInput")
  updateLabelInput!: ElementRef<HTMLInputElement>;

  private labelService = inject(LabelService);
  private fb = inject(FormBuilder);

  nameForm = this.fb.group({
    name: [this.label?.name || "", Validators.required],
  });

  ngOnInit(): void {
    this.nameForm.setValue({
      name: this.label.name,
    });
    this.updateLabel();
  }

  ngOnChanges(): void {
    if (this.isEditing) {
      this.updateLabelInput?.nativeElement.focus();
    }
  }

  deleteLabel(event: Event, label: ILabel) {
    event.stopPropagation();
    this.labelService.deleteLabel(label.id);
  }

  updateLabel() {
    this.nameForm
      .get("name")
      ?.valueChanges.pipe(debounceTime(500), distinctUntilChanged())
      .subscribe({
        next: (val) => {
          if (!val || val === this.label.name) return;
          this.labelService.updateLabel({
            ...this.label,
            name: val,
          });
        },
      });
  }
}
