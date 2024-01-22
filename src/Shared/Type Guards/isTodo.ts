import { IBaseItem } from "../../Models/Base/IBaseItem";
import { ITodo } from "../../Models/Todo/ITodo";


export class TodoGuard {
  public static isTodo(item: IBaseItem): item is ITodo {
    return (item as ITodo).entries ? true : false;
  }
}
