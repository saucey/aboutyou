import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ReservationConfirmationComponent } from './reservation-confirmation.component';

const routes: Routes = [
  {
    path: 'reservation-confirmation',
    children: [{ path: '', component: ReservationConfirmationComponent }],
  },
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ReservationConfirmationRoutingModule {}
