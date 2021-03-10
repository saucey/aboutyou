import { Component, Input } from '@angular/core';
import { ShippingMethod } from 'src/app/mappers/bapi/shipping-method';
import { ProductMap } from 'src/app/mappers/product';

@Component({
  selector: 'app-product-detail-accordion',
  templateUrl: './product-detail-accordion.component.html',
  styleUrls: ['./product-detail-accordion.component.scss'],
})
export class ProductDetailAccordionComponent {
  @Input() product: ProductMap;

  public get shippingMethod(): ShippingMethod {
    if (this.product && this.product.custom) {
      return this.product.custom.shippingMethod;
    } else {
      return undefined;
    }
  }

  public get deliveryTime(): string {
    switch (this.shippingMethod) {
      case ShippingMethod.DEKO:
        return '2-3';
      case ShippingMethod.HERMES:
        return '6-8';
      default:
        throw new Error(`unknown shipping method: ${this.shippingMethod}`);
    }
  }

  public get supplier(): string {
    switch (this.shippingMethod) {
      case ShippingMethod.DEKO:
        return 'DHL';
      case ShippingMethod.HERMES:
        return 'Hermes';
      default:
        throw new Error(`unknown shipping method: ${this.shippingMethod}`);
    }
  }

  public get freeShippingSubtitleKey(): string {
    return `PRODUCT_DETAIL.accordion.freeShipping.subtitle.${this.freeShippingKeySuffix}`;
  }

  public get freeShippingDescriptionKey(): string {
    return `PRODUCT_DETAIL.accordion.freeShipping.description.${this.freeShippingKeySuffix}`;
  }

  public get displayClickAndReserve(): boolean {
    return this.product.custom.showClickReserve;
  }

  // tslint:disable-next-line: cyclomatic-complexity
  private get freeShippingKeySuffix() {
    const price: number = this.product.currentPrice;
    const currency: string = this.product.currency.code;

    if (this.shippingMethod === ShippingMethod.DEKO && currency === 'EUR' && price >= 4900) {
      return `free`;
    } else if (this.shippingMethod === ShippingMethod.DEKO && currency === 'EUR') {
      return `deko`;
    } else if (this.shippingMethod === ShippingMethod.DEKO && currency === 'CHF' && price >= 7500) {
      return `free`;
    } else if (this.shippingMethod === ShippingMethod.DEKO && currency === 'CHF') {
      return `deko`;
    } else if (this.shippingMethod === ShippingMethod.HERMES && currency === 'EUR' && price >= 39900) {
      return `free`;
    } else if (this.shippingMethod === ShippingMethod.HERMES && currency === 'EUR') {
      return `bulky`;
    } else if (this.shippingMethod === ShippingMethod.HERMES && currency === 'CHF' && price >= 49900) {
      return `free`;
    } else if (this.shippingMethod === ShippingMethod.HERMES && currency === 'CHF') {
      return `bulky`;
    } else {
      throw new Error(
        `can't calculate freeShippingKeySuffix with {shippingMethod: ${this.shippingMethod}, price: ${price}, currency: ${currency}}`,
      );
    }
  }
}
