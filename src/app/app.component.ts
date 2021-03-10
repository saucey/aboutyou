import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { PreviousRouteService } from 'src/app/core/services/previous-route.service';
import { routeAnimations } from 'src/app/core/shop/routeAnimations';
import { RunAppStableInitializersService } from 'src/app/core/app-stable-initializer/run-app-stable-initializers.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  encapsulation: ViewEncapsulation.None,
  animations: [routeAnimations],
})
export class AppComponent implements OnInit {
  constructor(
    public previousRouteService: PreviousRouteService,

    public runAppStableInitializerService: RunAppStableInitializersService,
  ) {
    previousRouteService.init(); // In order to initialize service from beginning
  }

  ngOnInit(): void {
    this.runAppStableInitializerService.initAfterAppStable();
  }

  prepareRouteAnimation(outlet: RouterOutlet) {
    return outlet && outlet.activatedRouteData && outlet.activatedRouteData.animation;
  }
}
