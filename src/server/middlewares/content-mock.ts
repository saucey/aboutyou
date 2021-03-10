import { Application } from 'express';
import * as jsonServer from 'json-server';
import { join } from 'path';
import { contentMock } from '../../tests/mocks/content.mock';

export function addContentMiddleware(application: Application) {
  const content = contentMock();
  const contentRoutes = Object.keys(content).map(route => `/api/content/${route}*`);

  const router = jsonServer.router(content);
  const middlewares = jsonServer.defaults({ static: join(__dirname, './content') });

  application.get(contentRoutes, middlewares);
  application.get(contentRoutes, jsonServer.bodyParser);
  application.use('/api/content', router);
}
