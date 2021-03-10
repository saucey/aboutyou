import { NgModule } from '@angular/core';
import { GlobalModule } from 'src/app/common/global.module';
import { TrustedShopComponent } from './trusted-shop.component';

@NgModule({
  declarations: [TrustedShopComponent],
  imports: [GlobalModule],
  exports: [TrustedShopComponent],
})
export class TrustedShopModule {}
