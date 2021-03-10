import { isPlatformBrowser } from '@angular/common';
import { AfterViewInit, Directive, ElementRef, Inject, OnDestroy, PLATFORM_ID } from '@angular/core';
import { fromEvent, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Directive({
  selector: '[appSiblingsAccordion]',
})

export class SiblingsAccordionDirective implements AfterViewInit, OnDestroy {
  private unsubscribe$ = new Subject<void>();

  private isBrowser: boolean;

  constructor(public el: ElementRef<any>, @Inject(PLATFORM_ID) platformId: object) {
    this.isBrowser = isPlatformBrowser(platformId);
  }

  ngAfterViewInit() {
    if (this.isBrowser) {
      if (this.el.nativeElement.offsetHeight < this.el.nativeElement.querySelector('.items').scrollHeight) {
        this.el.nativeElement.classList.add('collapsable', 'collapsed');
      }

      const resize$ = fromEvent(window, 'resize').pipe(takeUntil(this.unsubscribe$));
      resize$.subscribe(() => this.adjustHeight());

      const click$ = fromEvent(this.el.nativeElement.querySelector('.arrow-handle'), 'click').pipe(
        takeUntil(this.unsubscribe$),
      );

      click$.subscribe(() => {
        this.el.nativeElement.classList.toggle('collapsed');
        this.adjustHeight();
      });
    }
  }

  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  adjustHeight = () =>
    (this.el.nativeElement.style.height = this.el.nativeElement.classList.contains('collapsed')
      ? ''
      : `${this.el.nativeElement.querySelector('.items').scrollHeight}px`);
}
