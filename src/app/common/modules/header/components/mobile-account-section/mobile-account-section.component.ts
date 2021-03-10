import { Component, Input, OnDestroy } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { AppState } from 'src/app/core/shop/store';
import { AccountService } from 'src/app/core/services/account/account.service';
import { Subscription } from 'rxjs';
import { getAuthenticated, getUser } from 'src/app/core/shop/store/account';
import { LocalizeRouterService } from '@gilsdav/ngx-translate-router';
import { Router } from '@angular/router';

@Component({
  selector: 'app-mobile-account-section',
  templateUrl: './mobile-account-section.component.html',
  styleUrls: ['./mobile-account-section.component.scss'],
})
export class MobileAccountSectionComponent implements OnDestroy {
  @Input() openedChanged: (opened: boolean) => void;
  @Input() toggleBurgerMenu: () => void;
  @Input() redirectToCheckoutAccountArea: () => void;
  @Input() redirectToCheckoutOrdersArea: () => void;

  opened: boolean;
  isAuthenticated: boolean;
  accountSub: Subscription;
  userSub: Subscription;
  user: any;

  constructor(
    private store: Store<AppState>,
    private accountService: AccountService,
    private router: Router,
    private localize: LocalizeRouterService,
  ) {
    this.watchAccount();
  }

  private watchAccount() {
    this.accountSub = this.store.pipe(select(getAuthenticated)).subscribe(isAuthenticated => {
      this.isAuthenticated = isAuthenticated;
      if (!isAuthenticated) {
        this.setOpenedState(false);
      }
    });
    this.userSub = this.store.pipe(select(getUser)).subscribe(user => {
      this.user = user;
    });
  }

  private navigateAndCloseBurgerMenu(route: string) {
    this.router.navigate([this.localize.translateRoute(route)]);
    this.toggleBurgerMenu();
  }

  setOpenedState(val: boolean) {
    this.opened = val;
    if (this.openedChanged) {
      this.openedChanged(val);
    }
  }

  handleLogoutClick() {
    this.accountService.logout();
  }

  handleLoginClick() {
    this.accountService.showEmbeddedLogin();
    this.toggleBurgerMenu();
  }

  handleRegistrationClick() {
    this.accountService.showEmbeddedRegistration();
    this.toggleBurgerMenu();
  }

  goToAccount() {
    this.navigateAndCloseBurgerMenu('/account');
  }

  goToReservations() {
    this.navigateAndCloseBurgerMenu('/account/reservations');
  }

  goToOrders() {
    this.navigateAndCloseBurgerMenu('/account/orders');
  }

  goToPersonalData() {
    this.navigateAndCloseBurgerMenu('/account/personal-data');
  }

  ngOnDestroy() {
    this.accountSub.unsubscribe();
    this.userSub.unsubscribe();
  }
}
