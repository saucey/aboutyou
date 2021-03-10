import { BasketItem } from '@aboutyou/backbone/endpoints/basket/getBasket';
import { fakeAsync, TestBed } from '@angular/core/testing';
import { MemoizedSelector, Store } from '@ngrx/store';
import { MockStore } from '@ngrx/store/testing';
import { TranslateService } from '@ngx-translate/core';
import { IBasketListItem, ICurrency } from 'src/app/core/shop/types';
import { ProductMap } from 'src/app/mappers/product';
import { take } from 'rxjs/operators';
import { NgrxTestingModule } from 'src/tests/fixtures/ngrx-testing.module';
import { TranslateTestingModule } from 'src/tests/fixtures/translate-testing.module';
import { AppStateWithReservationBasket } from '../app-state-with-reservation-basket';
import { createReservationBasketStateMock } from './reservation-basket-state.mock';
import { initialState, ReservationBasketState } from './reservation-basket.reducer';
import {
  isItemInReservationBasket,
  selectMappedReservationBasketItems,
  selectReservationBasketCost,
  selectReservationBasketError,
  selectReservationBasketFeature,
  selectReservationBasketIsLoading,
  selectReservationBasketItems,
  selectReservationBasketItemsCount,
  selectStoreId,
} from './reservation-basket.selectors';

describe('ReservationBasketSelectors', () => {
  let store: MockStore<Pick<AppStateWithReservationBasket, 'reservationBasket'>>;
  let selectorResult: any;
  let currency: ICurrency;
  let translateService: TranslateService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [TranslateTestingModule, NgrxTestingModule],
    });
  });

  beforeEach(() => {
    currency = {
      locale: 'de',
      code: 'EUR',
    };
    translateService = TestBed.get(TranslateService);

    store = TestBed.get(Store);
    store.setState({ reservationBasket: initialState });
    selectorResult = null;
  });

  describe('#selectReservationBasketFeature()', () => {
    it('should emit basket feature', fakeAsync(() => {
      whenSelectorIsSubscribed(selectReservationBasketFeature);
      thenSelectorResultIsEquals(initialState);
    }));
  });

  describe('#selectReservationBasketItems()', () => {
    it('should emit empty list if #basket.data is empty', fakeAsync(() => {
      whenSelectorIsSubscribed(selectReservationBasketItems);
      thenSelectorResultIsEquals([]);
    }));

    it('should emit list of items if #basket.data.items is given', fakeAsync(() => {
      givenReservationBasketData();
      whenSelectorIsSubscribed(selectReservationBasketItems);
      thenSelectorResultIsEquals(createReservationBasketStateMock().data.basket.items);
    }));
  });

  describe('#selectReservationBasketItemsCount()', () => {
    it('should emit 0 if #basket.data is empty', fakeAsync(() => {
      whenSelectorIsSubscribed(selectReservationBasketItemsCount);
      thenSelectorResultIsEquals(0);
    }));

    it('should emit count of items', fakeAsync(() => {
      givenReservationBasketData();
      whenSelectorIsSubscribed(selectReservationBasketItemsCount);
      thenSelectorResultIsEquals(6);
    }));
  });

  describe('#selectStoreId', () => {
    it('should emit store from first item in basket', fakeAsync(() => {
      givenReservationBasketData();
      whenSelectorIsSubscribed(selectStoreId);
      thenSelectorResultIsEquals(789456);
    }));

    it('should return null if no basket items available', fakeAsync(() => {
      whenSelectorIsSubscribed(selectStoreId);
      thenSelectorResultIsEquals(null);
    }));
  });

  describe('#isItemInReservationBasket', () => {
    it('should emit false if variantId is not in basket', fakeAsync(() => {
      givenReservationBasketData();
      whenSelectorIsSubscribed(isItemInReservationBasket(123));
      thenSelectorResultIsEquals(false);
    }));

    it('should emit true if variantId is in basket items', fakeAsync(() => {
      givenReservationBasketData();
      whenSelectorIsSubscribed(isItemInReservationBasket(26884));
      thenSelectorResultIsEquals(true);
    }));
  });

  describe('#selectReservationBasketCost()', () => {
    it('should emit null if #basket.data is empty', fakeAsync(() => {
      whenSelectorIsSubscribed(selectReservationBasketCost);
      thenSelectorResultIsEquals(null);
    }));

    it('should data.basket.cost', fakeAsync(() => {
      givenReservationBasketData();
      whenSelectorIsSubscribed(selectReservationBasketCost);
      thenSelectorResultIsEquals(createReservationBasketStateMock().data.basket.cost);
    }));
  });

  describe('#selectReservationBasketError()', () => {
    it('should emit error if #basket.error is given', fakeAsync(() => {
      const expectedError = 'testError';
      givenReservationBasketData({ ...initialState, error: expectedError });
      whenSelectorIsSubscribed(selectReservationBasketError);
      thenSelectorResultIsEquals(expectedError);
    }));

    it('should emit basket.data.type if type is !== "success"', fakeAsync(() => {
      const failureState: ReservationBasketState = { ...initialState, data: { basket: null, type: 'failure' } };
      givenReservationBasketData(failureState);

      whenSelectorIsSubscribed(selectReservationBasketError);
      thenSelectorResultIsEquals('failure');
    }));
  });

  describe('#selectReservationBasketIsLoading()', () => {
    it('should emit true if #basket.isLoading is true', fakeAsync(() => {
      const isLoading = true;
      givenReservationBasketData({ ...initialState, isLoading });
      whenSelectorIsSubscribed(selectReservationBasketIsLoading);
      thenSelectorResultIsEquals(isLoading);
    }));

    it('should emit false if #basket.isLoading is false', fakeAsync(() => {
      const isLoading = false;
      givenReservationBasketData({ ...initialState, isLoading });
      whenSelectorIsSubscribed(selectReservationBasketIsLoading);
      thenSelectorResultIsEquals(isLoading);
    }));
  });

  describe('#selectMappedReservationBasketItems()', () => {
    beforeEach(() => {
      currency = {
        locale: 'de',
        code: 'EUR',
      };
      translateService = TestBed.get(TranslateService);
    });

    it('should emit empty list if basket.data is undefined', fakeAsync(() => {
      whenSelectorIsSubscribed(selectMappedReservationBasketItems(currency, translateService));
      thenSelectorResultIsEquals([]);
    }));

    it('should emit mapped list of items', fakeAsync(() => {
      givenReservationBasketData();
      whenSelectorIsSubscribed(selectMappedReservationBasketItems(currency, translateService));

      const item = createReservationBasketStateMock().data.basket.items[0];
      thenSelectorResultIsEquals(jasmine.arrayContaining([createMappedItem(item)]));
    }));
  });

  function createMappedItem(item: BasketItem): IBasketListItem {
    return { ...item, mappedProduct: new ProductMap(item.product, currency, null, translateService) };
  }

  function givenReservationBasketData(reservationBasket: ReservationBasketState = createReservationBasketStateMock()) {
    store.setState({ reservationBasket });
  }

  function whenSelectorIsSubscribed<T>(selector: MemoizedSelector<AppStateWithReservationBasket, T>): void {
    store
      .select(selector)
      .pipe(take(1))
      .subscribe(result => (selectorResult = result));
  }

  function thenSelectorResultIsEquals<T>(result: T): void {
    expect(selectorResult).toEqual(result);
  }
});

