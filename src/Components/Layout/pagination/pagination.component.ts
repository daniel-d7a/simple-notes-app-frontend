import { Component, Input, OnChanges } from "@angular/core";

@Component({
  selector: "pagination",
  standalone: true,
  imports: [],
  templateUrl: "./pagination.component.html",
  styleUrl: "./pagination.component.css",
})
export class PaginationComponent implements OnChanges {
  @Input({ required: true }) onClicks!: {
    increment: () => void;
    decrement: () => void;
    set: (page: number) => void;
  };
  @Input({ required: true }) page = 1;
  @Input({ required: true }) lastPage = 1;

  paginationElements = this.getPaginationElements();

  ngOnChanges() {
    this.paginationElements = this.getPaginationElements();
  }

  getPaginationElements(): (string | number)[] {
    const pageCount = this.lastPage;

    if (pageCount <= 4) {
      return Array.from({ length: pageCount }, (_, i) => i + 1);
    } else if (pageCount > 4) {
      if (this.page <= 3) {
        return [1, 2, 3, "...", pageCount];
      }
      else if (this.page >= pageCount - 2) {
        return [1, "...", pageCount - 2, pageCount - 1, pageCount];
      }
      else if (this.page > 3) {
        return [
          1,
          "...",
          this.page - 1,
          this.page,
          this.page + 1,
          "...",
          pageCount,
        ];
      }
    }
    return [];
  }

  setPage(page: number | string) {
    this.onClicks.set(Number(page));
  }
}
