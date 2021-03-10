import { Application, NextFunction, Request, Response } from 'express';
import { CONSTANTS } from '../../app/core/shop/constants';
import { SessionPayloadType } from '../types';
import { getDefaultCookieOptions } from '../utils';
const jwtMiddleware = require('express-jwt');
const jwt = require('jsonwebtoken');
const uuid = require('nanoid');

const jwtSecret = process.env.JWT_SECRET;
const SESSION_COOKIE_NAME = CONSTANTS.cookie.sessionId;

function setJWT(req: Request, res: Response, next: NextFunction) {
  if (req.method === 'OPTIONS') {
    return next();
  }

  if (!req.cookies) {
    req.cookies = {};
  }

  const sessionCookie = req.cookies[SESSION_COOKIE_NAME];

  if (!sessionCookie) {
    const guestBasketKey = uuid();
    const guestWishlistKey = uuid();
    const session: SessionPayloadType = { guestBasketKey, guestWishlistKey };
    const token: string = jwt.sign(session, jwtSecret);

    req.cookies[SESSION_COOKIE_NAME] = token;
    res.cookie(SESSION_COOKIE_NAME, token, getDefaultCookieOptions());
  }

  next();
}

function validateJWT(requireJWT: boolean) {
  if (!jwtSecret) {
    throw new Error('jwtSecret not set.');
  }
  return jwtMiddleware({
    secret: jwtSecret,
    requestProperty: 'session',
    credentialsRequired: requireJWT,
    getToken: (req: Request) => req.cookies && req.cookies[SESSION_COOKIE_NAME],
  });
}

function ignoreJWTFailures(error: Error, req: Request, res: Response, next: NextFunction) {
  if (error) {
    console.log('Authentication failed but doing nothing on path', req.url);
  }
  next();
}

export function addAuthMiddleware(app: Application) {
  app.use(setJWT, validateJWT(false), ignoreJWTFailures, setJWT);
}
