import { BasketItem } from '@aboutyou/backbone/endpoints/basket/getBasket';
import { ProductMap } from 'src/app/mappers/product';

export interface IBasketListItem extends BasketItem {
  mappedProduct: ProductMap;
}

export interface IBasketCost {
  withTax: number;
  withoutTax: number;
  currencyCode: string;
}
