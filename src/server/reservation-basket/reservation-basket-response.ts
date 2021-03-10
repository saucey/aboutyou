import { BasketResponseData } from '@aboutyou/backbone/endpoints/basket/getBasket';
import { AddToBasketFailureKind } from '@aboutyou/backbone/helpers/BapiClient';
import { ReservationBasketItem } from './reservation-basket-item';

export interface ReservationBasketResponse {
  type: 'success' | 'failure';
  kind?: AddToBasketFailureKind;
  basket: ReservationBasketResponseData;
}
interface ReservationBasketResponseData extends BasketResponseData {
  items: ReservationBasketItem[];
}
