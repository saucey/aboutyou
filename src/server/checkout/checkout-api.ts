import { Application, Request, Response } from 'express';
import { getBasketKey } from '../bapi/utils';
import { buildOrderUrl } from './utils';
import { getShopIdFromRequest } from '../utils';
const yn = require('yn');

const checkoutRedirectHandler = async (req: Request, res: Response) => {
  const { isMobile } = req.query;
  const shopId = getShopIdFromRequest(req, res);
  const basketId = await getBasketKey(req, res);

  try {
    const url = buildOrderUrl(yn(isMobile), shopId, basketId, {});
    res.redirect(url);
  } catch (error) {
    res.redirect('/basket');
  }
};

export function addCheckoutApi(app: Application) {
  app.get('/api/checkout', checkoutRedirectHandler);
}
