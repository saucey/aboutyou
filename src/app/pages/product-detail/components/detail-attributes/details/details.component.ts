import { Component, Input } from '@angular/core';
import { ProductMap } from 'src/app/mappers/product';

@Component({
  selector: 'app-product-detail-content-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss'],
})
export class DetailsComponent {
  @Input() product: ProductMap;
  @Input() isBundle: boolean;
}
