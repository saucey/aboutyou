import { BapiProduct } from '@aboutyou/backbone/types/BapiProduct';
import { getAttributeValue } from 'src/app/core/shop/utils/bapi/product/get-attribute';
import {
  ATTRIBUTE_KEY__COLOR,
  ATTRIBUTE_KEY__FSC,
  ATTRIBUTE_KEY__PRODUCT_TITLE,
  ATTRIBUTE_KEY__SET_ITEM_COUNT,
} from './constants';
import { computeDimensionsLabel } from './dimensions';

export const computeSeoProductName = (product: BapiProduct): string => {
  const components: string[] = [getAttributeValue(product.attributes, ATTRIBUTE_KEY__PRODUCT_TITLE)];

  // Forest Stewardship Council
  const fsc = getAttributeValue(product.attributes, ATTRIBUTE_KEY__FSC);

  if (fsc) {
    components.push(fsc);
  }

  const dimensions = computeDimensionsLabel(product);

  if (dimensions) {
    components.push(dimensions);
  }

  const setItemCount = getAttributeValue(product.attributes, ATTRIBUTE_KEY__SET_ITEM_COUNT);

  if (setItemCount) {
    components.push(setItemCount);
  }

  const color = getAttributeValue(product.attributes, ATTRIBUTE_KEY__COLOR);

  if (color) {
    components.push(color);
  }

  return components.join(', ');
};
