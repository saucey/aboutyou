import { Component, Input } from '@angular/core';
import { CarrierKeyIcons } from './carrier-key-icons';

export const DEFAULT_DATE_FORMAT = 'dd.MM.';

@Component({
  selector: 'app-basket-package-info',
  templateUrl: './basket-package-info.component.html',
  styleUrls: ['./basket-package-info.component.scss'],
})
export class BasketPackageInfoComponent {
  mappedIcon: string;

  @Input() minDeliveryDate: string;
  @Input() maxDeliveryDate: string;
  @Input() packageIndex = 1;
  @Input() dateFormat: string = DEFAULT_DATE_FORMAT;
  @Input() set carrierKey(carrierKey: keyof typeof CarrierKeyIcons | string) {
    this.mappedIcon = carrierKey ? CarrierKeyIcons[carrierKey] : null;
  }
}
