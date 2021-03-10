import { createSelector } from '@ngrx/store';
import { AppState } from '../index';

export const selectUiState = (state: AppState) => state.ui;

export const getPlpScrollPosition = createSelector(selectUiState, state => state.plp.scroll);
