import {
  DoubleTeaser,
  StageModule,
  TrisectionSliders,
  PopularCategories,
  ProductsSlider,
  GridTiles,
  HoverTeaser,
  ElementTypes,
} from 'src/app/core/shop/types/cms';
import { UnidirectionalTransform } from 'src/app/core/shop/models/unidirectional';
import { assocPath, path, Dictionary } from 'ramda';
import { getTextTagForHeadlines, convertStyleClasses, convertAttributes } from 'src/app/core/shop/utils/cms';
import { getCdnImageUrl } from 'src/app/core/shop/utils';
import { BapiProductService } from 'src/app/core/services/bapi/bapi-product.service';
import { Observable, from, zip } from 'rxjs';
import { BapiCategoryService } from 'src/app/core/services/bapi/bapi-category.service';
import { ProductMap } from './product';
import { TranslateService } from '@ngx-translate/core';
import { ICurrency } from 'src/app/core/shop/types';

export class DoubleTeaserTransformer extends UnidirectionalTransform<any, DoubleTeaser> {
  transform(): DoubleTeaser {
    return {
      type: ElementTypes.GRID_DOUBLE_TEASER,
      data: this.source.elementGroups,
    };
  }
}

export class HoverTeaserTransformer extends UnidirectionalTransform<any, HoverTeaser> {
  public source: any;

  transform(): HoverTeaser {
    const res = [];

    this.source.elementGroups.forEach((elementGroup: any) => {
      const bgColor = elementGroup.elementGroups[0].attributes.bgColor;
      elementGroup = assocPath(
        ['elementGroups', '0', 'elements', '0', 'attributes', 'size'],
        getTextTagForHeadlines(path(['elementGroups', '0', 'elements', '0', 'attributes', 'size'], elementGroup), true),
        elementGroup,
      );
      elementGroup = assocPath(
        ['elementGroups', '0', 'elements', '1', 'attributes', 'size'],
        getTextTagForHeadlines(path(['elementGroups', '0', 'elements', '1', 'attributes', 'size'], elementGroup), true),
        elementGroup,
      );
      elementGroup = assocPath(
        ['elementGroups', '0', 'elements', '2', 'attributes', 'style'],
        convertStyleClasses(path(['elementGroups', '0', 'elements', '2', 'attributes', 'style'], elementGroup)),
        elementGroup,
      );

      elementGroup = assocPath(
        ['elementGroups', '0', 'elements', '0', 'attributes', 'bgColor'],
        path(['elementGroups', '0', 'elements', '0', 'attributes', 'bgColor'], elementGroup),
        elementGroup,
      );

      elementGroup = assocPath(
        ['elementGroups', '0', 'attributes'],
        convertAttributes(path(['elementGroups', '0', 'attributes'], elementGroup)),
        elementGroup,
      );

      const currentElement = elementGroup.elementGroups[0];

      res.push({
        attributes: currentElement.attributes,
        headline: currentElement.elements[0].attributes,
        subline: elementGroup.elementGroups[0].elements[1].attributes,
        cta: currentElement.elements[2].attributes,
        imageUrl: getCdnImageUrl(currentElement.elements[3].attributes.hash),
        bgColor,
        desktopColumnCount: elementGroup.type,
      });
    });

    return {
      type: ElementTypes.GRID_HOVER_TEASER,
      data: res,
    };
  }
}

