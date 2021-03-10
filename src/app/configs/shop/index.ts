import { IShopConfig } from 'src/app/core/shop/types';
import { bapi } from './bapi';
import { checkout } from './checkout';
import { categories } from './categories';
import { products } from './products';
import { search } from './search';
import { locale } from './locale';

export const shop: IShopConfig = {
  bapi,
  checkout,
  categories,
  products,
  search,
  locale,
};
