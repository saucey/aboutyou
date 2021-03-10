import { Application } from 'express';
import * as jsonServer from 'json-server';
import { join } from 'path';
import { panelMock } from '../../tests/mocks/panel.mock';

export function addPanelMiddleware(application: Application) {
  const content = panelMock();
  const panelRoutes = Object.keys(content).map(route => `/api/panel/${route}*`);

  const router = jsonServer.router(content);
  const middlewares = jsonServer.defaults({ static: join(__dirname, './content') });

  application.get(panelRoutes, middlewares);
  application.get(panelRoutes, jsonServer.bodyParser);
  application.use('/api/panel', router);
}
