import * as bodyParser from 'body-parser';
import { Application, Response } from 'express';
import { NextFunction } from 'express-serve-static-core';
import { sendSuccessResponse } from '../bapi/basket/basket-api';
import { getBapiClient } from '../bapi/utils';
import { AYUser, Request } from '../types';
import { fetchAYUser, getShopIdFromRequest } from '../utils';
import { AddOrUpdateParams } from './add-or-update-params';
import { ReservationBasketResponse } from './reservation-basket-response';
import { ReservationBasketService } from './reservation-basket.service';
import { ReservationStoreIdConflictError } from './reservation-store-id-conflict-error';

type AddOrUpdateRequest = Request<{ [key: string]: string }, ReservationBasketResponse, AddOrUpdateParams>;

export function addReservationBasketApi(app: Application) {
  let ayUser: AYUser;

  app
    .route('/api/reservation-basket')
    .get(resolveUser, handleGetReservationBasket)
    // tslint:disable-next-line: deprecation
    .post(bodyParser.json(), resolveUser, handleAddOrUpdateReservationBasketItem);

  async function resolveUser(req: Request, res: Response, next: NextFunction) {
    try {
      const accessToken = req.session.accessToken;

      if (!accessToken) {
        res.status(403).send('Not Authenticated');
        return;
      }

      const shopIdFromRequest = getShopIdFromRequest(req, res);

      ayUser = await fetchAYUser(accessToken, shopIdFromRequest);
      next();
    } catch (e) {
      res.status(403).send('Not Authenticated');
    }
  }

  async function handleGetReservationBasket(req: Request, res: Response) {
    const reservationBasketService = initReservationBasketService(req, res);
    const basketResponse = await reservationBasketService.getReservationBasket(ayUser.id);
    sendSuccessResponse(res, basketResponse);
  }

  async function handleAddOrUpdateReservationBasketItem(req: AddOrUpdateRequest, res: Response) {
    try {
      const reservationBasketService = initReservationBasketService(req, res);

      const addOrUpdateParams = req.body;
      const { variantId, quantity, storeId } = addOrUpdateParams;

      if (variantId == null || quantity == null || storeId == null) {
        res.status(400).send('Required body parameter is missing.');
        return;
      }

      const basketResponse = await reservationBasketService.addOrUpdateReservationBasketItem(
        addOrUpdateParams,
        ayUser.id,
      );
      sendSuccessResponse(res, basketResponse);
    } catch (e) {
      if (e instanceof ReservationStoreIdConflictError) {
        res.status(400);
      } else {
        res.status(500);
      }
      res.send(e.message);
    }
  }

  function initReservationBasketService(req: Request, res: Response) {
    const bapiClient = getBapiClient(req, res);
    return new ReservationBasketService(bapiClient);
  }
}
