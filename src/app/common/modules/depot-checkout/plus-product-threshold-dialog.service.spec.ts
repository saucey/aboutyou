import { fakeAsync, TestBed } from '@angular/core/testing';
import { MatBottomSheet, MatBottomSheetModule, MatBottomSheetRef } from '@angular/material/bottom-sheet';
import { MatDialog, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { of } from 'rxjs';
import { PlusProductThresholdDialogService } from './plus-product-threshold-dialog.service';
import { PlusProductThresholdDialogComponent } from './plus-product-threshold-dialog/plus-product-threshold-dialog.component';
import { PlusProductThresholdProcessResult } from './plus-product-threshold-process-result';
import createSpyObj = jasmine.createSpyObj;
import SpyObj = jasmine.SpyObj;

describe('PlusProductThresholdDialogService', () => {
  let service: PlusProductThresholdDialogService;
  let dialog: MatDialog;
  let bottomSheet: MatBottomSheet;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [MatDialogModule, MatBottomSheetModule],
    });
    dialog = TestBed.get(MatDialog);
    bottomSheet = TestBed.get(MatBottomSheet);
    service = TestBed.get(PlusProductThresholdDialogService);
  });

  describe('#openDialog$', () => {
    let dialogResult: PlusProductThresholdProcessResult;
    let dialogRef: SpyObj<MatDialogRef<PlusProductThresholdDialogComponent, PlusProductThresholdProcessResult>>;
    let bottomSheetRef: SpyObj<MatBottomSheetRef<
      PlusProductThresholdDialogComponent,
      PlusProductThresholdProcessResult
    >>;
    let isMobile: boolean;

    beforeEach(() => {
      dialogRef = createSpyObj('dialogRef', ['afterClosed']);
      dialogRef.afterClosed.and.returnValue(of(PlusProductThresholdProcessResult.GOTO_CHECKOUT));
      spyOn(dialog, 'open').and.returnValue(dialogRef);

      bottomSheetRef = createSpyObj('bottomSheetRef', ['afterDismissed']);
      bottomSheetRef.afterDismissed.and.returnValue(of(PlusProductThresholdProcessResult.CANCEL_CHECKOUT));
      spyOn(bottomSheet, 'open').and.returnValue(bottomSheetRef);
    });

    describe('isMobile=false', () => {
      beforeEach(() => {
        isMobile = false;
      });
      it('should call dialog.open', fakeAsync(() => {
        whenOpenDialogIsSubscribed();
        expect(dialog.open).toHaveBeenCalled();
      }));

      it('should return result of dialog.afterClosed', fakeAsync(() => {
        whenOpenDialogIsSubscribed();
        expect(dialogRef.afterClosed).toHaveBeenCalled();
        expect(dialogResult).toEqual(PlusProductThresholdProcessResult.GOTO_CHECKOUT);
      }));

      it('should not call #matBottomSheet.open', fakeAsync(() => {
        whenOpenDialogIsSubscribed();
        expect(bottomSheet.open).not.toHaveBeenCalled();
      }));
    });

    describe('isMobile=true', () => {
      beforeEach(() => {
        isMobile = true;
      });

      it('should call matBottomSheet.open with PlusProductThresholdBottomSheetComponent', fakeAsync(() => {
        whenOpenDialogIsSubscribed();
        expect(bottomSheet.open).toHaveBeenCalled();
      }));

      it('should return result of matBottomSheetRef.afterDismissed', fakeAsync(() => {
        whenOpenDialogIsSubscribed();
        expect(dialogResult).toEqual(PlusProductThresholdProcessResult.CANCEL_CHECKOUT);
        expect(bottomSheetRef.afterDismissed).toHaveBeenCalled();
      }));

      it('should not open #matDialog', fakeAsync(() => {
        whenOpenDialogIsSubscribed();
        expect(dialog.open).not.toHaveBeenCalled();
      }));
    });

    function whenOpenDialogIsSubscribed() {
      service.openDialog$(isMobile).subscribe(result => (dialogResult = result));
    }
  });
});
