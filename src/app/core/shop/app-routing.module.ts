import { Location } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import {
  CacheMechanism,
  LocalizeParser,
  LocalizeRouterModule,
  LocalizeRouterSettings,
  ManualParserLoader,
} from '@gilsdav/ngx-translate-router';
import { TranslateService } from '@ngx-translate/core';
import { ShopService } from 'src/app/core/services/shop.service';
import { CONSTANTS } from './constants';
import { routes } from './routes';

export function createTranslateLoader(
  translate: TranslateService,
  location: Location,
  settings: LocalizeRouterSettings,
  shopService: ShopService,
) {
  const { locales, shop, alwaysAddLocaleToUrl } = shopService.getShop();
  const localizeSettings: LocalizeRouterSettings = {
    ...settings,
    alwaysSetPrefix: alwaysAddLocaleToUrl,
    defaultLangFunction: () => shop.locale,
  };
  const localesToLoad = locales.length ? locales : [shop.locale];
  return new ManualParserLoader(translate, location, localizeSettings, localesToLoad, 'ROUTES.');
}

@NgModule({
  imports: [
    LocalizeRouterModule.forRoot(routes, {
      parser: {
        provide: LocalizeParser,
        useFactory: createTranslateLoader,
        deps: [TranslateService, Location, LocalizeRouterSettings, ShopService],
      },
      useCachedLang: true,
      cacheMechanism: CacheMechanism.Cookie,
      cookieFormat: '{{value}};{{expires:10}};', // 10 days
      cacheName: CONSTANTS.cookie.language,
    }),
    RouterModule.forRoot(routes, { anchorScrolling: 'enabled' }),
  ],
  exports: [RouterModule, LocalizeRouterModule],
})
export class AppRoutingModule {}
