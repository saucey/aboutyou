import { AfterViewInit, Component, ElementRef, HostListener, Input, OnInit, ViewChild } from '@angular/core';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-product-content-tab',
  templateUrl: './tab.component.html',
  styleUrls: ['./tab.component.scss'],
})
export class TabComponent implements AfterViewInit, OnInit {
  @Input() label: string;
  @Input() isMobile: boolean;
  @Input() default: boolean;
  @ViewChild('li', { static: false }) listItem: ElementRef<any>;
  @ViewChild('content', { static: false }) content: ElementRef<any>;

  private click = new Subject();
  public click$ = this.click.asObservable();

  public isActive: boolean;

  ngOnInit() {
    this.isActive = this.default;
  }

  ngAfterViewInit() {
    this.adjustContentHeight();
  }

  @HostListener('click', ['$event']) onClick($event: MouseEvent) {
    $event.preventDefault();
    $event.stopPropagation();

    this.isActive = !this.isActive;

    if (this.isMobile) {
      if (this.isActive) {
        this.openAccordionContent();
      } else {
        this.closeAccordionContent();
      }
    }

    this.click.next($event);
  }

  @HostListener('window:resize') adjustContentHeight = () =>
    this.isMobile && this.isActive && this.openAccordionContent();

  openAccordionContent = () => {
    const { clientHeight: contentHeight } = this.listItem.nativeElement.lastElementChild;
    const { clientHeight: baseHeight } = this.listItem.nativeElement.firstElementChild;

    this.listItem.nativeElement.style.height = `${baseHeight + contentHeight}px`;
  };

  closeAccordionContent = (force?: boolean) => {
    this.listItem.nativeElement.style.height = '';

    if (force) {
      this.listItem.nativeElement.style.transition = 'all 0s';

      setTimeout(() => (this.listItem.nativeElement.style.transition = ''), 1);
    }
  };

  setIsActive = (value: boolean) => (this.isActive = value);
  cloneContent = () => this.content.nativeElement.cloneNode(true);
}
