import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
  selector: 'app-footer-bar',
  templateUrl: './bar.component.html',
  styleUrls: ['./bar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BarComponent {
  @Input() reduced = false;
}
