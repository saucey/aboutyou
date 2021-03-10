import { getVariantStock } from './get-variant-stock';
import { SAMPLE_PRODUCT } from 'src/tests/fixtures/products/sample';

describe('get-variant-stock', () => {
  it('should get variant stock', () => {
    expect(getVariantStock(SAMPLE_PRODUCT)).toEqual({ supplierId: 1000, quantity: 7, isSellableWithoutStock: false });
  });
});
