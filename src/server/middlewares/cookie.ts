import { Application } from 'express';
const cookieParser = require('cookie-parser');

export function addCookieMiddleware(app: Application) {
  app.use(cookieParser());
}
