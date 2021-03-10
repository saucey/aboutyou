import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ReservationMessageService {
  private subject = new Subject<any>();

  setReservationMessage() {
    this.subject.next(true);
  }

  clearReservationMessage() {
    this.subject.next(false);
  }

  getReservationMessage(): Observable<any> {
    return this.subject.asObservable();
  }
}
