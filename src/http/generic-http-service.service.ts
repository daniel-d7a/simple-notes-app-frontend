import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Injectable, inject } from "@angular/core";
import { base_url } from "../constants/base_url";
import {
  Observable,
  ReplaySubject,
  catchError,
  delay,
  distinctUntilChanged,
  finalize,
  map,
  throwError,
} from "rxjs";

@Injectable({
  providedIn: "root",
})
export class GenericHttpService {
  private http = inject(HttpClient);
  private loadingSubject = new ReplaySubject<boolean>(1);
  private DELAY = 1000;

  isLoading$ = this.loadingSubject.pipe(distinctUntilChanged());
  private handleError(error: HttpErrorResponse) {
    let errorMessage = "An error occurred";

    if (error.status.toString().startsWith("5")) {
      errorMessage = "Internal Server Error";
    } else if (error.status.toString().startsWith("4")) {
      errorMessage = "error in the request";
    }
    console.log(error.error);

    return throwError(() => new Error(errorMessage));
  }

  get<T>(url: string) {
    this.loadingSubject.next(true);
    return this.http.get<T>(base_url + url).pipe(
      delay(this.DELAY),
      catchError(this.handleError),
      finalize(() => this.loadingSubject.next(false))
    );
  }
  post<T>(url: string, body: T): Observable<T>;
  post<T, R>(url: string, body: T): Observable<R>;
  post<T, U>(url: string, body: T): Observable<U | T> {
    this.loadingSubject.next(true);
    return this.http.post<T>(base_url + url, body).pipe(
      delay(this.DELAY),
      map((response: unknown) => {
        if (url.startsWith("auth")) {
          return response as U; // Transform the response to type R
        } else {
          return response as T; // Keep the response as type T
        }
      }),
      catchError(this.handleError),
      finalize(() => this.loadingSubject.next(false))
    );
  }

  delete<T>(url: string) {
    this.loadingSubject.next(true);
    return this.http.delete<T>(base_url + url).pipe(
      delay(this.DELAY),
      catchError(this.handleError),
      finalize(() => this.loadingSubject.next(false))
    );
  }

  put<T>(url: string, body: T) {
    this.loadingSubject.next(true);
    return this.http.put<T>(base_url + url, body).pipe(
      delay(this.DELAY),
      catchError(this.handleError),
      finalize(() => this.loadingSubject.next(false))
    );
  }
}
