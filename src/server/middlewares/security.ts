import { Application } from 'express';
import { environment } from '../../environments/environment';
const expressEnforcesSSL = require('express-enforces-ssl');

export function addSecurityMiddleware(app: Application) {
  const useHttps = environment.productionModeEnabled;
  if (useHttps) {
    app.use(expressEnforcesSSL());
  }
}
