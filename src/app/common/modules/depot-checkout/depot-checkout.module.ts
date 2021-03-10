import { NgModule } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { CheckoutService } from 'src/app/core/services/checkout/checkout.service';
import { GlobalModule } from 'src/app/common/global.module';
import { DepotCheckoutService } from './depot-checkout.service';
import { PlusProductThresholdDialogComponent } from './plus-product-threshold-dialog/plus-product-threshold-dialog.component';

@NgModule({
  imports: [GlobalModule, TranslateModule],
  declarations: [PlusProductThresholdDialogComponent],
  entryComponents: [PlusProductThresholdDialogComponent],
  // we override the CheckoutService to handle plus product checkout process
  providers: [{ provide: CheckoutService, useClass: DepotCheckoutService }],
})
export class DepotCheckoutModule {}
