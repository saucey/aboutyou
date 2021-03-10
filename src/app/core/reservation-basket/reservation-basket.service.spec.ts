import { HttpClientTestingModule } from '@angular/common/http/testing';
import { fakeAsync, TestBed } from '@angular/core/testing';
import { BrowserTransferStateModule } from '@angular/platform-browser';
import { Actions } from '@ngrx/effects';
import { Action, Store } from '@ngrx/store';
import { MockStore } from '@ngrx/store/testing';
import { NgrxTestingModule } from 'src/tests/fixtures/ngrx-testing.module';
import { ReservationBasketService } from './reservation-basket.service';
import {
  AppStateWithReservationBasket,
  RESERVATION_BASKET_ACTIONS,
  RESERVATION_BASKET_POLLING_INTERVAL,
} from './state';
import { createReservationBasketStateMock } from './state/reservation-basket-state.mock';

describe('ReservationBasketService', () => {
  let service: ReservationBasketService;
  let actions$: Actions;
  let mockStore: MockStore<Partial<AppStateWithReservationBasket>>;
  let dispatchedActions: Action[];

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, BrowserTransferStateModule, NgrxTestingModule],
    });
  });

  beforeEach(() => {
    mockStore = TestBed.get(Store);
    actions$ = TestBed.get(Actions);
    service = TestBed.get(ReservationBasketService);

    dispatchedActions = [];
    actions$.subscribe(action => dispatchedActions.push(action));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('#onAppStable', () => {
    it('should dispatch RESERVATION_BASKET_ACTIONS.getBasket action ', () => {
      service.onAppStable();
      const getBasketAction = RESERVATION_BASKET_ACTIONS.getBasket();
      thenActionHasBeenDispatched(getBasketAction);
    });

    it('should dispatch RESERVATION_BASKET_ACTIONS.startPolling action ', () => {
      service.onAppStable();
      const pollingAction = RESERVATION_BASKET_ACTIONS.startPolling(RESERVATION_BASKET_POLLING_INTERVAL);
      thenActionHasBeenDispatched(pollingAction);
    });
  });

  describe('#addOrUpdateItem', () => {
    it('should dispatch RESERVATION_BASKET_ACTIONS.addOrUpdate with parameters', fakeAsync(() => {
      mockStore.setState({ reservationBasket: createReservationBasketStateMock(123) });
      const addOrUpdateParam = { variantId: 456, quantity: 1, storeId: 123 };

      service.addOrUpdateItem(addOrUpdateParam).subscribe(addOrUpdateResult => expect(addOrUpdateResult).toBeTrue());

      const addOrUpdateAction = RESERVATION_BASKET_ACTIONS.addOrUpdate(addOrUpdateParam);
      thenActionHasBeenDispatched(addOrUpdateAction);
    }));

    it('should dispatch RESERVATION_BASKET_ACTIONS.addOrUpdate if basket is empty', () => {
      mockStore.setState({ reservationBasket: null });
      const addOrUpdateParam = { variantId: 456, quantity: 1, storeId: 123 };
      service.addOrUpdateItem(addOrUpdateParam).subscribe(addOrUpdateResult => expect(addOrUpdateResult).toBeTrue());

      const addOrUpdateAction = RESERVATION_BASKET_ACTIONS.addOrUpdate(addOrUpdateParam);
      thenActionHasBeenDispatched(addOrUpdateAction);
    });

    it('should not dispatch RESERVATION_BASKET_ACTIONS.addOrUpdate if storeId is wrong', () => {
      mockStore.setState({ reservationBasket: createReservationBasketStateMock(456) });
      const addOrUpdateParam = { variantId: 456, quantity: 1, storeId: 123 };

      service.addOrUpdateItem(addOrUpdateParam).subscribe(addOrUpdateResult => expect(addOrUpdateResult).toBeFalse());
      expect(dispatchedActions.length).toBe(0);
    });
  });

  function thenActionHasBeenDispatched(getBasketAction: Action) {
    expect(dispatchedActions).toContain(getBasketAction);
  }
});
