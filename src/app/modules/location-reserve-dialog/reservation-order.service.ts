import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ReservationStoreDetails } from './reservation-store-details';

@Injectable({ providedIn: 'root' })
export class ReservationOrderService {
  constructor(private readonly http: HttpClient) {}

  public postReservationOrder(payload: any): Observable<ReservationStoreDetails[]> {
    return this.http.post<any>('/api/reservation-orders', payload);
  }
}
