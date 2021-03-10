import { OnInit, Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { AccountState } from 'src/app/core/shop/store/account';
import { IBasketListItem, ICurrency, IWishlistListItem } from 'src/app/core/shop/types';
// tslint:disable-next-line
import { HeaderIconDropdownComponent } from 'src/app/common/components/header-icon-dropdown/header-icon-dropdown.component';
import { TranslateService } from '@ngx-translate/core';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/core/shop/store';
import { selectMappedWishlistItems, selectWishlistItemsCount } from 'src/app/core/shop/store/wishlist';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-wishlist-icon-dropdown',
  templateUrl: './wishlist-icon-dropdown.component.html',
  styleUrls: ['./wishlist-icon-dropdown.component.scss'],
})
export class WishlistIconDropdownComponent implements OnInit {
  @Input() loading = true;
  @Input() customClass: string;
  @Input() user: AccountState['user'];
  @Input() itemCount: number;
  @Input() currency: ICurrency;

  @Output() handleRedirectToWishlist = new EventEmitter<void>();
  @Output() basketItemClick = new EventEmitter<IBasketListItem>();

  @ViewChild(HeaderIconDropdownComponent, { static: true })
  dropDown: HeaderIconDropdownComponent;

  wishlistItems$: Observable<IWishlistListItem[]>;
  isWishListEmpty$: Observable<boolean>;
  itemsToShow$: Observable<IWishlistListItem[]>;

  constructor(private translateService: TranslateService, private store: Store<AppState>) {}

  handleToWishlistClick(): void {
    this.dropDown.closePanel();
    this.handleRedirectToWishlist.emit();
  }

  onClickBasketItem($event: MouseEvent, basketItem: IBasketListItem) {
    $event.stopPropagation();
    this.dropDown.closePanel();
    this.basketItemClick.emit(basketItem);
  }

  ngOnInit(): void {
    this.wishlistItems$ = this.store.select(selectMappedWishlistItems(this.currency, this.translateService));
    this.isWishListEmpty$ = this.wishlistItems$.pipe(map(items => items.length === 0));
    this.itemsToShow$ = this.wishlistItems$.pipe(map(items => items.slice(0, 10)));
  }
}
