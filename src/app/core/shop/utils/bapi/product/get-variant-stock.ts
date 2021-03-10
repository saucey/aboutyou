import { BapiProduct } from '@aboutyou/backbone';
import { Stock } from '@aboutyou/backbone/types/BapiProduct';
import path from 'ramda/es/path';

export const getVariantStock = (product: BapiProduct, variantIndex?: number): Stock => {
  return path(['variants', variantIndex || 0, 'stock'], product);
};
