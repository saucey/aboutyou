import { ApplicationRef, Inject, Injectable } from '@angular/core';
import { first } from 'rxjs/operators';
import { APP_STABLE_INITIALIZER } from './app-stable-initializer.token';
import { OnAppStable } from './on-app-stable';

/**
 * This service runs all `APP_STABLE_INITIALIZER` one time when the app becomes stable.
 * The `AppComponent` calls this service in `onInit`.
 *
 */
@Injectable({ providedIn: 'root' })
export class RunAppStableInitializersService {
  constructor(
    @Inject(APP_STABLE_INITIALIZER) private appStableInitializers: OnAppStable[],
    public appRef: ApplicationRef,
  ) {}

  initAfterAppStable() {
    this.appRef.isStable
      .pipe(first(stable => stable))
      .subscribe(() => this.appStableInitializers.forEach(initializer => initializer.onAppStable()));
  }
}
