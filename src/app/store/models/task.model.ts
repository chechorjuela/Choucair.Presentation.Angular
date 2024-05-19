import {UserModel} from "./user.model";

export interface TaskModel {
  id?: number;
  title: string;
  description: string;
  isCompleted?: boolean;
  time: Date;
  createAt?: Date;
  updateAt?: Date;
  userId?: number | undefined;
  user?: UserModel;
}
