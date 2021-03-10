import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-product-tag-box',
  templateUrl: './product-tag-box.component.html',
  styleUrls: ['./product-tag-box.component.scss'],
})
export class ProductTagBoxComponent {
  @Input() variant: 'primary';

  public color: string;
}
