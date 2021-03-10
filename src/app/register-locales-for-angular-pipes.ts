import { registerLocaleData } from '@angular/common';
import localeDe from '@angular/common/locales/de';
import localeAt from '@angular/common/locales/de-AT';
import localeCh from '@angular/common/locales/de-CH';
import localeChFr from '@angular/common/locales/fr-CH';

export function registerLocalesForAngularPipes() {
  registerLocaleData(localeDe, 'de');
  registerLocaleData(localeAt, 'at');
  registerLocaleData(localeCh, 'ch');
  registerLocaleData(localeChFr, 'fr');
}
