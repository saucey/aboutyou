import { Component, Input } from '@angular/core';

export interface AccordionUspContent {
  iconName: string;
  headline: string;
  long: string;
  short: string;
  link?: string;
}

@Component({
  selector: 'app-accordion-usp',
  templateUrl: './accordion-usp.component.html',
  styleUrls: ['./accordion-usp.component.scss'],
})
export class AccordionUspComponent {
  @Input() inputs: AccordionUspContent;
}
