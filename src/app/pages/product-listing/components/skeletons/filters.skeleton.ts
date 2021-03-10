import { Component } from '@angular/core';

@Component({
  selector: 'app-skeleton-filters',
  template: `
    <ngx-skeleton-loader count="1" appearance="lines" [theme]="{ height: '30px' }"></ngx-skeleton-loader>
    <div *ngFor="let i of 8 | range">
      <ngx-skeleton-loader
        count="1"
        appearance="lines"
        [theme]="{ height: '10px', marginBottom: '10px', marginTop: '10px' }"
      ></ngx-skeleton-loader>
      <mat-divider></mat-divider>
    </div>
  `,
})
export class SkeletonFiltersComponent {}
