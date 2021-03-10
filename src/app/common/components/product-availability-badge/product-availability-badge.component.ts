import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-product-availability-badge',
  templateUrl: './product-availability-badge.component.html',
  styleUrls: ['./product-availability-badge.component.scss'],
})
export class ProductAvailabilityBadgeComponent {
  @Input() type: 'available' | 'rare' | 'unavailable';

  public color: string;
}
