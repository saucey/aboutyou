import { BapiProduct } from '@aboutyou/backbone';
import { Component, Input } from '@angular/core';
import { Store } from '@ngrx/store';
import { SliderProduct } from 'src/app/common/components/products-slider/products-slider.component';
import { CurrencyPipe } from 'src/app/common/pipes/currency.pipe';
import sha256 from 'crypto-js/sha256';
import { CookieService } from 'ngx-cookie-service';
import { Observable } from 'rxjs/Observable';
import { first, map } from 'rxjs/operators';
import { CONSTANTS } from 'src/app/core/shop/constants';
import { AppState } from 'src/app/core/shop/store';
import { getUser } from 'src/app/core/shop/store/account';
import { PrudSysRecommendationsService } from 'src/app/common/recommendations/prud-sys-recommendations.service';
import { RecommendedProduct } from 'src/app/common/recommendations/recommended-product';
import { ProductMap } from 'src/app/mappers/product';
import { RecommendationsSliderService } from './recommendations-slider.service';

@Component({
  selector: 'app-recommendations-slider',
  templateUrl: './recommendations-slider.component.html',
  styleUrls: ['./recommendations-slider.component.scss'],
  providers: [CurrencyPipe],
})
export class RecommendationsSliderComponent {
  // TODO #1392 receive bapiProduct or less if sufficient
  @Input() set product(product: ProductMap) {
    if (product) {
      this.fetchAndSubscribeRecommendations(product); // async
    }
  }

  public headline$: Observable<string>;

  public recommendedProducts$: Observable<SliderProduct[]>;

  constructor(
    private readonly service: RecommendationsSliderService,
    private readonly currencyPipe: CurrencyPipe,
    private readonly recommendationsService: PrudSysRecommendationsService,
    private readonly cookieServie: CookieService,
    private store: Store<AppState>,
  ) {}

  // TODO #1392 clean up: SLA / IOSP, reconsider usefulness of component service
  private async fetchAndSubscribeRecommendations(product: ProductMap): Promise<void> {
    const bapiProduct: BapiProduct = (product as any).entity;
    const cid = this.service.getCategoryId(bapiProduct);
    const pid = (bapiProduct as any).referenceKey; // Product ID of particular product  (Prod RefKey)
    const sid = this.cookieServie.get(CONSTANTS.cookie.sessionId); // TODO #1455
    const tracking = false; // TODO #1453
    // TODO #1392 fails if user not logged in
    const user = await this.store
      .select(getUser)
      .pipe(first())
      .toPromise();
    const userid = this.toUserId(user.email);

    // TODO #1392 BUG: somehow two prudSys requests are fired
    const recommendations$ = this.recommendationsService.get({ cid, pid, sid, tracking, userid });

    this.headline$ = recommendations$.pipe(map(recommendations => recommendations.title));
    this.recommendedProducts$ = recommendations$.pipe(
      map(recommendations => recommendations.products),
      map(recommendationProducts => this.toSliderProducts(recommendationProducts)),
    );
  }

  private toSliderProducts(recommendedProducts: RecommendedProduct[]): SliderProduct[] {
    return recommendedProducts.map(recommendedProduct => this.toSliderProduct(recommendedProduct));
  }

  private toSliderProduct(recommendedProduct: RecommendedProduct): SliderProduct {
    // TODO #1392 replace mocks with actual data
    // TODO #1392 use cdn pipe
    const mockCurrency = { code: 'EUR', locale: 'de-DE' } as any;
    return {
      id: recommendedProduct.id,
      imageSrc: `https://depot.dam.staging.aboutyou.cloud/${recommendedProduct.imageHash}?width=600&amp;height=600&amp;brightness=0.95`,
      title: recommendedProduct.title,
      subtitle: this.currencyPipe.transform(recommendedProduct.price, mockCurrency),
    };
  }

  // following https://depot-online.atlassian.net/wiki/spaces/IN/pages/937656474/Unique+User+Identifier+traits.externalId
  private toUserId(emailAddress: string): string {
    if (emailAddress) {
      const lowerCaseEmail = emailAddress.toLowerCase();
      return sha256(lowerCaseEmail).toString();
      // TODO #1392 what does java Bytes() and toHex()? Necessary in JS?
      // var digest = new MessageDigest('SHA-256');
      // var emailShaBytes = digest.digest('SHA-256', new Bytes(emailAddress));
      // return Encoding.toHex(emailShaBytes);
    } else {
      return undefined;
    }
  }
}
