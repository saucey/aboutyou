import { environment } from '../../../environments/environment';
import { AUTH_ROUTES } from '../../../server/constants';

export const getBapiProxyUrl = () => {
  return `/api/bapi/`;
};

export const getBapiConnectionUrl = () => {
  const bapiUrl = environment.bapiConnectionUrl;
  if (!bapiUrl) {
    throw new Error('Bapi connection not set in the envs');
  }
  return bapiUrl;
};

export const getBapiCdnUrl = () => {
  const bapiCdnUrl = environment.imageCdn;
  if (!bapiCdnUrl) {
    throw new Error('Image cdn url not set in the environment.ts');
  }
  return bapiCdnUrl;
};

export const getBapiAuth = () => {
  const username = process.env.BAPI_USERNAME;
  const password = process.env.BAPI_PASSWORD;
  if (!username || !password) {
    throw new Error('BAPI CREDENTIALS NOT FOUND');
  }
  return {
    username,
    password,
  };
};

export const locationAvailabilityUrl = () => {
  return `/api/availabilities`;
};

export const getContentUrl = () => {
  return `/api/content`;
};

export const getPanelUrl = () => {
  return `/api/panel`;
};

export const getBasketUrl: () => string = () => {
  return `/api/basket`;
};

export const getWishlistUrl = () => {
  return `/api/wishlist`;
};

export const getCheckoutHandoverUrl = () => {
  return `/api/checkout`;
};

export const getEmbeddedLoginUrl = () => {
  return `${AUTH_ROUTES.embeddedLoginUrl}`;
};

export const getEmbeddedRegistrationUrl = () => {
  return `${AUTH_ROUTES.embeddedRegistrationUrl}`;
};

export const getAuthenticationUrl = () => {
  return `${AUTH_ROUTES.authMeUrl}`;
};

export const getCheckoutHostUrl = (id: number, isMobile: boolean) => {
  const checkoutHost = environment.checkoutHostUrl;
  try {
    if (typeof checkoutHost === 'string') {
      return checkoutHost;
    }
    return checkoutHost.find(({ shopId }) => shopId === id).hosts[isMobile ? 'mobile' : 'desktop'];
  } catch (error) {
    return '';
  }
};

export const getClickAndReserveHostUrl = () => {
  const clickAndReserveHost = environment.clickAndReserveHostUrl;
  return `${clickAndReserveHost}/api`;
};

export const getEmbeddedLogoutUrl = () => {
  return `${AUTH_ROUTES.embeddedLogoutUrl}`;
};

export const getLogoutSuccessUrl = () => {
  return `${AUTH_ROUTES.logoutSuccessCallback}`;
};

export const getAllOrdersUrl = () => {
  return `/api/orders`;
};

export const getOrderByIdUrl = () => {
  return `/api/order`;
};

export const getOrderInvoiceUrl = () => {
  return `/api/order/invoice`;
};

export const getAllReservationsUrl = () => {
  return `/api/reservations`;
};

export const getReservationByIdUrl = () => {
  return `/api/reservation`;
};

export const getCustomerContactUrl: () => string = () => {
  return `/api/customer/contact`;
};

export const getCustomerPersonalUrl: () => string = () => {
  return `/api/customer/personal`;
};
