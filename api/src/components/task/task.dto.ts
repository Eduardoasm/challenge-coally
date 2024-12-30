export interface ITask {
  _id?: any;
  title: string;
  completed: boolean;
  description?: string;
  createdAt?: Date;
  updatedAt?: Date;
}
