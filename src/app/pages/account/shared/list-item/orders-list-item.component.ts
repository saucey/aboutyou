import { Component, Input } from '@angular/core';
import { LocalizeRouterService } from '@gilsdav/ngx-translate-router';
import { Router } from '@angular/router';

@Component({
  selector: 'app-orders-list-item',
  templateUrl: './orders-list-item.component.html',
  styleUrls: ['./orders-list-item.component.scss'],
})
export class OrdersListItemComponent {
  @Input() public isMobile: boolean;
  @Input() public isActive: boolean;
  @Input() public isCancelled: boolean;
  @Input() public type: string;
  @Input() public date: Date;
  @Input() public id: number;
  @Input() public referenceKey: number;
  @Input() public total: number;
  @Input() public status: string;

  constructor(private router: Router, private localize: LocalizeRouterService) {}

  getDetailLink() {
    this.router.navigate([
      this.localize.translateRoute('/account/' + this.type + '/detail/' + (this.isMobile ? 'm/' : '') + this.id),
    ]);
  }
}
