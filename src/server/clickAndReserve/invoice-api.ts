import axios from 'axios';
import { Application, Response } from 'express';

import { getClickAndReserveHostUrl } from '../../app/core/services/resolveEnvs';
import { Request } from '../types';
import { fetchAYUser, getShopIdFromRequest } from '../utils';
import { clickAndReserveHeader } from './utils';

const getInvoice = async (req: Request, res: Response) => {
  const { accessToken } = req.session;
  if (!accessToken) {
    return res.sendStatus(401);
  }
  const shopId = getShopIdFromRequest(req, res);
  const aYUser = await fetchAYUser(accessToken, shopId);

  const orderId = req.params.orderId;
  const customerId = aYUser.id;
  const invoiceUrl = `${getClickAndReserveHostUrl()}/invoice`;

  const payload = [
    {
      customerId,
      orderId,
    },
  ];

  axios
    .get(invoiceUrl, {
      headers: clickAndReserveHeader,
      data: JSON.stringify(payload),
    })
    .then(response => {
      res.send(response.data);
    })
    .catch(error => {
      console.error('Invoice URL generation error: ', error.message);
      res.status(error.response.status).send(error.message);
    });
};

export function addInvoiceApi(app: Application) {
  const routeInvoice = '/api/order/invoice';
  app.get(routeInvoice + '/:orderId', getInvoice);
}
