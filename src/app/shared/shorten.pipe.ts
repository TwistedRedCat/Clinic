import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
  name: "shorten"
})
export class ShortenPipe implements PipeTransform {
  transform(value: string): string {
    if (value.length > 200) {
      value = value.substr(0, 200) + "... Continue Reading ";
      return value;
    }
    return value;
  }
}
