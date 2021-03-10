import { BasketService } from 'src/app/core/basket/basket.service';
import { isItemInBasket } from 'src/app/core/basket/index';
import { WishlistService } from 'src/app/core/services/wishlist/wishlist.service';
import { AppState } from 'src/app/core/shop/store';
import { isItemInWishlist } from 'src/app/core/shop/store/wishlist';
import { DialogBeSureComponent } from 'src/app/common/components/dialog/dialog-be-sure';
import { DialogBeSureResult, IDialogData } from 'src/app/common/components/dialog/dialog-be-sure-type';
import { ProductMap } from 'src/app/mappers/product';
import { Observable, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';

import { animate, style, transition, trigger } from '@angular/animations';
import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { TranslateService } from '@ngx-translate/core';

/**
 * Simple rectangular container for displaying product data.
 *
 * **When To Use**
 *
 * A ProductTile can be used to display content related to single/multiple(sibling) products.
 * The content display the metadata of the given Product.
 */
@Component({
  selector: 'app-product-tile',
  animations: [
    trigger('enterAnimation', [
      transition(':enter', [style({ opacity: 0 }), animate('0.2s', style({ opacity: 1 }))]),
      transition(':leave', [style({ opacity: 1 }), animate('0.2s', style({ opacity: 0 }))]),
    ]),
  ],
  templateUrl: './product-tile.component.html',
  styleUrls: ['./product-tile.component.scss'],
})
export class ProductTileComponent implements OnInit, OnDestroy {
  @Input() product: ProductMap;
  @Input() isMobile: boolean;

  isItemInWishlist$: Observable<any>;
  isWishlistItemInBasket$: Observable<any>;
  wishlistIcon$: Observable<any>;
  isItemSoldOut: boolean;

  /**
   * state variable for current color variation
   * @ignore : ignore for documentation in storybook
   */
  public currentColorVariation = 0;
  public current: ProductMap;
  /**
   * state variable for current hovered color
   * @ignore : ignore for documentation in storybook
   */
  public currentHoveredColor = null;
  private subscription = new Subscription();

  constructor(
    public dialog: MatDialog,
    private store: Store<AppState>,
    private wishlistService: WishlistService,
    private basketService: BasketService,
    private translateService: TranslateService,
  ) {}

  openDialogBeSureDelete(event: Event): void {
    event.preventDefault();
    event.stopPropagation();
    this.subscription.add(
      this.dialog
        .open<DialogBeSureComponent, IDialogData, DialogBeSureResult>(DialogBeSureComponent, {
          maxWidth: this.isMobile ? '100vw' : '375px',
          height: this.isMobile ? '150px' : 'auto',
          data: {
            message: this.translateService.instant('WISHLIST.message.sure'),
            btnTitle: this.translateService.instant('WISHLIST.actions.delete'),
          },
        })
        .afterClosed()
        .subscribe(answer =>
          answer === DialogBeSureResult.Yes ? this.wishlistService.addOrDeleteItem(this.current.productId) : null,
        ),
    );
  }

  ngOnInit() {
    this.current = this.product;
    this.isItemInWishlist$ = this.store.select(isItemInWishlist(this.current.productId));
    this.isWishlistItemInBasket$ = this.store.select(isItemInBasket(this.current.productId));
    this.isItemSoldOut = this.current.availableQuantities === 0;
    this.wishlistIcon$ = this.store
      .select(isItemInWishlist(this.current.productId))
      .pipe(map(available => (available ? 'heart-active' : 'heart-inactive')));
  }

  public onHandleAddWishlistItem(event: Event) {
    event.preventDefault();
    event.stopPropagation();
    this.wishlistService.addOrDeleteItem(this.current.productId);
  }

  public onHandleDeleteWishlistItem(event: Event): void {
    event.preventDefault();
    event.stopPropagation();
    this.wishlistService.addOrDeleteItem(this.current.productId);
  }

  public onHandleAddBasketItem(event: Event) {
    event.preventDefault();
    event.stopPropagation();
    this.basketService.addOrUpdateItem(
      this.current.productId,
      1,
      this.basketService.getCheckoutCustomDataForDisplayProduct(this.current),
    );
    this.wishlistService.addOrDeleteItem(this.current.productId);
  }

  /**
   * Handles the click on color buttons.
   * This sets the main product to the selected color variant
   * @ignore : ignore for documentation in storybook
   */
  public switchColor($event: Event, i: number) {
    if (this.isMobile) {
      return;
    }

    $event.preventDefault();
    $event.stopPropagation();

    const variation = this.product.choosableSiblings[i] as ProductMap;

    this.current = variation;
    this.currentColorVariation = i;
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
