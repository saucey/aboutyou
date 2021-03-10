import { Component, Input, OnDestroy } from '@angular/core';
import { CrossengageService } from 'src/app/core/services/crossengage/crossengage.service';
import { filter, switchMap } from 'rxjs/operators';
import { MatSnackBar } from '@angular/material';
import { TranslateService } from '@ngx-translate/core';
import { GlobalMessageType } from 'src/app/common/components/global-message/global-message-type';
import { GlobalMessageComponent } from 'src/app/common/components/global-message/global-message.component';
import { GlobalMessageData } from 'src/app/common/components/global-message/global-message-data';
import { FormControl, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-subscribe-newsletter',
  templateUrl: './subscribe-newsletter.component.html',
  styleUrls: ['./subscribe-newsletter.component.scss'],
})
export class SubscribeNewsletterComponent implements OnDestroy {
  @Input() subline: string;
  @Input() headline: string;
  @Input() placeholder: string;
  @Input() submit: string;
  @Input() disclaimer: string;
  @Input() source: string;

  emailControl = new FormControl('', [Validators.required]);
  private subscription = new Subscription();

  constructor(
    private matSnackbar: MatSnackBar,
    private translateService: TranslateService,
    private crossengageService: CrossengageService,
  ) {}

  submitNewsletter() {
    if (!this.emailControl.valid) {
      return;
    }
    this.subscription.add(
      this.crossengageService
        .getUser(this.emailControl.value)
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
        .pipe(
          switchMap(() =>
            this.crossengageService.postUser({
              email: this.emailControl.value,
              source: this.source,
            }),
          ),
        )
        .subscribe(
          res => {
            console.log('res', res);
            this.showSuccess();
          },
          err => this.showCheckFailedError(),
        ),
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

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
