import { BapiClient } from '@aboutyou/backbone';
import { CONFIG } from '../../app/configs';
import { BASKET_REQUEST, findItemWithVariantId } from '../bapi/utils';
import { AddOrUpdateParams } from './add-or-update-params';
import { assertSameStoreId } from './assert-same-store-id';
import { ReservationBasketItem } from './reservation-basket-item';
import { ReservationBasketResponse } from './reservation-basket-response';
import { ReservationStoreIdConflictError } from './reservation-store-id-conflict-error';

export class ReservationBasketService {
  constructor(private bapiClient: BapiClient) {}

  async getReservationBasket(
    userId: number,
    reservationBasketKey: string = this.createReservationBasketKey(userId),
  ): Promise<ReservationBasketResponse> {
    return (await this.bapiClient.basket.get(reservationBasketKey, BASKET_REQUEST)) as ReservationBasketResponse;
  }

  async addOrUpdateReservationBasketItem(
    addOrUpdateParam: AddOrUpdateParams,
    userId: number,
  ): Promise<ReservationBasketResponse> {
    const { variantId, quantity, storeId } = addOrUpdateParam;

    const reservationBasketKey = this.createReservationBasketKey(userId);
    const basketResponse = await this.getReservationBasket(userId, reservationBasketKey);

    const items = basketResponse.basket.items as ReservationBasketItem[];

    if (!assertSameStoreId(items, storeId)) {
      const differentStoreId = items.find(value => value.customData.storeId !== storeId).customData.storeId;
      throw new ReservationStoreIdConflictError(storeId, differentStoreId);
    }

    const currentItem = findItemWithVariantId(basketResponse, variantId);

    if (!currentItem) {
      const customData = { storeId };
      return (await this.bapiClient.basket.addItem(reservationBasketKey, variantId, quantity, {
        ...BASKET_REQUEST,
        customData,
      })) as ReservationBasketResponse;
    } else {
      return (await this.bapiClient.basket.updateItem(
        reservationBasketKey,
        currentItem.key,
        currentItem.quantity + quantity,
        BASKET_REQUEST,
      )) as ReservationBasketResponse;
    }
  }

  private createReservationBasketKey(userId: number): string {
    return `${CONFIG.shop.bapi.basketKeyPrefix}-res-${userId}`;
  }
}
