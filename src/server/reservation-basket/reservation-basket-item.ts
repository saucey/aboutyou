import { BasketItem } from '@aboutyou/backbone/endpoints/basket/getBasket';

interface CustomDataWithStoreId {
  storeId: number;
}

export interface ReservationBasketItem extends BasketItem {
  customData: CustomDataWithStoreId;
}
