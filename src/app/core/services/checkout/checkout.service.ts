import { Injectable } from '@angular/core';
import { ShopService } from 'src/app/core/services/shop.service';
import { stringify } from 'query-string';
import { getCheckoutHandoverUrl, getCheckoutHostUrl } from '../resolveEnvs';

@Injectable({ providedIn: 'root' })
export class CheckoutService {
  shopId: number;
  private readonly checkoutHandoverUrl: string;

  constructor(private shopService: ShopService) {
    this.shopId = this.shopService.getShopId();
    this.checkoutHandoverUrl = getCheckoutHandoverUrl();
  }

  public basketHandoverToCheckout(isMobile: boolean) {
    const urlParams = stringify({ isMobile, shopId: this.shopId });
    window.location.href = `${this.checkoutHandoverUrl}?${urlParams}`;
  }

  public getCheckoutAccountAreaUrl = (isMobile: boolean): string => {
    return `${getCheckoutHostUrl(this.shopId, isMobile)}/account`;
  };

  public getCheckoutOrdersUrl = (isMobile: boolean): string => {
    return `${getCheckoutHostUrl(this.shopId, isMobile)}/account/orders`;
  };

  public redirectToCheckoutAccountArea = (isMobile: boolean) => {
    window.location.href = this.getCheckoutAccountAreaUrl(isMobile);
  };

  public redirectToCheckoutOrdersArea = (isMobile: boolean) => {
    window.location.href = this.getCheckoutOrdersUrl(isMobile);
  };
}
