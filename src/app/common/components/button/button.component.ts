import { Component, Input } from '@angular/core';

/**
 * To trigger an operation.
 *
 * **When To Use**
 *
 * A button means an operation (or a series of operations). Clicking a button will trigger corresponding business logic.
 */
@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss'],
})
export class ButtonComponent {
  /** Set the loading status of button */
  @Input() loading: boolean;
  /** Set the type/variant of button to render */
  @Input() variant:
    | 'primary'
    | 'secondary'
    | 'secondary-outline'
    | 'secondary-holo-dark'
    | 'secondary-holo-light'
    | 'secondary-filled-default'
    | 'default'
    | 'purchase'
    | 'accept';
  /** Set disabled state of button */
  @Input() disabled: boolean;
  /** Set selected state of button	 */
  @Input() selected: boolean;

  get classes(): string {
    if (!(this.selected || this.variant)) {
      return '';
    }

    const classes = [];
    if (this.variant) {
      classes.push(this.variant);
    }
    if (this.selected) {
      classes.push('selected');
    }
    return classes.join(', ');
  }
}
