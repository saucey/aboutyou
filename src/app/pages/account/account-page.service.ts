import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AccountPageService {
  private readonly currentOrderIdSubject = new BehaviorSubject<number>(null);
  readonly currentOrderId$ = this.currentOrderIdSubject.asObservable();
  private readonly currentReservationIdSubject = new BehaviorSubject<string>('');
  readonly currentReservationId$ = this.currentOrderIdSubject.asObservable();

  getCurrentOrderId(): number {
    return this.currentOrderIdSubject.getValue();
  }

  setCurrentOrderId(id: number) {
    this.currentOrderIdSubject.next(id);
  }

  getCurrentReservationId() {
    return this.currentReservationIdSubject.getValue();
  }

  setCurrentReservationId(id: string) {
    this.currentReservationIdSubject.next(id);
  }
}