export class PopularCategoriesTransformer extends UnidirectionalTransform<any, Observable<PopularCategories>> {
  transform(bapiCategoryService: BapiCategoryService): Observable<PopularCategories> {
    return from(
      new Promise<PopularCategories>((resolve, reject) => {
        // fetching of category link metadata
        const res: PopularCategories = {
          type: ElementTypes.GRID_POPULAR_CATEGORIES,
          data: {
            headline: path(['elements', '0', 'attributes', 'text'], this.source),
            categories: [],
          },
        };
        const categoryLinks: Array<Dictionary<string | any>> = path(['elementGroups'], this.source);
        zip(
          ...categoryLinks.map(category => {
            return bapiCategoryService.getById(Number(category.elements[0].attributes.link.resourceId));
          }),
        ).subscribe(bapiCategories => {
          bapiCategories.forEach((bapiCategory, i) => {
            const catLink: Dictionary<string | string> = path(
              ['elements', '0', 'attributes', 'link'],
              categoryLinks[i],
            );
            catLink.href = bapiCategory.path;
            res.data.categories.push({ ...catLink, name: bapiCategory.name });
          });
          resolve(res);
        });
      }),
    );
  }
}

export class ProductsSliderTransformer extends UnidirectionalTransform<any, Observable<ProductsSlider>> {
  transform(
    bapiProductService: BapiProductService,
    translateService: TranslateService,
    currency: ICurrency,
  ): Observable<ProductsSlider> {
    return from(
      new Promise<ProductsSlider>((resolve, reject) => {
        bapiProductService
          .getByIds(this.source.productIds, {
            with: {
              attributes: 'all',
              variants: 'all',
              images: 'all',
            },
          })
          .subscribe(productsData => {
            const resProducts = [];

            productsData.forEach(singleProduct => {
              resProducts.push(new ProductMap(singleProduct, currency, undefined, translateService));
            });
            resolve({
              type: ElementTypes.GRID_PRODUCT_SLIDER,
              data: {
                products: resProducts,
                headlines: this.source.headlines,
              },
            });
          });
      }),
    );
  }
}

export class TrisectionSlidersTransformer extends UnidirectionalTransform<any, TrisectionSliders> {
  transform(): TrisectionSliders {
    return this.source;
  }
}

export class GridTilesTransformer extends UnidirectionalTransform<any, GridTiles> {
  transform(): GridTiles {
    return {
      type: ElementTypes.GRID_TILES,
      data: path(['elementGroups', '0', 'elementGroups'], this.source),
      headline: {
        size: getTextTagForHeadlines(path(['elements', '0', 'attributes', 'size'], this.source), true),
        text: path(['elements', '0', 'attributes', 'text'], this.source),
      },
      defaultButtonText: '',
    };
  }
}

export class StageModuleTransformer extends UnidirectionalTransform<any, StageModule> {
  public source: any;

  transform(): StageModule {
    const res = [];
    this.source.elementGroups.forEach((elementGroup: any) => {
      // mapping headline sizes
      elementGroup = assocPath(
        ['elementGroups', '0', 'elements', '0', 'attributes', 'size'],
        getTextTagForHeadlines(path(['elementGroups', '0', 'elements', '0', 'attributes', 'size'], elementGroup), true),
        elementGroup,
      );
      elementGroup = assocPath(
        ['elementGroups', '0', 'elements', '1', 'attributes', 'size'],
        getTextTagForHeadlines(path(['elementGroups', '0', 'elements', '1', 'attributes', 'size'], elementGroup), true),
        elementGroup,
      );
      // mapping styles
      elementGroup = assocPath(
        ['elementGroups', '0', 'elements', '2', 'attributes', 'style'],
        convertStyleClasses(path(['elementGroups', '0', 'elements', '2', 'attributes', 'style'], elementGroup)),
        elementGroup,
      );
      // mapping attributes
      elementGroup = assocPath(
        ['elementGroups', '0', 'attributes'],
        convertAttributes(path(['elementGroups', '0', 'attributes'], elementGroup)),
        elementGroup,
      );
      const currentElement = elementGroup.elementGroups[0];
      res.push({
        attributes: currentElement.attributes,
        headline: currentElement.elements[0].attributes,
        subline: elementGroup.elementGroups[0].elements[1].attributes,
        cta: currentElement.elements[2].attributes,
        imageUrl: getCdnImageUrl(currentElement.elements[3].attributes.hash),
      });
    });

    return {
      type: ElementTypes.GRID_SLIDER,
      data: res,
    };
  }
}
