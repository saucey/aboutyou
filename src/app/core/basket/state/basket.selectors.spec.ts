import { BasketItem, BasketPackageInformation } from '@aboutyou/backbone/endpoints/basket/getBasket';
import { fakeAsync, flush, TestBed } from '@angular/core/testing';
import { MemoizedSelector, Store } from '@ngrx/store';
import { MockStore } from '@ngrx/store/testing';
import { TranslateService } from '@ngx-translate/core';
import { take } from 'rxjs/operators';
import { NgrxTestingModule } from 'src/tests/fixtures/ngrx-testing.module';
import { TranslateTestingModule } from 'src/tests/fixtures/translate-testing.module';
import { ProductMap } from 'src/app/mappers/product';
import { AppState } from '../../shop/store';
import { IBasketListItem, ICurrency } from '../../shop/types';
import { createBasketStateMock } from './basket-state.mock';
import { BasketState, initialState } from './basket.reducers';
import {
  isItemInBasket,
  selectBasketCost,
  selectBasketError,
  selectBasketFeature,
  selectBasketIsChangingQuantity,
  selectBasketIsLoading,
  selectBasketItems,
  selectBasketItemsCount,
  selectBasketItemsGroupedByPackage,
  selectMappedBasketItems,
} from './basket.selectors';
import { BasketItemsGroupedByPackage } from './basket-items-grouped-by-package';
import any = jasmine.any;
import arrayContaining = jasmine.arrayContaining;

