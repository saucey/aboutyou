import { BasketService, selectBasketIsLoading } from 'src/app/core/basket';
import { AppState } from 'src/app/core/shop/store';
import { Observable } from 'rxjs';
import { CustomDataMap } from 'src/app/mappers/product';

import { Component, Input, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-add-to-basket',
  templateUrl: './add-to-basket.component.html',
  styleUrls: ['./add-to-basket.component.scss'],
})
export class AddToBasketComponent implements OnInit {
  @Input() quantity: number;
  @Input() variantId: number;
  @Input() customData: CustomDataMap;

  loading$: Observable<boolean>;

  constructor(private basketService: BasketService, private store: Store<AppState>) {}

  addToBasket() {
    this.basketService.addOrUpdateItem(this.variantId, this.quantity, this.customData);
  }

  ngOnInit(): void {
    this.loading$ = this.store.select(selectBasketIsLoading);
  }
}
