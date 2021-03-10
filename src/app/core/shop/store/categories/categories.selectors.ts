import { createSelector } from '@ngrx/store';
import { AppState } from '../index';

export const selectCategoriesState = (state: AppState) => state.categories;

export const getCategories = createSelector(selectCategoriesState, state => state.data);
