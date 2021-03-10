import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription, Observable } from 'rxjs';
import { BreakpointObserverService } from 'src/app/common/services/breakpoint-observer.service';
import { OrderService } from 'src/app/core/services/order/order.service';
import { IOrder } from 'src/app/core/shop/types/order';

@Component({
  selector: 'app-orders',
  templateUrl: './orders-page.component.html',
})
export class OrdersPageComponent implements OnInit, OnDestroy {
  isMobile$: Observable<boolean>;
  public orders: IOrder[];
  private subscription = new Subscription();
  public isLoading: boolean;

  constructor(private breakpointObserver: BreakpointObserverService, private orderService: OrderService) {}

  ngOnInit() {
    this.isLoading = true;
    this.isMobile$ = this.breakpointObserver.getMobileLayoutObserver();
    this.subscription.add(
      this.orderService.getAllOrders().subscribe((allOrders: IOrder[]) => {
        this.isLoading = false;
        this.orders = allOrders;
      }),
    );
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
