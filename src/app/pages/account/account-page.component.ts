import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AccountService } from 'src/app/core/services/account/account.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { LocalizeRouterService } from '@gilsdav/ngx-translate-router';
import { IReservation } from 'src/app/core/shop/types/reservation';
import { Location } from '@angular/common';
import { OrderService } from 'src/app/core/services/order/order.service';
import { ReservationService } from 'src/app/core/services/reservation/reservation.service';
import { IOrder } from 'src/app/core/shop/types/order';
import { getOpenedReservations } from './shared/account-shared-utils';

@Component({
  selector: 'app-account',
  templateUrl: './account-page.component.html',
  styleUrls: ['./account-page.component.scss'],
})
export class AccountPageComponent implements OnInit, OnDestroy {
  public totalOrders: number;
  public totalReservations: number;
  public openedReservations: number;
  private subscription = new Subscription();

  constructor(
    private accountService: AccountService,
    private orderService: OrderService,
    private reservationService: ReservationService,
    private router: Router,
    private localize: LocalizeRouterService,
    private location: Location,
  ) {}

  ngOnInit() {
    this.subscription.add(
      this.orderService.getAllOrders().subscribe((orders: IOrder[]) => {
        this.totalOrders = orders.length;
      }),
    );

    this.subscription.add(
      this.reservationService.getAllReservations().subscribe((reservations: IReservation[]) => {
        this.openedReservations = getOpenedReservations(reservations).length;
        this.totalReservations = reservations.length;
      }),
    );
  }

  logout() {
    this.router.navigate([this.localize.translateRoute('/')]);
    this.accountService.logout();
  }

  goBack() {
    this.location.back();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
