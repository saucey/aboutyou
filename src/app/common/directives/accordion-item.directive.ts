import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[appAccordionItem]',
})
export class AccordionItemDirective {
  constructor(private el: ElementRef) {}

  @HostListener('click') onClick() {
    this.el.nativeElement.classList.toggle('active');
    this.adjustContentHeight();
  }

  @HostListener('window:resize') adjustContentHeight() {
    const contentElement = this.el.nativeElement.querySelector('.content');
    contentElement.style.height = this.el.nativeElement.classList.contains('active')
      ? `${contentElement.scrollHeight}px`
      : ``;
  }
}
