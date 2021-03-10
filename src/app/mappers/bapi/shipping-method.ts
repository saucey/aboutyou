import { BapiProduct } from '@aboutyou/backbone';
import { getFirstAttributeValue } from '@aboutyou/backbone/helpers/bapiProduct';
import { ICurrency } from 'src/app/core/shop/types';
import { getDisplayableVariantPrices } from 'src/app/core/shop/utils/bapi/product';
import { ATTRIBUTE_KEY__SHIPPING_METHOD } from './constants';

export enum ShippingMethod {
  HERMES = 'streckenabwicklung_hermes',
  DEKO = 'standardabwicklung_dekoartikel',
}

export interface ShippingMethodCostLimitsConfig {
  name: ShippingMethod;
  costLimit: number;
}

const shippingMethodConfig: ShippingMethodCostLimitsConfig[] = [
  {
    name: ShippingMethod.DEKO,
    costLimit: 4900,
  },
  {
    name: ShippingMethod.HERMES,
    costLimit: 3990,
  },
];

export function getShippingMethod(product: BapiProduct): ShippingMethod {
  const shippingAttribute = getFirstAttributeValue(product.attributes, ATTRIBUTE_KEY__SHIPPING_METHOD);
  return shippingAttribute && (shippingAttribute.value as ShippingMethod);
}

export const productHasShippingFees = (currency: ICurrency, product: BapiProduct): boolean => {
  const shippingMethod = getShippingMethod(product);
  const { currentPrice } = getDisplayableVariantPrices(product, currency);

  return Boolean(
    shippingMethodConfig.find(({ name, costLimit }) => name === shippingMethod && costLimit > currentPrice),
  );
};
