export interface IDisplayableVariantPriceReference {
  size: number;
  unit: string;
  withTax: number;
}

export interface IDisplayableVariantPrices {
  currentPrice: number;
  oldPrice?: number;
  percentageDiscount?: number;
  reference?: IDisplayableVariantPriceReference;
  referenceLabel?: string;
}
