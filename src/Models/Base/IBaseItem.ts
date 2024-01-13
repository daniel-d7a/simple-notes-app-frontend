export type IBaseItem = {
  id: number;
  isFavourite: boolean;
  createdAt: Date;
  updatedAt: Date;
  userId: string;
  user?: any;
};
