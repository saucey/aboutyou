import * as bodyParser from 'body-parser';
import { Application, Response } from 'express';
import { Request } from '../types';
import { getShopIdFromRequest } from '../utils';
import { getCheckoutHostUrl } from '../../app/core/services/resolveEnvs';
import fetch from 'node-fetch';

async function updateCustomer(req: Request, res: Response) {
  const { accessToken } = req.session;
  if (!accessToken) {
    return res.sendStatus(401);
  }
  const shopId = getShopIdFromRequest(req, res);
  const checkoutUrl = getCheckoutHostUrl(shopId, false);
  const userDataUrl = `${checkoutUrl}${req.route.path}`;

  await fetch(userDataUrl, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${accessToken}`,
    },
    body: JSON.stringify(req.body),
  })
    .then(response => response.json())
    .then(data => res.send(data))
    .catch(error => {
      throw new Error(`Error with account settings: ${error}`);
    });
}

export function addAccountApi(app: Application) {
  // tslint:disable-next-line
  const jsonParser = bodyParser.json();

  app.patch('/api/customer/contact', jsonParser, updateCustomer);
  app.patch('/api/customer/personal', jsonParser, updateCustomer);
}
