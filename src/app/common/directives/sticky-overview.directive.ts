import { isPlatformBrowser } from '@angular/common';
import { AfterContentInit, Directive, ElementRef, Inject, OnDestroy, PLATFORM_ID } from '@angular/core';
import { Dictionary } from 'ramda';
import { fromEvent, Observable, Subject } from 'rxjs';
import { filter, takeUntil } from 'rxjs/operators';
import { BreakpointObserverService } from 'src/app/common/services/breakpoint-observer.service';

@Directive({
  selector: '[appStickyOverview]',
})
export class StickyOverviewDirective implements AfterContentInit, OnDestroy {
  private unsubscribe$ = new Subject<void>();

  private resize$: Observable<Event>;
  private scroll$: Observable<Event>;

  private isBrowser: boolean;
  private isMobile = false;

  private initialYOffset: number;

  constructor(
    private breakpointObserver: BreakpointObserverService,
    public el: ElementRef<any>,
    @Inject(PLATFORM_ID) platformId: object,
  ) {
    this.isBrowser = isPlatformBrowser(platformId);
  }

  ngAfterContentInit() {
    if (!this.isBrowser) {
      return;
    }
    this.breakpointObserver
      .getMobileLayoutObserver()
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(isMobile => (this.isMobile = isMobile));

    if (!this.isMobile) {
      this.alignPosition();
      this.alignWidth();

      this.initialYOffset = this.el.nativeElement.getBoundingClientRect().top;
    }
    this.resize$ = fromEvent(window, 'resize').pipe(filter(this.onlyDesktop), takeUntil(this.unsubscribe$));
    this.scroll$ = fromEvent(window, 'scroll').pipe(filter(this.onlyDesktop), takeUntil(this.unsubscribe$));
    this.scroll$.subscribe(() => this.alignPosition());
    this.resize$.subscribe(() => this.alignWidth());
  }

  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  alignPosition = () => {
    const { height } = this.computeDimensions(this.getRowParent());
    const parentBottom = this.getRowParent().offsetTop + height;
    const thisBottom = this.getScrollTop() + this.el.nativeElement.clientHeight + this.initialYOffset;

    if (parentBottom <= thisBottom) {
      this.stickToBottom();
    } else {
      this.stickToView();
    }
  };

  alignWidth = (): void => {
    const { width } = this.computeDimensions(this.getColumnParent());

    this.setWidth(width);
  };

  stickToView = (): void => {
    this.setTop(null);
    this.setPosition('fixed');
  };

  stickToBottom = (): void => {
    const { height } = this.computeDimensions(this.getRowParent());

    this.setPosition('absolute');
    this.setTop(this.getRowParent().offsetTop + height - this.el.nativeElement.offsetHeight - this.initialYOffset);
  };

  computeDimensions = (element: HTMLElement): Dictionary<number> => {
    const computedStyle = getComputedStyle(element);
    let elementHeight = element.clientHeight; // height with padding
    let elementWidth = element.clientWidth; // width with padding

    elementHeight -= parseFloat(computedStyle.paddingTop) + parseFloat(computedStyle.paddingBottom);
    elementWidth -= parseFloat(computedStyle.paddingLeft) + parseFloat(computedStyle.paddingRight);

    return {
      width: elementWidth,
      height: elementHeight,
    };
  };

  onlyDesktop = () => {
    if (this.isMobile) {
      this.setPosition('');
      this.setWidth('');
    } else if (!this.initialYOffset) {
      this.initialYOffset = this.el.nativeElement.getBoundingClientRect().top;
    }

    return !this.isMobile;
  };

  getScrollTop = (): number =>
    (window.pageYOffset || document.documentElement.scrollTop) - (document.documentElement.clientTop || 0);

  getColumnParent = () => {
    return this.el.nativeElement.parentNode.parentNode;
  };

  getRowParent = () => {
    let nextSibling = this.getColumnParent().parentNode.nextSibling;
    // only allow htmlElements because comments are sometimes there e.g. false ngIfs.
    while (!(nextSibling instanceof HTMLElement)) {
      nextSibling = nextSibling.nextSibling;
    }
    return nextSibling;
  };
  setPosition = position => (this.el.nativeElement.style.position = position ? position : '');
  setTop = top => (this.el.nativeElement.style.top = top ? `${top}px` : '');
  setWidth = width => (this.el.nativeElement.style.width = width ? `${width}px` : '');
}
