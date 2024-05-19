import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable, of} from 'rxjs';
import { TaskModel } from '../store/models/task.model';
import {catchError, map} from "rxjs/operators";
import {LocalStorageService} from "../utils/local-storage.service";
import {HttpHelperService} from "../utils/http-helper.service";
import {API_ROUTES} from "../shared/api-routes";

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  private apiUrl = 'http://localhost:5175/api/TaskUser';

  constructor(private http: HttpClient, private httpHelper: HttpHelperService,private localStorageService : LocalStorageService) {}

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
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    return this.http.get<any>(`${this.apiUrl}/getByUser/${userId}`, { headers })
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

    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    return this.http.post<any>(`${this.apiUrl}`, task,{ headers })
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

    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    return this.http.put<any>(`${this.apiUrl}/${task.id}`, task,{ headers })
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
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    return this.http.delete<any>(`${this.apiUrl}/${task.id}`,{ headers })
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
