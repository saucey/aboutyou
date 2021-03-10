import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LocalizeRouterModule } from '@gilsdav/ngx-translate-router';
import { TranslateModule } from '@ngx-translate/core';
import { CheckoutBasketComponent } from './checkout-basket.component';

const routes: Routes = [
  {
    path: '',
    component: CheckoutBasketComponent,
  },
];

@NgModule({
  imports: [TranslateModule, LocalizeRouterModule.forChild(routes), RouterModule.forChild(routes)],
  exports: [RouterModule, LocalizeRouterModule],
})
export class CheckoutBasketRoutingModule {}
