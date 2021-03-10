import { Application, Response } from 'express';
import { Base64 } from 'js-base64';
import { CONSTANTS } from '../../app/core/shop/constants';
import { mergeBaskets } from '../bapi/basket/basket-api';
import { createBasketKey, createWishlistKey } from '../bapi/utils';
import { mergeWishlists } from '../bapi/wishlist/wishlist-api';
import { AUTH_ROUTES } from '../constants';
import { Request, SessionPayloadType } from '../types';
import { fetchAYUser, getDefaultCookieOptions, getShopIdFromRequest } from '../utils';

import {
  buildEmbeddedLoginUrl,
  buildEmbeddedLogoutUrl,
  buildEmbeddedRegistrationUrl,
  getHostUrlFromRequest,
} from './utils';

const jwt = require('jsonwebtoken');
const uuid = require('nanoid');

const jwtSecret = process.env.JWT_SECRET;
const SESSION_COOKIE_NAME = CONSTANTS.cookie.sessionId;

function defaultNextSessionPayload() {
  return { guestBasketKey: uuid(), guestWishlistKey: uuid() };
}

function setDefaultSignedCookie(res: Response) {
  const nextToken = jwt.sign(defaultNextSessionPayload(), jwtSecret);
  res.cookie(SESSION_COOKIE_NAME, nextToken, getDefaultCookieOptions());
}

const authenticate = async (req: Request, res: Response) => {
  try {
    const { accessToken } = req.session;
    if (!accessToken) {
      return res.sendStatus(401);
    }

    const shopId = getShopIdFromRequest(req, res);
    const { firstName, lastName, gender, birthDate, email, phone } = await fetchAYUser(accessToken, shopId);

    return res.status(200).send({
      firstName,
      lastName,
      gender,
      birthDate,
      email,
      phone,
    });
  } catch (error) {
    console.error('User authentication failed', error);
    setDefaultSignedCookie(res);
    return res.status(401).send(error.message);
  }
};

const handleRedirectToEmbeddedForm = (form: 'login' | 'registration') => (req: Request, res: Response) => {
  const shopId = getShopIdFromRequest(req, res);
  const isMobile = req.query.isMobile === 'true';
  const host = getHostUrlFromRequest(req);

  const callbackOptions = {
    callback: `${host}${AUTH_ROUTES.loginSuccessCallback}`,
    scopes: [
      'basic',
      'customer',
      'customer.basic',
      'customer.contact',
      'customer.birthDate',
      'customer.personal.extension',
      'customer.contact.extension',
      'customer.order_summary',
      'customer.order_details',
      'order.payment.bankaccount.manage',
      'authentication',
    ],
  };

  const url =
    form === 'login'
      ? buildEmbeddedLoginUrl(isMobile, shopId, callbackOptions)
      : buildEmbeddedRegistrationUrl(isMobile, shopId, callbackOptions);
  res.redirect(url);
};

const handleLoginSuccessCallback = async (req: Request, res: Response) => {
  try {
    const { auth } = req.query;

    const [encodedData] = (auth as string).split('.');
    const { accessToken } = JSON.parse(Base64.decode(encodedData));

    const { guestBasketKey, guestWishlistKey } = req.session;
    /**
     * Don't have to await this merge.
     * It could be an expensive call, so doesn't have to delay the login process.
     */
    if (guestBasketKey || guestWishlistKey) {
      const shopId = getShopIdFromRequest(req);
      const customerId = (await fetchAYUser(accessToken, shopId)).id;

      if (!!guestBasketKey) {
        mergeUserBaskets(guestBasketKey, customerId, shopId);
      }
      if (!!guestWishlistKey) {
        mergeUserWishlists(guestWishlistKey, customerId, shopId);
      }
    }

    const nextSessionPayload: SessionPayloadType = { accessToken };
    const nextToken = jwt.sign(nextSessionPayload, jwtSecret);

    res.cookie(SESSION_COOKIE_NAME, nextToken, getDefaultCookieOptions());

    return res.redirect('/auth/success');
  } catch (error) {
    res.redirect('/auth/failed');
  }
};

const handleRedirectToEmbeddedLogout = async (req: Request, res: Response) => {
  const shopId = getShopIdFromRequest(req, res);
  const host = getHostUrlFromRequest(req);
  const { accessToken } = req.session;

  const callbackOptions = {
    accessToken,
    callback: `${host}${AUTH_ROUTES.logoutSuccessCallback}`,
  };
  const url = buildEmbeddedLogoutUrl(false, shopId, callbackOptions);
  res.redirect(url);
};

const handleLogoutSuccessCallback = (req: Request, res: Response) => {
  setDefaultSignedCookie(res);
  res.redirect('/');
};

export function addAuthApi(app: Application) {
  app.get(AUTH_ROUTES.authMeUrl, authenticate);
  app.get(AUTH_ROUTES.embeddedLoginUrl, handleRedirectToEmbeddedForm('login'));
  app.get(AUTH_ROUTES.embeddedRegistrationUrl, handleRedirectToEmbeddedForm('registration'));
  app.get(AUTH_ROUTES.embeddedLogoutUrl, handleRedirectToEmbeddedLogout);
  app.get(AUTH_ROUTES.loginSuccessCallback, handleLoginSuccessCallback);
  app.get(AUTH_ROUTES.logoutSuccessCallback, handleLogoutSuccessCallback);
}

export async function mergeUserBaskets(guestBasketKey: string, customerId: number, shopId: number) {
  const basketKey = createBasketKey(customerId);
  await mergeBaskets(shopId, guestBasketKey, basketKey);
}

export async function mergeUserWishlists(guestWishlistKey: string, customerId: number, shopId: number): Promise<void> {
  const basketKey = createWishlistKey(customerId);
  await mergeWishlists(guestWishlistKey, basketKey, shopId);
}
