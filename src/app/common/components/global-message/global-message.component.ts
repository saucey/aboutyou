import { Component, Inject } from '@angular/core';
import { MAT_SNACK_BAR_DATA } from '@angular/material/snack-bar';
import { GlobalMessageData } from './global-message-data';

/**
 *  a component that styles the global message used by e.g. the basket service to show global messages
 */
@Component({
  selector: 'app-global-message',
  templateUrl: './global-message.component.html',
  styleUrls: ['./global-message.component.scss'],
})
export class GlobalMessageComponent {
  constructor(@Inject(MAT_SNACK_BAR_DATA) public data: GlobalMessageData) {}
}
