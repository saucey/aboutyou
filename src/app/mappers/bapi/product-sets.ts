import { ADVANCED_ATTRIBUTE_KEY__HARD_BUNDLE_PRODUCTS } from './constants';
import { getAdvancedAttributeFieldsetValuesByKey } from 'src/app/core/shop/utils/bapi/product/get-attribute';
import { BapiProduct } from '@aboutyou/backbone';

export interface ProductSetItem {
  merchantId: string;
  quantity: number;
  quantityUnit: string;
}

const parseBundleItem = (input: string): ProductSetItem => ({
  merchantId: input.split(' ')[0],
  quantity: Number(input.split(' ')[1]),
  quantityUnit: input.split(' ')[2],
});

export const getProductsOfSet = (product: BapiProduct): ProductSetItem[] =>
  (getAdvancedAttributeFieldsetValuesByKey(ADVANCED_ATTRIBUTE_KEY__HARD_BUNDLE_PRODUCTS, product) || [])
    .map(
      item =>
        item[0] &&
        (item[0].value as string) &&
        (item[0].value as string).length > 0 &&
        parseBundleItem(item[0].value as string),
    )
    .filter(item => item);
