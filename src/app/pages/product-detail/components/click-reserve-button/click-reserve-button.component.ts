import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { AccountService } from 'src/app/core/services/account/account.service';
import { AppState } from 'src/app/core/shop/store';
import { getAuthenticated, selectAccountIsLoading } from 'src/app/core/shop/store/account';
import { BreakpointObserverService } from 'src/app/common/services/breakpoint-observer.service';
import { combineLatest, from, noop, Observable, Subject, Subscription } from 'rxjs';
import { first, map, skipUntil, switchMap, take, takeUntil, tap } from 'rxjs/operators';
import { ProductMap } from 'src/app/mappers/product';
import { LazyGoogleMapsService } from '../../../../modules/location-reserve-dialog/lazy-google-maps.service';
import { LocationReserveDialogComponent } from '../../../../modules/location-reserve-dialog/location-reserve-dialog.component';
import { LocationReservationDialogData } from '../../../../modules/location-reserve-dialog/location-reservation-dialog.data';

@Component({
  selector: 'app-click-reserve-button',
  templateUrl: './click-reserve-button.component.html',
  styleUrls: ['./click-reserve-button.component.scss'],
})
export class ClickReserveButtonComponent implements OnInit, OnDestroy {
  @Input() variantId: number;
  @Input() product: ProductMap;

  private subscription = new Subscription();
  private isAuthenticated$: Observable<boolean>;
  private isMobile = false;
  private closed$ = new Subject();

  constructor(
    private dialog: MatDialog,
    private lazyGoogleMapsService: LazyGoogleMapsService,
    private accountService: AccountService,
    private store: Store<AppState>,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private breakpointObserver: BreakpointObserverService,
  ) {
    this.subscription.add(
      this.breakpointObserver
        .getMobileLayoutObserver()
        .pipe(take(1))
        .subscribe(isMobile => (this.isMobile = isMobile)),
    );

    const isNotLoading$: Observable<boolean> = this.store
      .select(selectAccountIsLoading)
      .pipe(first(loading => !loading));
    this.isAuthenticated$ = store.select(getAuthenticated).pipe(skipUntil(isNotLoading$));
  }

  async ngOnInit() {
    const clickAndReserveRequested$ = this.activatedRoute.queryParams.pipe(
      map(params => !!params.clickAndReserveRequested),
    );

    const openDialogIfRequested$ = combineLatest([clickAndReserveRequested$, this.isAuthenticated$]).pipe(
      first(([requested, isAuthenticated]) => requested && isAuthenticated),
      switchMap(() => from(this.clickAndReserveSetQueryRequest(null))),
      tap(routingWorked => (routingWorked ? this.displayClickAndReserveMap() : noop())),
    );

    this.subscription.add(openDialogIfRequested$.subscribe());
  }

  private clickAndReserveSetQueryRequest(val: string | null) {
    return this.router.navigate([], {
      queryParams: {
        clickAndReserveRequested: val,
      },
      queryParamsHandling: 'merge',
    });
  }

  async onButtonClick() {
    this.subscription.add(
      this.isAuthenticated$.pipe(first()).subscribe(async isAuthenticated => {
        if (isAuthenticated) {
          this.displayClickAndReserveMap();
        } else {
          await this.clickAndReserveSetQueryRequest('true');
          this.accountService.showEmbeddedLogin();
        }
      }),
    );
  }

  private displayClickAndReserveMap() {
    this.subscription.add(
      this.lazyGoogleMapsService.runMap().subscribe(e => {
        this.openDialog();
      }),
    );
  }

  private openDialog() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = false;
    dialogConfig.autoFocus = false;

    const dialogRef = this.dialog.open<LocationReserveDialogComponent, LocationReservationDialogData>(
      LocationReserveDialogComponent,
      {
        panelClass: 'google-map-dialog-container',
        data: { product: this.product, variantId: this.variantId },
        width: '1200px',
        maxWidth: '100vw',
        height: this.isMobile ? '100%' : 'auto',
      },
    );

    this.breakpointObserver
      .getMobileLayoutObserver()
      .pipe(takeUntil(this.closed$))
      .subscribe(isMobile => {
        dialogRef.updateSize('1200px', isMobile ? '100%' : 'auto');
      });

    dialogRef
      .afterClosed()
      .pipe(takeUntil(this.closed$))
      .subscribe(data => {
        this.closed$.next();
        this.closed$.complete();
      });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
    this.closed$.next();
    this.closed$.complete();
  }
}
