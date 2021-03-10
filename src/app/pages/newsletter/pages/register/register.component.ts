import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { BreakpointObserverService } from 'src/app/common/services/breakpoint-observer.service';
import { Subscription } from 'rxjs';
import { CrossengageService } from 'src/app/core/services/crossengage/crossengage.service';
import { filter, switchMap } from 'rxjs/operators';
import { MatSnackBar } from '@angular/material';
import { TranslateService } from '@ngx-translate/core';
import { GlobalMessageType } from 'src/app/common/components/global-message/global-message-type';
import { GlobalMessageComponent } from 'src/app/common/components/global-message/global-message.component';
import { GlobalMessageData } from 'src/app/common/components/global-message/global-message-data';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterPageComponent implements OnInit, OnDestroy {
  newsletterForm = new FormGroup({
    gender: new FormControl(''),
    firstName: new FormControl(''),
    lastName: new FormControl(''),
    birthDate: new FormControl(''),
    email: new FormControl('', [Validators.required]),
  });

  isMobile: boolean;
  layoutSubscription: Subscription;

  constructor(
    private matSnackbar: MatSnackBar,
    private translateService: TranslateService,
    private crossengageService: CrossengageService,
    private breakpointObserver: BreakpointObserverService,
  ) {}

  ngOnInit() {
    this.layoutSubscription = this.breakpointObserver.getMobileLayoutObserver().subscribe(isMobile => {
      this.isMobile = isMobile;
    });
  }

  ngOnDestroy() {
    this.layoutSubscription.unsubscribe();
  }

  submitNewsletter() {
    this.crossengageService
      .getUser(this.newsletterForm.get('email').value)
      .pipe(
        filter(res => {
          if (res.status === 'open' || res.status === 'unsubscribed' || res.status === 'subscribed') {
            return true;
          } else if (res.status === 'confirmed') {
            this.showSubscribedError();
          } else {
            this.showCheckFailedError();
          }
          return false;
        }),
      )
      .pipe(switchMap(() => this.crossengageService.postUser(this.newsletterForm.value)))
      .subscribe(
        res => this.showSuccess(),
        err => this.showCheckFailedError(),
      );
  }

  showErrorNotification(messageKey: string) {
    const errorMessage = this.translateService.instant(messageKey);
    const data: GlobalMessageData = {
      message: errorMessage,
      type: GlobalMessageType.ERROR,
    };
    this.matSnackbar.openFromComponent(GlobalMessageComponent, {
      data,
      duration: 5000,
    });
  }

  showSuccessNotification(messageKey: string) {
    const message = this.translateService.instant(messageKey);
    const data: GlobalMessageData = {
      message,
      type: GlobalMessageType.SUCCESS,
    };
    this.matSnackbar.openFromComponent(GlobalMessageComponent, {
      data,
      duration: 5000,
    });
  }

  showSubscribedError = () => this.showErrorNotification('NEWSLETTER.errors.alreadySubscribedError');
  showCheckFailedError = () => this.showErrorNotification('NEWSLETTER.errors.checkFailedError');
  showSuccess = () => this.showSuccessNotification('NEWSLETTER.success');
}
