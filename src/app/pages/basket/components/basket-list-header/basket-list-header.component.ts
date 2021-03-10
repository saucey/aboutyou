import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-basket-list-header',
  templateUrl: './basket-list-header.component.html',
  styleUrls: ['./basket-list-header.component.scss'],
})
export class BasketListHeaderComponent {
  @Input() basketItemsLength: number;
  @Input() showTitle = true;
}
