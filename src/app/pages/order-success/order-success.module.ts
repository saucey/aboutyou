import { NgModule } from '@angular/core';
import { GlobalModule } from 'src/app/common/global.module';
import { TranslateModule } from '@ngx-translate/core';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';
import { OrderSuccessComponent } from 'src/app/pages/order-success/order-success.component';
import { OSPSkeletonComponent } from 'src/app/pages/order-success/components/skeletons/osp/osp.skeleton';
import { NextStepsComponent } from './components/next-steps/next-steps.component';
import { RegistrationContainerComponent } from './components/registration-container/registration-container.component';
import { TrustedShopModule } from 'src/app/common/modules/trusted-shop/trusted-shop.module';
import { PersonalGiftBannerComponent } from './components/personal-gift-banner/personal-gift-banner.component';

@NgModule({
  declarations: [
    OrderSuccessComponent,
    OSPSkeletonComponent,
    NextStepsComponent,
    RegistrationContainerComponent,
    PersonalGiftBannerComponent,
  ],
  imports: [GlobalModule, TranslateModule, NgxSkeletonLoaderModule, TrustedShopModule],
})
export class OrderSuccessModule {}
