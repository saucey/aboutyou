import { DOCUMENT, Location } from '@angular/common';
import { AfterViewInit, Component, Inject, OnDestroy, PLATFORM_ID } from '@angular/core';
import { Router } from '@angular/router';
import { LocalizeRouterService } from '@gilsdav/ngx-translate-router';
import { Store } from '@ngrx/store';
import { TranslateService } from '@ngx-translate/core';
import { BapiFilterService } from 'src/app/core/services/bapi/bapi-filter.service';
import { BapiProductService } from 'src/app/core/services/bapi/bapi-product.service';
import { ContentService } from 'src/app/core/services/content/content.service';
import { SeoService } from 'src/app/core/services/seo/seo.service';
import { ShopService } from 'src/app/core/services/shop.service';
import { AppState } from 'src/app/core/shop/store';
import { NavbarCategory } from 'src/app/core/shop/types';
import { BreakpointObserverService } from 'src/app/common/services/breakpoint-observer.service';
import { PageTypes } from 'src/app/configs/pagetypes';
import { BasePageController } from 'src/app/pages/product-listing/pages/base-page.controller';
import { stringify } from 'query-string';

@Component({
  selector: 'app-search-page',
  templateUrl: './search-page.component.html',
  styleUrls: ['./search-page.component.scss'],
})
export class SearchPageComponent extends BasePageController implements OnDestroy, AfterViewInit {
  constructor(
    public store: Store<AppState>,
    public router: Router,
    public localize: LocalizeRouterService,
    public shopService: ShopService,
    public seoService: SeoService,
    public translateService: TranslateService,
    public bapiProductService: BapiProductService,
    public bapiFilterService: BapiFilterService,
    public contentService: ContentService,
    public breakpointObserver: BreakpointObserverService,
    public location: Location,
    @Inject(DOCUMENT) public document: Document,
    @Inject(PLATFORM_ID) public platformId: object,
  ) {
    super(
      store,
      router,
      localize,
      shopService,
      seoService,
      translateService,
      bapiProductService,
      bapiFilterService,
      contentService,
      breakpointObserver,
      location,
      document,
      platformId,
    );
  }

  setSeoMetadata() {
    this.seoService.loadSeoMetadata(PageTypes.SEARCH);
  }

  onCategorySelect = (category: NavbarCategory) => {
    const stringified = stringify(
      { ...this.selectedFilters, categoryId: category ? category.id : undefined },
      { arrayFormat: 'comma' },
    );
    const localizedLink = this.localize.translateRoute(this.currentPath) as string;
    this.router.navigateByUrl(localizedLink + '?' + stringified);
  };
}
