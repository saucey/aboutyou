import { Component, OnInit } from '@angular/core';
import { BreakpointObserverService } from 'src/app/common/services/breakpoint-observer.service';
import { Router } from '@angular/router';
import { getUrlQueryParams } from 'src/app/core/shop/utils';
import { CrossengageService } from 'src/app/core/services/crossengage/crossengage.service';

@Component({
  selector: 'app-confirmation-page',
  templateUrl: './confirmation-page.component.html',
  styleUrls: ['./confirmation-page.component.scss'],
})
export class ConfirmationPageComponent implements OnInit {
  success: boolean;
  error: boolean;

  constructor(
    private crossengageService: CrossengageService,
    private router: Router,
    private breakpointObserver: BreakpointObserverService,
  ) {}

  ngOnInit() {
    const currentUrl: string = this.router.url;
    const { emailHash } = getUrlQueryParams(currentUrl);

    if (!emailHash) {
      this.error = true;

      return;
    }

    this.crossengageService.putUser(emailHash as string).subscribe(
      res => (this.success = true),
      err => (this.error = true),
    );
  }
}
