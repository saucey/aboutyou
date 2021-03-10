import { AddToBasketFailureKind, BasketResponse } from '@aboutyou/backbone/helpers/BapiClient';
import { Action, createReducer, on } from '@ngrx/store';
import { BASKET_ACTIONS } from './basket.actions';

export interface BasketState {
  data: BasketResponse;
  isLoading: boolean;
  error: any | { type: 'failure'; kind?: AddToBasketFailureKind };
  isChangingQuantity: boolean;
}

export const initialState: BasketState = { data: null, isLoading: true, error: null, isChangingQuantity: false };

function jsonEqual(a: BasketResponse, b: BasketResponse) {
  return JSON.stringify(a) === JSON.stringify(b);
}

function isUpdateNeeded(state: BasketState, response: BasketResponse) {
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

  on(BASKET_ACTIONS.setBasket, (state: BasketState, action: { basketResponse: BasketResponse }) => {
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
  }),

  on(BASKET_ACTIONS.setLoading, (state: BasketState, { isLoading }) => ({ ...state, isLoading })),

  on(BASKET_ACTIONS.setIsChangingQuantity, (state: BasketState, { isChangingQuantity }) => ({
    ...state,
    isChangingQuantity,
  })),

  on(BASKET_ACTIONS.setError, (state: BasketState, { error }) => ({
    ...state,
    error,
    isLoading: false,
    isChangingQuantity: false,
  })),
);

export function basketReducer(state: BasketState | undefined, action: Action): BasketState {
  return reducer(state, action);
}