describe('ReservationBasketSelectors', () => {
  let store: MockStore<Pick<AppStateWithReservationBasket, 'reservationBasket'>>;
  let selectorResult: any;
  let currency: ICurrency;
  let translateService: TranslateService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [TranslateTestingModule, NgrxTestingModule],
    });
  });

  beforeEach(() => {
    currency = {
      locale: 'de',
      code: 'EUR',
    };
    translateService = TestBed.get(TranslateService);

    store = TestBed.get(Store);
    store.setState({ reservationBasket: initialState });
    selectorResult = null;
  });

  describe('#selectReservationBasketFeature()', () => {
    it('should emit basket feature', fakeAsync(() => {
      whenSelectorIsSubscribed(selectReservationBasketFeature);
      thenSelectorResultIsEquals(initialState);
    }));
  });

  describe('#selectReservationBasketItems()', () => {
    it('should emit empty list if #basket.data is empty', fakeAsync(() => {
      whenSelectorIsSubscribed(selectReservationBasketItems);
      thenSelectorResultIsEquals([]);
    }));

    it('should emit list of items if #basket.data.items is given', fakeAsync(() => {
      givenReservationBasketData();
      whenSelectorIsSubscribed(selectReservationBasketItems);
      thenSelectorResultIsEquals(createReservationBasketStateMock().data.basket.items);
    }));
  });

  describe('#selectReservationBasketItemsCount()', () => {
    it('should emit 0 if #basket.data is empty', fakeAsync(() => {
      whenSelectorIsSubscribed(selectReservationBasketItemsCount);
      thenSelectorResultIsEquals(0);
    }));

    it('should emit count of items', fakeAsync(() => {
      givenReservationBasketData();
      whenSelectorIsSubscribed(selectReservationBasketItemsCount);
      thenSelectorResultIsEquals(6);
    }));
  });

  describe('#selectStoreId', () => {
    it('should emit store from first item in basket', fakeAsync(() => {
      givenReservationBasketData();
      whenSelectorIsSubscribed(selectStoreId);
      thenSelectorResultIsEquals(789456);
    }));

    it('should return null if no basket items available', fakeAsync(() => {
      whenSelectorIsSubscribed(selectStoreId);
      thenSelectorResultIsEquals(null);
    }));
  });

  describe('#isItemInReservationBasket', () => {
    it('should emit false if variantId is not in basket', fakeAsync(() => {
      givenReservationBasketData();
      whenSelectorIsSubscribed(isItemInReservationBasket(123));
      thenSelectorResultIsEquals(false);
    }));

    it('should emit true if variantId is in basket items', fakeAsync(() => {
      givenReservationBasketData();
      whenSelectorIsSubscribed(isItemInReservationBasket(26884));
      thenSelectorResultIsEquals(true);
    }));
  });

  describe('#selectReservationBasketCost()', () => {
    it('should emit null if #basket.data is empty', fakeAsync(() => {
      whenSelectorIsSubscribed(selectReservationBasketCost);
      thenSelectorResultIsEquals(null);
    }));

    it('should data.basket.cost', fakeAsync(() => {
      givenReservationBasketData();
      whenSelectorIsSubscribed(selectReservationBasketCost);
      thenSelectorResultIsEquals(createReservationBasketStateMock().data.basket.cost);
    }));
  });

  describe('#selectReservationBasketError()', () => {
    it('should emit error if #basket.error is given', fakeAsync(() => {
      const expectedError = 'testError';
      givenReservationBasketData({ ...initialState, error: expectedError });
      whenSelectorIsSubscribed(selectReservationBasketError);
      thenSelectorResultIsEquals(expectedError);
    }));

    it('should emit basket.data.type if type is !== "success"', fakeAsync(() => {
      const failureState: ReservationBasketState = { ...initialState, data: { basket: null, type: 'failure' } };
      givenReservationBasketData(failureState);

      whenSelectorIsSubscribed(selectReservationBasketError);
      thenSelectorResultIsEquals('failure');
    }));
  });

  describe('#selectReservationBasketIsLoading()', () => {
    it('should emit true if #basket.isLoading is true', fakeAsync(() => {
      const isLoading = true;
      givenReservationBasketData({ ...initialState, isLoading });
      whenSelectorIsSubscribed(selectReservationBasketIsLoading);
      thenSelectorResultIsEquals(isLoading);
    }));

    it('should emit false if #basket.isLoading is false', fakeAsync(() => {
      const isLoading = false;
      givenReservationBasketData({ ...initialState, isLoading });
      whenSelectorIsSubscribed(selectReservationBasketIsLoading);
      thenSelectorResultIsEquals(isLoading);
    }));
  });

  describe('#selectMappedReservationBasketItems()', () => {
    beforeEach(() => {
      currency = {
        locale: 'de',
        code: 'EUR',
      };
      translateService = TestBed.get(TranslateService);
    });

    it('should emit empty list if basket.data is undefined', fakeAsync(() => {
      whenSelectorIsSubscribed(selectMappedReservationBasketItems(currency, translateService));
      thenSelectorResultIsEquals([]);
    }));

    it('should emit mapped list of items', fakeAsync(() => {
      givenReservationBasketData();
      whenSelectorIsSubscribed(selectMappedReservationBasketItems(currency, translateService));

      const item = createReservationBasketStateMock().data.basket.items[0];
      thenSelectorResultIsEquals(jasmine.arrayContaining([createMappedItem(item)]));
    }));
  });

  function createMappedItem(item: BasketItem): IBasketListItem {
    return { ...item, mappedProduct: new ProductMap(item.product, currency, null, translateService) };
  }

  function givenReservationBasketData(reservationBasket: ReservationBasketState = createReservationBasketStateMock()) {
    store.setState({ reservationBasket });
  }

  function whenSelectorIsSubscribed<T>(selector: MemoizedSelector<AppStateWithReservationBasket, T>): void {
    store
      .select(selector)
      .pipe(take(1))
      .subscribe(result => (selectorResult = result));
  }

  function thenSelectorResultIsEquals<T>(result: T): void {
    expect(selectorResult).toEqual(result);
  }
});
