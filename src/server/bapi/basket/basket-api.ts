import { BasketResponse } from '@aboutyou/backbone/helpers/BapiClient';
import * as bodyParser from 'body-parser';
import { Application, Response } from 'express';
import { dissocPath } from 'ramda';
import { Request } from '../../types';
import { BASKET_REQUEST, findItemWithVariantId, getBapiClient, getBapiClientByShopId, getBasketKey } from '../utils';

export function sendSuccessResponse(res: Response, basketResponse: BasketResponse) {
  res.send(dissocPath(['basket', 'key'])(basketResponse));
}

export async function getBasket(req: Request, res: Response) {
  let basketResponse: BasketResponse;
  try {
    const bapiClient = getBapiClient(req, res);
    const basketKey = await getBasketKey(req, res);
    basketResponse = await bapiClient.basket.get(basketKey, BASKET_REQUEST);
    return sendSuccessResponse(res, basketResponse);
  } catch (error) {
    console.log('error getting basket', { error, basketResponse });
    return sendSuccessResponse(res, basketResponse);
  }
}

export async function addOrUpdateItem(req: Request, res: Response) {
  const bapiClient = getBapiClient(req, res);
  const basketKey = await getBasketKey(req, res);
  const variantId = req.body.variantId;
  const quantity = req.body.quantity;
  const customData = req.body.customData;
  const basketResponse = await bapiClient.basket.get(basketKey, BASKET_REQUEST);
  const currentItem = findItemWithVariantId(basketResponse, variantId);

  if (currentItem) {
    const updateItemResponse = await bapiClient.basket.updateItem(
      basketKey,
      currentItem.key,
      currentItem.quantity + quantity,
      BASKET_REQUEST,
    );
    return sendSuccessResponse(res, updateItemResponse);
  } else {
    const addItemResponse = await bapiClient.basket.addItem(basketKey, variantId, quantity, {
      ...BASKET_REQUEST,
      customData,
    });
    return sendSuccessResponse(res, addItemResponse);
  }
}

export async function updateItem(req: Request, res: Response) {
  const bapiClient = getBapiClient(req, res);
  const basketKey = await getBasketKey(req, res);
  const variantId = req.body.variantId;
  const quantity = req.body.quantity;
  const basketResponse = await bapiClient.basket.get(basketKey, BASKET_REQUEST);
  const currentItem = findItemWithVariantId(basketResponse, variantId);
  const response = await bapiClient.basket.updateItem(basketKey, currentItem.key, quantity, BASKET_REQUEST);
  return sendSuccessResponse(res, response);
}

export async function deleteItem(req: Request, res: Response): Promise<Response | void> {
  const bapiClient = getBapiClient(req, res);
  const basketKey = await getBasketKey(req, res);
  const variantId = req.params.variantId;
  const basketResponse = await bapiClient.basket.get(basketKey, BASKET_REQUEST);
  const currentItem = findItemWithVariantId(basketResponse, Number(variantId));
  if (currentItem) {
    await bapiClient.basket.deleteItem(basketKey, currentItem.key);
    const response = await bapiClient.basket.get(basketKey, BASKET_REQUEST);
    return sendSuccessResponse(res, response);
  } else {
    return res.sendStatus(403);
  }
}

export async function mergeBaskets(shopId: number, fromBasketKey: string, toBasketKey: string): Promise<void> {
  if (!fromBasketKey) {
    return;
  }
  const bapiClient = getBapiClientByShopId(shopId);
  const oldBasket = await bapiClient.basket.get(fromBasketKey);
  const newBasket = await bapiClient.basket.get(toBasketKey);
  if (oldBasket.type === 'success') {
    for (const item of oldBasket.basket.items) {
      const currentItem = findItemWithVariantId(newBasket, item.variant.id);
      if (currentItem) {
        await bapiClient.basket.updateItem(toBasketKey, currentItem.key, item.quantity);
      } else {
        await bapiClient.basket.addItem(toBasketKey, item.variant.id, item.quantity);
      }
    }
  }
}

export function addBasketApi(app: Application): void {
  // tslint:disable-next-line
  const jsonParser = bodyParser.json();
  const route = '/api/basket';

  app.get(route, getBasket);
  app.post(route, jsonParser, addOrUpdateItem);
  app.put(route, jsonParser, updateItem);
  app.delete(route + '/:variantId', deleteItem);
}
