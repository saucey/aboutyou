import { BasketItem } from '@aboutyou/backbone/endpoints/basket/getBasket';
import { BapiPrice } from '@aboutyou/backbone/types/BapiProduct';
import { createFeatureSelector, createSelector, MemoizedSelector } from '@ngrx/store';
import { TranslateService } from '@ngx-translate/core';
import { hasBasket, mapBasketItems, selectBasketItems, selectBasketItemsForBasketState } from 'src/app/core/basket';
import { AppState } from 'src/app/core/shop/store';
import { IBasketListItem, ICurrency } from 'src/app/core/shop/types';
import { AppStateWithReservationBasket } from '../app-state-with-reservation-basket';
import { ReservationBasketState } from './reservation-basket.reducer';

export const selectReservationBasketFeature = createFeatureSelector<
  AppStateWithReservationBasket,
  ReservationBasketState
>('reservationBasket');

export const selectReservationBasketItems: MemoizedSelector<
  AppStateWithReservationBasket,
  BasketItem[]
> = createSelector(selectReservationBasketFeature, selectBasketItemsForBasketState);

export const selectMappedReservationBasketItems: (
  currency: ICurrency,
  translateService: TranslateService,
) => MemoizedSelector<AppStateWithReservationBasket, IBasketListItem[]> = (
  currency: ICurrency,
  translateService: TranslateService,
) =>
  createSelector(selectReservationBasketItems, items => {
    return mapBasketItems(currency, translateService)(items);
  });

export const selectReservationBasketCost: MemoizedSelector<AppStateWithReservationBasket, BapiPrice> = createSelector(
  selectReservationBasketFeature,
  basketState => {
    if (hasBasket(basketState)) {
      return basketState.data.basket.cost;
    }
    return null;
  },
);

export const selectMappedBasketItems = (currency: ICurrency, translateService: TranslateService) =>
  createSelector(selectBasketItems, items => {
    return mapBasketItems(currency, translateService)(items);
  });

export const selectReservationBasketItemsCount: MemoizedSelector<
  AppState,
  number
> = createSelector(selectReservationBasketItems, items =>
  items.reduce((previousCount, item) => previousCount + item.quantity, 0),
);

export const selectStoreId: MemoizedSelector<
  AppStateWithReservationBasket,
  number | null
> = createSelector(selectReservationBasketItems, items =>
  items.length > 0 ? (items[0].customData as { storeId: number }).storeId : null,
);

export const isItemInReservationBasket = (variantId: number) =>
  createSelector(selectReservationBasketItems, items => items.some(item => item.variant.id === variantId));

export const selectReservationBasketIsLoading: MemoizedSelector<
  AppStateWithReservationBasket,
  boolean
> = createSelector(selectReservationBasketFeature, basketState => basketState.isLoading);

export const selectReservationBasketError: MemoizedSelector<
  AppStateWithReservationBasket,
  any | 'failure'
> = createSelector(selectReservationBasketFeature, basketState => {
  if (basketState.error) {
    return basketState.error;
  }
  if (basketState.data && basketState.data.type !== 'success') {
    return basketState.data.type;
  }
});
