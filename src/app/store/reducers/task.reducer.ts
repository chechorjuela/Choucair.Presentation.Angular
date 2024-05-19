import { createReducer, on } from '@ngrx/store';
import {
  deleteTaskRequest,
  getAllTaskRequest,
  getAllTaskSuccess,
  getTaskByUserRequest,
  getTaskByUserSuccess, postTaskFailure, postTaskRequest, postTaskSuccess
} from "../actions/task.actions";
import {initialTaskState} from "../state/task-user-state";

const _taskReducer = createReducer(
  initialTaskState,
  on(getAllTaskRequest, state => ({
    ...state,
    loading: true
  })),
  on(getAllTaskSuccess, (state, { tasks }) => ({
    ...state,
    tasksAll: tasks,
    loading: false,
    error: null
  })),
  on(getTaskByUserRequest, state => ({
    ...state,
    loading: true,
    error: null
  })),
  on(getTaskByUserSuccess, (state, { tasks }) => ({
    ...state,
    tasksUser: tasks,
    loading: false,
    error: null
  })),
  on(postTaskRequest, (state, { task }) => ({
    ...state,
    loading: true,
    error: null
  })),
  on(postTaskSuccess, state => ({
    ...state,
    loading: false,
    error: null
  })),
  on(postTaskFailure, state => ({
    ...state,
    tasksAll: state.tasksAll,
    loading: false,
    error: null
  })),
  on(deleteTaskRequest, state => ({
    ...state,
    loading: true,
    error: null
  })),
);

export function taskReducer(state: any, action: any) {
  return _taskReducer(state, action);
}
