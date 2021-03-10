import { NgModule } from '@angular/core';
import { FooterComponent } from './footer.component';
import { GlobalModule } from 'src/app/common/global.module';
import { LocalizeRouterModule } from '@gilsdav/ngx-translate-router';
import { TranslateModule } from '@ngx-translate/core';
import { BarComponent } from './components/bar/bar.component';
import { TrustedShopModule } from '../trusted-shop/trusted-shop.module';

@NgModule({
  declarations: [FooterComponent, BarComponent],
  imports: [GlobalModule, LocalizeRouterModule, TranslateModule, TrustedShopModule],
  exports: [FooterComponent],
})
export class FooterModule {}
