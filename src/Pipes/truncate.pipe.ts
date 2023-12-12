import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
  name: "truncate",
  standalone: true,
})
export class TruncatePipe implements PipeTransform {
  transform(
    value: string | undefined,
    length: number = 10,
    suffix: string = "..."
  ): string {
    if (!value) return "";
    return value.length > length ? value.substring(0, length) + suffix : value;
  }
}
