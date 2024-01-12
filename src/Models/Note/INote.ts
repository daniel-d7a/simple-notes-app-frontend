import { IBaseItem } from "../Base/IBaseItem";

export type INote = IBaseItem & {
  title?: string;
  body?: string;
};
