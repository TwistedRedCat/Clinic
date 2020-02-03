import { Pipe, PipeTransform } from "@angular/core";
import { Blog } from "./blog.model";

@Pipe({
  name: "reverse"
})
export class ReversePipe implements PipeTransform {
  transform(value: Blog[]) {
    if (!value) return;

    return value.reverse();
  }
}
