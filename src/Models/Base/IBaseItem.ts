import { ILabel } from "../Label/Label";

export type IBaseItem = {
  id: number;
  isFavourite: boolean;
  createdAt: Date;
  updatedAt: Date;
  userId: string;
  user?: any;
  labels: ILabel[];
};
