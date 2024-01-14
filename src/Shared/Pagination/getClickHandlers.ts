import { inject } from "@angular/core";
import { IBaseItem } from "../../Models/Base/IBaseItem";
import { BaseService } from "../../Services/http/base.service";
import { ActivatedRoute, Router } from "@angular/router";

export function getClickHandlers(service: BaseService<IBaseItem>) {


  return {
    increment: () => {
      service.incrementPage();
    },
    decrement: () => {
      service.decrementPage();
    },
    set: (page: number) => {
      service.setPage(page);
    },
  };
}
