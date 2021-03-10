import { isPlatformBrowser } from '@angular/common';
import { AfterViewInit, Component, Inject, PLATFORM_ID } from '@angular/core';
import { AccountService } from 'src/app/core/services/account/account.service';

@Component({
  selector: 'app-auth-logout-success',
  templateUrl: './auth-logout-success.component.html',
  styleUrls: ['./auth-logout-success.component.scss'],
})
export class AuthLogoutSuccessComponent implements AfterViewInit {
  isBrowser: boolean;
  constructor(@Inject(PLATFORM_ID) platformId: object, private accountService: AccountService) {
    this.isBrowser = isPlatformBrowser(platformId);
  }

  ngAfterViewInit() {
    if (this.isBrowser) {
      this.accountService.getLogoutSuccessPage();
    }
  }
}
