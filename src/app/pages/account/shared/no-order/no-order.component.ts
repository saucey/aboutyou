import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-no-order',
  templateUrl: './no-order.component.html',
  styleUrls: ['./no-order.component.scss'],
})
export class NoOrderComponent {
  @Input() title: string;
  @Input() subTitle: string;
}
