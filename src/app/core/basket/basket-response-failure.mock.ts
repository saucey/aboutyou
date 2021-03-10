import { BasketKey } from '@aboutyou/backbone/endpoints/basket/getBasket';
import { AddToBasketFailureKind, BasketResponse } from '@aboutyou/backbone/helpers/BapiClient';
import { CentAmount } from '@aboutyou/backbone/types/BapiProduct';

export const basketResponseFailureMock: BasketResponse & { kind: AddToBasketFailureKind } = {
  type: 'failure',
  kind: AddToBasketFailureKind.MaximumItemCountReached,
  basket: {
    key: '123' as BasketKey,
    cost: {
      appliedReductions: [],
      currencyCode: 'EUR',
      withTax: 123 as CentAmount,
      withoutTax: 100 as CentAmount,
      tax: { vat: { amount: 23 as CentAmount, rate: 23 } },
    },
    currencyCode: 'EUR',
    items: [],
    packages: [],
  },
};
