import { WishlistResponseData } from '@aboutyou/backbone/endpoints/wishlist/getWishlist';
import { isPlatformBrowser } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Store } from '@ngrx/store';
import { TranslateService } from '@ngx-translate/core';
import { AppState } from 'src/app/core/shop/store';
import { selectAccountIsLoading } from 'src/app/core/shop/store/account';
import { selectWishlistError, WISHLIST_ACTIONS } from 'src/app/core/shop/store/wishlist';
import { GlobalMessageData } from 'src/app/common/components/global-message/global-message-data';
import { GlobalMessageType } from 'src/app/common/components/global-message/global-message-type';
import { GlobalMessageComponent } from 'src/app/common/components/global-message/global-message.component';
import { distinctUntilChanged, filter, switchMapTo, take } from 'rxjs/operators';
import { OnAppStable } from '../../app-stable-initializer/on-app-stable';
import { getWishlistUrl } from '../resolveEnvs';

@Injectable({ providedIn: 'root' })
export class WishlistService implements OnAppStable {
  private readonly wishlistUrl: string;
  private readonly isBrowser: boolean;

  constructor(
    private readonly http: HttpClient,
    private store: Store<AppState>,
    private matSnackbar: MatSnackBar,
    private translateService: TranslateService,
    @Inject(PLATFORM_ID) platformId: object,
  ) {
    this.wishlistUrl = getWishlistUrl();
    this.isBrowser = isPlatformBrowser(platformId);
  }

  public onAppStable(): void {
    if (!this.isBrowser) {
      return;
    }

    this.showHintOnError();
    this.getWishlist();
  }

  private getWishlist() {
    this.dispatchSetLoading(true);
    this.store
      .select(selectAccountIsLoading)
      .pipe(
        filter(value => !value),
        take(1),
        switchMapTo(this.http.get<WishlistResponseData>(this.wishlistUrl)),
      )
      .subscribe(
        response => this.dispatchSetWishlist(response),
        error => this.handleError(error),
      );
  }

  public addOrDeleteItem(variantId: number): void {
    this.dispatchSetLoading(true);
    this.http
      .post<WishlistResponseData>(this.wishlistUrl, {
        variantId,
      })
      .subscribe(
        () => this.getWishlist(),
        error => this.handleError(error),
      );
  }

  public deleteItem(variantId: number): void {
    this.http.delete<WishlistResponseData>(`${this.wishlistUrl}/${variantId}`).subscribe(
      response => this.dispatchSetWishlist(response),
      error => this.handleError(error),
    );
  }

  private handleError(error: any): void {
    console.error('wishlist error', error);
    this.store.dispatch(WISHLIST_ACTIONS.setError({ error }));
  }

  private dispatchSetLoading(isLoading: boolean): void {
    this.store.dispatch(WISHLIST_ACTIONS.setLoading({ isLoading }));
  }

  private dispatchSetWishlist(wishlistResponse: WishlistResponseData): void {
    this.store.dispatch(WISHLIST_ACTIONS.setWishlist({ wishlistResponse }));
  }

  private showHintOnError() {
    this.store
      .select(selectWishlistError)
      .pipe(
        distinctUntilChanged(),
        filter(error => error != null),
      )
      .subscribe(ignored => {
        const errorMessage = this.translateService.instant('BASKET.errors.generic');
        const data: GlobalMessageData = {
          message: errorMessage,
          type: GlobalMessageType.ERROR,
        };
        this.matSnackbar.openFromComponent(GlobalMessageComponent, {
          data,
          duration: 5000,
        });
      });
  }
}
