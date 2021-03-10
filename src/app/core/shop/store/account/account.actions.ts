import { createAction, props } from '@ngrx/store';
import { IUser } from '../../types';

export const ACCOUNT_ACTIONS = {
  setUser: createAction('ACCOUNT_SET_USER', props<IUser>()),
  removerUser: createAction('ACCOUNT_REMOVE_USER'),
};
