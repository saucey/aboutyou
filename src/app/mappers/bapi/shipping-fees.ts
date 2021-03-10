import { BapiProduct } from '@aboutyou/backbone';
import { ICurrency } from 'src/app/core/shop/types';
import { getDisplayableVariantPrices } from 'src/app/core/shop/utils';
import { getAttributeValue } from 'src/app/core/shop/utils/bapi';
import { ATTRIBUTE_KEY__SHIPPING_METHOD } from './constants';
import { ShippingMethod, ShippingMethodCostLimitsConfig } from './shipping-method';

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

export const getShippingMethod = (product: BapiProduct): string => {
  return getAttributeValue(product.attributes, ATTRIBUTE_KEY__SHIPPING_METHOD);
};

export const productHasShippingFees = (currency: ICurrency, product: BapiProduct): boolean => {
  const shippingMethod = getShippingMethod(product);
  const { currentPrice } = getDisplayableVariantPrices(product, currency);

  return Boolean(
    shippingMethodConfig.find(({ name, costLimit }) => name === shippingMethod && costLimit > currentPrice),
  );
};
