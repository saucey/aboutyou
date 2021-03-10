import { WishlistItem } from '@aboutyou/backbone/endpoints/wishlist/getWishlist';
import { createSelector, MemoizedSelector } from '@ngrx/store';
import { TranslateService } from '@ngx-translate/core';
import { WishlistState } from 'src/app/core/shop/store/wishlist/wishlist.reducers';
import { IWishlistListItem, ICurrency } from 'src/app/core/shop/types';
import { ProductMap } from 'src/app/mappers/product';
import { AppState } from '../index';

const selectWishlistItemsForWishlistState: (state: WishlistState) => WishlistItem[] = state => {
  if (state.data && state.data.items) {
    return state.data.items;
  }
  return [];
};

export const selectWishlistState: (state: AppState) => WishlistState = (state: AppState) => state.wishlist;

export const selectWishlistItems: MemoizedSelector<AppState, WishlistItem[]> = createSelector(
  selectWishlistState,
  selectWishlistItemsForWishlistState,
);

export const selectWishlistItemsCount: MemoizedSelector<AppState, number> = createSelector(
  selectWishlistItems,
  items => items.length,
);

export const selectMappedWishlistItems = (currency: ICurrency, translateService: TranslateService) =>
  createSelector(selectWishlistItems, items => {
    return mapWishlistItems(currency, translateService)(items);
  });

export const isItemInWishlist = (id: number) =>
  createSelector(selectWishlistItems, items => items.some(item => item.product.id === id));

const mapWishlistItems = (
  currency: ICurrency,
  translateService: TranslateService,
): ((wishlistItems: WishlistItem[]) => IWishlistListItem[]) => (wishlistItems: WishlistItem[]) =>
  wishlistItems.map(item => ({
    ...item,
    mappedProduct: new ProductMap(item.product, currency, null, translateService),
  }));

export const selectWishlistIsLoading: MemoizedSelector<AppState, boolean> = createSelector(
  selectWishlistState,
  wishlistState => wishlistState.isLoading,
);

export const selectWishlistError: MemoizedSelector<AppState, any | 'failure'> = createSelector(
  selectWishlistState,
  wishlistState => {
    if (wishlistState.error) {
      return wishlistState.error;
    }
  },
);
