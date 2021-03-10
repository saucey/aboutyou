import { Component, EventEmitter, Input, Output } from '@angular/core';
import { IBasketListItem, ICurrency } from 'src/app/core/shop/types';

/**
 * BasketListComponent component.
 * **When To Use**
 * > Used to show several basket items.
 */
@Component({
  selector: 'app-basket-list',
  templateUrl: './basket-list.component.html',
  styleUrls: ['./basket-list.component.scss'],
})
export class BasketListComponent {
  @Input() loading = false;
  @Input() disabled = false;
  @Input() isMobile: boolean;
  @Input() currency: ICurrency;
  @Input() basketItems: IBasketListItem[] = [];
  @Output() handleItemQuantityChange = new EventEmitter<{ item: IBasketListItem; quantity: number }>();
  @Output() handleDeleteItem = new EventEmitter<IBasketListItem>();
  @Output() basketItemClick = new EventEmitter<IBasketListItem>();

  // adaption
  @Input() plusProductThresholdReached: boolean;
  get hasBasketItems() {
    return this.basketItems && this.basketItems.length > 0;
  }
}
