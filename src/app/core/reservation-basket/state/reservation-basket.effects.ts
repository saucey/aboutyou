import { BasketResponse } from '@aboutyou/backbone/helpers/BapiClient';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { makeStateKey, TransferState } from '@angular/platform-browser';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/core/shop/store';
import { selectAccountState } from 'src/app/core/shop/store/account';
import { concat, interval, Observable, of, Subject } from 'rxjs';
import { catchError, exhaustMap, first, map, mapTo, switchMap, takeUntil, tap } from 'rxjs/operators';
import { ReservationBasketApiService, reservationBasketUrl } from '../reservation-basket-api.service';
import { RESERVATION_BASKET_ACTIONS, RESERVATION_BASKET_POLLING_INTERVAL } from './reservation-basket.actions';

@Injectable({ providedIn: 'root' })
export class ReservationBasketEffects {
  private readonly stopBasketPollingSubject$: Subject<void> = new Subject<void>();
  private readonly getReservationBasket$: Observable<BasketResponse>;

  constructor(
    private http: HttpClient,
    private actions$: Actions,
    private store: Store<AppState>,
    private transferState: TransferState,
    private reservationBasketApiService: ReservationBasketApiService,
  ) {
    this.getReservationBasket$ = this.store.select(selectAccountState).pipe(
      first(accountState => !accountState.isLoading && accountState.isAuthenticated),
      tap(() => this.removeUrlFromSsrCachingMechanismToMakeSureRequestIsNotCached(reservationBasketUrl)),
      switchMap(url => this.reservationBasketApiService.getReservationBasket()),
    );
  }

  loadBasketEffect$ = createEffect(() =>
    this.actions$.pipe(
      ofType(RESERVATION_BASKET_ACTIONS.getBasket),
      exhaustMap(() =>
        this.getReservationBasket$.pipe(
          map(basketResponse => RESERVATION_BASKET_ACTIONS.setReservationBasket({ basketResponse })),
          catchError(error => {
            console.warn('error loading reservation-basket', error);
            return of(RESERVATION_BASKET_ACTIONS.setError({ error }));
          }),
        ),
      ),
    ),
  );

  stopBasketPolling$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(RESERVATION_BASKET_ACTIONS.stopPolling),
        tap(() => this.stopBasketPollingSubject$.next()),
      ),
    { dispatch: false },
  );

  pollBasketEffect$ = createEffect(() => {
    const pollInterval$ = action =>
      interval(action.pollingInterval).pipe(
        takeUntil(this.stopBasketPollingSubject$),
        mapTo(RESERVATION_BASKET_ACTIONS.getBasket()),
      );
    return this.actions$.pipe(ofType(RESERVATION_BASKET_ACTIONS.startPolling), switchMap(pollInterval$));
  });

  addOrUpdateEffect$ = createEffect(() =>
    this.actions$.pipe(
      ofType(RESERVATION_BASKET_ACTIONS.addOrUpdate),
      exhaustMap(({ type, ...addOrUpdateParam }) =>
        concat(
          of(RESERVATION_BASKET_ACTIONS.setLoading({ isLoading: true })),
          of(RESERVATION_BASKET_ACTIONS.stopPolling()),
          this.reservationBasketApiService
            .addOrUpdateItem(addOrUpdateParam)
            .pipe(map(basketResponse => RESERVATION_BASKET_ACTIONS.setReservationBasket({ basketResponse }))),
          of(RESERVATION_BASKET_ACTIONS.startPolling(RESERVATION_BASKET_POLLING_INTERVAL)),
        ),
      ),
      catchError(error => of(RESERVATION_BASKET_ACTIONS.setError({ error }))),
    ),
  );

  private removeUrlFromSsrCachingMechanismToMakeSureRequestIsNotCached(url: string): void {
    this.transferState.remove(makeStateKey<BasketResponse>('G.' + url + '?'));
  }
}
