import { BapiProduct } from '@aboutyou/backbone';
import { BapiPrice } from '@aboutyou/backbone/types/BapiProduct';
import path from 'ramda/es/path';
import { IDisplayableVariantPrices, IDisplayableVariantPriceReference, ICurrency } from '../../../types';
import { formatPrice } from '../../format-price';

export const getDisplayableVariantPrices = (
  product: BapiProduct,
  currency: ICurrency,
  variantIndex?: number,
): IDisplayableVariantPrices => {
  let currentPrice: number;
  let oldPrice: number;
  let percentageDiscount: number;
  let reference: IDisplayableVariantPriceReference;
  let referenceLabel: string;

  if (!variantIndex) {
    variantIndex = 0;
  }

  const price = path(['variants', variantIndex, 'price'], product) as BapiPrice;
  currentPrice = price.withTax;

  if (price.appliedReductions.length > 0) {
    oldPrice = currentPrice;

    price.appliedReductions.map(({ amount }) => {
      oldPrice += amount.absoluteWithTax;

      if (amount.relative) {
        percentageDiscount = amount.relative;
      }
    });
  }

  reference = price.reference;

  if (reference) {
    referenceLabel = `${formatPrice(reference.withTax, currency)} /`;
    if (reference.size > 1) {
      referenceLabel += ` ${reference.size}`;
    }

    referenceLabel += ` ${reference.unit.toLowerCase()}`;
  }

  return { currentPrice, oldPrice, percentageDiscount, reference, referenceLabel };
};
