import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'textCapitalize'
})
export class TextCapitalizePipe implements PipeTransform {
  transform(value: string): string {
    return value.charAt(0).toUpperCase() + value.slice(1);
  }
}
