import { BasketKey } from '@aboutyou/backbone/endpoints/basket/getBasket';
import { BasketResponse } from '@aboutyou/backbone/helpers/BapiClient';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { discardPeriodicTasks, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { BrowserTransferStateModule, makeStateKey, TransferState } from '@angular/platform-browser';
import { ActionsSubject, Store, Action } from '@ngrx/store';
import { MockStore } from '@ngrx/store/testing';
import { AddOrUpdateParam } from '../add-or-update-param';
import { AppStateWithReservationBasket } from '../app-state-with-reservation-basket';
import { ReservationBasketApiService, reservationBasketUrl } from '../reservation-basket-api.service';
import { initialState } from './reservation-basket.reducer';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { RESERVATION_BASKET_ACTIONS } from './reservation-basket.actions';
import { ReservationBasketEffects } from './reservation-basket.effects';
import createSpy = jasmine.createSpy;
import Spy = jasmine.Spy;
import SpyObj = jasmine.SpyObj;
import { NgrxTestingModule } from 'src/tests/fixtures/ngrx-testing.module';
import { RESERVATION_BASKET_POLLING_INTERVAL } from 'src/app/core/reservation-basket/state/index';

const testPollInterval = 1000;

describe('ReservationBasketEffects', () => {
  let actionsSubject$: ActionsSubject;
  let basketEffects: ReservationBasketEffects;
  let reservationBasketApi: SpyObj<ReservationBasketApiService>;
  let emittedActionsSpy: Spy;
  let endTestSubject$: Subject<void>;
  let basketResponseSubject$ = new Subject<BasketResponse>();
  let storeMock: MockStore<Partial<AppStateWithReservationBasket>>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, BrowserTransferStateModule, NgrxTestingModule],
      providers: [ReservationBasketEffects],
    });
  });

  beforeEach(() => {
    actionsSubject$ = TestBed.get(ActionsSubject);
    storeMock = TestBed.get(Store);
    reservationBasketApi = TestBed.get(ReservationBasketApiService);
    basketResponseSubject$ = new Subject<BasketResponse>();
    spyOn(reservationBasketApi, 'getReservationBasket').and.returnValue(basketResponseSubject$.asObservable());
    basketEffects = TestBed.get(ReservationBasketEffects);
    emittedActionsSpy = createSpy('onNextSpy');
    endTestSubject$ = new Subject<void>();
  });

  describe('pollBasketEffect$', () => {
    beforeEach(() => {
      whenStartPollingAction();
    });

    it('should emit getBasket every pollIntervall', fakeAsync(() => {
      givenPollBasketEffectIsSubscribed();

      for (let i = 0; i < 6; i++) {
        thenActionsHasBeenEmitted(i, [RESERVATION_BASKET_ACTIONS.getBasket()]);
        whenPollIntervalPassed(1);
      }

      cleanupResources();
    }));

    it('should not emit getBasket directly', fakeAsync(() => {
      givenPollBasketEffectIsSubscribed();

      whenPollIntervalPassed(0.1);
      thenActionsHasBeenEmitted(0);

      cleanupResources();
    }));

    describe('Action StopBasketPolling', () => {
      beforeEach(() => {
        givenStopBasketIsSubscribed();
      });
      it('should not emit getBasket anymore', fakeAsync(() => {
        givenPollBasketEffectIsSubscribed();
        whenPollIntervalPassed(1);
        thenActionHasBeenEmitted(RESERVATION_BASKET_ACTIONS.getBasket());

        whenStopBasketPollingIsEmitted();

        whenPollIntervalPassed(50);
        thenActionHasBeenEmitted(RESERVATION_BASKET_ACTIONS.getBasket());

        cleanupResources();
      }));

      it('should restart basket polling after polling was stopped', fakeAsync(() => {
        givenPollBasketEffectIsSubscribed();
        whenPollIntervalPassed(0);

        whenStopBasketPollingIsEmitted();
        whenPollIntervalPassed(0);
        whenStartPollingAction();

        whenPollIntervalPassed(0.5);
        thenActionsHasBeenEmitted(0);

        whenPollIntervalPassed(0.6);
        thenActionHasBeenEmitted(RESERVATION_BASKET_ACTIONS.getBasket());

        cleanupResources();
      }));
    });

    function givenStopBasketIsSubscribed() {
      basketEffects.stopBasketPolling$.pipe(takeUntil(endTestSubject$)).subscribe();
    }

    function givenPollBasketEffectIsSubscribed(): void {
      basketEffects.pollBasketEffect$.pipe(takeUntil(endTestSubject$)).subscribe(emittedActionsSpy);
    }

    function whenStartPollingAction(): void {
      whenActionIsEmitted(RESERVATION_BASKET_ACTIONS.startPolling({ pollingInterval: 1000 }));
    }

    function whenPollIntervalPassed(intervalsPassed: number = 1): void {
      tick(Math.floor(testPollInterval * intervalsPassed));
    }

    function whenStopBasketPollingIsEmitted(): void {
      whenActionIsEmitted(RESERVATION_BASKET_ACTIONS.stopPolling());
    }
  });

  describe('loadBasketEffect$', () => {
    let transferState: TransferState;
    let basketResponse: BasketResponse;

    beforeEach(() => {
      storeMock.setState({
        basket: initialState,
        account: { isLoading: false, isAuthenticated: true },
      });
      actionsSubject$.next(RESERVATION_BASKET_ACTIONS.getBasket());
      transferState = TestBed.get(TransferState);
      spyOn(transferState, 'remove');
    });

    afterEach(fakeAsync(() => {
      cleanupResources();
    }));

    it('should not call #reservationBasketApi.getBasket, when user is not authenticated', fakeAsync(() => {
      givenUserIsNotAuthenticated();
      givenLoadBasketEffectIsSubscribed();
      expect(reservationBasketApi.getReservationBasket).not.toHaveBeenCalled();
      expect(emittedActionsSpy).not.toHaveBeenCalled();
    }));

    it('should emit setBasket, when response is successfully', fakeAsync(() => {
      givenLoadBasketEffectIsSubscribed();
      whenBasketResponseIsSuccessful();
      thenActionHasBeenEmitted(RESERVATION_BASKET_ACTIONS.setReservationBasket({ basketResponse }));
    }));

    it('should remove basketRequest from transferCache', fakeAsync(() => {
      givenLoadBasketEffectIsSubscribed();
      whenBasketResponseIsSuccessful();
      thenTransferCacheRemoveWasCalled();
    }));

    it('should emit setError, when response is error', fakeAsync(() => {
      const errorResponse = { type: 'ERROR' };

      givenLoadBasketEffectIsSubscribed();
      whenBasketResponseErrors(errorResponse);
      thenActionHasBeenEmitted(RESERVATION_BASKET_ACTIONS.setError({ error: errorResponse }));
    }));

    function givenLoadBasketEffectIsSubscribed(): void {
      basketEffects.loadBasketEffect$.pipe(takeUntil(endTestSubject$)).subscribe(emittedActionsSpy);
    }

    function givenUserIsNotAuthenticated() {
      storeMock.setState({
        basket: initialState,
        account: { isLoading: false, isAuthenticated: false },
      });
    }

    function whenBasketResponseIsSuccessful(): void {
      basketResponse = {
        type: 'success',
        basket: { packages: [], items: [], cost: null, currencyCode: 'EUR', key: '1234' as BasketKey },
      };
      whenBasketResponseWith(basketResponse);
    }

    function thenTransferCacheRemoveWasCalled() {
      expect(transferState.remove).toHaveBeenCalledWith(makeStateKey(`G.${reservationBasketUrl}?`));
    }
  });

  describe('addOrUpdateItemEffect$', () => {
    let basketResponse: BasketResponse;
    let addOrUpdateParams: AddOrUpdateParam;

    beforeEach(() => {
      spyOn(reservationBasketApi, 'addOrUpdateItem').and.returnValue(basketResponseSubject$.asObservable());

      storeMock.setState({
        basket: initialState,
      });
      addOrUpdateParams = { variantId: 123, quantity: 4, storeId: 789 };
      actionsSubject$.next(RESERVATION_BASKET_ACTIONS.addOrUpdate(addOrUpdateParams));
    });

    afterEach(fakeAsync(() => {
      cleanupResources();
    }));

    it('should call #reservationBasketApi.addOrUpdateItem', () => {
      givenAddOrUpdateEffectIsSubscribed();
      expect(reservationBasketApi.addOrUpdateItem).toHaveBeenCalledWith(addOrUpdateParams);
    });

    it('should emit [setLoading, stopPolling, setReservationBasket, and startPolling] action', fakeAsync(() => {
      givenAddOrUpdateEffectIsSubscribed();
      whenAddOrUpdateBasketResponseIsSuccessful();

      const setLoading = RESERVATION_BASKET_ACTIONS.setLoading({ isLoading: true });
      const stopPolling = RESERVATION_BASKET_ACTIONS.stopPolling();
      const setReservationBasket = RESERVATION_BASKET_ACTIONS.setReservationBasket({ basketResponse });
      const startPolling = RESERVATION_BASKET_ACTIONS.startPolling(RESERVATION_BASKET_POLLING_INTERVAL);
      thenActionsHasBeenEmitted(4, [setLoading, stopPolling, setReservationBasket, startPolling]);
    }));

    it('should emit setError [setLoading, stopPolling, setError] when response is error', fakeAsync(() => {
      const errorResponse = { type: 'ERROR' };
      givenAddOrUpdateEffectIsSubscribed();
      whenBasketResponseErrors(errorResponse);

      const setLoading = RESERVATION_BASKET_ACTIONS.setLoading({ isLoading: true });
      const stopPolling = RESERVATION_BASKET_ACTIONS.stopPolling();
      const setError = RESERVATION_BASKET_ACTIONS.setError({ error: errorResponse });
      thenActionsHasBeenEmitted(3, [setLoading, stopPolling, setError]);
    }));

    function givenAddOrUpdateEffectIsSubscribed(): void {
      basketEffects.addOrUpdateEffect$.pipe(takeUntil(endTestSubject$)).subscribe(emittedActionsSpy);
    }

    function whenAddOrUpdateBasketResponseIsSuccessful(): void {
      basketResponse = {
        type: 'success',
        basket: { packages: [], items: [], cost: null, currencyCode: 'EUR', key: '1234' as BasketKey },
      };
      whenBasketResponseWith(basketResponse);
    }
  });

  function whenActionIsEmitted(basketAction: Action): void {
    actionsSubject$.next(basketAction);
  }

  function whenBasketResponseWith(basketResponse: any): void {
    basketResponseSubject$.next(basketResponse);
    basketResponseSubject$.complete();
    tick();
  }

  function whenBasketResponseErrors(error: any) {
    basketResponseSubject$.error(error);
    tick();
  }

  function thenActionsHasBeenEmitted(times: number, withParams?: any[]): void {
    expect(emittedActionsSpy).toHaveBeenCalledTimes(times);

    if (times < 1 || withParams == null) {
      return;
    }

    withParams.forEach((expectedParam, i) => expect(emittedActionsSpy.calls.argsFor(i)).toContain(expectedParam));
  }

  function thenActionHasBeenEmitted(withParams: any): void {
    thenActionsHasBeenEmitted(1, [withParams]);
  }

  function cleanupResources() {
    endTestSubject$.next();
    endTestSubject$.complete();
    discardPeriodicTasks();
  }
});
