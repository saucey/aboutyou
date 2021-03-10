import { Component, EventEmitter, Input, Output } from '@angular/core';
import { IBasketListItem, ICurrency } from 'src/app/core/shop/types';

/**
 * ReservationBasketListComponent component.
 * **When To Use**
 * > Used to show several basket items.
 */
@Component({
  selector: 'src/app-reservation-basket-list',
  templateUrl: './reservation-basket-list.component.html',
  styleUrls: ['./reservation-basket-list.component.scss'],
})
export class ReservationBasketListComponent {
  @Input() loading = false;
  @Input() disabled = false;
  @Input() isMobile: boolean;
  @Input() currency: ICurrency;
  @Input() basketItems: IBasketListItem[] = [];
  @Output() handleItemQuantityChange = new EventEmitter<{ item: IBasketListItem; quantity: number }>();
  @Output() handleDeleteItem = new EventEmitter<IBasketListItem>();
  @Output() basketItemClick = new EventEmitter<IBasketListItem>();

  get hasBasketItems() {
    return this.basketItems && this.basketItems.length > 0;
  }
}
