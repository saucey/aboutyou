import { Component, OnInit, Input, HostListener, ElementRef, Inject } from '@angular/core';
import equals from 'ramda/es/equals';

interface Value {
  id: string;
  name: string;
}

/**
 * A dropdown list.
 *
 * **When To Use**
 *
 * When there are more than a few options to choose from, you can wrap them in a Dropdown.
 * By Clicking on the trigger, a dropdown menu will appear, which allows you to choose an option and execute the relevant action.
 */
@Component({
  selector: 'app-dropdown',
  templateUrl: './dropdown.component.html',
  styleUrls: ['./dropdown.component.scss'],
})
export class DropdownComponent implements OnInit {
  /** Items to render in the dropdown list */
  @Input() items: Value[];
  /** Selected Items in the list */
  @Input() value?: Value;
  /** Function called when a value is selected/deselected */
  @Input() onChange?: (values: Value[]) => void;
  /** Label displayed in front of the dropdown */
  @Input() sortByLabel: string;

  /**
   * state variable for the expanded state
   * @ignore : ignore for documentation in storybook
   */
  expanded = false;
  /**
   * state variable for the selected values
   * @ignore : ignore for documentation in storybook
   */
  selectedValue: Value;

  /**
   * Handles document click events to set the expanded state of the dropdown
   * @ignore : ignore for documentation in storybook
   */
  @HostListener('document:click', ['$event'])
  clickout(event: Event) {
    if (!this.eRef.nativeElement.contains(event.target)) {
      this.expanded = false;
    }
  }

  constructor(@Inject(ElementRef) private eRef: ElementRef) {}

  ngOnInit() {
    this.selectedValue = this.value || this.items[0];
  }

  /**
   * Toggles the expanded state
   * @ignore : ignore for documentation in storybook
   */
  toggleExpanded = () => {
    const expanded = !this.expanded;
    this.expanded = expanded;
  };

  /**
   * Handles the click on any item from the list
   * @ignore : ignore for documentation in storybook
   */
  onClickHandler = (val: Value) => {
    this.selectedValue = val;
    if (this.onChange) {
      this.onChange([val]);
    }
    this.toggleExpanded();
  };

  /**
   * Checks if the element is selected or not
   * @ignore : ignore for documentation in storybook
   */
  isSelected = (val: Value) => equals(val, this.selectedValue);
}
