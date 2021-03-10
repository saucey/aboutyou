import { IReservationResponse, IReservation, IReservationDetail } from './../../shop/types/reservation';
import { Injectable } from '@angular/core';
import { getReservationByIdUrl, getAllReservationsUrl } from '../resolveEnvs';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { switchMap, tap, map } from 'rxjs/operators';
import { BapiProductService } from 'src/app/core/services/bapi/bapi-product.service';
import { CONFIG } from 'src/app/configs';
import { ProductMap } from 'src/app/mappers/product';
import { ICurrency } from 'src/app/core/shop/types';
import { ShopService } from 'src/app/core/services/shop.service';

@Injectable({
  providedIn: 'root',
})
export class ReservationService {
  private readonly allReservationsUrl: string;
  private readonly reservationByIdUrl: string;
  public currentReservation: IReservationDetail;
  public currency: ICurrency;

  constructor(
    private readonly http: HttpClient,
    private productService: BapiProductService,
    private shopService: ShopService,
  ) {
    this.reservationByIdUrl = getReservationByIdUrl();
    this.allReservationsUrl = getAllReservationsUrl();
    this.currency = this.shopService.getShop().shop.currency;
  }

  public getAllReservations(): Observable<IReservation[]> {
    return this.http
      .get<IReservationResponse>(`${this.allReservationsUrl}`)
      .pipe(map((reservation: IReservationResponse) => reservation.reservationOrders));
  }

  public getReservationById(reservationId: string): Observable<void> {
    return this.http.get<IReservationDetail>(`${this.reservationByIdUrl}/${reservationId}`).pipe(
      tap(order => (this.currentReservation = order)),
      map(order => order.items.map(item => item.id)),
      switchMap(itemIds =>
        this.productService.getByIds(itemIds, {
          campaignKey: CONFIG.shop.products.campaignKey,
          with: {
            attributes: 'all',
            images: 'all',
            advancedAttributes: 'all',
            variants: {
              attributes: 'all',
            },
          },
        }),
      ),
      map(order => {
        order.forEach(
          (item, index) => (this.currentReservation.items[index].mappedProduct = new ProductMap(item, this.currency)),
        );
      }),
    );
  }
}
