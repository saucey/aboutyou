import { createReducer, on, Action } from '@ngrx/store';
import { CATEGORIES_ACTIONS } from './categories.actions';
import { NavbarCategory } from '../../types';

export interface CategoriesState {
  data: NavbarCategory[];
}

export const initialState: CategoriesState = {
  data: [],
};

const categoriesReducer = createReducer(
  initialState,
  on(CATEGORIES_ACTIONS.setCategories, (state, action) => ({ ...state, data: action.categories })),
);

export function reducer(state: CategoriesState | undefined, action: Action) {
  return categoriesReducer(state, action);
}
