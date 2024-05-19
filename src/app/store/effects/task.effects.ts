import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, mergeMap, tap, switchMap } from 'rxjs/operators';
import { TaskService } from '../../services/task.service';
import {
  deleteTaskRequest,
  getAllTaskFailure,
  getAllTaskRequest,
  getAllTaskSuccess,
  getTaskByUserRequest,
  getTaskByUserSuccess,
  postTaskRequest,
  postTaskSuccess,
  putTaskRequest,
  putTaskSuccess,
  deleteTaskSuccess
} from '../actions/task.actions';
import { Router } from "@angular/router";
import { SnackbarService } from "../../utils/snackbar.service";

@Injectable()
export class TaskEffects {

  constructor(
    private actions$: Actions,
    private snackbarService: SnackbarService,
    private taskService: TaskService) {}

  private handleError = (error: any) => {
    return of(getAllTaskFailure({ error }));
  };

  getAllTaskRequest$ = createEffect(() =>
    this.actions$.pipe(
      ofType(getAllTaskRequest),
      mergeMap(() =>
        this.taskService.getTasks().pipe(
          tap((tasks) => console.info('Tasks received from API:', tasks)),
          map((tasks) => getAllTaskSuccess({ tasks })),
          catchError(this.handleError)
        )
      )
    )
  );

  getTaskByUserRequest$ = createEffect(() =>
    this.actions$.pipe(
      ofType(getTaskByUserRequest),
      mergeMap(() =>
        this.taskService.getTasksByUser().pipe(
          tap((tasks) => console.info('Tasks received from API:', tasks)),
          map((tasks) => getTaskByUserSuccess({ tasks })),
          catchError(this.handleError)
        )
      )
    )
  );

  postTaskRequest$ = createEffect(() =>
    this.actions$.pipe(
      ofType(postTaskRequest),
      mergeMap((action) =>
        this.taskService.postTask(action.task).pipe(
          map((task) => postTaskSuccess({ task })),
          catchError((error) => {
            this.snackbarService.showError('Failed to create task');
            return of(getAllTaskFailure({ error }));
          })
        )
      )
    )
  );

  putTaskRequest$ = createEffect(() =>
    this.actions$.pipe(
      ofType(putTaskRequest),
      mergeMap((action) =>
        this.taskService.putTask(action.task).pipe(
          map((task) => putTaskSuccess({ task })),
          catchError((error) => {
            this.snackbarService.showError('Failed to update task');
            return of(getAllTaskFailure({ error }));
          })
        )
      )
    )
  );

  deleteTaskRequest$ = createEffect(() =>
    this.actions$.pipe(
      ofType(deleteTaskRequest),
      tap((action) => console.info('Action received:', action)),
      mergeMap((action) =>
        this.taskService.deleteTask(action.task).pipe(
          map(() => deleteTaskSuccess({ task: action.task })),
          catchError((error) => {
            this.snackbarService.showError('Failed to delete task');
            return of(getAllTaskFailure({ error }));
          })
        )
      )
    )
  );

  refreshTasks$ = createEffect(() =>
    this.actions$.pipe(
      ofType(postTaskSuccess, putTaskSuccess, deleteTaskSuccess), // Listen for specific success actions
      switchMap(() => [
        getTaskByUserRequest(), // Dispatch action to get tasks by user after saving task
        getAllTaskRequest() // Refresh all tasks
      ])// Dispatch getAllTaskRequest action after specific success actions
    )
  );
}
