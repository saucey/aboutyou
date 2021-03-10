import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LocalizeRouterModule } from '@gilsdav/ngx-translate-router';
import { RegisterPageComponent } from './pages/register/register.component';
import { ConfirmationPageComponent } from './confirmation-page/confirmation-page.component';
import { ReservationConfirmationComponent } from '../reservation-confirmation/reservation-confirmation.component';

const routes: Routes = [
  {
    path: 'reservation-confirmation',
    children: [{ path: '', component: ReservationConfirmationComponent }],
  },
  {
    path: 'newsletter',
    children: [{ path: '', component: RegisterPageComponent }],
  },
  {
    path: 'newsletter-bestaetigen',
    children: [{ path: '', component: ConfirmationPageComponent }],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes), LocalizeRouterModule.forChild(routes)],
  exports: [RouterModule, LocalizeRouterModule],
})
export class NewsletterRoutingModule {}
