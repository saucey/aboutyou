import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { DialogBeSureResult, IDialogData } from './dialog-be-sure-type';

@Component({
  selector: 'app-dialog-be-sure',
  templateUrl: 'dialog-be-sure.html',
  styleUrls: ['./dialog-be-sure.scss'],
})
export class DialogBeSureComponent {
  constructor(
    public dialogRef: MatDialogRef<DialogBeSureComponent, DialogBeSureResult>,
    @Inject(MAT_DIALOG_DATA) public data: IDialogData,
  ) {}

  onNoClick(): void {
    this.dialogRef.close(DialogBeSureResult.No);
  }

  clickConfirmButton(): void {
    this.dialogRef.close(DialogBeSureResult.Yes);
  }
}
