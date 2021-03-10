import { Application } from 'express';
const i18next = require('i18next');
const middleware = require('i18next-express-middleware');
const Backend = require('i18next-node-fs-backend');

export function addLocaleMiddleware(app: Application) {
  i18next.use(Backend);
  i18next.use(middleware.LanguageDetector).init({
    detection: {
      // order and from where user language should be detected
      order: ['header'],
      // keys or params to lookup language from
      lookupHeader: 'accept-language',
      caches: false,
    },
  });
  app.use(middleware.handle(i18next));
}
