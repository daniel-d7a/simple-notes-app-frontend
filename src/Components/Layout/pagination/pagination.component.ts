import { Component, Input, OnChanges, OnDestroy, inject } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";

@Component({
  selector: "pagination",
  standalone: true,
  imports: [],
  templateUrl: "./pagination.component.html",
  styleUrl: "./pagination.component.css",
})
export class PaginationComponent implements OnChanges, OnDestroy {
  @Input({ required: true }) onClicks!: {
    increment: () => void;
    decrement: () => void;
    set: (page: number) => void;
  };
  @Input({ required: true }) lastPage = 1;
  page = 1;
  pageSubscription;
  private activateRoute = inject(ActivatedRoute);
  constructor() {
    this.pageSubscription = this.activateRoute.queryParamMap.subscribe(
      (params) => {
        this.page = Number(params.get("page")) || 1;
      }
    );
  }

  ngOnDestroy() {
    this.pageSubscription.unsubscribe();
  }

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
      } else if (this.page >= pageCount - 2) {
        return [1, "...", pageCount - 2, pageCount - 1, pageCount];
      } else if (this.page > 3) {
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
