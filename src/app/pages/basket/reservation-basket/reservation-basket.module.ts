import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { ReservationBasketListComponent } from './reservation-basket-list/reservation-basket-list.component';
import { ReservationBasketRoutingModule } from './reservation-basket-routing.module';
import { ReservationBasketComponent } from './reservation-basket.component';

@NgModule({
  declarations: [ReservationBasketComponent, ReservationBasketListComponent],
  imports: [ReservationBasketRoutingModule, SharedModule],
})
export class ReservationBasketModule {}
