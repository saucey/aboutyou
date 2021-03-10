import { Component, Input } from '@angular/core';

export interface SimpleUspContent {
  iconName: string;
  headline: string;
  short: string;
}

@Component({
  selector: 'app-simple-usp',
  templateUrl: './simple-usp.component.html',
  styleUrls: ['./simple-usp.component.scss'],
})
export class SimpleUspComponent {
  @Input() inputs: SimpleUspContent;
}
