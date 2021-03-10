/**
 * OnAppStable can be used to run logic when the app is first stable.
 *
 * Provide your OnAppStable services with the `APP_STABLE_INITIALIZER` injection token. Make sure to configure `multi:true`
 * to not override all other `APP_STABLE_INITIALIZER`
 *
 * In a module add to imports:
 *
 * ```
 *   {provide: APP_STABLE_INITIALIZER, multi: true, useExisting: MyServiceImplementingOnAppStable}
 *
 * ```
 *
 */
export interface OnAppStable {
  onAppStable(): void;
}
