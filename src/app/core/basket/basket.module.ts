import { HttpClientModule } from '@angular/common/http';
import { NgModule, Optional, SkipSelf } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { BasketEffects } from './state';

@NgModule({
  declarations: [],
  imports: [HttpClientModule, EffectsModule.forFeature([BasketEffects])],
  providers: [],
})
export class BasketModule {
  constructor(@Optional() @SkipSelf() parentModule: BasketModule) {
    if (parentModule) {
      throw new Error('BasketModule is already loaded. Import it in the AppModule only');
    }
  }
}
