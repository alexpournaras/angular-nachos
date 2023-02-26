import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'numberFormat'
})
export class NumberFormatPipe implements PipeTransform {
  // Convert numbers (ex. ragings) to type of: 9.2
  transform(value: number): string {
    return value.toFixed(1);
  }
}