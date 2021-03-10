import { Component, Input, OnDestroy, ViewChild } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { AccountService } from 'src/app/core/services/account/account.service';
// tslint:disable-next-line
import { HeaderIconDropdownComponent } from 'src/app/common/components/header-icon-dropdown/header-icon-dropdown.component';
import { AppState } from 'src/app/core/shop/store';
import { getAuthenticated, getUser } from 'src/app/core/shop/store/account';
import { Subscription } from 'rxjs';
import { IUser } from 'src/app/core/shop/types';

@Component({
  selector: 'app-user-icon-dropdown',
  templateUrl: './user-icon-dropdown.component.html',
  styleUrls: ['./user-icon-dropdown.component.scss'],
})
export class UserIconDropdownComponent implements OnDestroy {
  @Input() customClass: string;
  @Input() redirectToCheckoutAccountArea: () => void;
  @Input() redirectToCheckoutOrdersArea: () => void;

  @ViewChild(HeaderIconDropdownComponent, { static: true })
  dropDown: HeaderIconDropdownComponent;

  isAuthenticated: boolean;

  accountSub: Subscription;
  userSub: Subscription;
  user: IUser;

  constructor(private store: Store<AppState>, private accountService: AccountService) {
    this.watchAccount();
  }

  private watchAccount() {
    this.accountSub = this.store.pipe(select(getAuthenticated)).subscribe(isAuthenticated => {
      this.isAuthenticated = isAuthenticated;
    });
    this.userSub = this.store.pipe(select(getUser)).subscribe(user => {
      this.user = user;
    });
  }

  handleLoginClick = () => {
    // login
    this.dropDown.closePanel();
    this.accountService.showEmbeddedLogin();
  };

  handleRegistrationClick = () => {
    this.dropDown.closePanel();
    this.accountService.showEmbeddedRegistration();
  };

  handleLogoutClick = () => {
    this.dropDown.closePanel();
    this.accountService.logout();
  };

  preventClick($event: Event) {
    $event.stopPropagation();
  }

  ngOnDestroy() {
    this.accountSub.unsubscribe();
    this.userSub.unsubscribe();
  }
}
