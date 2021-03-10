import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { BapiCategoryService } from 'src/app/core/services/bapi/bapi-category.service';
import { BapiProductService } from 'src/app/core/services/bapi/bapi-product.service';
import { ContentService } from 'src/app/core/services/content/content.service';
import { SeoService } from 'src/app/core/services/seo/seo.service';
import { ShopService } from 'src/app/core/services/shop.service';
import { ICurrency } from 'src/app/core/shop/types';
import { ContentElement, ElementTypes } from 'src/app/core/shop/types/cms';
import { getUrlPathname } from 'src/app/core/shop/utils';
import {
  DoubleTeaserTransformer,
  GridTilesTransformer,
  HoverTeaserTransformer,
  PopularCategoriesTransformer,
  ProductsSliderTransformer,
  StageModuleTransformer,
  TrisectionSlidersTransformer,
} from 'src/app/mappers/cms-elements';
import { PageTypes } from 'src/app/configs/pagetypes';

@Component({
  selector: 'app-startpage',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  loaded: boolean;
  contentElements: any[];
  currency: ICurrency;

  constructor(
    private seoService: SeoService,
    private contentService: ContentService,
    private bapiProductService: BapiProductService,
    private bapiCategoryService: BapiCategoryService,
    private shopService: ShopService,
    private translateService: TranslateService,
    private router: Router,
  ) {
    this.translateService.get(['SEO.homepage.title', 'SEO.homepage.description']).subscribe(translations => {
      const currentUrl: string = this.router.url;
      const baseUrl: string = getUrlPathname(currentUrl);
      this.seoService.loadSeoMetadata(PageTypes.HOME, {
        moreToLoad: false,
        fallbackData: {
          title: translations['SEO.homepage.title'],
          description: translations['SEO.homepage.description'],
          img: baseUrl + '/assets/logo.svg',
        },
      });
    });

    const { shop } = this.shopService.getShop();
    this.currency = shop.currency;
  }

  navigateIfPossible = (element: ContentElement) => {
    if (element.attributes && element.attributes.link) {
      this.router.navigateByUrl(element.attributes.link.href);
    }
  };

  // tslint:disable-next-line: cyclomatic-complexity
  mapElement(contentElem: any, index: number) {
    switch (contentElem.type) {
      case ElementTypes.GRID_SLIDER: {
        const stageModuleTransformer = new StageModuleTransformer(contentElem);
        this.contentElements.push(stageModuleTransformer.transform());
        break;
      }
      case ElementTypes.GRID_TILES: {
        const gridTilesTransformer = new GridTilesTransformer(contentElem);
        this.contentElements.push(gridTilesTransformer.transform());
        break;
      }
      case ElementTypes.GRID_SLIDER_TRISECTION: {
        const trisectionSlidersTransformer = new TrisectionSlidersTransformer(contentElem);
        this.contentElements.push(trisectionSlidersTransformer.transform());
        break;
      }
      case ElementTypes.GRID_DOUBLE_TEASER: {
        const doubleTeaserTransformer = new DoubleTeaserTransformer(contentElem);
        this.contentElements.push(doubleTeaserTransformer.transform());
        break;
      }
      case ElementTypes.GRID_POPULAR_CATEGORIES: {
        this.contentElements[index] = [];
        const popularCategoriesTransformer = new PopularCategoriesTransformer(contentElem);
        popularCategoriesTransformer.transform(this.bapiCategoryService).subscribe(data => {
          this.contentElements[index] = data;
        });
        break;
      }
      case ElementTypes.GRID_PRODUCT_SLIDER: {
        const productsSlidersTransformer = new ProductsSliderTransformer(contentElem);
        this.contentElements[index] = [];
        productsSlidersTransformer
          .transform(this.bapiProductService, this.translateService, this.currency)
          .subscribe(data => {
            this.contentElements[index] = data;
          });
        break;
      }
      case ElementTypes.GRID_HOVER_TEASER: {
        const hoverTeaserTransformer = new HoverTeaserTransformer(contentElem);
        this.contentElements.push(hoverTeaserTransformer.transform());
        break;
      }
      default: {
        this.contentElements.push(contentElem);
        break;
      }
    }
  }

  ngOnInit() {
    this.contentElements = [];

    this.contentService.getHomepageContents().subscribe((data: any) => {
      data.content.forEach((contentElem, index) => {
        this.mapElement(contentElem, index);
      });
    });
  }
}
