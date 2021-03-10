import { Response } from 'express';

import { BasketItem, GetBasketParameters } from '@aboutyou/backbone/endpoints/basket/getBasket';
import { GetWishlistParameters } from '@aboutyou/backbone/endpoints/wishlist/getWishlist';
import { BapiClient, BasketResponse } from '@aboutyou/backbone/helpers/BapiClient';

import { getBapiAuth, getBapiConnectionUrl } from '../../app/core/services/resolveEnvs';
import { CONFIG } from '../../app/configs';
import { Request } from '../types';
import { fetchAYUser, getShopIdFromRequest } from '../utils';

export const BASKET_REQUEST: Pick<GetBasketParameters, 'with' | 'campaignKey' | 'checkoutShopId'> = {
  campaignKey: 'px',
  with: {
    items: {
      product: {
        attributes: 'all',
        advancedAttributes: 'all',
        images: 'all',
        categories: 'all',
        variants: 'all',
        siblings: {
          attributes: 'all',
          advancedAttributes: 'all',
          images: 'all',
          categories: 'all',
          variants: 'all',
        },
      },
      variant: {
        attributes: 'all',
        advancedAttributes: 'all',
        stock: 'all',
      },
    },
  },
};

export const WISHLIST_REQUEST_CONFIG: Pick<GetWishlistParameters, 'with' | 'campaignKey' | 'pricePromotionKey'> = {
  campaignKey: 'px',
  with: {
    items: {
      product: {
        attributes: 'all',
        advancedAttributes: 'all',
        images: 'all',
        categories: 'all',
        variants: 'all',
        siblings: {
          attributes: 'all',
          advancedAttributes: 'all',
          images: 'all',
          categories: 'all',
          variants: 'all',
        },
      },
      variant: {
        attributes: 'all',
        advancedAttributes: 'all',
        stock: 'all',
      },
    },
  },
};

export const getBapiClientByShopId = (shopId: number) => {
  return new BapiClient({
    host: getBapiConnectionUrl(),
    auth: getBapiAuth(),
    shopIdPlacement: 'query',
    shopId,
  });
};

export const getBapiClient = (req: Request, res: Response) => {
  const shopId = getShopIdFromRequest(req, res);
  return getBapiClientByShopId(shopId);
};

export function send401WithMessage(messageInfo: string, res: Response, error?: Error) {
  console.warn(messageInfo, error.message);
  res.status(401).send(messageInfo);
}

export const getBasketKey = async (req: Request, res: Response): Promise<string> => {
  try {
    const { accessToken, guestBasketKey } = req.session;
    if (accessToken == null && guestBasketKey == null) {
      send401WithMessage('Basket key error. Did not find guestBasketKey in session', res);
      return;
    }
    if (accessToken) {
      const shopId = getShopIdFromRequest(req, res);
      const AYUser = await fetchAYUser(accessToken, shopId);
      return createBasketKey(AYUser.id);
    }
    return guestBasketKey;
  } catch (error) {
    send401WithMessage('Basket key error.', res, error);
  }
};

export const findItemWithVariantId = (basketResponse: BasketResponse, variantId: number): BasketItem =>
  basketResponse.type !== 'failure' && basketResponse.basket.items.find(itemByVariantId(variantId));

export function itemByVariantId(variantId: number) {
  return item => item.variant.id === variantId;
}

export function createWishlistKey(userId: number): string {
  return `${CONFIG.shop.bapi.basketKeyPrefix}-wishlist-${userId}`;
}

export function createBasketKey(userId: number): string {
  return `${CONFIG.shop.bapi.basketKeyPrefix}-${userId}`;
}
