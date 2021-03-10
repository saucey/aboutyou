import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { Store } from '@ngrx/store';
import { WishlistService } from 'src/app/core/services/wishlist/wishlist.service';
import { AppState } from 'src/app/core/shop/store';
import { isItemInWishlist } from 'src/app/core/shop/store/wishlist';
import { IBasketListItem, ICurrency } from 'src/app/core/shop/types';
import { Observable, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { BasketBottomSheetData } from 'src/app/common/components/basket-bottom-sheet/basket-bottom-sheet-data';
import { BasketBottomSheetResult } from 'src/app/common/components/basket-bottom-sheet/basket-bottom-sheet-result';
import { BasketBottomSheetComponent } from 'src/app/common/components/basket-bottom-sheet/basket-bottom-sheet.component';

@Component({
  selector: 'src/app-reservation-basket-list-item',
  templateUrl: './reservation-basket-list-item.component.html',
  styleUrls: ['./reservation-basket-list-item.component.scss'],
})
export class ReservationBasketListItemComponent implements OnInit, OnDestroy {
  @Input() isMobile: boolean;

  // show delete button and change quantity input
  @Input() item: IBasketListItem;
  @Input() currency: ICurrency;
  @Input() quantity = 0;
  @Input() disabled = false;
  @Input() isFlyoutMode = false;
  @Input() plusProductThresholdReached = true;
  @Input() useSecondImage = false;
  @Output() basketItemClick = new EventEmitter<IBasketListItem>();
  @Output() deleteItem = new EventEmitter<IBasketListItem>();
  @Output() changeQuantity = new EventEmitter<{ item: IBasketListItem; quantity: number }>();

  totalOldPrice: number;
  totalCurrentPrice: number;
  imageSrc: string;
  isExpanded: boolean;
  wishlistItemAvailable$: Observable<any>;
  wishlistIcon$: Observable<any>;
  private bottomSheetSubscription: Subscription;

  constructor(
    private store: Store<AppState>,
    private wishlistService: WishlistService,
    private bottomSheet: MatBottomSheet,
  ) {}

  ngOnInit() {
    this.quantity = this.item.quantity;
    this.totalCurrentPrice = this.item.mappedProduct.currentPrice * this.item.quantity;
    this.totalOldPrice = this.item.mappedProduct.oldPrice * this.item.quantity;
    this.wishlistItemAvailable$ = this.store.select(isItemInWishlist(this.item.product.id));
    this.wishlistIcon$ = this.store
      .select(isItemInWishlist(this.item.product.id))
      .pipe(map(available => (available ? 'heart-active' : 'heart-inactive')));

    this.imageSrc = this.useSecondImage
      ? this.item.mappedProduct.getSecondPreviewImageSrc()
      : this.item.mappedProduct.getPreviewImageSrc();
  }

  get noItemAvailable() {
    return this.item.availableQuantity === 0;
  }

  public onHandleAddWishlistItem(event: Event) {
    event.preventDefault();
    event.stopPropagation();
    this.wishlistService.addOrDeleteItem(this.item.product.id);
  }

  public onHandleQuantityChange(value: number) {
    this.quantity = value;
    this.changeQuantity.emit({ item: this.item, quantity: this.quantity });
  }

  public onHandleDeleteItem() {
    this.deleteItem.emit(this.item);
  }

  public onHandleBasketItemClick() {
    this.basketItemClick.emit(this.item);
  }

  public onAddItemToWishlist() {
    this.isExpanded = false;
    this.wishlistService.addOrDeleteItem(this.item.product.id);
  }

  public expandBottomSheet() {
    this.bottomSheetSubscription = this.bottomSheet
      .open<BasketBottomSheetComponent, BasketBottomSheetData, BasketBottomSheetResult>(BasketBottomSheetComponent, {
        data: {
          productTitle: this.item.mappedProduct.custom.productTitle,
        },
      })
      .afterDismissed()
      .subscribe(result => {
        switch (result) {
          case BasketBottomSheetResult.ADD_ARTICLE:
            this.onAddItemToWishlist();
            break;
          case BasketBottomSheetResult.DELETE_ARTICLE:
            this.onHandleDeleteItem();
            break;
          case BasketBottomSheetResult.CANCEL:
            this.onHandleDeleteItem();
            break;
        }
      });
  }

  ngOnDestroy() {
    if (this.bottomSheetSubscription != null) {
      this.bottomSheetSubscription.unsubscribe();
    }
  }
}
