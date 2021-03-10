import { Component, Input } from '@angular/core';

/**
 * Checkbox component.
 * **When To Use**
 * > Used for selecting multiple values from several options.
 * > If you use only one checkbox, it is the same as using Switch to toggle between two states.
 */
@Component({
  selector: 'app-checkbox',
  templateUrl: './checkbox.component.html',
  styleUrls: ['./checkbox.component.scss'],
})
export class CheckboxComponent {
  /** Label to display */
  @Input() label: string;
  /** Used for setting the currently selected value. */
  @Input() selected: boolean;
}
