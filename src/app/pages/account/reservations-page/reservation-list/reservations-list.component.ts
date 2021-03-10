import { Component, Input, OnChanges, SimpleChanges, OnDestroy, AfterContentInit } from '@angular/core';
import { Router } from '@angular/router';
import { LocalizeRouterService } from '@gilsdav/ngx-translate-router';
import { IReservation } from 'src/app/core/shop/types/reservation';
import { groupByDate } from '../../shared/group-by-date';
import { AccountPageService } from '../../account-page.service';
import { ReservationStatusKeys, ReservationStatus } from '../../order.type';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-reservations-list',
  templateUrl: './reservations-list.component.html',
  styleUrls: ['./reservations-list.component.scss'],
})
export class ReservationsListComponent implements OnChanges, OnDestroy, AfterContentInit {
  @Input() public label: string;
  @Input() public openedReservations: IReservation[];
  @Input() public closedReservations: IReservation[];
  @Input() public isMobile: boolean;
  @Input() public orders: IReservation[];

  public activePage = 1;
  public readonly recordsPerPage = 9;
  public groupedOrders: { [key: string]: IReservation[] };
  public ordersCount = 0;
  public ordersList: IReservation[];

  constructor(
    private localize: LocalizeRouterService,
    private router: Router,
    private accountPageService: AccountPageService,
    private translateService: TranslateService,
  ) {}

  ngAfterContentInit() {
    const order =
      this.accountPageService.getCurrentReservationId() === ''
        ? this.orders[0]
        : this.orders.find(item => item.reservationId === this.accountPageService.getCurrentReservationId());
    if (this.isMobile) {
      this.router.navigate([this.localize.translateRoute('/account/reservations')]);
    }
    this.router.navigate([this.localize.translateRoute('/account/reservations/detail/' + order.reservationId)]);

    const positionCurrentReservationInArray = this.orders.findIndex(
      item => item.reservationId === this.accountPageService.getCurrentReservationId(),
    );
    this.activePage = Math.floor(
      (this.accountPageService.getCurrentReservationId() === '' ? 1 : positionCurrentReservationInArray) /
        this.recordsPerPage +
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

      this.groupedOrders = groupByDate(
        this.closedReservations as IReservation[],
        order => new Date(order.reservationDate),
        sortOptions,
      );
    }
  }

  isActive(order: IReservation): boolean {
    return order.reservationId === this.accountPageService.getCurrentReservationId();
  }

  isCancelled(order: IReservation): boolean {
    return order.status === ReservationStatus.cancelled;
  }

  goToDetails(reservation: IReservation) {
    this.router.navigate([this.localize.translateRoute('/account/reservations/detail/m/' + reservation.reservationId)]);
  }

  displayActivePage(activePageNumber: number) {
    if (this.orders) {
      this.activePage = activePageNumber;
      this.ordersList = this.paginate(this.orders, this.recordsPerPage, this.activePage);
    }
  }

  getFinalPickUpDay(dateValue: string) {
    const date = new Date(dateValue);
    return date.setDate(date.getDate() + 7);
  }

  getOrderStatus(status: number) {
    return this.translateService.instant(
      'ACCOUNT.pages.reservations.statusLabels.' + ReservationStatusKeys.get(status),
    );
  }

  paginate(array: IReservation[], pageSize: number, pageNumber: number) {
    // because pages logically start with 1, but technically with 0
    return array.slice((pageNumber - 1) * pageSize, pageNumber * pageSize);
  }

  ngOnDestroy() {
    window.scrollTo(0, 0);
  }
}
