import { Component, Input } from '@angular/core';

/**
 * Link Component to display links in the CI of the shop.
 */
@Component({
  selector: 'app-link',
  templateUrl: './link.component.html',
  styleUrls: ['./link.component.scss'],
})
export class LinkComponent {
  /** url to redirect to */
  @Input() url: string;

  /** target for the a tag */
  @Input() target: '_blank' | '_self';

  /** style of the link */
  @Input() variant: 'primary' | 'primary-green' | 'secondary' | 'secondary-green';

  /** flag to specify whether to use links with angular router or native href */
  @Input() useAngularRouter = true;
}
