import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ICurrency, IBasketCost } from 'src/app/core/shop/types';

@Component({
  selector: 'app-cost-overview-list',
  templateUrl: './cost-overview.component.html',
  styleUrls: ['./cost-overview.component.scss'],
})
export class CostOverviewComponent {
  @Input() isMobile: boolean;
  @Input() loading = false;
  @Input() basketCost: IBasketCost;
  @Input() currency: ICurrency;
  @Input() totalBasketReduction: number;
  @Output() goToCheckout = new EventEmitter<void>();

  // Adaptions
  @Input() plusProductThresholdReached: boolean;
  @Input() plusProductDifference: number;
  @Input() disabled = false;
}
