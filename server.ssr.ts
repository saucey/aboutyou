/**
 * *** NOTE ON IMPORTING FROM ANGULAR AND NGUNIVERSAL IN THIS FILE ***
 *
 * If your application uses third-party dependencies, you'll need to
 * either use Webpack or the Angular CLI's `bundleDependencies` feature
 * in order to adequately package them for use on the server without a
 * node_modules directory.
 *
 * However, due to the nature of the CLI's `bundleDependencies`, importing
 * Angular in this file will create a different instance of Angular than
 * the version in the compiled application code. This leads to unavoidable
 * conflicts. Therefore, please do not explicitly import from @angular or
 * @nguniversal in this file. You can export any needed resources
 * from your application's main.server.ts file, as seen below with the
 * import for `ngExpressEngine`.
 */

import 'zone.js/dist/zone-node';
import * as express from 'express';
import { join } from 'path';
import { APP_BASE_HREF } from '@angular/common';
import 'universal-dotenv/register';

/**
 * This polyfills node with additional locales
 */
if (global.Intl) {
  const IntlPolyfill = require('intl');
  Intl.NumberFormat = IntlPolyfill.NumberFormat;
} else {
  global.Intl = require('intl');
}

// Express app
function app() {
  const server = express();
  const DIST_FOLDER = join(process.cwd(), 'dist/browser');

  // * NOTE :: leave this as require() since this file is built Dynamically from webpack
  const {
    AppServerModuleNgFactory,
    LAZY_MODULE_MAP,
    ngExpressEngine,
    provideModuleMap,
    addCorsMiddleware,
    addAuthMiddleware,
    addBapiProxyMiddleware,
    addContentMiddleware,
    addLocaleMiddleware,
    addCookieMiddleware,
    addPanelMiddleware,
    addBasketApi,
    addSecurityMiddleware,
    addCheckoutApi,
    addAuthApi,
    addReservationsApi,
    addInvoiceApi,
    addOrdersApi,
    EXPRESS_REQUEST,
  } = require('./dist/server/main');

  // Our Universal express-engine (found @ https://github.com/angular/universal/tree/master/modules/express-engine)
  server.engine('html', (_, options: Request, callback) => {
    const engine = ngExpressEngine({
      bootstrap: AppServerModuleNgFactory,
      providers: [
        // tslint:disable-next-line: no-string-literal
        { provide: EXPRESS_REQUEST, useFactory: () => options['req'], deps: [] },
        provideModuleMap(LAZY_MODULE_MAP),
      ],
    });
    engine(_, options, callback);
  });

  server.set('view engine', 'html');
  server.set('views', DIST_FOLDER);

  // Example Express Rest API endpoints
  // server.get('/api/**', (req, res) => { });

  // Serve static files from /browser
  server.get(
    '*.*',
    express.static(DIST_FOLDER, {
      maxAge: '1y',
    }),
  );

  // Express middlewares
  // WARNING: If you like to make changes here consider the correct order
  addCorsMiddleware(server);
  addCookieMiddleware(server);
  // addSecurityMiddleware(server);
  addAuthMiddleware(server);
  addBapiProxyMiddleware(server);
  addContentMiddleware(server);
  addPanelMiddleware(server);
  addLocaleMiddleware(server);
  addBasketApi(server);
  addCheckoutApi(server);
  addAuthApi(server);
  addOrdersApi(server);
  addReservationsApi(server);
  addInvoiceApi(server);

  // All regular routes use the Universal engine
  server.get('*', (req, res) => {
    res.render('index', { req, providers: [{ provide: APP_BASE_HREF, useValue: req.baseUrl }] });
  });

  return server;
}

function run() {
  const PORT = process.env.PORT || 80;

  // Start up the Node server
  const server = app();
  server.listen(PORT, () => {
    console.log(`Node Express server listening on PORT: ${PORT}`);
  });
  process.on('uncaughtException', error => {
    console.log('Something unknown happened: ', error);
  });

  process.on('unhandledRejection', (error, promise) => {
    console.log('Got an unhandled promise error: ', promise);
    console.log('The error was: ', error);
  });
}

// Start the server
run();
