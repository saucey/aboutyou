import { Component, Input } from '@angular/core';
@Component({
  selector: 'app-stage',
  templateUrl: './stage.component.html',
  styleUrls: ['./stage.component.scss'],
})
export class StageComponent {
  @Input() headline: string;
  @Input() subHeadline: string;
}
