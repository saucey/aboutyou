import { Action, createReducer, on } from '@ngrx/store';
import { WISHLIST_ACTIONS } from './wishlist.actions';
import { WishlistResponseData } from '@aboutyou/backbone/endpoints/wishlist/getWishlist';

export interface WishlistState {
  data: WishlistResponseData;
  isLoading: boolean;
  error: any | { type: 'failure' };
}

export const initialState: WishlistState = { data: null, isLoading: true, error: null };

const wishlistReducer = createReducer(
  initialState,

  on(WISHLIST_ACTIONS.setWishlist, (state: WishlistState, action) => {
    const resultState = {
      ...state,
      data: action.wishlistResponse,
      isLoading: false,
      error: null,
    };
    return resultState;
  }),

  on(WISHLIST_ACTIONS.setLoading, (state: WishlistState, { isLoading }) => ({ ...state, isLoading })),

  on(WISHLIST_ACTIONS.setError, (state: WishlistState, { error }) => ({
    ...state,
    error,
    isLoading: false,
  })),
);

export function reducer(state: WishlistState | undefined, action: Action) {
  return wishlistReducer(state, action);
}
