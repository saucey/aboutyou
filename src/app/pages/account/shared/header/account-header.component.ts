import { Router } from '@angular/router';
import { Component, Input, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { Subscription } from 'rxjs';
import { BreakpointObserverService } from 'src/app/common/services/breakpoint-observer.service';
import { LocalizeRouterService } from '@gilsdav/ngx-translate-router';

@Component({
  selector: 'app-header',
  templateUrl: './account-header.component.html',
  styleUrls: ['./account-header.component.scss'],
})
export class AccountHeaderComponent implements OnInit {
  @Input() title: string;
  public isMobile: boolean;
  public layoutSubscription: Subscription;

  constructor(
    private location: Location,
    private breakpointObserver: BreakpointObserverService,
    private router: Router,
    private localize: LocalizeRouterService,
  ) {}
  ngOnInit() {
    this.layoutSubscription = this.breakpointObserver.getMobileLayoutObserver().subscribe(isMobile => {
      this.isMobile = isMobile;
    });
  }

  goBack() {
    if (this.isMobile && this.router.url.includes('detail')) {
      this.location.back();
    } else {
      this.router.navigate([this.localize.translateRoute('/account')]);
    }
  }
}
