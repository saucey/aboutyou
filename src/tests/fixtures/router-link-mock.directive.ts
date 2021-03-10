import { Directive } from '@angular/core';

/*
 *  This directive overrides the routerLink directive from RouterModule to simplify unit tests.
 *
 *
 *
 */

/* tslint:disable-next-line: directive-selector */
@Directive({ selector: '[routerLink], a:[routerLink]' })
export class RouterLinkMockDirective {}
