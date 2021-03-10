import { formatPrice } from './format-price';
import { ICurrency } from '../types';

describe('formatPrice', () => {
  const nbsp = ' '; // This is a non-breaking space, not a space.

  it('should format German prices', () => {
    const currency: ICurrency = { code: 'EUR', locale: 'de' };
    expect(formatPrice(13200, currency)).toEqual(`132,00${nbsp}€`);
    expect(formatPrice(132, currency)).toEqual(`1,32${nbsp}€`);
    expect(formatPrice(13200000, currency)).toEqual(`132.000,00${nbsp}€`);
  });

  it('should format Hungarian prices', () => {
    const currency: ICurrency = { code: 'HUF', locale: 'hu' };
    expect(formatPrice(12300, currency)).toEqual(`123,00${nbsp}Ft`);
  });

  it('should omit fractions when minimumFractionDigits is set to 0', () => {
    const currency: ICurrency = { code: 'HUF', locale: 'hu', minimumFractionDigits: 0 };
    expect(formatPrice(10000, currency)).toEqual(`100${nbsp}Ft`);
  });

  it('should omit fractions when maximumFractionDigits is set to 0', () => {
    const currency: ICurrency = { code: 'HUF', locale: 'hu', minimumFractionDigits: 0, maximumFractionDigits: 0 };
    expect(formatPrice(10023, currency)).toEqual(`100${nbsp}Ft`);
  });

  it('should replace group and decimal separators', () => {
    const currency: ICurrency = { code: 'HUF', locale: 'hu', separators: { group: '.', decimal: ',' } };
    expect(formatPrice(1205075, currency)).toEqual(`12.050,75${nbsp}Ft`);
    expect(formatPrice(541205075, currency)).toEqual(`5.412.050,75${nbsp}Ft`);
  });
});
