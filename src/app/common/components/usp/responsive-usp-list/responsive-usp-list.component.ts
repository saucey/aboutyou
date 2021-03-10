import { Component, Input } from '@angular/core';
import { UspContent } from '../usp-content';
@Component({
  selector: 'app-responsive-usp-list',
  templateUrl: './responsive-usp-list.component.html',
  styleUrls: ['./responsive-usp-list.component.scss'],
})
export class ResponsiveUspListComponent {
  @Input() usps: UspContent[];
}
