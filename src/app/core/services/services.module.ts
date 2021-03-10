import { CommonModule } from '@angular/common';
import { NgModule, Optional, SkipSelf } from '@angular/core';
import { BasketModule } from 'src/app/core/basket';
import { InlineSVGModule } from 'ng-inline-svg';
import { CookieService } from 'ngx-cookie-service';

@NgModule({
  declarations: [],
  imports: [CommonModule, BasketModule, InlineSVGModule.forRoot()],
  providers: [CookieService],
})
export class ServicesModule {
  constructor(@Optional() @SkipSelf() parentModule: ServicesModule) {
    if (parentModule) {
      throw new Error('ServicesModule is already loaded. Import it in the AppModule only');
    }
  }
}
