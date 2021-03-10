import { assertSameStoreId } from './assert-same-store-id';
import { ReservationBasketItem } from './reservation-basket-item';

describe('#assertSameStoreId', () => {
  it('should return true if storeId is the same  as items', () => {
    const storeId = 123;
    const itemsWithSameStoreId: ReservationBasketItem[] = [
      { customData: { storeId } },
      { customData: { storeId } },
      { customData: { storeId } },
    ] as ReservationBasketItem[];
    expect(assertSameStoreId(itemsWithSameStoreId, storeId)).toBeTrue();
  });

  it('should return true if items are empty', () => {
    const storeId = 123;
    expect(assertSameStoreId([], storeId)).toBeTrue();
  });

  it('should return true if items are undefined', () => {
    const storeId = 123;
    expect(assertSameStoreId(undefined, storeId)).toBeTrue();
  });

  it('should return false if an item has a different storeId', () => {
    const storeId = 123;
    const itemsWithSameStoreId: ReservationBasketItem[] = [
      { customData: { storeId } },
      { customData: { storeId } },
      { customData: { storeId: 456 } },
    ] as ReservationBasketItem[];
    expect(assertSameStoreId(itemsWithSameStoreId, storeId)).toBeFalse();
  });
});
