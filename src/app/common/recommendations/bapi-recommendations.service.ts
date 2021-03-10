import { ProductsByIdsEndpointResponseData } from '@aboutyou/backbone/endpoints/products/productsByIds';
import { AttributeKey } from '@aboutyou/backbone/types/AttributeOrAttributeValueFilter';
import { Injectable } from '@angular/core';
import { BapiProductService } from 'src/app/core/services/bapi/bapi-product.service';
import { Observable } from 'rxjs/Observable';
import { map } from 'rxjs/operators';
import { ShopService } from 'src/app/core/services/shop.service';
import { getAdvancedAttributeValueByKey, getDisplayableVariantPrices } from 'src/app/core/shop/utils';
import { ADVANCED_ATTRIBUTE_KEY__MASTER_PRODUCT_NAME } from 'src/app/mappers/bapi/constants';
import { RecommendedProduct } from './recommended-product';

@Injectable({ providedIn: 'root' })
export class BapiRecommendationsService {
  constructor(private readonly productService: BapiProductService, private shopService: ShopService) {}

  // TODO #1450 possible optimization: fetch all products at once
  // TODO #1392 clean up SLA / IOSP
  public getByRefKey(referenceKey: string): Observable<RecommendedProduct | null> {
    return this.productService
      .query({
        where: {
          attributes: [
            {
              type: 'attributes',
              key: 'referenceKey' as AttributeKey,
              values: [referenceKey],
            },
          ],
        },
        with: {
          attributes: 'all',
          advancedAttributes: 'all',
          images: 'all',
          variants: 'all',
        },
      })
      .pipe(map(this.toRecommendedProduct.bind(this)));
  }

  // TODO #1392 SLA / IOSP
  private toRecommendedProduct(bapiResponse: ProductsByIdsEndpointResponseData): RecommendedProduct | null {
    if (bapiResponse.entities.length === 0) {
      return null;
    }

    const productTitle = getAdvancedAttributeValueByKey(
      ADVANCED_ATTRIBUTE_KEY__MASTER_PRODUCT_NAME,
      bapiResponse.entities[0],
    ) as string;

    const { currentPrice } = getDisplayableVariantPrices(
      bapiResponse.entities[0],
      this.shopService.getShop().shop.currency,
    );

    // TODO #1454 not season proof, reuse product mapper code
    const imageHash = bapiResponse.entities[0].images[0].hash;

    return { id: bapiResponse.entities[0].id, title: productTitle, price: currentPrice, imageHash };
  }
}
