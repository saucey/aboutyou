import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-product-thumbnail',
  templateUrl: './thumbnail.component.html',
  styleUrls: ['./thumbnail.component.scss'],
})
export class ThumbnailComponent {
  @Input() size: 'small' | 'large';
  @Input() image: string;
  @Input() active: boolean;
}
