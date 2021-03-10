import { isPlatformBrowser } from '@angular/common';
import { AfterViewInit, Component, Inject, PLATFORM_ID } from '@angular/core';

@Component({
  selector: 'app-auth-login-success',
  templateUrl: './auth-login-success.component.html',
  styleUrls: ['./auth-login-success.component.scss'],
})
export class AuthLoginSuccessComponent implements AfterViewInit {
  isBrowser: boolean;
  constructor(@Inject(PLATFORM_ID) platformId: object) {
    this.isBrowser = isPlatformBrowser(platformId);
  }

  ngAfterViewInit() {
    if (this.isBrowser) {
      setTimeout(() => {
        window.parent.location.reload();
      }, 1000);
    }
  }
}
