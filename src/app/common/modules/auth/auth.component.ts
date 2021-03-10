import { isPlatformBrowser } from '@angular/common';
import { AfterContentInit, Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { NavigationEnd, Router } from '@angular/router';
import { AccountService } from 'src/app/core/services/account/account.service';
import { getEmbeddedLoginUrl, getEmbeddedRegistrationUrl } from 'src/app/core/services/resolveEnvs';
import { ShopService } from 'src/app/core/services/shop.service';
import { from, Observable, Subject } from 'rxjs';
import { filter, takeUntil } from 'rxjs/operators';
import { BreakpointObserverService } from '../../services/breakpoint-observer.service';
import { stringify } from 'query-string';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss'],
})
export class AuthComponent implements OnInit, AfterContentInit {
  public embeddedLoginUrl: string;
  public embeddedLoginRedirectUrl: SafeResourceUrl;
  public embeddedRegistrationUrl: string;
  public embeddedRegistrationRedirectUrl: SafeResourceUrl;
  public isLoginPopupDisplayed$: Observable<boolean>;
  public isRegistrationPopupDisplayed$: Observable<boolean>;
  public isDesktop: boolean;
  public layoutSub$ = new Subject<void>();
  shopId: number;
  isBrowser: boolean;

  constructor(
    private accountService: AccountService,
    private router: Router,
    private sanitizer: DomSanitizer,
    private shopService: ShopService,
    private breakpointObserver: BreakpointObserverService,
    @Inject(PLATFORM_ID) platformId: object,
  ) {
    this.isBrowser = isPlatformBrowser(platformId);
    this.shopId = this.shopService.getShopId();
    this.embeddedLoginUrl = getEmbeddedLoginUrl();
    this.embeddedRegistrationUrl = getEmbeddedRegistrationUrl();
  }

  ngOnInit() {
    this.isLoginPopupDisplayed$ = this.accountService.loginPopupDisplay.asObservable();
    this.isRegistrationPopupDisplayed$ = this.accountService.registrationPopupDisplay.asObservable();

    this.watchRouteChanges();
    this.authenticate();
  }

  closeLoginPopup() {
    this.accountService.hideEmbeddedLogin();
  }

  closeRegistrationPopup() {
    this.accountService.hideEmbeddedRegistration();
  }

  watchRouteChanges() {
    this.router.events.pipe(filter(event => event instanceof NavigationEnd)).subscribe(() => {
      this.closeLoginPopup();
      this.closeRegistrationPopup();
    });
  }

  authenticate() {
    if (this.isBrowser) {
      this.accountService.authenticate();
    }
  }

  ngAfterContentInit(): void {
    from(this.breakpointObserver.getDesktopLayoutObserver())
      .pipe(takeUntil(this.layoutSub$))
      .subscribe(isDesktop => {
        if (this.isDesktop !== isDesktop) {
          this.isDesktop = isDesktop;
          this.setRedirectUrl();
        }
      });
  }

  setRedirectUrl() {
    const urlParams = stringify({ isMobile: !this.isDesktop, shopId: this.shopId });

    const loginUrl = `${this.embeddedLoginUrl}?${urlParams}`;
    this.embeddedLoginRedirectUrl = this.sanitizer.bypassSecurityTrustResourceUrl(loginUrl);

    const registrationUrl = `${this.embeddedRegistrationUrl}?${urlParams}`;
    this.embeddedRegistrationRedirectUrl = this.sanitizer.bypassSecurityTrustResourceUrl(registrationUrl);
  }
}
