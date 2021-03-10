import { Component } from '@angular/core';

@Component({
  selector: 'app-skeleton-home',
  template: `
    <div class="d-block">
      <ngx-skeleton-loader
        count="1"
        appearance="lines"
        [theme]="{ paddingTop: '50%', width: '100%', display: 'block', marginBottom: '10px' }"
      ></ngx-skeleton-loader>
    </div>
  `,
})
export class SkeletonHomeComponent {}
