import { Component, Input, ElementRef, HostListener } from '@angular/core';
@Component({
  selector: 'app-accordion-item',
  templateUrl: './accordion-item.component.html',
  styleUrls: ['./accordion-item.component.scss'],
})
export class AccordionItemComponent {
  @Input() title: string;
  @Input() icon: string;
  @Input() highlight: boolean;

  constructor(private el: ElementRef) {}

  @HostListener('click') onClick() {
    this.el.nativeElement.querySelector('.accordion-item').classList.toggle('active');
    this.adjustContentHeight();
  }

  @HostListener('window:resize') adjustContentHeight = () => {
    const contentElement = this.el.nativeElement.querySelector('.text');
    contentElement.style.height = this.el.nativeElement.querySelector('.accordion-item').classList.contains('active')
      ? `${contentElement.scrollHeight}px`
      : ``;
  };
}
