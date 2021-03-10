import { BapiProduct } from '@aboutyou/backbone';
import { BapiCategory } from '@aboutyou/backbone/types/BapiCategory';
import { ProductMap } from 'src/app/mappers/product';
import { TranslateService } from '@ngx-translate/core';
import { ICurrency } from 'src/app/core/shop/types';

export const convertProduct = (currency: ICurrency) => (activeCategory: BapiCategory) => (
  translateService: TranslateService,
) => (product: BapiProduct): ProductMap => {
  return new ProductMap(product, currency, activeCategory, translateService);
};
