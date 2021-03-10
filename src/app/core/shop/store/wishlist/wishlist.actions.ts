import { WishlistResponseData } from '@aboutyou/backbone/endpoints/wishlist/getWishlist';
import { createAction, props } from '@ngrx/store';

export const WISHLIST_ACTIONS = {
  setLoading: createAction('WISHLIST_IS_LOADING', props<{ isLoading: boolean }>()),
  setWishlist: createAction('WISHLIST_SET_DATA', props<{ wishlistResponse: WishlistResponseData }>()),
  setError: createAction('WISHLIST_SET_ERROR', props<{ error: any }>()),
};
