import { BreakpointObserver } from '@angular/cdk/layout';
import { Injectable } from '@angular/core';
import { from, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { CONFIG } from 'src/app/configs';

@Injectable({ providedIn: 'root' })
export class BreakpointObserverService {
  constructor(private breakpointObserver: BreakpointObserver) {}

  public getMobileLayoutObserver() {
    const mobileBreakpoint = CONFIG.common.breakpoints.mobile;

    return from(this.breakpointObserver.observe([`(max-width: ${mobileBreakpoint - 1}px)`])).pipe(
      map(result => result.matches),
    );
  }

  public getTabletLayoutObserver() {
    const tabletBreakpoint = CONFIG.common.breakpoints.tablet;
    if (tabletBreakpoint === undefined) {
      return of(false);
    }

    return from(this.breakpointObserver.observe([`(max-width: ${tabletBreakpoint - 1}px)`])).pipe(
      map(result => result.matches),
    );
  }

  public getDesktopLayoutObserver() {
    const desktopBreakpoint = CONFIG.common.breakpoints.tablet || CONFIG.common.breakpoints.mobile;

    return from(this.breakpointObserver.observe([`(min-width: ${desktopBreakpoint}px)`])).pipe(
      map(result => result.matches),
    );
  }
}
