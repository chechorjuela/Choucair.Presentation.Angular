import {Component, OnInit} from '@angular/core';
import {TaskModel} from "../../store/models/task.model";
import {filter, Observable} from "rxjs";
import {select, Store} from "@ngrx/store";
import {getAllTaskRequest} from "../../store/actions/task.actions";
import {selectTasksAll, selectTasksError, selectTasksLoading} from "../../store/selectors/task.selectors";
import {map} from "rxjs/operators";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit {
  displayedColumns: string[] = ['id', 'title', 'description', 'createdAt', 'createdBy'];
  taskList$: Observable<TaskModel[]> = new Observable<TaskModel[]>(); // Inicializar con un observable vacío

  loading$!: Observable<boolean>;
  error$!: Observable<string> | undefined;

  constructor(private store: Store) {
    this.store.dispatch(getAllTaskRequest());
  }

  ngOnInit(): void {

    this.taskList$ = this.store.select(selectTasksAll).pipe(
      map(tasks => tasks ?? []) // Transformar null en un array vacío
    );
    this.loading$ = this.store.select(selectTasksLoading);
    this.error$ = this.store.select(selectTasksError);
  }

}
