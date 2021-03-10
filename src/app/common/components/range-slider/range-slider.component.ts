import { Component, Input, OnChanges, OnInit, EventEmitter } from '@angular/core';
import { ChangeContext, Options } from 'ng5-slider';

interface Value {
  min: number;
  max: number;
}

/**
 * A Slider component for displaying a range of value.
 */
@Component({
  selector: 'app-range-slider',
  templateUrl: './range-slider.component.html',
  styleUrls: ['./range-slider.component.scss'],
})
export class RangeSliderComponent implements OnInit, OnChanges {
  /** The value of slider */
  @Input() value: Value;
  /** Lowest possible value */
  @Input() floor: number;
  /** Highest possible value */
  @Input() ceil: number;
  /** Function called when values changing */
  @Input() onChange: (val: Value) => void;
  /** Function called when the user finished dragging slider handle */
  @Input() onChangeCommit: (val: Value, pointerType: 0 | 1) => void;

  /**
   * options for the ng5-slider
   * @ignore : ignore for documentation in storybook
   */
  options: Options;
  manualRefreshEmitter: EventEmitter<void>;

  constructor() {
    // ng5-slider does not work with undefined manualRefresh therefore defaulting to a sample eventemitter
    this.manualRefreshEmitter = new EventEmitter<void>();
  }

  ngOnInit() {
    this.options = {
      floor: this.floor,
      ceil: this.ceil,
      translate: () => '',
    };
  }

  ngOnChanges() {
    this.options = {
      floor: this.floor,
      ceil: this.ceil,
      translate: () => '',
    };
  }

  /**
   * Handles the change event of slider
   * @ignore : ignore for documentation in storybook
   */
  onChangeHandler(changeContext: ChangeContext): void {
    this.onChange({ min: changeContext.value, max: changeContext.highValue });
  }

  /**
   * Handles the finish/end of dragging
   * @ignore : ignore for documentation in storybook
   */
  onChangeCommitHandler(changeContext: ChangeContext): void {
    if (this.onChangeCommit) {
      this.onChangeCommit({ min: changeContext.value, max: changeContext.highValue }, changeContext.pointerType);
    }
  }

  /**
   * Triggers manual UI refresh on range slider component
   */
  manualRefresh() {
    this.manualRefreshEmitter.emit();
  }
}
