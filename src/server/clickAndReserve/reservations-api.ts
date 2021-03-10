import { getClickAndReserveHostUrl } from '../../app/core/services/resolveEnvs';
import { Application, Response } from 'express';
import { Request } from '../types';
import { getShopIdFromRequest, fetchAYUser } from '../utils';
import { clickAndReserveHeader } from './utils';
import fetch from 'node-fetch';
import * as bodyParser from 'body-parser';

const getAllReservations = async (req: Request, res: Response) => {
  const { accessToken } = req.session;
  if (!accessToken) {
    return res.sendStatus(401);
  }
  const shopId = getShopIdFromRequest(req, res);
  const AYUser = await fetchAYUser(accessToken, shopId);
  const customerId = AYUser.id;

  const reservationUrl = `${getClickAndReserveHostUrl()}/reservation-orders/${customerId}`;

  await fetch(reservationUrl, {
    method: 'GET',
    headers: clickAndReserveHeader,
  })
    .then(response => response.json())
    .then(data => {
      res.send(data);
    })
    .catch(error => {
      throw new Error(`User could not be loaded: ${error}`);
    });
};

const getReservation = async (req: Request, res: Response) => {
  const reservationId = req.params.reservationId;
  const reservationUrl = `${getClickAndReserveHostUrl()}/reservation-order/${reservationId}`;

  await fetch(reservationUrl, {
    method: 'GET',
    headers: clickAndReserveHeader,
  })
    .then(response => response.json())
    .then(data => {
      res.send(data);
    })
    .catch(error => {
      throw new Error(`Reservations could not be loaded: ${error}`);
    });
};

const postReservations = async (req: Request, res: Response) => {
  const reservationUrl = `${getClickAndReserveHostUrl()}/reservation-orders`;
  const payload = req.body;

  await fetch(reservationUrl, {
    method: 'POST',
    headers: clickAndReserveHeader,
    body: JSON.stringify(payload),
  })
    .then(response => response.json())
    .then(data => {
      res.send(data);
    })
    .catch(error => {
      throw new Error(`Reservation could not be made: ${JSON.stringify(error, null, 2)}`);
    });
};

export function addReservationsApi(app: Application) {
  // tslint:disable-next-line
  const jsonParser = bodyParser.json();

  app.get('/api/reservations', getAllReservations);
  app.post('/api/reservation-orders', jsonParser, postReservations);
  app.get('/api/reservation/:reservationId', getReservation);
}
