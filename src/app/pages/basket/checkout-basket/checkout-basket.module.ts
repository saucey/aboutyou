import { NgModule } from '@angular/core';
import { BasketListGroupedByPackageComponent } from '../components/basket-list-grouped-by-package/basket-list-grouped-by-package.component';
import { BasketPackageInfoComponent } from '../components/basket-list-grouped-by-package/basket-package-info/basket-package-info.component';
import { BasketListComponent } from '../components/basket-list/basket-list.component';
import { SkeletonCostOverviewComponent } from '../components/skeleton-cost-overview/cost-overview.skeleton';
import { SharedModule } from '../shared/shared.module';
import { BasketListHeaderComponent } from './basket-list-header/basket-list-header.component';
import { CheckoutBasketRoutingModule } from './checkout-basket-routing.module';
import { CheckoutBasketComponent } from './checkout-basket.component';
import { PaymentMethodsComponent } from './payment-methods/payment-methods.component';
import { PaymentPartnerComponent } from './payment-partner/payment-partner.component';

@NgModule({
  declarations: [
    CheckoutBasketComponent,
    BasketListComponent,
    BasketListGroupedByPackageComponent,
    BasketListHeaderComponent,
    BasketPackageInfoComponent,
    PaymentMethodsComponent,
    PaymentPartnerComponent,
    SkeletonCostOverviewComponent,
  ],
  imports: [CheckoutBasketRoutingModule, SharedModule],
})
export class CheckoutBasketModule {}
