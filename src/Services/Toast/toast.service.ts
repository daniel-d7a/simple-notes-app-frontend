import { Injectable, inject } from "@angular/core";
import { ToastrService } from "ngx-toastr";

@Injectable({
  providedIn: "root",
})
export class ToastService {
  private toastr = inject(ToastrService);

  showSuccess(message: string, title: string = "Success") {
    this.toastr.success(message, title);
  }

  showError(message: string, title: string = "Error") {
    this.toastr.error(message, title);
  }
}
