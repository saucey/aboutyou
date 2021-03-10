import { Provider } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

export class MatDialogRefMock {
  // tslint:disable-next-line:no-empty
  close() {}
}

export function provideMockMatDialogRef(): Provider {
  return { provide: MatDialogRef, useClass: MatDialogRefMock };
}
