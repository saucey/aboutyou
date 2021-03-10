import { Component, Input } from '@angular/core';
import { ProductMap } from 'src/app/mappers/product';
@Component({
  selector: 'app-product-detail-content-hints',
  templateUrl: './hints.component.html',
  styleUrls: ['./hints.component.scss'],
})
export class HintsComponent {
  @Input() product: ProductMap;
}
