import { BasketResponse } from '@aboutyou/backbone/helpers/BapiClient';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { makeStateKey, TransferState } from '@angular/platform-browser';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { interval, Observable, of, Subject } from 'rxjs';
import { catchError, exhaustMap, first, map, mapTo, switchMap, takeUntil, tap } from 'rxjs/operators';
import { getBasketUrl } from '../../services/resolveEnvs';
import { AppState } from '../../shop/store';
import { selectAccountIsLoading } from '../../shop/store/account';
import { BasketApiService } from '../basket-api.service';
import { BASKET_ACTIONS } from './basket.actions';

@Injectable({ providedIn: 'root' })
export class BasketEffects {
  private readonly stopBasketSubject$: Subject<void> = new Subject<void>();
  private readonly getBasket$: Observable<BasketResponse>;

  constructor(
    private http: HttpClient,
    private actions$: Actions,
    private store: Store<AppState>,
    private transferState: TransferState,
    private basketApiService: BasketApiService,
  ) {
    this.getBasket$ = this.store.select(selectAccountIsLoading).pipe(
      first(isLoading => !isLoading),
      tap(() => this.removeUrlFromSsrCachingMechanismToMakeSureRequestIsNotCached(getBasketUrl())),
      switchMap(url => this.basketApiService.getBasket()),
    );
  }

  loadBasketEffect$ = createEffect(() =>
    this.actions$.pipe(
      ofType(BASKET_ACTIONS.getBasket),
      exhaustMap(() =>
        this.getBasket$.pipe(
          map(basketResponse => BASKET_ACTIONS.setBasket({ basketResponse })),
          catchError(error => {
            console.warn('error loading basket', error);
            return of(BASKET_ACTIONS.setError({ error }));
          }),
        ),
      ),
    ),
  );

  stopBasketPolling$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(BASKET_ACTIONS.stopPolling),
        tap(() => this.stopBasketSubject$.next()),
      ),
    { dispatch: false },
  );

  pollBasketEffect$ = createEffect(() => {
    const pollInterval$ = action =>
      interval(action.pollingInterval).pipe(takeUntil(this.stopBasketSubject$), mapTo(BASKET_ACTIONS.getBasket()));
    return this.actions$.pipe(ofType(BASKET_ACTIONS.startPolling), switchMap(pollInterval$));
  });

  private removeUrlFromSsrCachingMechanismToMakeSureRequestIsNotCached(url: string): void {
    this.transferState.remove(makeStateKey<BasketResponse>('G.' + url + '?'));
  }
}
