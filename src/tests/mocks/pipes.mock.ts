/**
 * based on:
 *   - https://stackoverflow.com/a/56701741
 *   - https://stackoverflow.com/a/41826482
 *
 * Usage:
 *   ```
 *   TestBed.configureTestingModule({
 *       declarations: [
 *           SomeComponent,
 *           mockPipe({ name: 'myPipe' }),
 *           mockPipe({ name: 'myOtherPipe' })
 *       ],
 *       // ...
 *   }).compileComponents();
 *   ```
 */

import { Pipe, PipeTransform } from '@angular/core';

export function mockPipe(options: Pipe): Pipe {
  const metadata: Pipe = {
    name: options.name,
  };

  return Pipe(metadata)(
    class MockPipe implements PipeTransform {
      transform(value: any): any {
        return value;
      }
    },
  );
}
