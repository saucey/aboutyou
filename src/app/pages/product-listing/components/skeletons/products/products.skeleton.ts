import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-skeleton-products',
  templateUrl: './product.skeleton.html',
  styles: [':host {width: 100%; order: 99999;}', '.row {padding: 0 1rem}', '.products {padding-top: 1rem}'],
})
export class SkeletonProductsComponent {
  @Input() showHeadline: boolean;
  @Input() productsCount: number;
}
