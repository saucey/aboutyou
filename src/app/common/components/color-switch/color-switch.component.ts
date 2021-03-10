import { Component, Input } from '@angular/core';

/**
 * Color display component. Displays the color given
 */
@Component({
  selector: 'app-color-switch',
  templateUrl: './color-switch.component.html',
  styleUrls: ['./color-switch.component.scss'],
})
export class ColorSwitchComponent {
  /** Color hex value */
  @Input() color: string;
  /** Border color hex value */
  @Input() borderColor: string;
  /** sets the active state */
  @Input() active: boolean;

  /**
   * state variable for hovered state
   * @ignore : ignore for documentation in storybook
   */
  public hovered: boolean;
}
