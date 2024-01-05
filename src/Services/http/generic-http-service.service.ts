import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Injectable, inject, signal } from "@angular/core";
import {
  Observable,
  catchError,
  delay,
  finalize,
  map,
  pipe,
  throwError,
} from "rxjs";
import { IAuthResponse } from "./Auth/Types/auth.types";
import { environment } from "../../environments/environment";

@Injectable({
  providedIn: "root",
})
export class GenericHttpService {
  base_url = environment.apiUrl;
  private http = inject(HttpClient);
  private DELAY = environment.production ? 0 : 1000;
  isLoading$ = signal(false);
  private handleError(error: any) {
    let errorMessage: string;

    if (error.url?.includes("auth"))
      return throwError(
        () => new Error((error.error as IAuthResponse).message)
      );

    error = error.error;
    const msg = error.title || error.error || error.message;

    if (msg) {
      errorMessage = msg;
      console.log(error);
      return throwError(() => new Error(errorMessage));
    }

    switch (error.status) {
      case 500:
        errorMessage = "Internal Server Error, please try again later";
        break;
      case 503:
        errorMessage = "Service Unavailable, please try again later";
        break;
      case 404:
        errorMessage = "The requested resource was not found";
        break;
      case 400:
        errorMessage = "Bad Request";
        break;
      case 401:
        errorMessage = "Unauthorized";
        break;
      case 403:
        errorMessage = "Forbidden";
        break;
      default:
        errorMessage = "An error occurred";
        break;
    }

    console.log(error);
    return throwError(() => new Error(errorMessage));
  }

  private defaultPipes = () => {
    return pipe(
      delay(this.DELAY),
      catchError(this.handleError),
      finalize(() => this.isLoading$.set(false))
    );
  };

  get<T>(url: string, options?: any): Observable<T> {
    this.isLoading$.set(true);
    return this.http
      .get<T>(this.base_url + url, options)
      .pipe(this.defaultPipes()) as Observable<T>;
  }

  post<T>(url: string, body: T): Observable<T>;
  post<T, U>(url: string, body: T): Observable<U>;
  post<T, U>(url: string, body: T): Observable<T | U> {
    this.isLoading$.set(true);
    return this.http.post<T>(this.base_url + url, body).pipe(
      this.defaultPipes(),
      map((res: unknown) => (url.startsWith("auth") ? (res as U) : (res as T)))
    );
  }

  delete<T>(url: string): Observable<T> {
    this.isLoading$.set(true);
    return this.http
      .delete<T>(this.base_url + url)
      .pipe(this.defaultPipes()) as Observable<T>;
  }

  put<T>(url: string, body: T): Observable<T> {
    this.isLoading$.set(true);
    return this.http
      .put<T>(this.base_url + url, body)
      .pipe(this.defaultPipes()) as Observable<T>;
  }
}
