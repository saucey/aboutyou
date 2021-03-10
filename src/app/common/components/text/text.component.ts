import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-text',
  templateUrl: './text.component.html',
  styleUrls: ['./text.component.scss'],
})
export class TextComponent {
  @Input() label: string;
  @Input() tag: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
  @Input() color: string;
}
