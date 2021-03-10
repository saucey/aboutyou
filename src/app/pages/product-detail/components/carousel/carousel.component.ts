import { animate, style, transition, trigger } from '@angular/animations';
import { isPlatformBrowser } from '@angular/common';
import {
  AfterViewChecked,
  AfterViewInit,
  Component,
  ElementRef,
  Inject,
  Input,
  Output,
  EventEmitter,
  OnChanges,
  OnDestroy,
  OnInit,
  PLATFORM_ID,
} from '@angular/core';
import {
  getFacebookShareUrl,
  getMailShareUrl,
  getPinterestShareUrl,
  shareNatively,
} from 'src/app/core/shop/utils/sharing';
import { fromEvent, Observable, Subject } from 'rxjs';
import { filter, takeUntil, throttleTime } from 'rxjs/operators';
import { DEFAULT_ZOOM_SCALE, thumbnailItemsConfig } from './config';

@Component({
  selector: 'app-product-detail-carousel',
  animations: [
    trigger('enterAnimation', [
      transition(':enter', [style({ opacity: 0 }), animate('300ms', style({ opacity: 1 }))]),
      transition(':leave', [style({ opacity: 1 }), animate('300ms', style({ opacity: 0 }))]),
    ]),
  ],
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.scss'],
})
export class CarouselComponent implements OnInit, AfterViewInit, OnDestroy, OnChanges, AfterViewChecked {
  @Input() images = [];
  @Input() isMobile: boolean;
  @Input() isWishlisted: boolean;
  @Output() addToWishlist = new EventEmitter();

  private unsubscribe$ = new Subject<void>();

  private resize$: Observable<Event>;
  private scroll$: Observable<Event>;
  private mousemove$: Observable<MouseEvent>;
  private zoomClick$: Observable<MouseEvent>;

  private isBrowser: boolean;
  private slideItemWidth = 0;
  private zoomScaleValue = 0;
  private centerX = 0;
  private centerY = 0;
  private boundX = 0;
  private boundY = 0;

  public currentImage = 0;
  public zoom = false;
  public previewQueue = [];
  public showShareToolbox = false;

  public facebookShareUrl = '';
  public pinterestShareUrl = '';
  public mailShareUrl = '';

  constructor(public el: ElementRef<any>, @Inject(PLATFORM_ID) platformId: object) {
    this.isBrowser = isPlatformBrowser(platformId);

    if (this.isBrowser) {
      this.facebookShareUrl = getFacebookShareUrl();
      this.pinterestShareUrl = getPinterestShareUrl();
      this.mailShareUrl = getMailShareUrl();
    }
  }

  public ngOnInit() {
    if (this.images.length > 0) {
      // Jump to first image
      this.nextQueue();
    }
  }

  public ngOnChanges() {
    // Reset view queue
    this.previewQueue = [];
    this.currentImage = 0;

    if (this.images.length > 0) {
      // Jump to first image
      this.nextQueue();
    }
  }

  public ngAfterViewInit() {
    if (this.isBrowser) {
      this.resize$ = fromEvent(window, 'resize').pipe(throttleTime(25), takeUntil(this.unsubscribe$));
      this.scroll$ = fromEvent(window, 'scroll').pipe(takeUntil(this.unsubscribe$));
      this.mousemove$ = fromEvent<MouseEvent>(window, 'mousemove').pipe(takeUntil(this.unsubscribe$));
      this.zoomClick$ = fromEvent<MouseEvent>(this.el.nativeElement.querySelector('.zoom-container'), 'click').pipe(
        filter(this.onlyDesktop),
        throttleTime(200),
        takeUntil(this.unsubscribe$),
      );

      this.zoomScaleValue = DEFAULT_ZOOM_SCALE;

      this.adjustNavDimensions();
      this.calibratePreviewCenter();
      this.resize$.subscribe(() => {
        this.adjustNavDimensions();
        this.calibratePreviewCenter();
      });
      this.scroll$.subscribe(() => this.calibratePreviewCenter());
      this.mousemove$.subscribe(e => this.adjustZoomPosition(e));
      this.zoomClick$.subscribe(e => this.toggleZoom(e));
    }
  }

  public ngAfterViewChecked() {
    if (this.isBrowser) {
      this.adjustNavDimensions();
      this.calibratePreviewCenter();
    }
  }

  public ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  public onHandleAddWishlistItem() {
    this.isWishlisted = !this.isWishlisted;
    this.addToWishlist.emit();
  }

