import { AfterViewInit, Component, Input, OnChanges, SimpleChanges, ViewChild } from '@angular/core';
import equals from 'ramda/es/equals';
import { ICurrency } from 'src/app/core/shop/types';
import { RangeSliderComponent } from 'src/app/common/components/range-slider/range-slider.component';

interface Value {
  min: number;
  max: number;
}

@Component({
  selector: 'app-price-range',
  templateUrl: './price-range.component.html',
  styleUrls: ['./price-range.component.scss'],
})
export class PriceRangeComponent implements OnChanges, AfterViewInit {
  @Input() value: Value;
  @Input() floor: number;
  @Input() ceil: number;
  @Input() currency: ICurrency;
  @Input() onChange: (val: Value, pointerType: 0 | 1) => void;
  @ViewChild(RangeSliderComponent, { static: true })
  private rangeSliderComponent: RangeSliderComponent;

  minValSet: number;
  maxValSet: number;

  ngAfterViewInit() {
    this.setState(this.value);
  }

  ngOnChanges(changes: SimpleChanges) {
    if (!equals(changes.value.currentValue, changes.value.previousValue)) {
      this.setState(this.value);
    }
  }

  setState = (val: Value) => {
    this.minValSet = val.min;
    this.maxValSet = val.max;
  };

  onChangeHandler = (val: Value) => {
    this.setState(val);
  };

  onChangeCommitHandler = (val: Value, pointerType: 0 | 1) => {
    this.setState(val);
    if (this.onChange) {
      this.onChange(val, pointerType);
    }
  };

  refreshRangeSlider() {
    this.rangeSliderComponent.manualRefresh();
  }
}
