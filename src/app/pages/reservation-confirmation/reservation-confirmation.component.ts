import { Component, OnInit } from '@angular/core';
import { BreakpointObserverService } from 'src/app/common/services/breakpoint-observer.service';
import { Observable } from 'rxjs';
import { LocalizeRouterService } from '@gilsdav/ngx-translate-router';
import { Router } from '@angular/router';

@Component({
  selector: 'app-reservation-confirmation',
  templateUrl: './reservation-confirmation.component.html',
  styleUrls: ['./reservation-confirmation.component.scss'],
})
export class ReservationConfirmationComponent implements OnInit {
  public isMobile$: Observable<boolean>;

  constructor(
    private router: Router,
    private breakpointObserver: BreakpointObserverService,
    private localize: LocalizeRouterService,
  ) {}

  ngOnInit() {
    this.isMobile$ = this.breakpointObserver.getMobileLayoutObserver();
  }
  goToHome = () => {
    this.router.navigate([this.localize.translateRoute('/')]);
  };

  goToAccountReservations = () => {
    this.router.navigate([this.localize.translateRoute('/account/reservations')]);
  };
}