  calibratePreviewCenter = () => {
    const { clientHeight, clientWidth } = this.el.nativeElement.querySelector('.image-preview');
    const { top, left } = this.el.nativeElement.querySelector('.image-preview').getBoundingClientRect();

    this.centerX = left + clientWidth / 2;
    this.centerY = top + clientHeight / 2;
    this.boundX = (clientWidth * this.zoomScaleValue - clientWidth) / 2;
    this.boundY = (clientHeight * this.zoomScaleValue - clientHeight) / 2;
  };

  adjustNavDimensions = () => {
    if (this.images.length < 2) {
      return;
    }

    const itemsPerRow = this.getThumbnailItemsCount();
    const itemsCount = [...this.el.nativeElement.querySelectorAll('.item')].length;

    if (itemsCount <= itemsPerRow) {
      this.el.nativeElement.querySelector('.items').classList.add('no-nav');
    } else {
      this.el.nativeElement.querySelector('.items').classList.remove('no-nav');
    }

    const rowWidth = this.el.nativeElement.querySelector('.items').clientWidth;
    const { paddingLeft } = getComputedStyle(this.el.nativeElement.querySelector('.items'));

    // + 3 because of the "border" design
    const itemWidth = (rowWidth + 3 - parseFloat(paddingLeft) * 2) / itemsPerRow;

    const { marginRight } = getComputedStyle(this.el.nativeElement.querySelectorAll('.item')[0]);

    [...this.el.nativeElement.querySelectorAll('.item .image')].map(item => {
      item.style.width = `${itemWidth - parseFloat(marginRight)}px`;
      item.style.height = `${itemWidth - parseFloat(marginRight)}px`;
    });

    this.slideItemWidth = itemWidth;
    this.adjustXCoordinate();
  };

  adjustXCoordinate() {
    const itemsCount = this.el.nativeElement.querySelectorAll('.item').length;
    const itemsPerRow = this.getThumbnailItemsCount();

    if (itemsCount <= itemsPerRow) {
      [...this.el.nativeElement.querySelectorAll('.item')].map(
        item => (item.style.transform = `translate3d(0px, 0, 0)`),
      );
      return;
    }

    const X = this.currentImage * this.slideItemWidth * -1;

    [...this.el.nativeElement.querySelectorAll('.item')].map(
      item => (item.style.transform = `translate3d(${X}px, 0, 0)`),
    );
  }

  adjustZoomPosition = (e: MouseEvent) => {
    const zoomContainer = this.el.nativeElement.querySelector('.zoom-container');

    if (this.zoom) {
      let x = this.centerX - e.clientX;
      let y = this.centerY - e.clientY;

      if (Math.abs(x) >= this.boundX) {
        x = x < 0 ? -this.boundX : this.boundX;
      }

      if (Math.abs(y) >= this.boundY) {
        y = y < 0 ? -this.boundY : this.boundY;
      }

      zoomContainer.style.transform = `translate3d(${x}px, ${y}px, 0)`;
    } else {
      zoomContainer.style.transform = ``;
    }
  };

  prev() {
    const previousImage = this.currentImage - 1 >= 0 ? this.currentImage - 1 : this.images.length - 1;

    this.setCurrentImage(previousImage);
  }

  next() {
    const nextImage = this.currentImage + 1 >= this.images.length ? 0 : this.currentImage + 1;

    this.setCurrentImage(nextImage);
  }

  setCurrentImage(i: number) {
    this.currentImage = i;

    this.adjustXCoordinate();
    this.nextQueue();
  }

  nextQueue() {
    this.previewQueue.push(this.images[this.currentImage]);

    if (this.previewQueue.length > 5) {
      this.previewQueue.shift();
    }
  }

  toggleZoom(e: MouseEvent) {
    const zoomContainer = this.el.nativeElement.querySelector('.zoom-container');
    this.zoom = !this.zoom;

    zoomContainer.classList.add('zooming');
    setTimeout(() => zoomContainer.classList.remove('zooming'), 200);

    this.adjustZoomPosition(e);
  }

  getThumbnailItemsCount(): number {
    const key = Object.keys(thumbnailItemsConfig)
      .sort()
      .reverse()
      .find(width => window.innerWidth > Number(width));

    return thumbnailItemsConfig[key];
  }

  onlyDesktop = () => !this.isMobile;

  shareOnMobile = () => {
    shareNatively();
  };
}
