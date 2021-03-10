import { Injectable } from '@angular/core';
import { Location, PlatformLocation } from '@angular/common';
import { Router, RoutesRecognized, ActivatedRouteSnapshot } from '@angular/router';

@Injectable({ providedIn: 'root' })
export class PreviousRouteService {
  private previousRoute: ActivatedRouteSnapshot;
  private previousUrl: string;
  private currentRoute: ActivatedRouteSnapshot;
  private currentUrl: string;

  constructor(private router: Router, private location: Location, private platformLocation: PlatformLocation) {}

  public init() {
    this.location.onUrlChange(url => {
      this.previousUrl = this.currentUrl;
      this.currentUrl = url;
    });
    this.router.events.subscribe(event => {
      if (event instanceof RoutesRecognized) {
        this.previousRoute = this.currentRoute;
        this.currentRoute = event.state.root.firstChild;
      }
    });
    this.platformLocation.onPopState(() => {
      this.previousUrl = this.currentUrl;
      this.currentUrl =
        '/' + this.currentRoute.root.firstChild.url[0].path + '/' + this.currentRoute.children[0].routeConfig.path;
    });
  }

  public getPreviousRoute() {
    return this.previousRoute;
  }

  public getPreviousUrl() {
    return this.previousUrl;
  }
}
