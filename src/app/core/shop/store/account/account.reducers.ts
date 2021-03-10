import { Action, createReducer, on } from '@ngrx/store';
import { ACCOUNT_ACTIONS } from './account.actions';

export interface AccountState {
  isLoading: boolean;
  isAuthenticated: boolean;
  user?: {
    firstName: string;
    lastName: string;
    gender: string;
    email: string;
    phone: string;
    birthDate: string;
  };
}

export const initialState: AccountState = {
  isLoading: true,
  isAuthenticated: false,
  user: null,
};

const accountReducer = createReducer(
  initialState,
  on(ACCOUNT_ACTIONS.setUser, (state, action) => ({
    ...state,
    user: {
      firstName: action.firstName,
      gender: action.gender,
      lastName: action.lastName,
      email: action.email,
      phone: action.phone,
      birthDate: action.birthDate,
    },
    isAuthenticated: true,
    isLoading: false,
  })),
  on(ACCOUNT_ACTIONS.removerUser, state => ({
    ...state,
    user: null,
    isAuthenticated: false,
    isLoading: false,
  })),
);

export function reducer(state: AccountState | undefined, action: Action) {
  return accountReducer(state, action);
}
