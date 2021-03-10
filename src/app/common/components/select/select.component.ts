import { Component, Input, OnInit } from '@angular/core';
import contains from 'ramda/es/contains';
import equals from 'ramda/es/equals';
import includes from 'ramda/es/includes';
import reject from 'ramda/es/reject';
import sort from 'ramda/es/sort';

interface Value {
  id: string;
  name: string;
}

/**
 * Select component to select value from options.
 *
 * **When To Use**
 *
 * A select menu for displaying choices - be it single or multiple choices - an elegant alternative to the native <select> element.
 */
@Component({
  selector: 'app-select',
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.scss'],
})
export class SelectComponent implements OnInit {
  /** Set mode of Select. `multiple | single` */
  @Input() mode: 'multiple' | 'single';
  /** Custom class name to apply to the element */
  @Input() className?: string;
  /** Items to display */
  @Input() items: Value[];
  /** Selected values */
  @Input() value?: Value[];
  /** Function which gets called when value changes */
  @Input() onChange?: (values: Value[]) => void;
  /** Type of element to display. Can be `'checkbox' | 'color'` */
  @Input() type: 'checkbox' | 'color' | 'button';
  /** Should show selected items before others */
  @Input() selectedItemsFirst: boolean;

  // State
  /**
   * state variable for the selected values
   * @ignore : ignore for documentation in storybook
   */
  selectedValues: Value[];
  /**
   * state variable for the displayed items
   * @ignore : ignore for documentation in storybook
   */
  displayedItems: Value[];

  ngOnInit() {
    if (this.mode === 'single' && this.value && this.value.length > 1) {
      throw new Error('More than 1 selected value in `single mode`');
    }

    this.selectedValues = this.value && this.value.length ? this.value : [];
    if (this.selectedItemsFirst) {
      this.displayedItems = sort(
        (a, b) => (includes(b, this.selectedValues) ? 1 : 0) - (includes(a, this.selectedValues) ? 1 : 0),
        this.items,
      );
    } else {
      this.displayedItems = this.items;
    }
  }

  /**
   * handles click on any item.
   * If its not selected, it gets selected.
   * If its already selected, it gets deselected.
   * @ignore : ignore for documentation in storybook
   */
  onClickHandler = (val: Value) => {
    if (this.mode === 'multiple') {
      if (contains(val, this.selectedValues)) {
        const updatedSelection = reject(equals(val))(this.selectedValues);
        this.selectedValues = updatedSelection;
        if (this.onChange) {
          this.onChange(updatedSelection);
        }
      } else {
        const updatedSelection = [val, ...this.selectedValues];
        this.selectedValues = updatedSelection;
        if (this.onChange) {
          this.onChange(updatedSelection);
        }
      }
    } else {
      this.selectedValues = [val];
      if (this.onChange) {
        this.onChange([val]);
      }
    }
  };

  /**
   * Checks if an item is selected or not
   * @ignore : ignore for documentation in storybook
   */
  isSelected = (val: Value) => contains(val, this.selectedValues);
}
