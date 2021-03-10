import { NgModule } from '@angular/core';
import { Actions } from '@ngrx/effects';
import { ActionsSubject } from '@ngrx/store';
import { Action } from '@ngrx/store/src/models';
import { provideMockStore } from '@ngrx/store/testing';
import { initialState as basket } from '../../app/core/basket/state';
import { AppState } from '../../app/core/shop/store';
import { initialState as account } from '../../app/core/shop/store/account';
import { initialState as categories } from '../../app/core/shop/store/categories';
import { initialState as ui } from '../../app/core/shop/store/ui';
import { initialState as wishlist } from '../../app/core/shop/store/wishlist';
import { ReplaySubject } from 'rxjs';

@NgModule({
  providers: [
    provideMockStore<AppState>({
      initialState: {
        basket,
        wishlist,
        account,
        categories,
        ui,
      },
    }),
    // get this from TestBed to emit actions.
    {
      provide: ActionsSubject,
      useFactory: () => new ReplaySubject<Action>(1),
    },
    {
      provide: Actions,
      useFactory: actionSubject => new Actions(actionSubject.asObservable()),
      deps: [ActionsSubject],
    },
  ],
})
export class NgrxTestingModule {}
