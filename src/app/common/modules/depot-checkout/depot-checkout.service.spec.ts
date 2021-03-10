import { fakeAsync, TestBed } from '@angular/core/testing';
import { MemoizedSelector, Store } from '@ngrx/store';
import { MockStore } from '@ngrx/store/testing';
import { ReplaySubject, Subject } from 'rxjs';
import { BasketPlusProductService } from './basket-plus-product.service';
import { DepotCheckoutModule } from './depot-checkout.module';
import { DepotCheckoutService } from './depot-checkout.service';
import { PlusProductCalcThresholdService } from './plus-product-calc-threshold/plus-product-calc-threshold.service';
import {
  createPlusProductCalcThresholdMock,
  PlusProductCalcThresholdMockService,
} from './plus-product-calc-threshold/plus-product-calc-threshold.service.mock';
import { PlusProductThresholdDialogService } from './plus-product-threshold-dialog.service';
import { PlusProductThresholdProcessResult } from './plus-product-threshold-process-result';
import createSpyObj = jasmine.createSpyObj;
import SpyObj = jasmine.SpyObj;
import { ShopService } from 'src/app/core/services/shop.service';
import { IFoundShop } from 'src/app/core/shop/utils';
import { AppState } from 'src/app/core/shop/store';
import { ICurrency, IBasketListItem } from 'src/app/core/shop/types';
import { TranslateTestingModule } from 'src/tests/fixtures/translate-testing.module';
import { NgrxTestingModule } from 'src/tests/fixtures/ngrx-testing.module';
import { CheckoutService } from 'src/app/core/services/checkout/checkout.service';
import { BasketService, selectBasketItemsCount } from 'src/app/core/basket';

