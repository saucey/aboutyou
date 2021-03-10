import { Application } from 'express';
const helmet = require('helmet');

export function addHelmetMiddleware(app: Application) {
  app.use(helmet());
}
