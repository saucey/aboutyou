import { AddToBasketFailureKind, BasketResponse } from '@aboutyou/backbone/helpers/BapiClient';
import { Action, createReducer, on } from '@ngrx/store';
import { BasketState } from 'src/app/core/basket';
import { RESERVATION_BASKET_ACTIONS } from './reservation-basket.actions';

export type ReservationBasketState = BasketState;

export const initialState: ReservationBasketState = {
  data: null,
  isLoading: true,
  error: null,
  isChangingQuantity: false,
};

function jsonEqual(a: BasketResponse, b: BasketResponse) {
  return JSON.stringify(a) === JSON.stringify(b);
}

function isUpdateNeeded(state: ReservationBasketState, response: BasketResponse) {
  return (
    state.isLoading ||
    state.isChangingQuantity ||
    state.error != null ||
    state.data == null ||
    !jsonEqual(state.data, response)
  );
}
const reducer = createReducer(
  initialState,

  on(
    RESERVATION_BASKET_ACTIONS.setReservationBasket,
    (state: ReservationBasketState, action: { basketResponse: BasketResponse }) => {
      const updateNeeded = isUpdateNeeded(state, action.basketResponse);
      if (!updateNeeded) {
        return state;
      }

      const resultState = {
        ...state,
        data: { ...action.basketResponse },
        isLoading: false,
        isChangingQuantity: false,
        error: null,
      };
      if (action.basketResponse.type !== 'success') {
        const { type, kind } = action.basketResponse as BasketResponse & { kind: AddToBasketFailureKind };
        resultState.error = { type, kind };
      }
      return resultState;
    },
  ),

  on(RESERVATION_BASKET_ACTIONS.setLoading, (state: ReservationBasketState, { isLoading }) => ({
    ...state,
    isLoading,
  })),

  on(RESERVATION_BASKET_ACTIONS.setIsChangingQuantity, (state: ReservationBasketState, { isChangingQuantity }) => ({
    ...state,
    isChangingQuantity,
  })),

  on(RESERVATION_BASKET_ACTIONS.setError, (state: ReservationBasketState, { error }) => ({
    ...state,
    error,
    isLoading: false,
    isChangingQuantity: false,
  })),
);

export function reservationBasketReducer(
  state: ReservationBasketState | undefined,
  action: Action,
): ReservationBasketState {
  return reducer(state, action);
}
