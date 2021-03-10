import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/core/shop/store';
import { AccountState } from 'src/app/core/shop/store/account';
import { IBasketCost, IBasketListItem, ICurrency } from 'src/app/core/shop/types';
import { BasketPlusProductService } from '../../../depot-checkout/basket-plus-product.service';
import { PlusProductCalcThresholdService } from '../../../depot-checkout/plus-product-calc-threshold/plus-product-calc-threshold.service';
// tslint:disable-next-line
import { HeaderIconDropdownComponent } from 'src/app/common/components/header-icon-dropdown/header-icon-dropdown.component';
import { combineLatest, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-basket-icon-dropdown',
  templateUrl: './basket-icon-dropdown.component.html',
  styleUrls: ['./basket-icon-dropdown.component.scss'],
})
export class BasketIconDropdownComponent implements OnInit {
  @Input() loading = true;
  @Input() customClass: string;
  @Input() itemCount: number;
  @Input() user: AccountState['user'];
  @Input() basketItems: IBasketListItem[];
  @Input() currency: ICurrency;
  @Input() basketCost: IBasketCost;

  @Output() handleRedirectToBasket = new EventEmitter<void>();
  @Output() handleBasketHandoverToCheckout = new EventEmitter<void>();
  @Output() basketItemClick = new EventEmitter<IBasketListItem>();

  @ViewChild(HeaderIconDropdownComponent, { static: true })
  dropDown: HeaderIconDropdownComponent;
  disablePurchaseButton$: Observable<boolean>;

  constructor(
    private store: Store<AppState>,
    private calcThresholdService: PlusProductCalcThresholdService,
    private plusProductService: BasketPlusProductService,
  ) {}

  ngOnInit(): void {
    this.disablePurchaseButton$ = combineLatest(
      this.calcThresholdService.isBasketThresholdReached$(),
      this.plusProductService.hasNormalBasketItems$,
    ).pipe(map(([thresholdReached, hasNormalItems]) => !thresholdReached && !hasNormalItems));
  }

  handleToBasketClick(): void {
    this.dropDown.closePanel();
    this.handleRedirectToBasket.emit();
  }

  get basketItemsMax10() {
    return this.basketItems.slice(0, 10);
  }

  handleToCheckoutClick(): void {
    this.dropDown.closePanel();
    this.handleBasketHandoverToCheckout.emit();
  }

  onClickBasketItem($event: MouseEvent, basketItem: IBasketListItem) {
    $event.stopPropagation();
    this.dropDown.closePanel();
    this.basketItemClick.emit(basketItem);
  }
}
