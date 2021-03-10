import { DebugElement } from '@angular/core';
import { ComponentFixture } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { BasketComponent } from './basket.component';

export class BasketComponentPageObj {
  constructor(
    private fixture: ComponentFixture<BasketComponent>,
    private debugElement: DebugElement = fixture.debugElement,
    private element: HTMLElement = fixture.nativeElement,
  ) {}

  getRouterOutletElement(): HTMLElement {
    return this.debugElement.query(By.css('router-outlet')).nativeElement as HTMLElement;
  }

  getReservationBasketTabHeaderDebugElem(): DebugElement {
    return this.debugElement.query(By.css('.reservations.basket-tab-header'));
  }

  getCheckoutBasketTabHeaderDebugElem(): DebugElement {
    return this.debugElement.query(By.css('.checkout.basket-tab-header'));
  }

  getReservationBasketTabHeaderText(): string {
    const debugElement = this.getReservationBasketTabHeaderDebugElem();
    return this.getNullSafeText(debugElement);
  }

  getCheckoutBasketTabHeaderText(): string {
    const debugElement = this.getCheckoutBasketTabHeaderDebugElem();
    return this.getNullSafeText(debugElement);
  }

  getCheckoutBasketHeaderDebugElem(): DebugElement {
    return this.debugElement.query(By.css('.checkout-basket-header'));
  }

  getCheckoutBasketHeaderText(): string | null {
    return this.getNullSafeText(this.getCheckoutBasketHeaderDebugElem().query(By.css('h2')));
  }

  private getNullSafeText(debugElement: DebugElement): string | null {
    return debugElement == null ? null : debugElement.nativeElement.innerText;
  }
}
