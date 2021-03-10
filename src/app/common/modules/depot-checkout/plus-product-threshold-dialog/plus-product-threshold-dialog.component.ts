import { Component, Optional } from '@angular/core';
import { MatBottomSheetRef } from '@angular/material/bottom-sheet';
import { MatDialogRef } from '@angular/material/dialog';
import { PlusProductThresholdProcessResult } from '../plus-product-threshold-process-result';

@Component({
  selector: 'app-plus-product-dialog',
  templateUrl: './plus-product-threshold-dialog.component.html',
  styleUrls: ['./plus-product-threshold-dialog.component.scss'],
})
export class PlusProductThresholdDialogComponent {
  constructor(
    @Optional()
    private dialogRef: MatDialogRef<PlusProductThresholdDialogComponent, PlusProductThresholdProcessResult>,
    @Optional()
    private bottomSheetRef: MatBottomSheetRef<PlusProductThresholdDialogComponent, PlusProductThresholdProcessResult>,
  ) {
    if (!this.dialogRef === !this.bottomSheetRef) {
      throw new Error('Either dialogRef or bottomSheetRef must be given.');
    }
  }

  private close(result: PlusProductThresholdProcessResult) {
    if (this.dialogRef != null) {
      this.dialogRef.close(result);
    }
    if (this.bottomSheetRef != null) {
      this.bottomSheetRef.dismiss(result);
    }
  }

  onNoClick(): void {
    this.close(PlusProductThresholdProcessResult.CANCEL_CHECKOUT);
  }

  goToCheckout(): void {
    this.close(PlusProductThresholdProcessResult.DELETE_PLUS_ITEMS_AND_PROCEED_TO_CHECKOUT);
  }
}
