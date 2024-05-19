import { createFeatureSelector, createSelector } from '@ngrx/store';
import {TaskState} from "../state/task-user-state";
import {TaskModel} from "../models/task.model";

export const selectTaskState = createFeatureSelector<TaskState>('tasks');

export const selectTasksUser = createSelector(
  selectTaskState,
  (state: TaskState) => state.tasksUser
);

export const selectTasksAll = createSelector(
  selectTaskState,
  (state: TaskState) => state.tasksAll
);

export const selectTasksLoading = createSelector(
  selectTaskState,
  state => state.loading
);

export const selectTasksError = createSelector(
  selectTaskState,
  state => state.error as any
);
