import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NewsletterRoutingModule } from './newsletter-routing.module';
import { TranslateModule } from '@ngx-translate/core';
import { AccordionGroupComponent } from './components/accordion-group/accordion-group.component';
import { AccordionItemComponent } from './components/accordion-item/accordion-item.component';
import { InfoTooltipComponent } from './components/info-tooltip/info-tooltip.component';
import { StageComponent } from './components/stage/stage.component';
import { ConfirmationPageComponent } from './confirmation-page/confirmation-page.component';
import { GlobalModule } from 'src/app/common/global.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { MAT_DATE_FORMATS } from '@angular/material';
import { MomentDateModule } from '@angular/material-moment-adapter';
import { RegisterPageComponent } from './pages/register/register.component';

@NgModule({
  declarations: [
    AccordionGroupComponent,
    AccordionItemComponent,
    InfoTooltipComponent,
    StageComponent,
    ConfirmationPageComponent,
    RegisterPageComponent,
  ],
  imports: [CommonModule, NewsletterRoutingModule, GlobalModule, NgbModule, TranslateModule, MomentDateModule],
  providers: [
    {
      provide: MAT_DATE_FORMATS,
      useValue: {
        parse: {
          dateInput: 'DD.MM.YYYY',
        },
        display: {
          dateInput: 'DD.MM.YYYY',
          monthYearLabel: 'MMM YYYY',
          dateA11yLabel: 'LL',
          monthYearA11yLabel: 'MMMM YYYY',
        },
      },
    },
  ],
})
export class NewsletterModule {}
