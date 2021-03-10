import { ReservationBasketItem } from './reservation-basket-item';

export function assertSameStoreId(items: ReservationBasketItem[], storeId: number): boolean {
  if (items == null || items.length === 0) {
    return true;
  }
  return items.every(item => item.customData.storeId === storeId);
}
