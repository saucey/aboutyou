import { ActionReducerMap, MetaReducer } from '@ngrx/store';
import { BasketState, basketReducer } from '../../basket';
import { reducer, WishlistState } from './wishlist';
import * as fromAccount from './account';
import * as fromCategories from './categories';
import * as fromUi from './ui';

export interface AppState {
  basket: BasketState;
  wishlist: WishlistState;
  categories: fromCategories.CategoriesState;
  account: fromAccount.AccountState;
  ui: fromUi.UiState;
}

export const reducers: ActionReducerMap<AppState> = {
  basket: basketReducer,
  wishlist: reducer,
  categories: fromCategories.reducer,
  account: fromAccount.reducer,
  ui: fromUi.reducer,
};

export const metaReducers: MetaReducer<AppState>[] = [];
