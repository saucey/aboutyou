import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-load-more',
  templateUrl: './load-more.component.html',
  styleUrls: ['./load-more.component.scss'],
})
export class LoadMoreComponent {
  @Input() progress: {
    total: number;
    loaded: number;
  };
  @Input() progressText: string;
  @Input() buttonLabel: string;
  @Input() loading: boolean;

  getProgressPercent = () => {
    return (this.progress.loaded / this.progress.total) * 100;
  };
}
