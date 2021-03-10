import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/core/shop/store';
import { ACCOUNT_ACTIONS } from 'src/app/core/shop/store/account';
import { IUser } from 'src/app/core/shop/types';
import { stringify } from 'query-string';
import { Subject, Observable } from 'rxjs';
import {
  getAuthenticationUrl,
  getEmbeddedLogoutUrl,
  getLogoutSuccessUrl,
  getCustomerContactUrl,
  getCustomerPersonalUrl,
} from '../resolveEnvs';
import { ShopService } from '../shop.service';
import { CustomerResponse, CustomerContact, CustomerPersonal } from '../../shop/types/account';
import { DatePipe } from '@angular/common';

@Injectable({
  providedIn: 'root',
})
export class AccountService {
  private shopId: number;
  private readonly authUrl: string;

  private readonly embeddedLogoutUrl: string;
  private readonly logoutSuccessUrl: string;

  public loginPopupDisplay = new Subject<boolean>();
  public registrationPopupDisplay = new Subject<boolean>();
  private readonly customerPersonalUrl: string;
  private readonly customerContactUrl: string;

  constructor(
    private store: Store<AppState>,
    private readonly http: HttpClient,
    private shopService: ShopService,
    public datepipe: DatePipe,
  ) {
    this.shopId = this.shopService.getShopId();
    this.authUrl = getAuthenticationUrl();

    this.embeddedLogoutUrl = getEmbeddedLogoutUrl();
    this.logoutSuccessUrl = getLogoutSuccessUrl();
    this.customerPersonalUrl = getCustomerPersonalUrl();
    this.customerContactUrl = getCustomerContactUrl();
  }

  public showEmbeddedLogin() {
    this.registrationPopupDisplay.next(false);
    this.loginPopupDisplay.next(true);
  }
  public hideEmbeddedLogin() {
    this.loginPopupDisplay.next(false);
  }

  public showEmbeddedRegistration() {
    this.loginPopupDisplay.next(false);
    this.registrationPopupDisplay.next(true);
  }
  public hideEmbeddedRegistration() {
    this.registrationPopupDisplay.next(false);
  }

  public logout() {
    const urlParams = stringify({ shopId: this.shopId });
    window.location.href = `${this.embeddedLogoutUrl}?${urlParams}`;
  }

  public getLogoutSuccessPage() {
    const urlParams = stringify({ shopId: this.shopId });
    window.location.href = `${this.logoutSuccessUrl}?${urlParams}`;
  }

  public authenticate() {
    this.http.get(this.authUrl).subscribe(
      (user: IUser) => {
        if (user) {
          this.store.dispatch(ACCOUNT_ACTIONS.setUser(user));
        }
      },
      error => {
        console.log('there was an error', error);
        this.store.dispatch(ACCOUNT_ACTIONS.removerUser());
      },
    );
  }

  public updateContactData(user: CustomerContact): Observable<CustomerResponse> {
    return this.http.patch<CustomerResponse>(this.customerContactUrl, {
      email: user.email,
      phone: user.phone,
    });
  }

  public updatePersonalData(user: CustomerPersonal): Observable<CustomerResponse> {
    return this.http.patch<CustomerResponse>(this.customerPersonalUrl, {
      birthDate: `${user.birthDate.substr(6, 4)}-${user.birthDate.substr(3, 2)}-${user.birthDate.substr(0, 2)}`,
      firstName: user.firstName,
      lastName: user.lastName,
    });
  }
}
