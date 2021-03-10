import { NgModule } from '@angular/core';
import { MatTabsModule } from '@angular/material/tabs';
import { LocalizeRouterModule } from '@gilsdav/ngx-translate-router';
import { TranslateModule } from '@ngx-translate/core';
import { GlobalModule } from 'src/app/common/global.module';
import { BasketComponent } from './basket.component';

@NgModule({
  declarations: [BasketComponent],
  imports: [GlobalModule, MatTabsModule, LocalizeRouterModule, TranslateModule],
  exports: [BasketComponent],
})
export class BasketModule {}
