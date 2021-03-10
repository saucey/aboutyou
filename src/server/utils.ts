import { Response } from 'express';
import fetch from 'node-fetch';
import { getCheckoutHostUrl } from '../app/core/services/resolveEnvs';
import { CONSTANTS } from '../app/core/shop/constants';
import { CONFIG } from '../app/configs';
import { environment } from '../environments/environment';
import { AUTH_ROUTES } from './constants';
import { AYUser, Request } from './types';

const crypto = require('crypto');

export const getShopIdFromRequest = (req: Request, res?: Response) => {
  const shopIdParam = req.query.shopId;
  if (shopIdParam) {
    return Number(shopIdParam);
  }

  const shopIdCookie = req.cookies[CONSTANTS.cookie.shopId];
  if (shopIdCookie) {
    return Number(shopIdCookie);
  }

  /**
   * Fallback to default shopId
   * NOTE: This should not ideally happen. Thus console.error it!
   */
  console.error('Could not find shopId from the request: ', req.url);
  return Number(CONFIG.shop.locale.defaultShopId);
};

export const getDefaultCookieOptions = () => {
  const expiryDate = new Date();
  expiryDate.setDate(expiryDate.getDate() + 365);

  return {
    httpOnly: environment.productionModeEnabled,
    secure: environment.productionModeEnabled,
    expires: expiryDate,
    sameSite: 'lax' as 'lax',
  };
};

export async function fetchAYUser(accessToken: string, shopId: number): Promise<AYUser> {
  const checkoutUrl = getCheckoutHostUrl(shopId, false);
  const userDataUrl = `${checkoutUrl}${AUTH_ROUTES.checkoutOauthMeUrl}`;

  const userResponse = await fetch(userDataUrl, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${accessToken}`,
    },
  });
  if (userResponse.status === 200) {
    const data = await userResponse.json();
    return data;
  } else {
    throw new Error(`The user could not be loaded: ${JSON.stringify(userResponse, null, 2)}`);
  }
}

export function sign(payload: string, shopId: number): string {
  const checkoutAppSecret = process.env[`CHECKOUT_APP_SECRET_${shopId}`];
  if (!checkoutAppSecret) {
    throw new Error(`CHECKOUT APP SECRET NOT FOUND FOR SHOP_ID: ${shopId}`);
  }
  return crypto
    .createHmac('sha256', checkoutAppSecret)
    .update(payload)
    .digest('hex');
}

export const clickAndReserveHeader = {
  'Content-Type': 'application/json',
  Authorization: `Bearer ${process.env.CLOUD_MIDDLEWARE_SECRET}`,
};
