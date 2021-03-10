import { isPlatformBrowser } from '@angular/common';
import { AfterViewInit, Component, Inject, PLATFORM_ID } from '@angular/core';

@Component({
  selector: 'app-auth-login-failed',
  templateUrl: './auth-login-failed.component.html',
  styleUrls: ['./auth-login-failed.component.scss'],
})
export class AuthLoginFailedComponent implements AfterViewInit {
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
