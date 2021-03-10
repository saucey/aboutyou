import { BasketPackageInformation } from '@aboutyou/backbone/endpoints/basket/getBasket';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { IBasketListItem, ICurrency } from 'src/app/core/shop/types';

/**
 * BasketListGroupedByPackageComponent component.
 * **When To Use**
 * > Used to show several basket items grouped by package and not deliverable items.
 */
@Component({
  selector: 'app-basket-list-grouped-by-package',
  templateUrl: './basket-list-grouped-by-package.component.html',
  styleUrls: ['./basket-list-grouped-by-package.component.scss'],
})
export class BasketListGroupedByPackageComponent {
  @Input() loading = false;
  @Input() disabled = false;
  @Input() isMobile: boolean;
  @Input() currency: ICurrency;
  @Input() basketItemsGroupedByPackage: Map<number, IBasketListItem[]>;
  @Input() packagesInformation: Map<number, BasketPackageInformation>;
  @Input() notDeliverableItems: IBasketListItem[];

  @Output() itemQuantityChange = new EventEmitter<{ item: IBasketListItem; quantity: number }>();
  @Output() deleteItem = new EventEmitter<IBasketListItem>();
  @Output() basketItemClick = new EventEmitter<IBasketListItem>();

  // adaption
  @Input() plusProductThresholdReached: boolean;
}
