import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable, of} from 'rxjs';
import {TaskModel} from '../store/models/task.model';
import {catchError, map} from "rxjs/operators";
import {LocalStorageService} from "../utils/local-storage.service";
import {HttpHelperService} from "../utils/http-helper.service";
import {API_ROUTES} from "../shared/api-routes";

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  constructor(private http: HttpClient, private httpHelper: HttpHelperService, private localStorageService: LocalStorageService) {
  }

  getTasks(): Observable<TaskModel[]> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });

    return this.httpHelper.get<TaskModel[]>(`${API_ROUTES.TASK.GET_TASKS}`).pipe(
      map((response: any) => {
        return response.data;
      }),
      catchError(error => {
        return of(error);
      })
    );
  }

  getTasksByUser(): Observable<TaskModel[]> {
    const {userId} = this.localStorageService.get('user');

    return this.httpHelper.get<any>(`${API_ROUTES.TASK.GET_TASKS_BY_USER(userId)}`)
      .pipe(
        map(response => {
          return response.data;
        }),
        catchError(error => {
          return of(error);
        })
      );
  }

  postTask(task: TaskModel): Observable<TaskModel> {

    return this.httpHelper.post<any>(`${API_ROUTES.TASK.POST_TASK}`, task)
      .pipe(
        map(response => {
          return response.data;
        }),
        catchError(error => {
          return of(error);
        })
      );
  }

  putTask(task: TaskModel): Observable<TaskModel> {

    return this.httpHelper.put<any>(`${API_ROUTES.TASK.PUT_TASK(task.id ? task.id.toString() : "")}`, task)
      .pipe(
        map(response => {
          return response.data;
        }),
        catchError(error => {
          return of(error);
        })
      );
  }

  deleteTask(task: TaskModel): Observable<TaskModel> {

    return this.httpHelper.delete<any>(`${API_ROUTES.TASK.DELETE_TASK(task.id ? task.id.toString() : "")}`)
      .pipe(
        map(response => {
          return response.data;
        }),
        catchError(error => {
          return of(error);
        })
      );
  }
}
