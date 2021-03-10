import { Component, Input } from '@angular/core';

/**
 * A circle button.
 *
 * **Use case**
 *
 * Render a Circular button with a icon as content inside it.
 */
@Component({
  selector: 'app-circle-button',
  templateUrl: './circle-button.component.html',
  styleUrls: ['./circle-button.component.scss'],
})
export class CircleButtonComponent {
  /** Border color hex value */
  @Input() borderColor: string;
  /** Tooltip value */
  @Input() tooltip: string;
}
