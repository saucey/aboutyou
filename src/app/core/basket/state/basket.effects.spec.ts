import { BasketKey } from '@aboutyou/backbone/endpoints/basket/getBasket';
import { BasketResponse } from '@aboutyou/backbone/helpers/BapiClient';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { discardPeriodicTasks, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { BrowserTransferStateModule, makeStateKey, TransferState } from '@angular/platform-browser';
import { ActionsSubject, Store, Action } from '@ngrx/store';
import { MockStore } from '@ngrx/store/testing';
import { initialState } from './basket.reducers';
import { BasketApiService } from '../basket-api.service';
import { getBasketUrl } from '../../services/resolveEnvs';
import { AppState } from '../../shop/store';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { BASKET_ACTIONS } from './basket.actions';
import { BasketEffects } from './basket.effects';
import createSpy = jasmine.createSpy;
import Spy = jasmine.Spy;
import SpyObj = jasmine.SpyObj;
import { NgrxTestingModule } from 'src/tests/fixtures/ngrx-testing.module';

const testPollInterval = 1000;

describe('BasketEffects', () => {
  let actionsSubject$: ActionsSubject;
  let basketEffects: BasketEffects;
  let basketApi: SpyObj<BasketApiService>;
  let onNextSpy: Spy;
  let endTestSubject$: Subject<void>;
  let getBasketResponseSubject$ = new Subject<BasketResponse>();

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, BrowserTransferStateModule, NgrxTestingModule],
      providers: [BasketEffects],
    });
  });

  beforeEach(() => {
    actionsSubject$ = TestBed.get(ActionsSubject);

    basketApi = TestBed.get(BasketApiService);
    getBasketResponseSubject$ = new Subject<BasketResponse>();
    spyOn(basketApi, 'getBasket').and.returnValue(getBasketResponseSubject$.asObservable());
    basketEffects = TestBed.get(BasketEffects);
    onNextSpy = createSpy('onNextSpy');
    endTestSubject$ = new Subject<void>();
  });

  describe('pollBasketEffect$', () => {
    beforeEach(() => {
      whenStartPollingAction();
    });

    it('should emit loadBasket every pollIntervall', fakeAsync(() => {
      givenPollBasketEffectIsSubscribed();

      for (let i = 0; i < 6; i++) {
        thenNextWasCalled(i, BASKET_ACTIONS.getBasket());
        whenPollIntervalPassed(1);
      }

      cleanupResources();
    }));

    it('should not emit loadBasket directly', fakeAsync(() => {
      givenPollBasketEffectIsSubscribed();

      whenPollIntervalPassed(0.1);
      thenNextWasCalled(0, BASKET_ACTIONS.getBasket());

      cleanupResources();
    }));

    describe('Action StopBasketPolling', () => {
      beforeEach(() => {
        givenStopBasketIsSubscribed();
      });
      it('should not emit loadBasket anymore', fakeAsync(() => {
        givenPollBasketEffectIsSubscribed();
        whenPollIntervalPassed(1);
        thenNextWasCalled(1, BASKET_ACTIONS.getBasket());

        whenStopBasketPollingIsEmitted();

        whenPollIntervalPassed(50);
        thenNextWasCalled(1, BASKET_ACTIONS.getBasket());

        cleanupResources();
      }));

      it('should restart basket polling after polling was stopped', fakeAsync(() => {
        givenPollBasketEffectIsSubscribed();
        whenPollIntervalPassed(0);

        whenStopBasketPollingIsEmitted();
        whenPollIntervalPassed(0);
        whenStartPollingAction();

        whenPollIntervalPassed(0.5);
        thenNextWasCalled(0);

        whenPollIntervalPassed(0.6);
        thenNextWasCalled(1, BASKET_ACTIONS.getBasket());

        cleanupResources();
      }));
    });

    function givenStopBasketIsSubscribed() {
      basketEffects.stopBasketPolling$.pipe(takeUntil(endTestSubject$)).subscribe();
    }

    function givenPollBasketEffectIsSubscribed(): void {
      basketEffects.pollBasketEffect$.pipe(takeUntil(endTestSubject$)).subscribe(onNextSpy);
    }

    function whenStartPollingAction(): void {
      whenActionIsEmitted(BASKET_ACTIONS.startPolling({ pollingInterval: 1000 }));
    }

    function whenPollIntervalPassed(intervalsPassed: number = 1): void {
      tick(Math.floor(testPollInterval * intervalsPassed));
    }

    function whenStopBasketPollingIsEmitted(): void {
      whenActionIsEmitted(BASKET_ACTIONS.stopPolling());
    }
  });

  describe('loadBasketEffect$', () => {
    let transferState: TransferState;
    let basketResponse: BasketResponse;

    beforeEach(() => {
      (TestBed.get(Store) as MockStore<Pick<AppState, 'account' & 'basket'>>).setState({
        basket: initialState,
        account: { isLoading: false },
      });
      actionsSubject$.next(BASKET_ACTIONS.getBasket());
      transferState = TestBed.get(TransferState);
      spyOn(transferState, 'remove');
    });

    afterEach(fakeAsync(() => {
      cleanupResources();
    }));

    it('should emit setBasket, when response is successfully', fakeAsync(() => {
      givenLoadBasketEffectIsSubscribed();
      whenBasketResponseIsSuccessful();
      thenNextWasCalled(1, BASKET_ACTIONS.setBasket({ basketResponse }));
    }));

    it('should remove basketRequest from transferCache', fakeAsync(() => {
      givenLoadBasketEffectIsSubscribed();
      whenBasketResponseIsSuccessful();
      thenTransferCacheRemoveWasCalled();
    }));

    it('should emit setError, when response is error', fakeAsync(() => {
      const errorResponse = { type: 'ERROR' };

      givenLoadBasketEffectIsSubscribed();
      whenGetBasketResponseErrors(errorResponse);
      thenNextWasCalled(1, BASKET_ACTIONS.setError({ error: errorResponse }));
    }));

    function givenLoadBasketEffectIsSubscribed(): void {
      basketEffects.loadBasketEffect$.pipe(takeUntil(endTestSubject$)).subscribe(onNextSpy);
    }

    function whenBasketResponseIsSuccessful(): void {
      basketResponse = {
        type: 'success',
        basket: { packages: [], items: [], cost: null, currencyCode: 'EUR', key: '1234' as BasketKey },
      };
      whenGetBasketResponseWith(basketResponse);
    }

    function thenTransferCacheRemoveWasCalled() {
      expect(transferState.remove).toHaveBeenCalledWith(makeStateKey(`G.${getBasketUrl()}?`));
    }
  });

  function whenActionIsEmitted(basketAction: Action): void {
    actionsSubject$.next(basketAction);
  }

  function whenGetBasketResponseWith(basketResponse: any): void {
    getBasketResponseSubject$.next(basketResponse);
    tick();
  }

  function whenGetBasketResponseErrors(error: any) {
    getBasketResponseSubject$.error(error);
    tick();
  }

  function thenNextWasCalled(times: number, withParams?: any): void {
    expect(onNextSpy).toHaveBeenCalledTimes(times);

    if (times < 1 || withParams == null) {
      return;
    }
    expect(onNextSpy).toHaveBeenCalledWith(withParams);
  }

  function cleanupResources() {
    endTestSubject$.next();
    endTestSubject$.complete();
    discardPeriodicTasks();
  }
});
