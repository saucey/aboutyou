import { IModuleExtensions } from 'src/app/core/shop/types';
import { AccordionUspComponent } from './components/usp/accordion-usp/accordion-usp.component';
import { ResponsiveUspListComponent } from './components/usp/responsive-usp-list/responsive-usp-list.component';
import { SimpleUspComponent } from './components/usp/simple-usp/simple-usp.component';
import { AccordionItemDirective } from './directives/accordion-item.directive';
import { ReservationsAvailabilityComponent } from './components/reservations-availability/reservations-availability.component';
import { SubscribeNewsletterComponent } from './components/subscribe-newsletter/subscribe-newsletter.component';
import { ReservationBasketListItemComponent } from './components/reservation-basket-list-item/reservation-basket-list-item.component';

export const globalExtensionsModule: IModuleExtensions = {
  declarations: [
    ResponsiveUspListComponent,
    SimpleUspComponent,
    AccordionUspComponent,
    AccordionItemDirective,
    ReservationsAvailabilityComponent,
    ReservationBasketListItemComponent,
    SubscribeNewsletterComponent,
  ],
  exports: [
    ResponsiveUspListComponent,
    AccordionUspComponent,
    ReservationsAvailabilityComponent,
    SubscribeNewsletterComponent,
  ],
};

// import { IModuleExtensions } from 'app/core/shop/types';
// import { ReservationBasketListItemComponent } from './components/reservation-basket-list-item/reservation-basket-list-item.component';
// import { AccordionUspComponent } from './components/usp/accordion-usp/accordion-usp.component';
// import { ResponsiveUspListComponent } from './components/usp/responsive-usp-list/responsive-usp-list.component';
// import { SimpleUspComponent } from './components/usp/simple-usp/simple-usp.component';
// import { AccordionItemDirective } from './directives/accordion-item.directive';
// import { SubscribeNewsletterComponent } from './components/subscribe-newsletter/subscribe-newsletter.component';

// export const globalExtensionsModule: IModuleExtensions = {
//   declarations: [
//     ResponsiveUspListComponent,
//     SubscribeNewsletterComponent,
//     SimpleUspComponent,
//     AccordionUspComponent,
//     AccordionItemDirective,
//     ReservationBasketListItemComponent,
//   ],
//   exports: [
//     ResponsiveUspListComponent,
//     ReservationBasketListItemComponent,
//     SubscribeNewsletterComponent,
//     AccordionUspComponent,
//   ],
// };
