export type INote = {
  id: number;
  title?: string;
  body?: string;
  createdAt: Date;
  updatedAt: Date;
  userId: string;
  user?: any;
};
