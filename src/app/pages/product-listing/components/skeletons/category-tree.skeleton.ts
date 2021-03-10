import { Component } from '@angular/core';

@Component({
  selector: 'app-skeleton-category-tree',
  template: `
    <!-- MOBILE -->
    <div class="d-block d-lg-none">
      <ngx-skeleton-loader
        count="1"
        appearance="lines"
        [theme]="{ height: '20px', width: '30%', display: 'block', marginBottom: '10px' }"
      ></ngx-skeleton-loader>
      <ngx-skeleton-loader
        count="1"
        appearance="lines"
        [theme]="{ height: '40px', width: '60%', marginLeft: '20%' }"
      ></ngx-skeleton-loader>
      <ngx-skeleton-loader
        count="3"
        appearance="lines"
        [theme]="{ height: '30px', width: '28%', margin: '10px' }"
      ></ngx-skeleton-loader>
    </div>

    <!-- DESKTOP -->
    <div class="d-none d-lg-block">
      <ngx-skeleton-loader
        count="1"
        appearance="lines"
        [theme]="{ height: '30px', marginBottom: '10px', marginTop: '15px' }"
      ></ngx-skeleton-loader>
      <div *ngFor="let i of 8 | range">
        <ngx-skeleton-loader
          count="1"
          appearance="lines"
          [theme]="{ height: '10px', marginBottom: '10px', marginTop: '10px' }"
        ></ngx-skeleton-loader>
      </div>
      <mat-divider></mat-divider>
    </div>
  `,
})
export class SkeletonCategoryTreeComponent {}
