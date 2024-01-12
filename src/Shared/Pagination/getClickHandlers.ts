import { IBaseItem } from "../../Models/Base/IBaseItem";
import { BaseService } from "../../Services/http/base.service";

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
