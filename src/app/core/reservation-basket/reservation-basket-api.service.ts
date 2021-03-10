import { BasketResponse } from '@aboutyou/backbone/helpers/BapiClient';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AddOrUpdateParam } from './add-or-update-param';

export const reservationBasketUrl = '/api/reservation-basket';

@Injectable({ providedIn: 'root' })
export class ReservationBasketApiService {
  private readonly basketUrl: string;

  constructor(private readonly http: HttpClient) {
    this.basketUrl = reservationBasketUrl;
  }

  public getReservationBasket(): Observable<BasketResponse> {
    return this.http.get<BasketResponse>(this.basketUrl);
  }

  public addOrUpdateItem(addOrUpdateParam: AddOrUpdateParam): Observable<BasketResponse> {
    return this.http.post<BasketResponse>(this.basketUrl, {
      ...addOrUpdateParam,
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
