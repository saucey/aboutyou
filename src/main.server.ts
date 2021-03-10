import { enableProdMode } from '@angular/core';
import { environment } from './environments/environment';

if (environment.productionModeEnabled) {
  enableProdMode();
}
export { environment } from './environments/environment';
export { ngExpressEngine } from '@nguniversal/express-engine';
export { provideModuleMap } from '@nguniversal/module-map-ngfactory-loader';
export { EXPRESS_REQUEST } from './app/core/services/request-middleware.service';
export { addBasketApi } from './server/bapi/basket/basket-api';
export { addWishlistApi } from './server/bapi/wishlist/wishlist-api';
export { addAccountApi } from './server/checkout/account-api';
export { addAuthApi } from './server/checkout/auth-api';
export { addCheckoutApi } from './server/checkout/checkout-api';
export { addOrdersApi } from './server/checkout/orders-api';
export { addAvaliableStoresApi } from './server/clickAndReserve/availabilities-api';
export { addInvoiceApi } from './server/clickAndReserve/invoice-api';
export { addReservationsApi } from './server/clickAndReserve/reservations-api';
export { addCrossengageApi } from './server/crossengage/crossengage-api';
export { addAuthMiddleware } from './server/middlewares/auth';
export { addBapiProxyMiddleware } from './server/middlewares/bapi-proxy';
export { addContentMiddleware } from './server/middlewares/content-mock';
export { addCookieMiddleware } from './server/middlewares/cookie';
export { addCorsMiddleware } from './server/middlewares/cors';
export { addHelmetMiddleware } from './server/middlewares/helmet';
export { addLocaleMiddleware } from './server/middlewares/locale';
export { addPanelMiddleware } from './server/middlewares/panel-mock';
export { addSecurityMiddleware } from './server/middlewares/security';
export { addSeoRoutes } from './server/middlewares/seo';
export { addReservationBasketApi } from './server/reservation-basket/reservation-basket-api';
