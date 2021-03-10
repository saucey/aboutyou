import { NgModule } from '@angular/core';
import { BillingComponent } from 'src/app/pages/checkout/pages/billing/billing.component';
import { ShippingComponent } from 'src/app/pages/checkout/pages/shipping/shipping.component';

@NgModule({
  declarations: [ShippingComponent, BillingComponent],
  imports: [],
  providers: [],
})
export class CheckoutModule {}
