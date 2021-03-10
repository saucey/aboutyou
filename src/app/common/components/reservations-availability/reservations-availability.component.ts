import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from 'app/core/shop/store';

@Component({
  selector: 'app-reservations-availability',
  templateUrl: './reservations-availability.component.html',
  styleUrls: ['./reservations-availability.component.scss'],
})
export class ReservationsAvailabilityComponent implements OnInit, OnDestroy {
  @Input() isMobile: boolean;
  @Input() quantity: any;
  @Input() isStoreDetail: boolean;
  @Input() currentStock: any;

  constructor(private store: Store<AppState>) {}

  ngOnInit() {
    console.log('oninit');
    console.log(this.quantity, 'quantitiy');
    console.log(this.currentStock, 'currentStock');
  }

  ngOnDestroy() {
    console.log('destroy');
  }
}