describe('BasketSelectors', () => {
  let store: MockStore<Pick<AppState, 'basket'>>;
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
    selectorResult = null;
  });

  describe('#selectBasketFeature()', () => {
    it('should emit basket feature', fakeAsync(() => {
      whenSelectorIsSubscribed(selectBasketFeature);
      thenSelectorResultIsEquals(initialState);
    }));
  });

  describe('#selectBasketItems()', () => {
    it('should emit empty list if #basket.data is empty', fakeAsync(() => {
      whenSelectorIsSubscribed(selectBasketItems);
      thenSelectorResultIsEquals([]);
    }));

    it('should emit list of items if #basket.data.items is given', fakeAsync(() => {
      givenBasketData();
      whenSelectorIsSubscribed(selectBasketItems);
      thenSelectorResultIsEquals(createBasketStateMock().data.basket.items);
    }));
  });

  describe('#isItemInBasket()', () => {
    it('should emit false if product is not in basket', fakeAsync(() => {
      givenBasketData();
      whenSelectorIsSubscribed(isItemInBasket(123));
      thenSelectorResultIsEquals(false);
    }));

    it('should emit true if product is in basket items', fakeAsync(() => {
      givenBasketData();
      whenSelectorIsSubscribed(isItemInBasket(26716));
      thenSelectorResultIsEquals(true);
    }));
  });

  describe('#selectBasketItemsCount()', () => {
    it('should emit 0 list if #basket.data is empty', fakeAsync(() => {
      whenSelectorIsSubscribed(selectBasketItemsCount);
      thenSelectorResultIsEquals(0);
    }));

    it('should emit count of items', fakeAsync(() => {
      givenBasketData();
      whenSelectorIsSubscribed(selectBasketItemsCount);
      thenSelectorResultIsEquals(6);
    }));
  });

  describe('#selectBasketCost()', () => {
    it('should emit null if #basket.data is empty', fakeAsync(() => {
      whenSelectorIsSubscribed(selectBasketCost);
      thenSelectorResultIsEquals(null);
    }));

    it('should data.basket.cost', fakeAsync(() => {
      givenBasketData();
      whenSelectorIsSubscribed(selectBasketCost);
      thenSelectorResultIsEquals(createBasketStateMock().data.basket.cost);
    }));
  });

  describe('#selectBasketError()', () => {
    it('should emit error if #basket.error is given', fakeAsync(() => {
      const expectedError = 'testError';
      store.setState({ basket: { ...initialState, error: expectedError } });
      whenSelectorIsSubscribed(selectBasketError);
      thenSelectorResultIsEquals(expectedError);
    }));

    it('should emit basket.data.type if type is !== "success"', fakeAsync(() => {
      const failureState: BasketState = { ...initialState, data: { basket: null, type: 'failure' } };
      store.setState({ basket: failureState });

      whenSelectorIsSubscribed(selectBasketError);
      thenSelectorResultIsEquals('failure');
    }));
  });

  describe('#selectBasketIsLoading()', () => {
    it('should emit true if #basket.isLoading is true', fakeAsync(() => {
      const isLoading = true;
      store.setState({ basket: { ...initialState, isLoading } });
      whenSelectorIsSubscribed(selectBasketIsLoading);
      thenSelectorResultIsEquals(isLoading);
    }));

    it('should emit false if #basket.isLoading is false', fakeAsync(() => {
      const isLoading = false;
      store.setState({ basket: { ...initialState, isLoading } });
      whenSelectorIsSubscribed(selectBasketIsLoading);
      thenSelectorResultIsEquals(isLoading);
    }));
  });

  describe('#selectBasketIsChangingQuantity()', () => {
    it('should emit true if #basket.isLoading is true', fakeAsync(() => {
      const isChangingQuantity = true;
      store.setState({ basket: { ...initialState, isChangingQuantity } });
      whenSelectorIsSubscribed(selectBasketIsChangingQuantity);
      thenSelectorResultIsEquals(isChangingQuantity);
    }));

    it('should emit false if #basket.selectBasketIsChangingQuantity is false', fakeAsync(() => {
      const isChangingQuantity = false;
      store.setState({ basket: { ...initialState, isChangingQuantity } });
      whenSelectorIsSubscribed(selectBasketIsChangingQuantity);
      thenSelectorResultIsEquals(isChangingQuantity);
    }));
  });

  describe('#selectMappedBasketItems()', () => {
    beforeEach(() => {
      currency = {
        locale: 'de',
        code: 'EUR',
      };
      translateService = TestBed.get(TranslateService);
    });

    it('should emit empty list if basket.data is undefined', fakeAsync(() => {
      whenSelectorIsSubscribed(selectMappedBasketItems(currency, translateService));
      thenSelectorResultIsEquals([]);
    }));

    it('should emit mapped list of items', fakeAsync(() => {
      givenBasketData();
      whenSelectorIsSubscribed(selectMappedBasketItems(currency, translateService));

      const item = createBasketStateMock().data.basket.items[0];
      thenSelectorResultIsEquals(arrayContaining([createMappedItem(item)]));
    }));
  });
  describe('#selectBasketItemsGroupedByPackage()', () => {
    it('should emit empty maps if basket.data is undefined', fakeAsync(() => {
      whenSelectorIsSubscribed(selectBasketItemsGroupedByPackage(currency, translateService));
      thenSelectorResultIsEquals<BasketItemsGroupedByPackage>({
        packageMap: new Map(),
        groupedItemsMap: new Map(),
        notDeliverableItems: [],
      });
    }));

    it('should emit maps of packages and groupedItems list', fakeAsync(() => {
      givenBasketData();

      whenSelectorIsSubscribed(selectBasketItemsGroupedByPackage(currency, translateService));

      const resultMaps = selectorResult as {
        packageMap: Map<number, BasketPackageInformation>;
        groupedItemsMap: Map<number, IBasketListItem[]>;
      };
      createBasketStateMock().data.basket.packages.forEach(info => {
        expect(resultMaps.packageMap.get(info.id)).toEqual(info);
      });

      expect(Array.from(resultMaps.groupedItemsMap.keys()).length).toBe(2);

      expect(resultMaps.groupedItemsMap.get(1).length).toBe(2);

      expect(resultMaps.groupedItemsMap.get(1)[0].mappedProduct).toEqual(any(ProductMap));
      expect(resultMaps.groupedItemsMap.get(1)[0].key).toEqual('4158f6d19559955bae372bb00f6204e4');

      expect(resultMaps.groupedItemsMap.get(1)[1].mappedProduct).toEqual(any(ProductMap));
      expect(resultMaps.groupedItemsMap.get(1)[1].key).toEqual('669c35c595fa7abcc0b82d0ba7d90f66');

      expect(resultMaps.groupedItemsMap.get(2).length).toBe(1);
      expect(resultMaps.groupedItemsMap.get(2)[0].mappedProduct).toEqual(any(ProductMap));
      expect(resultMaps.groupedItemsMap.get(2)[0].key).toEqual('bca7d174d4387a5394a9c3d899091b2d');
    }));

    it('should add maps of packages and groupedItems list', fakeAsync(() => {
      givenBasketData();

      whenSelectorIsSubscribed(selectBasketItemsGroupedByPackage(currency, translateService));

      const resultMaps = selectorResult as {
        packageMap: Map<number, BasketPackageInformation>;
        groupedItemsMap: Map<number, IBasketListItem[]>;
      };
      createBasketStateMock().data.basket.packages.forEach(info => {
        expect(resultMaps.packageMap.get(info.id)).toEqual(info);
      });

      expect(Array.from(resultMaps.groupedItemsMap.keys()).length).toBe(2);

      expect(resultMaps.groupedItemsMap.get(1).length).toBe(2);

      expect(resultMaps.groupedItemsMap.get(1)[0].mappedProduct).toEqual(any(ProductMap));
      expect(resultMaps.groupedItemsMap.get(1)[0].key).toEqual('4158f6d19559955bae372bb00f6204e4');

      expect(resultMaps.groupedItemsMap.get(1)[1].mappedProduct).toEqual(any(ProductMap));
      expect(resultMaps.groupedItemsMap.get(1)[1].key).toEqual('669c35c595fa7abcc0b82d0ba7d90f66');

      expect(resultMaps.groupedItemsMap.get(2).length).toBe(1);
      expect(resultMaps.groupedItemsMap.get(2)[0].mappedProduct).toEqual(any(ProductMap));
      expect(resultMaps.groupedItemsMap.get(2)[0].key).toEqual('bca7d174d4387a5394a9c3d899091b2d');
    }));

    describe('not deliverable items', () => {
      beforeEach(() => {
        const basketWithItemWithoutPackageId: BasketState = createBasketStateMock();
        basketWithItemWithoutPackageId.data.basket.items[0].packageId = undefined;

        basketWithItemWithoutPackageId.data.basket.items[1].status = 'undeliverable';

        // not deliverable because packageId is null although status is available.
        basketWithItemWithoutPackageId.data.basket.items[2].status = 'available';
        basketWithItemWithoutPackageId.data.basket.items[2].packageId = null;

        givenBasketData(basketWithItemWithoutPackageId);
      });

      it('should not throw an error', fakeAsync(() => {
        expect(() =>
          whenSelectorIsSubscribed(selectBasketItemsGroupedByPackage(currency, translateService)),
        ).not.toThrow();

        flush();
      }));

      it('should add to not deliverableItems', fakeAsync(() => {
        whenSelectorIsSubscribed(selectBasketItemsGroupedByPackage(currency, translateService));
        expect(selectorResult.notDeliverableItems.length).toEqual(3);
      }));

      it('should not add items to groupedItemsMap', fakeAsync(() => {
        whenSelectorIsSubscribed(selectBasketItemsGroupedByPackage(currency, translateService));
        const valuesFromGroupedItemsMap = Array.from(selectorResult.groupedItemsMap.values());
        expect(valuesFromGroupedItemsMap).toEqual([[], []]);
      }));
    });
  });

  function createMappedItem(item: BasketItem): IBasketListItem {
    return { ...item, mappedProduct: new ProductMap(item.product, currency, null, translateService) };
  }

  function givenBasketData(basket: BasketState = createBasketStateMock()) {
    store.setState({ basket });
  }

  function whenSelectorIsSubscribed<T>(selector: MemoizedSelector<AppState, T>): void {
    store
      .select(selector)
      .pipe(take(1))
      .subscribe(result => (selectorResult = result));
  }

  function thenSelectorResultIsEquals<T>(result: T): void {
    expect(selectorResult).toEqual(result);
  }
});
