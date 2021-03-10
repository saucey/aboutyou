import { Pipe, PipeTransform } from '@angular/core';
import { formatNumber } from 'src/app/core/shop/utils';

@Pipe({
  name: 'number',
})
export class NumberPipe implements PipeTransform {
  transform(value: number): string | null {
    return formatNumber(value);
  }
}
