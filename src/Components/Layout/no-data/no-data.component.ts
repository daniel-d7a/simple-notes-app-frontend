import { Component } from "@angular/core";
import { NgIconComponent, provideIcons } from "@ng-icons/core";
import { cssSmileSad } from "@ng-icons/css.gg";

@Component({
  selector: "no-data",
  standalone: true,
  imports: [NgIconComponent],
  templateUrl: "./no-data.component.html",
  styleUrl: "./no-data.component.css",
  viewProviders: [provideIcons({ cssSmileSad })],
})
export class NoDataComponent {}
