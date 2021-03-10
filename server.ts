import 'zone.js/dist/zone-node';
import * as express from 'express';
import { join } from 'path';
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
    addCorsMiddleware,
    addAuthMiddleware,
    addHelmetMiddleware,
    addBapiProxyMiddleware,
    addContentMiddleware,
    addLocaleMiddleware,
    addCookieMiddleware,
    addPanelMiddleware,
    addBasketApi,
    addWishlistApi,
    addReservationBasketApi,
    addAccountApi,
    addCheckoutApi,
    addSeoRoutes,
    addAuthApi,
    addReservationsApi,
    addAvaliableStoresApi,
    addInvoiceApi,
    addCrossengageApi,
    addOrdersApi,
    environment,
  } = require('./src/main.server');

  // Our Universal express-engine (found @ https://github.com/angular/universal/tree/master/modules/express-engine)
  // server.engine('html', (_, options: Request, callback) => {
  //   const engine = ngExpressEngine({
  //     bootstrap: AppServerModuleNgFactory,
  //     providers: [
  //       // tslint:disable-next-line: no-string-literal
  //       { provide: EXPRESS_REQUEST, useFactory: () => options['req'], deps: [] },
  //       provideModuleMap(LAZY_MODULE_MAP),
  //     ],
  //   });
  //   engine(_, options, callback);
  // });

  // server.set('view engine', 'html');
  // server.set('views', DIST_FOLDER);

  // Example Express Rest API endpoints
  // server.get('/api/**', (req, res) => { });

  addSeoRoutes(server, DIST_FOLDER);

  if (environment.productionModeEnabled) {
    server.set('trust proxy', true);
  }

  // Serve static files from /browser
  server.get(
    '*.*',
    express.static(DIST_FOLDER, {
      maxAge: '1w',
    }),
  );

  // Express middlewares
  // WARNING: If you like to make changes here consider the correct order
  addHelmetMiddleware(server);
  addCorsMiddleware(server);
  addCookieMiddleware(server);
  // security middleware does not work on AWS.
  // Calls to http and https are rejected with TOO_MANY_REDIRECTS error. Maybe internally everything is http only.
  // addSecurityMiddleware(server);
  addAuthMiddleware(server);
  addBapiProxyMiddleware(server);
  addContentMiddleware(server);
  addPanelMiddleware(server);
  addLocaleMiddleware(server);
  addBasketApi(server);
  addReservationBasketApi(server);
  addWishlistApi(server);
  addAccountApi(server);
  addCheckoutApi(server);
  addAuthApi(server);
  addOrdersApi(server);
  addAvaliableStoresApi(server);
  addReservationsApi(server);
  addInvoiceApi(server);
  addCrossengageApi(server);

  // All regular routes use the Universal engine
  /*    server.get('*', (req, res) => {
    res.render('index', { req, providers: [{ provide: APP_BASE_HREF, useValue: req.baseUrl }] });
  });*/

  // handle every other route with index.html, which will contain
  // a script tag to your application's JavaScript file(s).
  server.get('*', (request, response) => response.sendFile(join(DIST_FOLDER, '/index.html')));

  return server;
}

function run() {
  const PORT = process.env.PORT || 3000;

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
