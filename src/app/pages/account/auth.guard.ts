import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Store, select } from '@ngrx/store';
import { AppState } from 'src/app/core/shop/store';
import { take, map, skipWhile } from 'rxjs/operators';
import { LocalizeRouterService } from '@gilsdav/ngx-translate-router';
import { selectAccountState, AccountState } from 'src/app/core/shop/store/account';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private store: Store<AppState>, private router: Router, private localize: LocalizeRouterService) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot,
  ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.store.pipe(
      select(selectAccountState),
      skipWhile((accountState: AccountState) => accountState.isLoading),
      take(1),
      map(accountState => {
        if (accountState.isAuthenticated) {
          return true;
        }

        return this.router.createUrlTree([this.localize.translateRoute('/')]);
      }),
    );
  }
}
