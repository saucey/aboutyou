import { Base64 } from 'js-base64';
import { getCheckoutHostUrl } from '../../app/core/services/resolveEnvs';
import { environment } from '../../environments/environment';
import { Request } from '../types';
import { sign } from '../utils';

export function serializePayload(data: any, shopId: number): string {
  const payload = JSON.stringify(data);
  const payloadBase64 = Base64.encode(payload);

  const signature = sign(payloadBase64, shopId);
  const signatureBase64 = Base64.encode(signature);
  return `${payloadBase64}.${signatureBase64}`;
}

export function buildCheckoutUrl(
  isMobile: boolean,
  shopId: number,
  path: string,
  options: { [index: string]: any } = {},
) {
  const baseUrl = getCheckoutHostUrl(shopId, isMobile);
  const payload = serializePayload(options, shopId);
  return `${baseUrl}${path}${payload}`;
}

export function buildOrderUrl(isMobile: boolean, shopId: number, basketId: string, customData: object) {
  return buildCheckoutUrl(isMobile, shopId, '/order/data?options=', {
    basketId,
    customData,
  });
}

export function buildEmbeddedLoginUrl(isMobile: boolean, shopId: number, callbackOptions: object) {
  return buildCheckoutUrl(isMobile, shopId, '/embedded/account/login?auth=', callbackOptions);
}

export function buildEmbeddedRegistrationUrl(isMobile: boolean, shopId: number, callbackOptions: object) {
  return buildCheckoutUrl(isMobile, shopId, '/embedded/account/registration?auth=', callbackOptions);
}

export function buildEmbeddedLogoutUrl(isMobile: boolean, shopId: number, callbackOptions: object) {
  return buildCheckoutUrl(isMobile, shopId, '/embedded/logout?auth=', callbackOptions);
}

export function getHostUrlFromRequest(req: Request): string | null {
  try {
    const protocol = environment.productionModeEnabled ? 'https' : 'http';

    const referer = req.headers.referer;
    if (referer) {
      const path = referer.split('//')[1]; // referer always include the protocol. eg: http://localhost || https://brand.com
      return `${protocol}://${path.split('/')[0]}`;
    }

    const host = req.headers.host;
    return `${protocol}://${host}`;
  } catch (error) {
    return null;
  }
}
