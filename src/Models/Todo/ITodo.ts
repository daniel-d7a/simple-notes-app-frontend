import { IBaseItem } from "../Base/IBaseItem";
import { ITodoEntry } from "./ITodoEntry";

export type ITodo = IBaseItem & {
  title?: string;
  entries: ITodoEntry[];
  isDone: boolean;
};
