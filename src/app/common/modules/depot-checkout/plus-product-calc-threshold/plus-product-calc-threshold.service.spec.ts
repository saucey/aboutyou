import { fakeAsync, flush, TestBed } from '@angular/core/testing';
import { Store } from '@ngrx/store';
import { MockStore } from '@ngrx/store/testing';
import { selectBasketCost } from 'src/app/core/basket';
import { ShopService } from 'src/app/core/services/shop.service';
import { AppState } from 'src/app/core/shop/store';
import { ICurrency } from 'src/app/core/shop/types';
import { IFoundShop } from 'src/app/core/shop/utils';
import { ReplaySubject, Subject } from 'rxjs';
import { NgrxTestingModule } from 'src/tests/fixtures/ngrx-testing.module';
import { TranslateTestingModule } from 'src/tests/fixtures/translate-testing.module';
import { BasketPlusProductService } from '../basket-plus-product.service';
import { DepotCheckoutModule } from '../depot-checkout.module';
import {
  PLUS_PRODUCT_EUR_THRESHOLD,
  PLUS_PRODUCT_OTHER_THRESHOLD,
  PlusProductCalcThresholdService,
} from './plus-product-calc-threshold.service';
import createSpyObj = jasmine.createSpyObj;
import SpyObj = jasmine.SpyObj;

describe('PlusProductCalcThresholdService', () => {
  let service: PlusProductCalcThresholdService;
  let shopService: SpyObj<ShopService>;
  let shopMock: IFoundShop;
  let store: MockStore<AppState>;
  let currencyMock: ICurrency;
  let plusProductService: BasketPlusProductService;
  let hasPlusProductsSubject$: Subject<boolean>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [DepotCheckoutModule, TranslateTestingModule, NgrxTestingModule],
      providers: [
        { provide: ShopService, useValue: createSpyObj<ShopService>('ShopService', ['getShop', 'getShopId']) },
      ],
    });

    shopService = TestBed.get(ShopService);

    givenShopCurrency('EUR');

    store = TestBed.get(Store);
    plusProductService = TestBed.get(BasketPlusProductService);
    hasPlusProductsSubject$ = new ReplaySubject<boolean>(1);
    spyOnProperty(plusProductService, 'hasPlusProducts$').and.returnValue(hasPlusProductsSubject$);

    service = TestBed.get(PlusProductCalcThresholdService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('#plusProductThresholdCentAmount()', () => {
    it('should return #PLUS_PRODUCT_EUR_THRESHOLD', () => {
      expect(service.plusProductThresholdCentAmount()).toBe(PLUS_PRODUCT_EUR_THRESHOLD);
    });

    it('should return #PLUS_PRODUCT_OTHER_THRESHOLD if shop currency is not EUR', () => {
      givenShopCurrency('OTHER');
      expect(service.plusProductThresholdCentAmount()).toBe(PLUS_PRODUCT_OTHER_THRESHOLD);
    });
  });

  describe('#basketCostUntilThresholdReached$()', () => {
    let thresholdResult: number;

    beforeEach(fakeAsync(() => {
      service.basketCostUntilThresholdReached$().subscribe(result => (thresholdResult = result));
    }));

    describe('not hasPlusItems', () => {
      it('should return 0 if threshold is reached', fakeAsync(() => {
        givenHasPlusProductsReturns(false);
        givenSelectorBasketCostReturns(0);
        store.refreshState();
        thenCostUntilThresholdReachedIs(0);
      }));
    });

    describe('hasPlusItems', () => {
      beforeEach(fakeAsync(() => {
        givenSelectorBasketCostReturns(0);
        givenHasPlusProductsReturns(true);
      }));

      it('should return 0 if threshold is reached', fakeAsync(() => {
        givenSelectorBasketCostReturns(PLUS_PRODUCT_EUR_THRESHOLD);
        store.refreshState();
        thenCostUntilThresholdReachedIs(0);
      }));

      it('should return 10 if threshold is not reached by 10', fakeAsync(() => {
        givenSelectorBasketCostReturns(PLUS_PRODUCT_EUR_THRESHOLD - 10);
        store.refreshState();
        thenCostUntilThresholdReachedIs(10);
      }));

      it('should return #PLUS_PRODUCT_EUR_THRESHOLD if threshold if basket cost is 0', fakeAsync(() => {
        givenSelectorBasketCostReturns(0);
        store.refreshState();
        thenCostUntilThresholdReachedIs(PLUS_PRODUCT_EUR_THRESHOLD);
      }));

      it('should return #PLUS_PRODUCT_OTHER_THRESHOLD if shop currency is not EUR', fakeAsync(() => {
        givenShopCurrency('OTHER');
        givenSelectorBasketCostReturns(0);
        store.refreshState();
        thenCostUntilThresholdReachedIs(PLUS_PRODUCT_OTHER_THRESHOLD);
      }));
    });

    function thenCostUntilThresholdReachedIs(untilThreshold: number) {
      expect(thresholdResult).toBe(untilThreshold);
    }
  });

  describe('#isBasketThresholdReached$()', () => {
    let isThresholdReachedResult: boolean;

    beforeEach(() => {
      service.isBasketThresholdReached$().subscribe(result => (isThresholdReachedResult = result));
    });

    describe('not hasPlusItems', () => {
      it('should return true', fakeAsync(() => {
        givenSelectorBasketCostReturns(0);
        givenHasPlusProductsReturns(false);
        store.refreshState();
        thenThresholdIsReached();
      }));
    });

    describe('hasPlusItems', () => {
      beforeEach(fakeAsync(() => {
        givenSelectorBasketCostReturns(0);
        givenHasPlusProductsReturns(true);
      }));

      it('should return true if threshold is reached', fakeAsync(() => {
        givenSelectorBasketCostReturns(PLUS_PRODUCT_EUR_THRESHOLD);
        store.refreshState();
        thenThresholdIsReached();
      }));

      it('should return false if threshold is not reached by 10', fakeAsync(() => {
        givenSelectorBasketCostReturns(PLUS_PRODUCT_EUR_THRESHOLD - 10);
        store.refreshState();
        thenThresholdIsNotReached();
      }));

      it('should return false if shop currency is not EUR and cost not reached', fakeAsync(() => {
        givenShopCurrency('OTHER');
        givenSelectorBasketCostReturns(PLUS_PRODUCT_OTHER_THRESHOLD - 1);
        store.refreshState();
        thenThresholdIsNotReached();
      }));

      it('should return true threshold reached and shop currency is not EUR', fakeAsync(() => {
        givenShopCurrency('OTHER');
        givenSelectorBasketCostReturns(PLUS_PRODUCT_OTHER_THRESHOLD);
        store.refreshState();
        thenThresholdIsReached();
      }));
    });

    function thenThresholdIsReached() {
      expect(isThresholdReachedResult).toBe(true);
    }

    function thenThresholdIsNotReached() {
      expect(isThresholdReachedResult).toBe(false);
    }
  });

  function givenShopCurrency(code: string = 'EUR') {
    currencyMock = {
      code,
      locale: 'de-DE',
    };
    shopMock = { shop: { currency: currencyMock } } as any;
    shopService.getShop.and.returnValue(shopMock);
  }

  function givenHasPlusProductsReturns(hasPlusProducts: boolean) {
    hasPlusProductsSubject$.next(hasPlusProducts);
    flush();
  }

  function givenSelectorBasketCostReturns(withTax: number) {
    store.overrideSelector(selectBasketCost, { withTax });
  }
});
