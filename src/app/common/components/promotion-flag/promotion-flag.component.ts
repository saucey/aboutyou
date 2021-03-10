import { Component, OnInit, OnChanges, Input } from '@angular/core';

@Component({
  selector: 'app-promotion-flag',
  templateUrl: './promotion-flag.component.html',
  styleUrls: ['./promotion-flag.component.scss'],
})
export class PromotionFlagComponent implements OnChanges, OnInit {
  @Input() type: 'sale' | 'new';

  public icon = '';
  public width = '';
  public height = '';

  ngOnInit() {
    this.mapType();
  }

  ngOnChanges() {
    this.mapType();
  }

  mapType() {
    if (this.type === 'sale') {
      this.icon = 'label-sale';
    }

    if (this.type === 'new') {
      this.icon = 'label-new';
    }
  }
}
