import { ICurrency } from '../types';

export const formatPrice = (priceInCents: number, currency: ICurrency): string => {
  const formatter = new Intl.NumberFormat(currency.locale, {
    style: 'currency',
    currency: currency.code,
    minimumFractionDigits: currency.minimumFractionDigits,
    maximumFractionDigits: currency.maximumFractionDigits,
  });

  if (currency.separators === undefined) {
    return formatter.format(priceInCents / 100);
  }

  // Iterate over the individual price parts and replace the group and decimal
  // separator according to the configuration.
  const formattedPriceParts = formatter.formatToParts(priceInCents / 100);
  for (const part of formattedPriceParts) {
    if (part.type === 'group') {
      part.value = currency.separators.group;
    } else if (part.type === 'decimal') {
      part.value = currency.separators.decimal;
    }
  }

  return formattedPriceParts.map(x => x.value).join('');
};
