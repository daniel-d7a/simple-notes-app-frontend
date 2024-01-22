import { IGenericResponse } from "./../../Models/Base/igeneric-response";
import { inject, signal } from "@angular/core";
import { GenericHttpService } from "./generic-http-service.service";
import { ToastService } from "../Toast/toast.service";
import { IPaginatedResponse } from "../../Models/Base/ipaginated-response";
import { IPaginationData } from "../../Models/Base/ipagination-data";
import { defaultPaginationData } from "../../constants/Pagination/defaultPaginationData";
import { HttpParams } from "@angular/common/http";
import { finalize } from "rxjs";
import { IBaseItem } from "../../Models/Base/IBaseItem";
import { ActivatedRoute, Router } from "@angular/router";

export class BaseService<T extends IBaseItem> {
  protected http = inject(GenericHttpService);
  protected toast = inject(ToastService);
  protected initialLoad = true;
  private router = inject(Router);
  private activatedRoute = inject(ActivatedRoute);
  private params = { type: "", name: "" };

  data = signal<IPaginatedResponse<T>>({} as IPaginatedResponse<T>);
  single = signal<T | undefined>(undefined);
  isLoading = signal<boolean>(false);
  pagination = signal<IPaginationData>(defaultPaginationData);

  constructor(protected endpoint: string) {
    this.activatedRoute.queryParamMap.subscribe((params) => {
      this.params = Object.entries(params)[0][1];
      this.pagination.set({ ...defaultPaginationData });
      this.fetchData();
      this.initialLoad = false;
    });
  }

  protected getSearchParams() {
    let params = new HttpParams()
      .append("page", this.pagination().page.toString())
      .append("pageSize", this.pagination().pageSize.toString());
    Object.entries(this.params).forEach(([key, value]) => {
      if (value) {
        params = params.append(key, value);
      }
    });

    return params;
  }
  public incrementPage() {
    if (!this.pagination().hasNext) return;
    this.pagination.set({
      ...this.pagination(),
      page: this.pagination().page + 1,
    });
    this.router.navigate([], {
      relativeTo: this.activatedRoute,
      queryParams: {
        page: this.pagination().page + 1,
      },
      queryParamsHandling: "merge",
    });
    this.initialLoad = true;
    this.fetchData();
  }
  public decrementPage() {
    if (!this.pagination().hasPrevious) return;
    this.pagination.set({
      ...this.pagination(),
      page: this.pagination().page - 1,
    });
    this.router.navigate([], {
      relativeTo: this.activatedRoute,
      queryParams: {
        page: this.pagination().page - 1,
      },
      queryParamsHandling: "merge",
    });
    this.initialLoad = true;
    this.fetchData();
  }
  public setPage(page: number) {
    if (page > this.pagination().lastPage || page < 1) return;
    if (page === this.pagination().page) return;
    this.pagination.set({
      ...this.pagination(),
      page,
    });
    this.router.navigate([], {
      relativeTo: this.activatedRoute,
      queryParams: {
        page: page,
      },
      queryParamsHandling: "merge",
    });
    this.initialLoad = true;
    this.fetchData();
  }
  public fetchData() {
    if (this.initialLoad) {
      this.isLoading.set(true);
    }
    let params = this.getSearchParams();

    this.http
      .get<IGenericResponse<IPaginatedResponse<T>>>(this.endpoint, { params })
      .pipe(finalize(() => this.isLoading.set(false)))
      .subscribe({
        next: (n) => {
          this.data.set(n.data);
          this.pagination.set({ ...n.data });
        },
      });
  }
  public createData(newData: T, successMessage: string) {
    const newNotes = [newData, ...this.data()?.data];
    this.data.set({ ...this.data(), data: newNotes });
    this.http.post<T>(this.endpoint, newData).subscribe({
      next: () => {
        this.fetchData();
        this.toast.showSuccess(successMessage);
      },
      error: (e: IGenericResponse<T>) => {
        this.toast.showError(e.message || e.error);
      },
    });
  }
  public deleteData(id: number, successMessage: string) {
    this.data.set({
      ...this.data(),
      data: this.data().data.filter((n) => n.id !== id),
    });
    this.http.delete<T>(`${this.endpoint}/${id}`).subscribe({
      next: () => {
        this.fetchData();
        this.toast.showSuccess(successMessage);
      },
      error: (e: IGenericResponse<T>) => {
        this.toast.showError(e.message || e.error);
      },
    });
  }

  public updateData(newData: T, successMessage: string) {
    const newNotes = this.data().data.map((n) => {
      if (n.id === newData.id) {
        return newData;
      }
      return n;
    });

    this.data.set({ ...this.data(), data: newNotes });

    if (this.single()?.id === newData.id) {
      this.single.set(newData);
    }

    this.http.put<T>(`${this.endpoint}/${newData.id}`, newData).subscribe({
      next: () => {
        this.fetchData();
        this.getSingle(newData.id);
        this.toast.showSuccess(successMessage);
      },
      error: (e: IGenericResponse<T>) => {
        this.toast.showError(e.message || e.error);
      },
    });
  }

  public getSingle(id: number) {
    this.http.get<IGenericResponse<T>>(`${this.endpoint}/${id}`).subscribe({
      next: (n) => {
        this.single.set(n.data);
      },
    });
    return this.single;
  }

  public resetSingle() {
    this.single.set(undefined);
  }

  baseErrorHandler<TError>(e: IGenericResponse<TError>) {
    this.toast.showError(e.message || e.error);
  }
}
