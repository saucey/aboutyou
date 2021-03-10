import { getDisplayableVariantPrices } from './get-displayable-variant-prices';
import objectContaining = jasmine.objectContaining;
import { SAMPLE_PRODUCT } from 'src/tests/fixtures/products/sample';

describe('get-displayable-variant-prices', () => {
  it('should get displayable variant prices', () => {
    const currency = {
      code: 'EUR',
      locale: 'de',
    };
    const result = getDisplayableVariantPrices(SAMPLE_PRODUCT, currency);
    expect(result).toEqual(
      objectContaining({
        currentPrice: 15996,
        oldPrice: 28996,
        percentageDiscount: 30,
        reference: { withTax: 12000, size: 20, unit: 'cm' },
      }),
    );
    expect(result.referenceLabel).toEqual('120,00 € / 20 cm');
  });
});
