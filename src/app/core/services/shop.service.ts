import { Injectable } from '@angular/core';
import { CONFIG } from 'src/app/configs';
import { determineShop, IFoundShop } from '../shop/utils';
import { RequestMiddlewareService } from './request-middleware.service';
import { CONSTANTS } from '../shop/constants';

@Injectable({ providedIn: 'root' })
export class ShopService {
  foundShopConfig: IFoundShop;
  constructor(private requestMiddlewareService: RequestMiddlewareService) {}

  getShop() {
    if (this.foundShopConfig) {
      return this.foundShopConfig;
    }
    const url = this.requestMiddlewareService.getCurrentFullUrl();
    const cachedLanguage = this.requestMiddlewareService.getCookie(CONSTANTS.cookie.language);
    const browserLang = this.requestMiddlewareService.getBrowserLanguage();
    this.foundShopConfig = determineShop(CONFIG.shop.locale, url, browserLang, cachedLanguage);

    console.log('Request details', {
      url,
      cachedLanguage,
      browserLang,
      shopId: this.foundShopConfig.shop.shopId,
    });
    return this.foundShopConfig;
  }

  getShopId() {
    return this.getShop().shop.shopId;
  }
}
