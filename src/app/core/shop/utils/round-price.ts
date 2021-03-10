export const roundPrice = /* istanbul ignore next: Just a Math.ceil */ (priceInCents: number) =>
  Math.ceil(priceInCents / 100);
