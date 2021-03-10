import { BapiClient } from '@aboutyou/backbone';
import { Injectable } from '@angular/core';
import { AxiosAdapterService } from '../axios-adapter.service';
import { ShopService } from '../shop.service';
import { CookieService } from 'ngx-cookie-service';
import { CONSTANTS } from 'src/app/core/shop/constants';
import { getBapiProxyUrl } from '../resolveEnvs';

@Injectable({
  providedIn: 'root',
})
export class BapiClientService {
  public bapiClient: BapiClient;
  constructor(
    private readonly axiosAdapter: AxiosAdapterService,
    private shopService: ShopService,
    private cookieService: CookieService,
  ) {
    const shopId = this.shopService.getShopId();

    this.bapiClient = new BapiClient({
      host: getBapiProxyUrl(),
      shopId,
      axiosAdapter: this.axiosAdapter.adapter,
      shopIdPlacement: 'query',
    });
    const tenDays = new Date(new Date().getTime() + 10 * 24 * 60 * 60 * 1000);
    this.cookieService.set(CONSTANTS.cookie.shopId, shopId.toString(), tenDays, '/');
  }
}
