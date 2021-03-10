import { Component, Inject } from '@angular/core';
import { MAT_BOTTOM_SHEET_DATA, MatBottomSheetRef } from '@angular/material/bottom-sheet';
import { BasketBottomSheetResult } from './basket-bottom-sheet-result';
import { BasketBottomSheetData } from './basket-bottom-sheet-data';

@Component({
  selector: 'app-basket-bottom-sheet',
  templateUrl: './basket-bottom-sheet.component.html',
  styleUrls: ['./basket-bottom-sheet.component.scss'],
})
export class BasketBottomSheetComponent {
  constructor(
    private bottomSheetRef: MatBottomSheetRef<BasketBottomSheetComponent, BasketBottomSheetResult>,
    @Inject(MAT_BOTTOM_SHEET_DATA) public data: BasketBottomSheetData,
  ) {}

  addItem(): void {
    this.bottomSheetRef.dismiss(BasketBottomSheetResult.ADD_ARTICLE);
  }

  deleteItem(): void {
    this.bottomSheetRef.dismiss(BasketBottomSheetResult.DELETE_ARTICLE);
  }

  cancel(): void {
    this.bottomSheetRef.dismiss(BasketBottomSheetResult.CANCEL);
  }
}
