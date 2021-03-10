import { Component, OnInit } from '@angular/core';
import { ShopService } from 'src/app/core/services/shop.service';

@Component({
  selector: 'app-payment-partner',
  templateUrl: './payment-partner.component.html',
  styleUrls: ['./payment-partner.component.scss'],
})
export class PaymentPartnerComponent implements OnInit {
  logo: string;
  constructor(private shopService: ShopService) {}

  ngOnInit() {
    const shopId = this.shopService.getShop().shop.shopId;
    if (shopId === 1) {
      this.logo = 'payback';
    } else if (shopId === 3032 || shopId === 3031) {
      this.logo = 'cumulus';
    } else if (shopId === 3) {
      this.logo = 'mydepot';
    }
  }
}
