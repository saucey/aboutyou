import { Application, Response } from 'express';
import { Request } from '../types';
import { getShopIdFromRequest, fetchAYUser } from '../utils';
import { getCheckoutHostUrl } from '../../app/core/services/resolveEnvs';
import fetch from 'node-fetch';

const getAllOrders = async (req: Request, res: Response) => {
  const { accessToken } = req.session;
  if (!accessToken) {
    return res.sendStatus(401);
  }
  const shopId = getShopIdFromRequest(req, res);
  const AYUser = await fetchAYUser(accessToken, shopId);
  res.send(AYUser.orderSummary);
};

const getOrder = async (req: Request, res: Response) => {
  const { accessToken } = req.session;
  if (!accessToken) {
    return res.sendStatus(401);
  }
  const shopId = getShopIdFromRequest(req, res);
  const checkoutUrl = getCheckoutHostUrl(shopId, false);
  const userDataUrl = `${checkoutUrl}/api/customer/order/${req.params.id}`;

  const orderResponse = await fetch(userDataUrl, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${accessToken}`,
    },
  });
  if (orderResponse.status === 200) {
    res.send(await orderResponse.json());
  } else {
    throw new Error(`The user could not be loaded: ${JSON.stringify(orderResponse, null, 2)}`);
  }
};

export function addOrdersApi(app: Application) {
  app.get('/api/orders', getAllOrders);
  app.get('/api/order/:id', getOrder);
}
