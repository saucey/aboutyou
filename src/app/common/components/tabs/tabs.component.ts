import {
  AfterViewInit,
  Component,
  ContentChildren,
  ElementRef,
  Input,
  OnDestroy,
  QueryList,
  ViewChild,
} from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { TabComponent } from '../tab/tab.component';

@Component({
  selector: 'app-product-content-tabs',
  templateUrl: './tabs.component.html',
  styleUrls: ['./tabs.component.scss'],
})
export class TabsComponent implements AfterViewInit, OnDestroy {
  @Input() isMobile: boolean;
  @ViewChild('content', { static: false }) private content: ElementRef<any>;
  @ContentChildren(TabComponent) private tabs: QueryList<TabComponent>;

  private unsubscribe$ = new Subject<void>();

  ngAfterViewInit() {
    this.tabs.forEach((tab: TabComponent) =>
      tab.click$.pipe(takeUntil(this.unsubscribe$)).subscribe($event => !this.isMobile && this.activateDesktopTab(tab)),
    );

    if (!this.isMobile) {
      const activeTab = this.tabs.find(tab => tab.isActive);
      if (activeTab) {
        this.activateDesktopTab(activeTab);
      }
    }
  }

  private activateDesktopTab(activeTab: TabComponent) {
    this.tabs.forEach(tab => tab.setIsActive(false));
    activeTab.setIsActive(true);

    const content = activeTab.cloneContent();
    this.content.nativeElement.innerHTML = content.innerHTML;
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
