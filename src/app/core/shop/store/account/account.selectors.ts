import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AppState } from '../index';
import { AccountState } from './account.reducers';

export const selectAccountState = createFeatureSelector<AppState, AccountState>('account');

export const getUser = createSelector(selectAccountState, state => state.user);
export const getAuthenticated = createSelector(selectAccountState, state => state.isAuthenticated);
export const selectAccountIsLoading = createSelector(selectAccountState, state => state.isLoading);
