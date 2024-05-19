import { createAction, props } from '@ngrx/store';
import { TaskModel } from '../models/task.model';
import {
  TaskDeleteFailed,
  TaskDeleteRequest, TaskDeleteSuccess,
  TaskGetAllFailed,
  TaskGetAllRequest,
  TaskGetAllSuccess,
  TaskGetUserFailed,
  TaskGetUserRequest,
  TaskGetUserSuccess, TaskPostFailed, TaskPostRequest, TaskPostSuccess,
  TaskPutFailed,
  TaskPutRequest,
  TaskPutSuccess
} from "../const/task.const";

export const getAllTaskRequest = createAction(TaskGetAllRequest);
export const getAllTaskSuccess = createAction(TaskGetAllSuccess, props<{ tasks: TaskModel[] }>());
export const getAllTaskFailure = createAction(TaskGetAllFailed, props<{ error: any }>());

export const getTaskByUserRequest = createAction(TaskGetUserRequest);
export const getTaskByUserSuccess = createAction(TaskGetUserSuccess, props<{ tasks: TaskModel[] }>());
export const getTaskByUserFailure = createAction(TaskGetUserFailed, props<{ error: any }>());

export const postTaskRequest = createAction(TaskPostRequest,  props<{ task: TaskModel }>());
export const postTaskSuccess = createAction(TaskPostSuccess, props<{ task: TaskModel }>());
export const postTaskFailure = createAction(TaskPostFailed, props<{ error: any }>());

export const putTaskRequest = createAction(TaskPutRequest, props<{ task: TaskModel }>());
export const putTaskSuccess = createAction(TaskPutSuccess, props<{ task: TaskModel }>());
export const putTaskFailure = createAction(TaskPutFailed, props<{ error: any }>());

export const deleteTaskRequest = createAction(TaskDeleteRequest, props<{ task: TaskModel }>());
export const deleteTaskSuccess = createAction(TaskDeleteSuccess, props<{ task: TaskModel }>());
export const deleteTaskFailure = createAction(TaskDeleteFailed, props<{ error: any }>());
