import { InjectionToken } from '@angular/core';
import { OnAppStable } from './on-app-stable';

/**
 * APP_STABLE_INITIALIZER can be used to run logic when the app is first stable.
 *
 * Provide your OnAppStable services with the APP_STABLE_INITIALIZER injection token. Set multi = true
 *
 * In your service make sure to implement OnAppStable interface.
 *
 * In a module add to imports:
 *
 * ```
 *   {provide: APP_STABLE_INITIALIZER, multi: true, useExisting: MyServiceImplementingOnAppStable}
 *
 * ```
 *
 */
export const APP_STABLE_INITIALIZER = new InjectionToken<OnAppStable[]>('APP_STABLE_INITIALIZER', {
  providedIn: 'root',
  factory: () => [],
});
