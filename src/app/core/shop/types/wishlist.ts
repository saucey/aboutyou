import { WishlistItem, WishlistResponseData } from '@aboutyou/backbone/endpoints/wishlist/getWishlist';
import { ProductMap } from 'src/app/mappers/product';

export interface IWishlistListItem extends WishlistItem {
  mappedProduct: ProductMap;
}

export interface IWishlistCost {
  withTax: number;
  withoutTax: number;
  currencyCode: string;
}

export declare type WishlistResponse =
  | {
      type: 'success';
      wishlist: WishlistResponseData;
    }
  | {
      type: 'failure';
      wishlist: WishlistResponseData;
    };
