import { Component, Input, OnInit, OnChanges } from '@angular/core';
import { BapiProduct } from '@aboutyou/backbone';
import { ProductMap } from 'src/app/mappers/product';
import { ICurrency } from 'src/app/core/shop/types';

interface BundleItem {
  qty: number;
  mapped: ProductMap;
}

@Component({
  selector: 'app-product-detail-bundle',
  templateUrl: './bundle.component.html',
  styleUrls: ['./bundle.component.scss'],
})
export class BundleComponent implements OnInit, OnChanges {
  @Input() bundleItems: (BapiProduct & { qty: number })[];
  @Input() currency: ICurrency;
  public products: BundleItem[];

  ngOnInit() {
    if (this.bundleItems) {
      this.mapBundleItems();
    }
  }

  ngOnChanges() {
    if (this.bundleItems) {
      this.mapBundleItems();
    }
  }

  mapBundleItems() {
    this.products = this.bundleItems.map(item => ({
      mapped: new ProductMap(item, this.currency),
      qty: item.qty,
    }));
  }
}
