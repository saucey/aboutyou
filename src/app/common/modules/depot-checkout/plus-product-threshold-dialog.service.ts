import { Injectable } from '@angular/core';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { MatDialog } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { PlusProductThresholdDialogComponent } from './plus-product-threshold-dialog/plus-product-threshold-dialog.component';
import { PlusProductThresholdProcessResult } from './plus-product-threshold-process-result';

@Injectable({
  providedIn: 'root',
})
export class PlusProductThresholdDialogService {
  constructor(public dialog: MatDialog, public bottomSheet: MatBottomSheet) {}

  openDialog$(isMobile: boolean): Observable<PlusProductThresholdProcessResult> {
    const disableCloseConfig = { disableClose: true };
    return isMobile
      ? this.bottomSheet
          .open<PlusProductThresholdDialogComponent, undefined, PlusProductThresholdProcessResult>(
            PlusProductThresholdDialogComponent,
            disableCloseConfig,
          )
          .afterDismissed()
      : this.dialog
          .open<PlusProductThresholdDialogComponent, undefined, PlusProductThresholdProcessResult>(
            PlusProductThresholdDialogComponent,
            { ...disableCloseConfig, width: '576px', panelClass: 'desktop-dialog' },
          )
          .afterClosed();
  }
}
