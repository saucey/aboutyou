import { Application } from 'express';
const cors = require('cors');

export function addCorsMiddleware(app: Application) {
  app.use(cors({ credentials: true }));
}
