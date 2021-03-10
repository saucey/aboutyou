import { NgModule } from '@angular/core';
import { AccountRoutingModule } from './account-routing.module';
import { TranslateModule } from '@ngx-translate/core';
import { AccountPageComponent } from './account-page.component';
import { AccountHeaderComponent } from './shared/header/account-header.component';
import { SkeletonOverviewComponent } from './shared/skeleton/overview/skeleton-overview.component';
import { SkeletonDetailComponent } from './shared/skeleton/detail/skeleton-detail.component';
import { PaginationComponent } from './shared/pagination/pagination.component';
import { OrdersListComponent } from './orders-page/orders-list/orders-list.component';
import { OrdersListItemComponent } from './shared/list-item/orders-list-item.component';
import { OrdersPageComponent } from './orders-page/orders-page.component';
import { NoOrderComponent } from './shared/no-order/no-order.component';
import { ProductItemComponent } from './shared/product-item/product-item.component';
import { OrderDetailComponent } from './orders-page/order-detail/order-detail.component';
import { ReservationDetailComponent } from './reservations-page/reservation-detail/reservation-detail.component';
import { InvoiceComponent } from './orders-page/invoice/invoice.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';
import { ReservationsPageComponent } from './reservations-page/reservations-page.component';
import { ReservationsListComponent } from './reservations-page/reservation-list/reservations-list.component';
import { PersonalDataPageComponent } from './personal-data-page/personal-data-page.component';
import { PersonalFormComponent } from './personal-data-page/personal-form/personal-form.component';
import { NewsletterFormComponent } from './personal-data-page/newsletter-form/newsletter-form.component';
import { DatePipe } from '@angular/common';
import { GlobalModule } from 'src/app/common/global.module';

@NgModule({
  declarations: [
    AccountPageComponent,
    OrdersPageComponent,
    OrdersListComponent,
    ReservationsListComponent,
    OrdersListItemComponent,
    AccountHeaderComponent,
    SkeletonOverviewComponent,
    SkeletonDetailComponent,
    PaginationComponent,
    NoOrderComponent,
    ProductItemComponent,
    OrderDetailComponent,
    ReservationDetailComponent,
    NoOrderComponent,
    InvoiceComponent,
    ReservationsPageComponent,
    PersonalDataPageComponent,
    PersonalFormComponent,
    NewsletterFormComponent,
  ],
  imports: [AccountRoutingModule, GlobalModule, TranslateModule, NgbModule, NgxSkeletonLoaderModule],
  providers: [DatePipe],
})
export class AccountModule {}
