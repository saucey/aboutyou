import { AccountPageService } from './../../account-page.service';
import { switchMap, tap } from 'rxjs/operators';
import { Subscription, Observable } from 'rxjs';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { BreakpointObserverService } from 'src/app/common/services/breakpoint-observer.service';
import { LocalizeRouterService } from '@gilsdav/ngx-translate-router';
import { ShopService } from 'src/app/core/services/shop.service';
import { ICurrency } from 'src/app/core/shop/types';
import { ReservationService } from 'src/app/core/services/reservation/reservation.service';
import { IReservationDetail, IReservationItem } from 'src/app/core/shop/types/reservation';
import { ReservationStatus, ReservationStatusKeys } from '../../order.type';
import { TranslateService } from '@ngx-translate/core';
import { MatDialog } from '@angular/material';
import { LazyGoogleMapsService } from '../../../../modules/location-reserve-dialog/lazy-google-maps.service';
import { MapDialogData } from 'src/app/common/components/dialog/map-dialog-data';
import { MapDialogComponent } from 'src/app/common/components/dialog/map-dialog.component';

@Component({
  selector: 'app-reservation-detail',
  templateUrl: './reservation-detail.component.html',
  styleUrls: ['./reservation-detail.component.scss'],
})
export class ReservationDetailComponent implements OnInit, OnDestroy {
  public isCollapsed = true;
  public isLoading: boolean;
  public orderSubscription: Subscription;
  public reservation$: Observable<void>;
  public currentReservation: IReservationDetail;
  public layoutSubscription: Subscription;
  public isMobile: boolean;
  public isMobileRoute: boolean;
  public currency: ICurrency;
  public groupedProducts: any;
  private subscription = new Subscription();

  constructor(
    private reservationService: ReservationService,
    private breakpointObserver: BreakpointObserverService,
    private route: ActivatedRoute,
    private router: Router,
    private accountPageService: AccountPageService,
    private localize: LocalizeRouterService,
    private shopService: ShopService,
    private translateService: TranslateService,
    private dialog: MatDialog,
    private lazyGoogleMapsService: LazyGoogleMapsService,
  ) {
    this.currency = this.shopService.getShop().shop.currency;
  }

  ngOnInit() {
    this.isLoading = true;
    this.reservation$ = this.route.params.pipe(
      tap((params: Params) => {
        this.accountPageService.setCurrentReservationId(params.id);
      }),
      switchMap((params: Params) => {
        return this.reservationService.getReservationById(params.id);
      }),
    );

    this.subscription.add(
      this.reservation$.subscribe(() => {
        this.currentReservation = this.reservationService.currentReservation;
        this.isLoading = false;
      }),
    );

    this.subscription.add(
      this.breakpointObserver.getMobileLayoutObserver().subscribe(isMobile => {
        this.isMobile = isMobile;
        const isMobileRoute = this.route.snapshot.data.isMobile;
        const id = this.route.snapshot.params.id;
        if (!isMobile && isMobileRoute) {
          this.router.navigate([this.localize.translateRoute('/account/reservations/detail/' + id)]);
        }
      }),
    );
  }

  getFinalPickUpDay(dateValue: string) {
    const date = new Date(dateValue);
    return date.setDate(date.getDate() + 7);
  }

  isCancelled(order: IReservationDetail): boolean {
    return order.status === ReservationStatus.cancelled;
  }

  getOrderStatus(status: number) {
    return this.translateService.instant(
      'ACCOUNT.pages.reservations.statusLabels.' + ReservationStatusKeys.get(status),
    );
  }

  openMapDialog(event: Event): void {
    event.preventDefault();
    event.stopPropagation();
    this.subscription.add(
      this.lazyGoogleMapsService.runMap().subscribe(e => {
        this.dialog.open<MapDialogComponent, MapDialogData>(MapDialogComponent, {
          width: '100vw',
          height: '85%',
          data: {
            address: `${this.currentReservation.branch.address} ${this.currentReservation.branch.city}`,
          },
        });
      }),
    );
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
