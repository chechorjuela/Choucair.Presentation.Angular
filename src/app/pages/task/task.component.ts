import { Component } from '@angular/core';
import {Observable} from "rxjs";
import {TaskModel} from "../../store/models/task.model";
import {Store} from "@ngrx/store";
import {
  deleteTaskRequest,
  getTaskByUserRequest
} from "../../store/actions/task.actions";
import {
  selectTasksError,
  selectTasksLoading,
  selectTasksUser
} from "../../store/selectors/task.selectors";
import {MatDialog} from "@angular/material/dialog";
import {TaskModalComponent} from "../../modules/task-modal/task-modal.component";
import {map} from "rxjs/operators";
import {ConfirmDeleteComponent} from "../../modules/confirm-delete/confirm-delete.component";
import {TaskState} from "../../store/state/task-user-state";

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrl: './task.component.scss'
})
export class TaskComponent {
  displayedColumns: string[] = ['id', 'title', 'description','time', 'createdAt', 'createdBy', 'isCompleted', 'actions'];
  tasks$: Observable<TaskModel[]> = new Observable<TaskModel[]>();
  loading$! : Observable<boolean>;
  error$! : Observable<string> | undefined;


  constructor(private store: Store<TaskState>, public dialog: MatDialog) {
    this.store.dispatch(getTaskByUserRequest());
  }

  ngOnInit(): void {
    this.tasks$ = this.store.select(selectTasksUser);

    this.loading$ = this.store.select(selectTasksLoading);
    this.error$ = this.store.select(selectTasksError);
  }

  openTaskModal(): void {
    const dialogRef = this.dialog.open(TaskModalComponent, {
      width: '400px'
    });

    dialogRef.afterClosed().subscribe((result: TaskModel) => {
      if (result) {

      }
      dialogRef.close();
    });
  }

  openEditModal(task: TaskModel): void {
    const dialogRef = this.dialog.open(TaskModalComponent, {
      data:  {task},
      width: '400px'
    });

    dialogRef.afterClosed().subscribe((result: TaskModel) => {
      if (result) {

      }
      dialogRef.close();
    });
  }

  deleteTask(task: TaskModel): void {
    const dialogRef = this.dialog.open(ConfirmDeleteComponent, {
      data: { task }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.store.dispatch(deleteTaskRequest({task}));

      }
    });
  }
}
