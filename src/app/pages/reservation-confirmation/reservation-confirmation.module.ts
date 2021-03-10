import { NgModule } from '@angular/core';
import { ReservationConfirmationRoutingModule } from './reservation-confirmation-routing.module';
import { TranslateModule } from '@ngx-translate/core';
import { ReservationConfirmationComponent } from './reservation-confirmation.component';
import { GlobalModule } from 'src/app/common/global.module';

@NgModule({
  declarations: [ReservationConfirmationComponent],
  imports: [ReservationConfirmationRoutingModule, GlobalModule, TranslateModule],
})
export class ReservationConfirmationModule {}
