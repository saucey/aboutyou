import { Component, Input } from '@angular/core';

/**
 * Use this to create an icon. It can rendered optimally the available svgs.
 */
@Component({
  selector: 'app-icon',
  templateUrl: './icon.component.html',
  styleUrls: ['./icon.component.scss'],
})
export class IconComponent {
  /** type of icon, can be `'image' | 'picto' | 'flag'` */
  @Input() type: 'icon' | 'picto' | 'flag' = 'icon';
  /** extension of icon, can be `'svg' | 'png'` */
  @Input() ext: 'svg' | 'png' = 'svg';
  /** svg file name */
  @Input() icon: string;
  /** sets the active state. Active icon has an accent color */
  @Input() active: boolean;
  /** sets width css property */
  @Input() width: string;
  /** sets height css property */
  @Input() height: string;
  /** sets scale transform css property */
  @Input() scale = 1;
}
