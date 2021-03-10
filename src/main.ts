import 'hammerjs';
import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { environment } from 'src/environments/environment';
import { AppBrowserModule } from './app/core/shop/app.browser.module';

if (environment.productionModeEnabled) {
  enableProdMode();
}

document.addEventListener('DOMContentLoaded', () => {
  platformBrowserDynamic()
    .bootstrapModule(AppBrowserModule)
    .catch(err => console.error(err));
});
