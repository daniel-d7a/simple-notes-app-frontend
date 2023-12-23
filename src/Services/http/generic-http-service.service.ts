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
import { base_url } from "../../constants/base_url";
import { IAuthResponse } from "./Auth/Types/auth.types";

@Injectable({
  providedIn: "root",
})
export class GenericHttpService {
  private http = inject(HttpClient);
  private DELAY = 1000;
  isLoading$ = signal(false);
  private handleError(error: HttpErrorResponse) {
    let errorMessage: string;

    if (error.url?.includes("auth"))
      return throwError(
        () => new Error((error.error as IAuthResponse).message)
      );

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

  get<T>(url: string) {
    this.isLoading$.set(true);
    return this.http.get<T>(base_url + url).pipe(this.defaultPipes());
  }

  post<T>(url: string, body: T): Observable<T>;
  post<T, U>(url: string, body: T): Observable<U>;
  post<T, U>(url: string, body: T): Observable<T | U> {
    this.isLoading$.set(true);
    return this.http.post<T>(base_url + url, body).pipe(
      this.defaultPipes(),
      map((res: unknown) => (url.startsWith("auth") ? (res as U) : (res as T)))
    );
  }

  delete<T>(url: string) {
    this.isLoading$.set(true);
    return this.http.delete<T>(base_url + url).pipe(this.defaultPipes());
  }

  put<T>(url: string, body: T) {
    this.isLoading$.set(true);
    return this.http.put<T>(base_url + url, body).pipe(this.defaultPipes());
  }
}
