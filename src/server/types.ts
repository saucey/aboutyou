import { Request as ExpressRequest } from 'express';
import * as core from 'express-serve-static-core';

export interface SessionPayloadType {
  guestBasketKey?: string;
  guestWishlistKey?: string;
  accessToken?: string;
}

export interface Request<P extends core.Params = core.ParamsDictionary, ResBody = any, ReqBody = any>
  extends core.Request<P, ResBody, ReqBody> {
  session?: SessionPayloadType;
}

export interface AYUser {
  createdAt: string;
  firstName: string;
  lastName: string;
  gender: 'f' | 'm';
  birthDate: string;
  id: number;
  email: string;
  phone: string;
  status: { isActive: boolean; isGuestCustomer: boolean; isTestCustomer: boolean };
  updatedAt: string;
  orderSummary: {
    confirmedAt: string;
    id: number;
    itemCount: number;
    shopId: number;
    status: string;
  };
}