describe('DepotCheckoutService', () => {
  let service: DepotCheckoutService;
  let shopService: SpyObj<ShopService>;
  let shopMock: IFoundShop;
  let store: MockStore<AppState>;
  let currencyMock: ICurrency;
  let isMobile: boolean;
  let plusProductService: BasketPlusProductService;
  let plusProductsSubject$: ReplaySubject<IBasketListItem[]>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [DepotCheckoutModule, TranslateTestingModule, NgrxTestingModule],
      providers: [
        { provide: ShopService, useValue: createSpyObj<ShopService>('ShopService', ['getShop', 'getShopId']) },
        createPlusProductCalcThresholdMock(),
      ],
    });

    currencyMock = {
      code: 'EUR',
      locale: 'de-DE',
    };
    shopMock = { shop: { currency: currencyMock } } as any;

    shopService = TestBed.get(ShopService);
    shopService.getShop.and.returnValue(shopMock);

    store = TestBed.get(Store);

    plusProductService = TestBed.get(BasketPlusProductService);

    plusProductsSubject$ = new ReplaySubject(1);
    spyOnProperty(plusProductService, 'basketPlusProducts$').and.returnValue(plusProductsSubject$);

    isMobile = true;
    service = TestBed.get(CheckoutService);

    // spyOn overridden super method.
    spyOn(Object.getPrototypeOf(Object.getPrototypeOf(service)), 'basketHandoverToCheckout');
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('#basketHandoverToCheckout()', () => {
    let calcServiceMock: PlusProductCalcThresholdMockService;

    beforeEach(() => {
      calcServiceMock = TestBed.get(PlusProductCalcThresholdService);
    });

    describe('threshold is reached', () => {
      beforeEach(() => {
        calcServiceMock.setIsThresholdReached(true);
      });

      it('should proceed directly to checkout', fakeAsync(() => {
        whenHandoverToCheckoutIsCalled();
        thenSuperBasketHandoverToCheckoutWasCalled();
      }));
    });

    describe('threshold not reached process', () => {
      let dialogService: PlusProductThresholdDialogService;
      let basketService: BasketService;
      let dialogResultSubject: Subject<PlusProductThresholdProcessResult>;
      let hasNormalItemsSubject$: ReplaySubject<boolean>;

      beforeEach(() => {
        basketService = TestBed.get(BasketService);
        spyOn(basketService, 'deleteItem');
        hasNormalItemsSubject$ = new ReplaySubject<boolean>(1);
        spyOnProperty(plusProductService, 'hasNormalBasketItems$').and.returnValue(hasNormalItemsSubject$);

        dialogService = TestBed.get(PlusProductThresholdDialogService);
        dialogResultSubject = new ReplaySubject<PlusProductThresholdProcessResult>(1);
        spyOn(dialogService, 'openDialog$').and.returnValue(dialogResultSubject.asObservable());
        calcServiceMock.setIsThresholdReached(false);
      });

      describe('only plus products in basket', () => {
        beforeEach(() => {
          hasNormalItemsSubject$.next(false);
        });

        it('should not proceed to checkout', fakeAsync(() => {
          whenHandoverToCheckoutIsCalled();
          thenSuperBasketHandoverToCheckoutWasNotCalled();
        }));
      });

      describe('plus products and normal items in basket', () => {
        beforeEach(() => {
          hasNormalItemsSubject$.next(true);
        });

        it('should call PlusProductThresholdDialog.openDialog$ with isMobile param', fakeAsync(() => {
          isMobile = true;
          whenHandoverToCheckoutIsCalled();
          expect(dialogService.openDialog$).toHaveBeenCalledWith(isMobile);
        }));

        it('should call PlusProductThresholdDialog.openDialog$ with isMobile param', fakeAsync(() => {
          isMobile = false;
          whenHandoverToCheckoutIsCalled();
          expect(dialogService.openDialog$).toHaveBeenCalledWith(isMobile);
        }));

        describe('and delete basket plus item after dialog confirm', () => {
          beforeEach(() => {
            givenPlusProducts([{ variant: { id: 123 } }] as any);

            dialogResultSubject.next(PlusProductThresholdProcessResult.DELETE_PLUS_ITEMS_AND_PROCEED_TO_CHECKOUT);
          });

          it('should call BasketService.deleteItem if dialog result is DELETE_PLUS_ITEMS_AND_PROCEED_TO_CHECKOUT', fakeAsync(() => {
            whenHandoverToCheckoutIsCalled();
            expect(basketService.deleteItem).toHaveBeenCalledWith(123);
          }));

          it('should call BasketService.deleteItem until basket has no plus items anymore', fakeAsync(() => {
            givenPlusProducts([{ variant: { id: 123 } }, { variant: { id: 456 } }] as any);

            whenHandoverToCheckoutIsCalled();

            givenPlusProducts([{ variant: { id: 456 } }] as any);

            givenPlusProducts([]);

            expect(basketService.deleteItem).toHaveBeenCalledTimes(2);
          }));

          describe('after plus items are removed', () => {
            it('should go to checkout if all plus items are removed and normal basket items are leftover', fakeAsync(() => {
              whenHandoverToCheckoutIsCalled();
              givenNormalBasketItemsCount(1);
              givenPlusProducts([]);
              thenSuperBasketHandoverToCheckoutWasCalled();
            }));

            it('should not goto checkout if all plus items are removed and no basket items are leftover', fakeAsync(() => {
              whenHandoverToCheckoutIsCalled();
              givenNormalBasketItemsCount(0);
              givenPlusProducts([]);
              thenSuperBasketHandoverToCheckoutWasNotCalled();
            }));

            function givenNormalBasketItemsCount(count: number) {
              store.overrideSelector(selectBasketItemsCount, count);
              store.refreshState();
            }
          });

          function givenPlusProducts(plusProducts: IBasketListItem[]) {
            plusProductsSubject$.next(plusProducts);
          }
        });
      });
    });
  });

  function whenHandoverToCheckoutIsCalled() {
    service.basketHandoverToCheckout(isMobile);
  }

  function thenSuperBasketHandoverToCheckoutWasCalled() {
    expect(CheckoutService.prototype.basketHandoverToCheckout).toHaveBeenCalledWith(isMobile);
  }

  function thenSuperBasketHandoverToCheckoutWasNotCalled() {
    expect(CheckoutService.prototype.basketHandoverToCheckout).not.toHaveBeenCalledWith(isMobile);
  }
});
