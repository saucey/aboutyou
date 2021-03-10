import { BasketResponse } from '@aboutyou/backbone/helpers/BapiClient';
import { createAction, props } from '@ngrx/store';
import { AddOrUpdateParam } from '../add-or-update-param';

const PREFIX = 'RESERVATION_BASKET_';
const avoidPollCollisionsPrime = 127;
const pollIntervalInSec = 30 * 1000 + avoidPollCollisionsPrime;
export const RESERVATION_BASKET_POLLING_INTERVAL = { pollingInterval: pollIntervalInSec };

export const RESERVATION_BASKET_ACTIONS = {
  setLoading: createAction(`${PREFIX}IS_LOADING`, props<{ isLoading: boolean }>()),
  setReservationBasket: createAction(`${PREFIX}SET_DATA`, props<{ basketResponse: BasketResponse }>()),
  addOrUpdate: createAction(`${PREFIX}ADD_OR_UPDATE`, props<AddOrUpdateParam>()),
  setError: createAction(`${PREFIX}SET_ERROR`, props<{ error: any }>()),
  getBasket: createAction(`${PREFIX}GET`),
  setIsChangingQuantity: createAction(`${PREFIX}IS_CHANGING_QUANTITY`, props<{ isChangingQuantity: boolean }>()),
  startPolling: createAction(`${PREFIX}START_POLLING`, props<{ pollingInterval: number }>()),
  stopPolling: createAction(`${PREFIX}STOP_POLLING`),
};
