import { OrderService } from 'src/app/core/services/order/order.service';
import { ShopService } from 'src/app/core/services/shop.service';
import { ICurrency } from 'src/app/core/shop/types';
import { IOrder } from 'src/app/core/shop/types/order';
import { BreakpointObserverService } from 'src/app/common/services/breakpoint-observer.service';
import { isEmpty } from 'ramda';
import { Observable, Subscription } from 'rxjs';
import { switchMap, tap } from 'rxjs/operators';

import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { LocalizeRouterService } from '@gilsdav/ngx-translate-router';
import { TranslateService } from '@ngx-translate/core';

import { AccountPageService } from '../../account-page.service';
import { OrderStatus, OrderStatusKeys } from '../../order.type';

@Component({
  selector: 'app-order-detail',
  templateUrl: './order-detail.component.html',
  styleUrls: ['./order-detail.component.scss'],
})
export class OrderDetailComponent implements OnInit, OnDestroy {
  public isCollapsed = true;
  public isLoading: boolean;
  public orderSignal$: Observable<void>;
  public currentOrder: IOrder;
  public isMobile: boolean;
  public isMobileRoute: boolean;
  public currency: ICurrency;
  public groupedProducts: any;
  public isSingleAddress: boolean;
  private subscription = new Subscription();

  constructor(
    private orderService: OrderService,
    private breakpointObserver: BreakpointObserverService,
    private route: ActivatedRoute,
    private router: Router,
    private accountPageService: AccountPageService,
    private localize: LocalizeRouterService,
    private shopService: ShopService,
    private translateService: TranslateService,
  ) {
    this.currency = this.shopService.getShop().shop.currency;
  }

  ngOnInit() {
    this.isLoading = true;
    this.orderSignal$ = this.route.params.pipe(
      tap((params: Params) => {
        this.accountPageService.setCurrentOrderId(Number(params.id));
      }),
      switchMap((params: Params) => {
        return this.orderService.fetchOrderByIdAndMergeMappedProductData(params.id);
      }),
    );

    this.subscription.add(
      this.orderSignal$.subscribe(() => {
        this.currentOrder = this.orderService.currentOrder;
        this.isLoading = false;
        this.isSingleAddress = this.currentOrder.address.billing.street === this.currentOrder.address.shipping.street;
      }),
    );

    this.subscription.add(
      this.breakpointObserver.getMobileLayoutObserver().subscribe(isMobile => {
        this.isMobile = isMobile;
        const isMobileRoute = this.route.snapshot.data.isMobile;
        const id = this.route.snapshot.params.id;
        if (!isMobile && isMobileRoute) {
          this.router.navigate([this.localize.translateRoute('/account/orders/detail/' + id)]);
        }
      }),
    );
  }

  getProductsByPackageId(id: number) {
    return this.currentOrder.items.filter(item => item.packageId === id);
  }

  isCurrentOrder() {
    return this.currentOrder && !isEmpty(this.currentOrder);
  }

  isCancelled(order: IOrder): boolean {
    return order.status === OrderStatus.cancellation_completed;
  }

  getOrderStatus(status: OrderStatus) {
    return this.translateService.instant('ACCOUNT.pages.orders.statusLabels.' + OrderStatusKeys.get(status));
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
