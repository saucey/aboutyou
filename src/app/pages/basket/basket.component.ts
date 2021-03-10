import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { selectBasketItemsCount } from 'src/app/core/basket';
import { AppState } from 'src/app/core/shop/store';
import { combineLatest, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { selectReservationBasketItemsCount } from 'src/app/core/reservation-basket/state';
import { BasketLink } from './basket-link';

const checkoutLink: BasketLink = { path: 'checkout', labelKey: 'BASKET.tabTitle', itemCount: 0 };
const reservationLink: BasketLink = { path: 'reservations', labelKey: 'RESERVATION_BASKET.tabTitle', itemCount: 0 };

@Component({
  selector: 'app-basket-page',
  templateUrl: './basket.component.html',
  styleUrls: ['./basket.component.scss'],
})
export class BasketComponent implements OnInit {
  basketLinks$: Observable<BasketLink[]>;
  showTabHeader$: Observable<boolean>;
  checkoutBasketItemCount$: Observable<number>;

  constructor(private store: Store<AppState>) {}

  ngOnInit(): void {
    this.checkoutBasketItemCount$ = this.store.select(selectBasketItemsCount);
    const createCheckoutLink$ = this.checkoutBasketItemCount$.pipe(
      map(itemCount => this.createCheckoutLinkWithCount(itemCount)),
    );

    const reservationBasketItemCount$ = this.store.select(selectReservationBasketItemsCount);
    const createReservationLink$ = reservationBasketItemCount$.pipe(
      map(itemCount => this.createReservationBasketLink(itemCount)),
    );

    this.showTabHeader$ = reservationBasketItemCount$.pipe(map(count => count > 0));

    this.basketLinks$ = combineLatest([createCheckoutLink$, createReservationLink$]).pipe(
      map(([checkout, reservation]) => [...checkout, ...reservation]),
    );
  }

  private createCheckoutLinkWithCount(itemCount: number): BasketLink[] {
    return [{ ...checkoutLink, itemCount }];
  }

  private createReservationBasketLink(itemCount: number): BasketLink[] {
    return [{ ...reservationLink, itemCount }];
  }
}
