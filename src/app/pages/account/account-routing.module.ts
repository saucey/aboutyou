import { PersonalDataPageComponent } from './personal-data-page/personal-data-page.component';
import { ReservationsPageComponent } from './reservations-page/reservations-page.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LocalizeRouterModule } from '@gilsdav/ngx-translate-router';
import { AuthGuard } from './auth.guard';
import { AccountPageComponent } from './account-page.component';
import { OrdersPageComponent } from './orders-page/orders-page.component';
import { OrderDetailComponent } from './orders-page/order-detail/order-detail.component';
import { ReservationDetailComponent } from './reservations-page/reservation-detail/reservation-detail.component';
import { OrderType } from './order.type';

const routes: Routes = [
  {
    path: 'account',
    canActivate: [AuthGuard],
    children: [
      { path: '', component: AccountPageComponent },

      {
        path: 'orders',
        children: [
          {
            path: '',
            component: OrdersPageComponent,
            children: [
              {
                path: 'detail/:id',
                component: OrderDetailComponent,
                data: { isMobile: false },
              },
            ],
          },
          {
            path: 'detail/m/:id',
            component: OrderDetailComponent,
            data: { isMobile: true },
          },
        ],
      },

      {
        path: 'reservations',
        children: [
          {
            path: '',
            component: ReservationsPageComponent,
            children: [
              {
                path: 'detail/:id',
                component: ReservationDetailComponent,
                data: { isMobile: false },
              },
            ],
          },
          {
            path: 'detail/m/:id',
            component: ReservationDetailComponent,
            data: { isMobile: true },
          },
        ],
      },
      { path: 'personal-data', component: PersonalDataPageComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes), LocalizeRouterModule.forChild(routes)],
  exports: [RouterModule, LocalizeRouterModule],
})
export class AccountRoutingModule {}
