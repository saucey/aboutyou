import { Pipe, PipeTransform } from '@angular/core';

/*
 *  This pipe can override the Localize Pipe from the RouterLocalizationModule.
 *
 * */
@Pipe({ name: 'localize' })
export class LocalizeRouterPipeMock implements PipeTransform {
  transform(value: string, ...args: any[]): any {
    return value;
  }
}
