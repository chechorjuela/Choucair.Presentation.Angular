import {inject, Injectable} from '@angular/core';
import {catchError, map} from "rxjs/operators";
import {Observable, of} from "rxjs";
import {HttpClient, HttpHeaders} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class HttpHelperService {

  constructor(private http: HttpClient) {}

  private getHeaders(): HttpHeaders {
    return new HttpHeaders({ 'Content-Type': 'application/json' });
  }

  private handleError(error: any): Observable<any> {
    console.error('An error occurred:', error);
    return of(error);
  }

  public get<T>(url: string): Observable<T> {
    return this.http.get<T>(`${url}`, { headers: this.getHeaders() }).pipe(
      map(response => response),
      catchError(this.handleError)
    );
  }

  public post<T>(url: string, body: any): Observable<T> {
    return this.http.post<T>(`${url}`, body).pipe(
      map(response => response),
      catchError(this.handleError)
    );
  }

  public put<T>(url: string, body: any): Observable<T> {
    return this.http.put<T>(`${url}`, body, { headers: this.getHeaders() }).pipe(
      map(response => response),
      catchError(this.handleError)
    );
  }

  public delete<T>(url: string): Observable<T> {
    return this.http.delete<T>(`${url}`, { headers: this.getHeaders() }).pipe(
      map(response => response),
      catchError(this.handleError)
    );
  }
}
