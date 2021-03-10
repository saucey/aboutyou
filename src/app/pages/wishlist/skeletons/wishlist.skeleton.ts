import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-skeleton-wishlist',
  templateUrl: './wishlist.skeleton.html',
  styleUrls: ['./wishlist.skeleton.scss'],
})
export class WishlistSkeletonComponent {
  @Input() productsCount: number;
}
