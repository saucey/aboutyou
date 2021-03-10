import { BapiClient } from '@aboutyou/backbone';
import { WishlistResponseData } from '@aboutyou/backbone/endpoints/wishlist/getWishlist';
import * as bodyParser from 'body-parser';
import { Application, Response } from 'express';
import { Request } from '../../types';
import { fetchAYUser, getShopIdFromRequest } from '../../utils';
import {
  createWishlistKey,
  getBapiClient,
  getBapiClientByShopId,
  itemByVariantId,
  send401WithMessage,
  WISHLIST_REQUEST_CONFIG,
} from '../utils';

/**
 * adds the wishlist middleware to the app
 */
export function addWishlistApi(app: Application): void {
  const routeWishlist = '/api/wishlist';

  // tslint:disable-next-line: deprecation
  const json = bodyParser.json();

  app
    .route(routeWishlist)
    .get(handleGetWishlist)
    .post(json, handleAddOrDeleteWishlistItem);

  async function handleGetWishlist(req: Request, res: Response): Promise<void> {
    let wishlistResponse: WishlistResponseData;
    const bapiClient = getBapiClient(req, res);
    const wishlistKey = await getWishlistKey(req, res);
    if (wishlistKey == null) {
      send401WithMessage('Wishlist key error', res);
      return;
    }

    wishlistResponse = await fetchWishlistFromBapi(bapiClient, wishlistKey);
    return sendSuccessResponse(res, wishlistResponse);
  }

  async function handleAddOrDeleteWishlistItem(req: Request, res: Response): Promise<void> {
    const bapiClient = getBapiClient(req, res);
    const wishlistKey = await getWishlistKey(req, res);
    if (wishlistKey == null) {
      send401WithMessage('Wishlist key error', res);
      return;
    }

    const variantId = req.body.variantId;

    const wishlistResponse = await fetchWishlistFromBapi(bapiClient, wishlistKey);

    const currentItem = wishlistResponse.items.find(itemByVariantId(variantId));

    if (!currentItem) {
      const addItemResponse = await bapiClient.wishlist.addItem(wishlistKey, {
        variantId,
      });
      return sendSuccessResponse(res, addItemResponse.wishlist);
    } else {
      const response = await bapiClient.wishlist.deleteItem(wishlistKey, currentItem.key);
      return sendSuccessResponse(res, response);
    }
  }

  async function getWishlistKey(req: Request, res: Response): Promise<string> {
    const { accessToken, guestWishlistKey } = req.session;

    if (accessToken == null && guestWishlistKey == null) {
      return null;
    }
    if (!accessToken) {
      return guestWishlistKey;
    } else {
      const shopId = getShopIdFromRequest(req, res);
      const AYUser = await fetchAYUser(accessToken, shopId);
      return createWishlistKey(AYUser.id);
    }
  }

  function sendSuccessResponse(res: Response, wishlistResponse: WishlistResponseData): void {
    res.send(removeKey(wishlistResponse));
  }

  function removeKey(wishlistResponseData: WishlistResponseData): Pick<WishlistResponseData, 'items'> {
    const { key, ...wishlistResponseDataWithoutKey } = wishlistResponseData;
    return wishlistResponseDataWithoutKey;
  }
}

/**
 * merges the fromWishlist into the toWishlist
 */
export async function mergeWishlists(fromWishlistKey: string, toWishlistKey: string, shopId: number): Promise<void> {
  if (!fromWishlistKey) {
    return;
  }
  const bapiClient = getBapiClientByShopId(shopId);
  const oldWishlist = await fetchWishlistFromBapi(bapiClient, fromWishlistKey);
  if (oldWishlist != null) {
    for (const item of oldWishlist.items) {
      const variantId = item.variant.id;
      await bapiClient.wishlist.addItem(toWishlistKey, { variantId });
    }
  }
}

function fetchWishlistFromBapi(bapiClient: BapiClient, wishlistKey: string): Promise<WishlistResponseData> {
  return bapiClient.wishlist.get(wishlistKey, WISHLIST_REQUEST_CONFIG);
}
