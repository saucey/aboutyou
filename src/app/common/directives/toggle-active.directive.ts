import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[appToggleActive]',
})
export class ToggleActiveDirective {
  constructor(private el: ElementRef) {}

  @HostListener('click') onClick() {
    this.el.nativeElement.classList.toggle('active');
  }
}
