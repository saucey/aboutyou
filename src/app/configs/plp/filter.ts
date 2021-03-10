import { IFilterConfig } from 'src/app/core/shop/types';

export const filter: IFilterConfig = {
  SORTING: { order: 0, urlParam: 'sort' },
  COLOR: { id: 704, order: 1, urlParam: 'color' },
  MATERIAL: { id: 585, order: 3, urlParam: 'material' },
  FLAGS: { id: 794, order: 4, urlParam: 'flags' },
  MIN_PRICE: { order: 2, urlParam: 'minPrice' },
  MAX_PRICE: { order: 2, urlParam: 'maxPrice' },
};
