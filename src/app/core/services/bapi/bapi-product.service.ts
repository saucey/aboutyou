/* istanbul ignore file: this is just a observable wrapper over already well tested BAPI SDK */

import { Injectable } from '@angular/core';
import { from, Observable } from 'rxjs';
import { BapiClientService } from './bapi-client.service';
import { BapiProduct } from '@aboutyou/backbone';
import { ProductByIdEndpointParameters } from '@aboutyou/backbone/endpoints/products/productById';
import { ProductsSearchEndpointParameters } from '@aboutyou/backbone/endpoints/products/products';
import {
  ProductsByIdsEndpointResponseData,
  ProductsByIdsEndpointParameters,
} from '@aboutyou/backbone/endpoints/products/productsByIds';

@Injectable({
  providedIn: 'root',
})
export class BapiProductService {
  constructor(private readonly bapiService: BapiClientService) {}
  public getById(
    productId: number,
    parameters?: Pick<
      ProductByIdEndpointParameters,
      'with' | 'campaignKey' | 'includeSellableForFree' | 'pricePromotionKey'
    >,
  ): Observable<BapiProduct> {
    return from(this.bapiService.bapiClient.products.getById(productId, parameters));
  }
  public getByIds(
    productIds: number[],
    parameters?: Pick<
      ProductsByIdsEndpointParameters,
      'with' | 'campaignKey' | 'includeSellableForFree' | 'pricePromotionKey'
    >,
  ): Observable<BapiProduct[]> {
    return from(this.bapiService.bapiClient.products.getByIds(productIds, parameters));
  }
  public query(params?: ProductsSearchEndpointParameters): Observable<ProductsByIdsEndpointResponseData> {
    return from(this.bapiService.bapiClient.products.query(params));
  }
}
