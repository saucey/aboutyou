import { ICurrency } from 'src/app/core/shop/types';
import { BreakpointObserverService } from 'src/app/common/services/breakpoint-observer.service';
import { Observable, Subscription } from 'rxjs';
import { BasketService } from 'src/app/core/basket';
import { CustomDataMap, ProductMap } from 'src/app/mappers/product';
import { ReservationMessageService } from 'src/app/modules/location-reserve-dialog/reservation-message.service';

import { Variant } from '@aboutyou/backbone/types/BapiProduct';
import { Component, Input, OnChanges, OnInit } from '@angular/core';

@Component({
  selector: 'app-product-detail-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.scss'],
})
export class OverviewComponent implements OnInit, OnChanges {
  @Input() currency: ICurrency;
  @Input() product: ProductMap;

  quantity = 1;
  selectedVariant: Variant;
  subscription: Subscription;
  customData: CustomDataMap;
  public reservationSuccess: false;
  public isMobile$: Observable<boolean>;

  constructor(
    private reservationMessageService: ReservationMessageService,
    private breakpointObserver: BreakpointObserverService,
    private basketService: BasketService,
  ) {
    this.subscription = this.reservationMessageService.getReservationMessage().subscribe(isSet => {
      this.reservationSuccess = isSet;
      setTimeout(() => {
        this.reservationMessageService.clearReservationMessage();
      }, 3000);
    });
  }

  ngOnInit(): void {
    this.customData = this.basketService.getCheckoutCustomDataForDisplayProduct(this.product);
    this.isMobile$ = this.breakpointObserver.getMobileLayoutObserver();
  }

  ngOnChanges() {
    if (this.product) {
      this.selectedVariant = this.product.entity.variants[0];
    }
  }

  handleQuantityChange(value: number) {
    this.quantity = value;
  }

  public removeReservationSuccess() {
    this.reservationSuccess = false;
  }
}
