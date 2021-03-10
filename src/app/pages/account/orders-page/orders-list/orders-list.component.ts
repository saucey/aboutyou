import { Component, Input, OnChanges, SimpleChanges, OnDestroy, AfterContentInit } from '@angular/core';
import { Router } from '@angular/router';
import { LocalizeRouterService } from '@gilsdav/ngx-translate-router';
import { IOrder } from 'src/app/core/shop/types/order';
import { IReservation } from 'src/app/core/shop/types/reservation';
import { groupByDate } from '../../shared/group-by-date';
import { AccountPageService } from '../../account-page.service';
import { OrderStatus, OrderStatusKeys } from '../../order.type';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-orders-list',
  templateUrl: './orders-list.component.html',
  styleUrls: ['./orders-list.component.scss'],
})
export class OrdersListComponent implements OnChanges, OnDestroy, AfterContentInit {
  @Input() public label: string;
  @Input() public isMobile: boolean;
  @Input() public orders: IOrder[];

  public activePage = 1;
  public readonly recordsPerPage = 9;
  public groupedOrders: { [key: string]: IOrder[] | IReservation[] };
  public ordersCount = 0;
  public ordersList: IOrder[];

  constructor(
    private localize: LocalizeRouterService,
    private router: Router,
    private accountPageService: AccountPageService,
    private translateService: TranslateService,
  ) {}

  ngAfterContentInit() {
    const order =
      this.accountPageService.getCurrentOrderId() === null
        ? this.orders[0]
        : this.orders.find(item => item.id === this.accountPageService.getCurrentOrderId());
    if (this.isMobile) {
      this.router.navigate([this.localize.translateRoute('/account/orders')]);
    }
    this.router.navigate([this.localize.translateRoute('/account/orders/detail/' + order.id)]);

    const positionCurrentOrderInArray = this.orders.findIndex(
      item => item.id === this.accountPageService.getCurrentOrderId(),
    );
    this.activePage = Math.floor(
      (this.accountPageService.getCurrentOrderId() === null ? 1 : positionCurrentOrderInArray) / this.recordsPerPage +
        1,
    );
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.orders) {
      this.ordersCount = this.orders.length;
      this.ordersList = this.paginate(this.orders, this.recordsPerPage, this.activePage);
      const sortOptions = {
        month: 'long',
        year: 'numeric',
      };

      this.groupedOrders = groupByDate(this.orders, order => new Date(order.confirmedAt), sortOptions);
    }
  }

  isActive(order: IOrder): boolean {
    return order.id === this.accountPageService.getCurrentOrderId();
  }

  isCancelled(order: IOrder): boolean {
    return order.status === OrderStatus.cancellation_completed;
  }

  displayActivePage(activePageNumber: number) {
    if (this.orders) {
      this.activePage = activePageNumber;
      this.ordersList = this.paginate(this.orders, this.recordsPerPage, this.activePage);
    }
  }

  getOrderStatus(status: OrderStatus) {
    return this.translateService.instant('ACCOUNT.pages.orders.statusLabels.' + OrderStatusKeys.get(status));
  }

  paginate(array: IOrder[], pageSize: number, pageNumber: number) {
    // because pages logically start with 1, but technically with 0
    return array.slice((pageNumber - 1) * pageSize, pageNumber * pageSize);
  }

  ngOnDestroy() {
    window.scrollTo(0, 0);
  }
}
