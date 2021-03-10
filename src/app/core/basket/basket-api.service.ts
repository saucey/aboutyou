import { getBasketUrl } from 'src/app/core/services/resolveEnvs';
import { Observable } from 'rxjs';
import { CustomDataMap } from 'src/app/mappers/product';

import { BasketResponse } from '@aboutyou/backbone/helpers/BapiClient';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class BasketApiService {
  private readonly basketUrl: string;

  constructor(private readonly http: HttpClient) {
    this.basketUrl = getBasketUrl();
  }

  public getBasket(): Observable<BasketResponse> {
    return this.http.get<BasketResponse>(this.basketUrl);
  }

  public addOrUpdateItem(variantId: number, quantity: number, customData: CustomDataMap): Observable<BasketResponse> {
    return this.http.post<BasketResponse>(this.basketUrl, {
      variantId,
      quantity,
      customData,
    });
  }

  public updateItemQuantity(variantId: number, quantity: number): Observable<BasketResponse> {
    return this.http.put<BasketResponse>(this.basketUrl, {
      variantId,
      quantity,
    });
  }

  public deleteItem(variantId: number): Observable<BasketResponse> {
    return this.http.delete<BasketResponse>(`${this.basketUrl}/${variantId}`);
  }
}
