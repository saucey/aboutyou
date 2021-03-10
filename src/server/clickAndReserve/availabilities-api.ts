import { getClickAndReserveHostUrl } from '../../app/core/services/resolveEnvs';
import { Application, Response } from 'express';
import { Request } from '../types';
import { clickAndReserveHeader } from './utils';
import { FETCH_AVALIABLE_STORES_MOCK } from './avaliabilities.mock';
import fetch from 'node-fetch';

export const fetchAvailableStoresMock = async () => FETCH_AVALIABLE_STORES_MOCK;
const getAvailableStoresMocks = async (req: Request, res: Response) => {
  const { productId, zipCode, distance } = req.params;

  try {
    const subscription = await fetchAvailableStoresMock();
    return res.send(subscription);
  } catch (e) {
    res.send({
      error: e,
    });
  }
};

const getDataCount = (data, amount) => {
  return data.slice(0, amount);
};

const getAvailableStores = async (req: Request, res: Response) => {
  const { productId, zipCode, distance } = req.params;

  fetchAvailableStoresApi(productId, zipCode, distance)
    .then(resp => res.send(resp))
    .catch(err => res.status(400).send({ errorData: err, error: true }));
};

const fetchAvailableStoresApi = async (productId, zipCode, distance) => {
  const availabilitiesUrl = `${getClickAndReserveHostUrl()}/availabilities/${productId}?zip=${zipCode}&distance=${distance}`;
  const response = await fetch(availabilitiesUrl, {
    method: 'GET',
    headers: clickAndReserveHeader,
  });

  try {
    const data = await response.json();
    if (data.length === 0 && Number(distance) < 100) {
      return fetchAvailableStoresApi(productId, zipCode, '100');
    }
    const locatedStores = distance === '100' ? getDataCount(data, 10) : getDataCount(data, 15);
    return locatedStores;
  } catch (err) {
    throw new Error(err);
  }
};

export function addAvaliableStoresApi(app: Application) {
  app.get('/api/availabilities/:productId/:zipCode/:distance', getAvailableStores);
  app.get('/api/availabilitiesMock/:productId/:zipCode/:distance', getAvailableStoresMocks);
}
