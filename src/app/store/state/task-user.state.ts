import {TaskModel} from "../models/task.model";

export interface TaskState {
  tasksUser: TaskModel[];
  tasksAll: TaskModel[];
  error: string | null;
  loading: boolean;
}

export const initialTaskState: TaskState = {
  tasksUser: [],
  tasksAll: [],
  error: null,
  loading: false,
};
