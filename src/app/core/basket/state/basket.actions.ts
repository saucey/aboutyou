import { BasketResponse } from '@aboutyou/backbone/helpers/BapiClient';
import { createAction, props } from '@ngrx/store';

export const BASKET_ACTIONS = {
  setLoading: createAction('BASKET_IS_LOADING', props<{ isLoading: boolean }>()),
  setBasket: createAction('BASKET_SET_DATA', props<{ basketResponse: BasketResponse }>()),
  setError: createAction('BASKET_SET_ERROR', props<{ error: any }>()),
  getBasket: createAction('BASKET_GET'),
  setIsChangingQuantity: createAction('BASKET_IS_CHANGING_QUANTITY', props<{ isChangingQuantity: boolean }>()),
  startPolling: createAction('BASKET_START_POLLING', props<{ pollingInterval: number }>()),
  stopPolling: createAction('BASKET_STOP_POLLING'),
};
