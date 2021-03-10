import { BapiClient } from '@aboutyou/backbone';
import { BASKET_REQUEST } from '../bapi/utils';
import { ReservationBasketResponse } from './reservation-basket-response';
import { ReservationBasketService } from './reservation-basket.service';
import { ReservationStoreIdConflictError } from './reservation-store-id-conflict-error';
import any = jasmine.any;
import createSpyObj = jasmine.createSpyObj;
import objectContaining = jasmine.objectContaining;
import Spy = jasmine.Spy;

describe('ReservationBasketService', () => {
  let service: ReservationBasketService;
  let bapiClientMock: BapiClient;
  let mockedBasketResponse: ReservationBasketResponse;

  beforeEach(() => {
    bapiClientMock = {
      basket: createSpyObj(['get', 'addItem', 'updateItem']),
    } as any;

    mockedBasketResponse = {
      basket: { items: [{ key: 'itemKey123', customData: { storeId: 3 }, variant: { id: 2 }, quantity: 1 }] },
      type: 'success',
    } as any;

    (bapiClientMock.basket.get as Spy).and.returnValue(Promise.resolve(mockedBasketResponse));

    service = new ReservationBasketService(bapiClientMock);
  });

  describe('#addOrUpdateReservationBasketItem', () => {
    beforeEach(() => {
      (bapiClientMock.basket.addItem as Spy).and.returnValue(Promise.resolve(mockedBasketResponse));
      (bapiClientMock.basket.updateItem as Spy).and.returnValue(Promise.resolve(mockedBasketResponse));
    });

    it('should call bapiClient.basket.get', async () => {
      const userId = 789;
      await service.addOrUpdateReservationBasketItem({ variantId: 1, quantity: 2, storeId: 3 }, userId);

      expect(bapiClientMock.basket.get).toHaveBeenCalledWith(any(String), BASKET_REQUEST);
    });

    it('should call #bapi.addItem if basket has not item with variantId', async () => {
      const userId = 789;
      const result: ReservationBasketResponse = await service.addOrUpdateReservationBasketItem(
        { variantId: 1, quantity: 2, storeId: 3 },
        userId,
      );
      expect(bapiClientMock.basket.addItem).toHaveBeenCalledWith(
        any(String),
        1,
        2,
        objectContaining({
          customData: { storeId: 3 },
        }),
      );
      expect(result).toEqual(mockedBasketResponse);
    });

    it('should call #bapi.updateItem if basket has already item with variantId', async () => {
      const userId = 789;
      const quantity = 2;
      const variantId = 2;
      const result: ReservationBasketResponse = await service.addOrUpdateReservationBasketItem(
        { variantId, quantity, storeId: 3 },
        userId,
      );
      const alreadyInBasket = mockedBasketResponse.basket.items[0];

      expect(bapiClientMock.basket.updateItem).toHaveBeenCalledWith(
        any(String),
        alreadyInBasket.key,
        quantity + alreadyInBasket.quantity,
        BASKET_REQUEST,
      );

      expect(result).toEqual(mockedBasketResponse);
    });

    it('should throw if the storeId of the exiting basket items are different', async (done: DoneFn) => {
      const userId = 789;
      try {
        await service.addOrUpdateReservationBasketItem({ variantId: 1, quantity: 2, storeId: 5 }, userId);
      } catch (e) {
        expect(e).toEqual(jasmine.any(ReservationStoreIdConflictError));
        expect(e.message).toContain('storeId: 5');
        expect(e.message).toContain('expected storeId: 3');
        done();
      }
    });
  });

  describe('#getReservationBasket', () => {
    it('should call bapiClient.basket.get', async () => {
      const userId = 789;
      await service.getReservationBasket(userId);
      expect(bapiClientMock.basket.get).toHaveBeenCalledWith(any(String), BASKET_REQUEST);
    });

    it('should return response from bapiClient.basket.get', async () => {
      const userId = 789;
      const result = await service.getReservationBasket(userId);
      expect(result).toEqual(mockedBasketResponse);
    });
  });
});
