import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription, Observable } from 'rxjs';
import { BreakpointObserverService } from 'src/app/common/services/breakpoint-observer.service';
import { IReservation } from 'src/app/core/shop/types/reservation';
import { ReservationService } from 'src/app/core/services/reservation/reservation.service';
import { getOpenedReservations, getClosedReservations } from '../shared/account-shared-utils';

@Component({
  selector: 'src/app-reservations-page',
  templateUrl: './reservations-page.component.html',
  styleUrls: ['./reservations-page.component.scss'],
})
export class ReservationsPageComponent implements OnInit, OnDestroy {
  isMobile$: Observable<boolean>;
  public reservations: IReservation[];
  public openedReservations: IReservation[];
  public closedReservations: IReservation[];
  private subscription = new Subscription();
  public isLoading: boolean;

  constructor(private breakpointObserver: BreakpointObserverService, private reservationService: ReservationService) {}

  ngOnInit() {
    this.isLoading = true;
    this.isMobile$ = this.breakpointObserver.getMobileLayoutObserver();
    this.subscription.add(
      this.reservationService.getAllReservations().subscribe((allReservations: IReservation[]) => {
        if (typeof allReservations !== 'undefined') {
          allReservations.reverse();
          this.openedReservations = getOpenedReservations(allReservations);
          this.closedReservations = getClosedReservations(allReservations);
        }
        this.reservations = allReservations;
        this.isLoading = false;
      }),
    );
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
