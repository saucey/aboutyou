import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { BapiProductService } from 'src/app/core/services/bapi/bapi-product.service';
import { ProductMap } from 'src/app/mappers/product';
import { zip } from 'rxjs';
import { AttributeKey } from '@aboutyou/backbone/types/AttributeOrAttributeValueFilter';
import { BapiProduct } from '@aboutyou/backbone';
import { ICurrency } from 'src/app/core/shop/types';

@Component({
  selector: 'app-product-detail-attributes',
  templateUrl: './detail-attributes.component.html',
  styleUrls: ['./detail-attributes.component.scss'],
})
export class DetailAttributesComponent implements OnChanges, OnInit {
  @Input() product: ProductMap;
  @Input() currency: ICurrency;
  @Input() isMobile: boolean;

  public bundleItemsPopulated: (BapiProduct & { qty: number })[];
  public loaded: boolean;

  constructor(private productService: BapiProductService) {}

  ngOnChanges() {
    this.loaded = false;

    // Iterating over BundleItems to query them from bapi
    if (this.product.custom.bundleItems && this.product.custom.bundleItems.length > 0) {
      this.populateBundleItems();
    } else {
      this.loaded = true;
    }
  }

  ngOnInit() {
    if (this.product.custom.bundleItems && this.product.custom.bundleItems.length > 0) {
      this.populateBundleItems();
    } else {
      this.loaded = true;
    }
  }

  populateBundleItems() {
    zip(
      ...this.product.custom.bundleItems.map(item =>
        this.productService.query({
          where: {
            attributes: [
              {
                type: 'attributes',
                key: 'referenceKey' as AttributeKey,
                values: [item.merchantId],
              },
            ],
          },
          with: {
            attributes: 'all',
            advancedAttributes: 'all',
            images: 'all',
            variants: 'all',
          },
        }),
      ),
    ).subscribe(data => {
      // Adding qty from set attribute
      this.bundleItemsPopulated = data.map((result, i) => ({
        ...result.entities[0],
        qty: this.product.custom.bundleItems[i].quantity,
      }));

      this.loaded = true;
    });
  }
}
