import { OrderService } from 'src/app/core/services/order/order.service';
import { ICurrency } from 'src/app/core/shop/types';
import { IOrder } from 'src/app/core/shop/types/order';
import { GlobalMessageData } from 'src/app/common/components/global-message/global-message-data';
import { GlobalMessageType } from 'src/app/common/components/global-message/global-message-type';
import { GlobalMessageComponent } from 'src/app/common/components/global-message/global-message.component';
import { Subscription } from 'rxjs';

import { HttpErrorResponse } from '@angular/common/http';
import { Component, Input, OnDestroy } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-invoice',
  templateUrl: './invoice.component.html',
  styleUrls: ['./invoice.component.scss'],
})
export class InvoiceComponent implements OnDestroy {
  @Input() currentOrder: IOrder;
  @Input() currency: ICurrency;
  private subscription = new Subscription();

  constructor(
    private orderService: OrderService,
    private matSnackbar: MatSnackBar,
    private translateService: TranslateService,
  ) {}

  downloadInvoice() {
    this.subscription.add(
      this.orderService.getOrderInvoice(this.currentOrder.id).subscribe(
        url => window.open(url[0].invoiceUrl, '_blank'),
        error => this.handleError(error),
      ),
    );
  }

  handleError(error: HttpErrorResponse) {
    const errorMessage = this.translateService.instant(
      'ACCOUNT.pages.orders.errors.' + (error.status === 404 || error.status === 403 ? 'pending' : 'generic'),
    );
    const data: GlobalMessageData = {
      message: errorMessage,
      type: GlobalMessageType.ERROR,
    };
    this.matSnackbar.openFromComponent(GlobalMessageComponent, {
      data,
      duration: 5000,
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
