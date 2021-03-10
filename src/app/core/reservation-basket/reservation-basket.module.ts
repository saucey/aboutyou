import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { APP_STABLE_INITIALIZER } from 'src/app/core/app-stable-initializer/app-stable-initializer.token';
import { ReservationBasketService } from './reservation-basket.service';
import { ReservationBasketEffects, reservationBasketReducer } from './state';

@NgModule({
  declarations: [],
  imports: [
    HttpClientModule,
    StoreModule.forFeature('reservationBasket', reservationBasketReducer),
    EffectsModule.forFeature([ReservationBasketEffects]),
  ],
  providers: [
    {
      provide: APP_STABLE_INITIALIZER,
      multi: true,
      useFactory: (reservationBasketService: ReservationBasketService) => ({
        onAppStable: () => reservationBasketService.onAppStable(),
      }),
      deps: [ReservationBasketService],
    },
  ],
})
export class ReservationBasketModule {}
