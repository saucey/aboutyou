import { Application, Request, Response } from 'express';
import { getClickAndReserveHostUrl } from '../../app/core/services/resolveEnvs';
import fetch from 'node-fetch';
import { MIDDLEWARE_ROUTES } from '../constants';
import * as bodyParser from 'body-parser';
import { clickAndReserveHeader } from '../utils';
import * as moment from 'moment';
const sha256 = require('crypto-js/sha256');

const getSubscriptions = async (req: Request, res: Response) => {
  const middlewareUrl = getClickAndReserveHostUrl();
  const emailHash = sha256(req.params.email);
  const subscriptionsUrl = `${middlewareUrl}${MIDDLEWARE_ROUTES.subscriptions}?emailHash=${emailHash}`;

  await fetch(subscriptionsUrl, {
    method: 'GET',
    headers: clickAndReserveHeader,
  })
    .then(response => response.json())
    .then(data => res.send(data))
    .catch(error => res.send(error));
};

const postSubscriptions = async (req: Request, res: Response) => {
  const middlewareUrl = getClickAndReserveHostUrl();
  const subscriptionsUrl = `${middlewareUrl}${MIDDLEWARE_ROUTES.subscriptions}`;
<<<<<<< HEAD
=======
  const myMoment: moment.Moment = moment(new Date());
>>>>>>> develop

  const payload = {
    locale: {
      countryCode: 'DEU',
      languageCode: req.headers['accept-language'].substring(0, 5),
    },
    occurredAt: `${myMoment.format()}`,
    payload: {
      customer: {
        ...(req.body.birthDate && { birthDate: req.body.birthDate.substring(0, 10) }),
        email: req.body.email,
        ...(req.body.firstName && { firstName: req.body.firstName }),
        ...(req.body.lastName && { lastName: req.body.lastName }),
        ...(req.body.gender && { gender: req.body.gender }),
      },
      ...(req.body.source && { source: req.body.source }),
    },
  };

  await fetch(subscriptionsUrl, {
    method: 'POST',
    headers: clickAndReserveHeader,
    body: JSON.stringify(payload),
  })
    .then(response => response.json())
    .then(data => res.send(data))
    .catch(error => res.send(error));
};

export function addCrossengageApi(app: Application) {
  // tslint:disable-next-line
  const jsonParser = bodyParser.json();

  app.get('/api/subscriptions/:email', getSubscriptions);
  app.post('/api/subscriptions', jsonParser, postSubscriptions);
}
