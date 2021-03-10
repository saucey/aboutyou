import { DebugElement } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatBottomSheetRef } from '@angular/material/bottom-sheet';
import { MatDialogRef } from '@angular/material/dialog';
import { By } from '@angular/platform-browser';
import { TranslateTestingModule } from 'src/tests/fixtures/translate-testing.module';
import { DepotCheckoutModule } from '../depot-checkout.module';
import { PlusProductThresholdProcessResult } from '../plus-product-threshold-process-result';
import { PlusProductThresholdDialogComponent } from './plus-product-threshold-dialog.component';
import createSpyObj = jasmine.createSpyObj;
import SpyObj = jasmine.SpyObj;

describe('ProductThresholdDialogComponent', () => {
  let component: PlusProductThresholdDialogComponent;
  let fixture: ComponentFixture<PlusProductThresholdDialogComponent>;

  function initComponent() {
    fixture = TestBed.createComponent(PlusProductThresholdDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }

  describe('with MatDialogRef', () => {
    let matDialogRef: SpyObj<MatDialogRef<PlusProductThresholdDialogComponent>>;

    beforeEach(() => {
      TestBed.configureTestingModule({
        providers: [
          {
            provide: MatDialogRef,
            useValue: createSpyObj<MatDialogRef<PlusProductThresholdDialogComponent>>('dialogRef', ['close']),
          },
        ],
        imports: [DepotCheckoutModule, TranslateTestingModule],
      });
    });

    beforeEach(() => {
      matDialogRef = TestBed.get(MatDialogRef);
      initComponent();
    });

    it(
      'should close with PlusProductThresholdProcessResult.DELETE_PLUS_ITEMS_AND_PROCEED_TO_CHECKOUT ' +
        'when purchase button is clicked',
      () => {
        const deleteButton: DebugElement = fixture.debugElement.query(By.css('.purchase-button'));
        deleteButton.triggerEventHandler('click', null);
        thenClosFunctionWasCalledWith(PlusProductThresholdProcessResult.DELETE_PLUS_ITEMS_AND_PROCEED_TO_CHECKOUT);
      },
    );

    // tslint:disable-next-line: max-line-length
    it('should close with PlusProductThresholdProcessResult.CANCEL_CHECKOUT when continue-shopping is clicked', () => {
      const secondaryButton = fixture.debugElement.nativeElement.querySelector('.secondary');
      secondaryButton.click();
      thenClosFunctionWasCalledWith(PlusProductThresholdProcessResult.CANCEL_CHECKOUT);
    });

    // tslint:disable-next-line: max-line-length
    it('should close with PlusProductThresholdProcessResult.CANCEL_CHECKOUT when "X" is clicked', () => {
      const xButton = fixture.debugElement.nativeElement.querySelector('.icon-link');
      xButton.click();
      thenClosFunctionWasCalledWith(PlusProductThresholdProcessResult.CANCEL_CHECKOUT);
    });

    function thenClosFunctionWasCalledWith(expectedResult: PlusProductThresholdProcessResult) {
      expect(matDialogRef.close).toHaveBeenCalledWith(expectedResult);
    }
  });

  describe('with MatBottomSheetRef', () => {
    let matBottomSheetRef: SpyObj<MatBottomSheetRef<PlusProductThresholdDialogComponent>>;

    beforeEach(() => {
      TestBed.configureTestingModule({
        providers: [
          {
            provide: MatBottomSheetRef,
            useValue: createSpyObj<MatBottomSheetRef<PlusProductThresholdDialogComponent>>('dialogRef', ['dismiss']),
          },
        ],
        imports: [DepotCheckoutModule, TranslateTestingModule],
      });
    });

    beforeEach(() => {
      matBottomSheetRef = TestBed.get(MatBottomSheetRef);
      initComponent();
    });

    it(
      'should close with PlusProductThresholdProcessResult.DELETE_PLUS_ITEMS_AND_PROCEED_TO_CHECKOUT ' +
        'when purchase button is clicked',
      () => {
        const deleteButton: DebugElement = fixture.debugElement.query(By.css('.purchase-button'));
        deleteButton.triggerEventHandler('click', null);
        thenCloseFunctionWasCalledWith(PlusProductThresholdProcessResult.DELETE_PLUS_ITEMS_AND_PROCEED_TO_CHECKOUT);
      },
    );

    // tslint:disable-next-line: max-line-length
    it('should close with PlusProductThresholdProcessResult.CANCEL_CHECKOUT when continue-shopping is clicked', () => {
      const secondaryButton = fixture.debugElement.nativeElement.querySelector('.secondary');
      secondaryButton.click();
      thenCloseFunctionWasCalledWith(PlusProductThresholdProcessResult.CANCEL_CHECKOUT);
    });

    // tslint:disable-next-line: max-line-length
    it('should close with PlusProductThresholdProcessResult.CANCEL_CHECKOUT when "X" is clicked', () => {
      const xButton = fixture.debugElement.nativeElement.querySelector('.icon-link');
      xButton.click();
      thenCloseFunctionWasCalledWith(PlusProductThresholdProcessResult.CANCEL_CHECKOUT);
    });

    function thenCloseFunctionWasCalledWith(expectedResult: PlusProductThresholdProcessResult) {
      expect(matBottomSheetRef.dismiss).toHaveBeenCalledWith(expectedResult);
    }
  });
});
