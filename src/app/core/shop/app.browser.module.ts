import { HTTP_INTERCEPTORS, HttpClient } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserTransferStateModule, HAMMER_GESTURE_CONFIG, HammerGestureConfig } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { AddShopIdToRequestInterceptor } from '../services/add-shop-id-interceptor.service';
import { AppComponent } from '../../app.component';
import { AppModule } from '../../app.module';
import { environment } from 'src/environments/environment';

// AoT requires an exported function for factories
export function HttpLoaderFactory(httpClient: HttpClient) {
  // return new TranslateHttpLoader(httpClient, '/assets/i18n/', `.json?v=${process.env.VERSION}`);
  return new TranslateHttpLoader(httpClient, '/assets/i18n/', `.json`);
}

export class ExtendedHammerConfig extends HammerGestureConfig {
  overrides = {
    pinch: { enable: false },
    rotate: { enable: false },
  };
}

@NgModule({
  imports: [
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient],
      },
    }),
    AppModule,
    // configuration of redux dev tools
    ...(environment.productionModeEnabled ? [] : [StoreDevtoolsModule.instrument({ maxAge: 25 })]),
    BrowserTransferStateModule,
    BrowserAnimationsModule,
  ],
  bootstrap: [AppComponent],
  providers: [
    {
      provide: HAMMER_GESTURE_CONFIG,
      useClass: ExtendedHammerConfig,
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AddShopIdToRequestInterceptor,
      multi: true,
    },
  ],
})
export class AppBrowserModule {}
