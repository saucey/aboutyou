import { Observable } from 'rxjs/Observable';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ShopService } from './shop.service';

@Injectable()
export class AddShopIdToRequestInterceptor implements HttpInterceptor {
  shopId: string;
  constructor(shopService: ShopService) {
    this.shopId = shopService.getShopId().toString();
  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    /**
     * add shopId to all `/api` requests
     */
    if (request.url.includes('/api/')) {
      request = request.clone({
        setParams: { shopId: this.shopId },
      });
    }
    return next.handle(request);
  }
}
