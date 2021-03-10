import { Component, OnDestroy } from '@angular/core';
import { NavigationEnd, Params, Router } from '@angular/router';
import { LocalizeRouterService } from '@gilsdav/ngx-translate-router';
import { CheckoutService } from 'src/app/core/services/checkout/checkout.service';
import { getUrlQueryParams } from 'src/app/core/shop/utils';
import { Base64 } from 'js-base64';
import { Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';
import { BreakpointObserverService } from 'src/app/common/services/breakpoint-observer.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-order-success',
  templateUrl: './order-success.component.html',
  styleUrls: ['./order-success.component.scss'],
})
export class OrderSuccessComponent implements OnDestroy {
  private routeSub: Subscription;
  orderId: number;

  constructor(
    private router: Router,
    private localize: LocalizeRouterService,
    private checkoutService: CheckoutService,
    private breakpointObserver: BreakpointObserverService,
  ) {
    console.log('Trying to load OSP');
    this.retrieveOrderId();
  }

  retrieveOrderId = () => {
    this.routeSub = this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe((event: NavigationEnd) => {
        const params = getUrlQueryParams(event.url);
        this.orderId = this.getOrderId(params);
      });
  };

  getOrderId = (routeParams: Params) => {
    try {
      const parsedQuery = routeParams.cbd;

      if (!parsedQuery) {
        // TODO: Remove. Only for development / testing.
        // Without this line the user will be redirected to the start page,
        // making it impossible to develop and test without a functioning checkout.
        if (environment.environmentName !== 'production') {
          return 123456;
        }

        this.router.navigate([this.localize.translateRoute('/')]);
      }

      const encodedOrderData = parsedQuery.split('.')[0];
      const orderData = JSON.parse(Base64.decode(encodedOrderData));

      const orderId = orderData.order_id;

      if (!orderId) {
        this.router.navigate([this.localize.translateRoute('/')]);
      }

      return orderData.order_id;
    } catch (error) {
      console.log('ERROR');
      this.router.navigate([this.localize.translateRoute('/404')]);
    }
  };

  goToOrdersPage = () => {
    this.breakpointObserver
      .getDesktopLayoutObserver()
      .subscribe(isDesktop => {
        this.checkoutService.redirectToCheckoutAccountArea(!isDesktop);
      })
      .unsubscribe();
  };

  goToHome = () => {
    this.router.navigate([this.localize.translateRoute('/')]);
  };

  public ngOnDestroy() {
    if (this.routeSub) {
      this.routeSub.unsubscribe();
    }
  }
}
