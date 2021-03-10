import 'universal-dotenv/register';
// @ts-ignore
import express from 'express';
import { addReservationBasketApi } from './server/reservation-basket/reservation-basket-api';
import { addHelmetMiddleware } from './server/middlewares/helmet';
import { addBapiProxyMiddleware } from './server/middlewares/bapi-proxy';
import { addContentMiddleware } from './server/middlewares/content-mock';
import { addPanelMiddleware } from './server/middlewares/panel-mock';
import { addAuthMiddleware } from './server/middlewares/auth';
import { addBasketApi } from './server/bapi/basket/basket-api';
import { addWishlistApi } from './server/bapi/wishlist/wishlist-api';
import { addCorsMiddleware } from './server/middlewares/cors';
import { addCookieMiddleware } from './server/middlewares/cookie';
import { addLocaleMiddleware } from './server/middlewares/locale';
import { addCheckoutApi } from './server/checkout/checkout-api';
import { addAuthApi } from './server/checkout/auth-api';
import { addOrdersApi } from './server/checkout/orders-api';
import { addAccountApi } from './server/checkout/account-api';
import { addSeoRoutes } from './server/middlewares/seo';
import { join } from 'path';
import { addReservationsApi } from './server/clickAndReserve/reservations-api';
import { addAvaliableStoresApi } from './server/clickAndReserve/availabilities-api';
import { addInvoiceApi } from './server/clickAndReserve/invoice-api';
import { addCrossengageApi } from './server/crossengage/crossengage-api';

const app = express();

const PORT = 80;
const DIST_FOLDER = join(process.cwd(), 'dist/browser');

// WARNING: If you like to make changes here consider the correct order
addHelmetMiddleware(app);
addSeoRoutes(app, DIST_FOLDER);
addCorsMiddleware(app);
addCookieMiddleware(app);
addAuthMiddleware(app);
addBapiProxyMiddleware(app);
addContentMiddleware(app);
addPanelMiddleware(app);
addLocaleMiddleware(app);
addBasketApi(app);
addReservationBasketApi(app);
addAccountApi(app);
addWishlistApi(app);
addCheckoutApi(app);
addAuthApi(app);
addOrdersApi(app);
addReservationsApi(app);
addAvaliableStoresApi(app);
addInvoiceApi(app);
addCrossengageApi(app);

// Start up the Node server
app.listen(PORT, () => {
  console.log(`Backend API server listening on http://localhost:${PORT}`);
});
