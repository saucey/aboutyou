import { Pipe, PipeTransform } from '@angular/core';
import { formatPrice } from 'src/app/core/shop/utils';
import { ICurrency } from 'src/app/core/shop/types';

@Pipe({
  name: 'currency',
})
export class CurrencyPipe implements PipeTransform {
  transform(value: number, currency: ICurrency): string | null {
    return formatPrice(value, currency);
  }
}
