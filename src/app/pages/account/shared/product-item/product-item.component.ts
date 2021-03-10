import { Component, Input } from '@angular/core';
import { ICurrency } from 'src/app/core/shop/types';
import { EnergyLabel } from 'src/app/common/components/energy-flag/energy-flag.component';

@Component({
  selector: 'app-product-item',
  templateUrl: './product-item.component.html',
  styleUrls: ['./product-item.component.scss'],
})
export class ProductItemComponent {
  @Input() product: any;
  @Input() currency: ICurrency;
  energyLab: EnergyLabel;

  sumAmountUnitPrice(): number {
    return this.product.unitPrice * this.product.quantity;
  }

  sumAmountOldPrice(): number {
    return this.product.mappedProduct.oldPrice * this.product.quantity;
  }

  sumAmountDiscountPrice(): number {
    return this.product.mappedProduct.currentPrice * this.product.quantity;
  }
}
