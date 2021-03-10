import { Component, EventEmitter, Output } from '@angular/core';
import { LocalizeRouterService } from '@gilsdav/ngx-translate-router';

@Component({
  selector: 'app-mobile-footer',
  templateUrl: './mobile-footer.component.html',
  styleUrls: ['./mobile-footer.component.scss']
})
export class MobileFooterComponent {

  @Output() linkClicked = new EventEmitter<void>();
  routes = { storefinder: ['/shopfinder'], basket: ['/basket'], newsletter: ['/newsletter'], contact: ['/contact'] } as const;

  constructor(
    private localize: LocalizeRouterService,
  ) {
  }

  getLink(link: string): any[] {
    if (this.routes && this.routes[link]) {
      return [...this.localize.translateRoute(this.routes[link])];
    }
    return undefined;
  }

  onLinkClick(): void {
    this.linkClicked.emit();
  }

}
