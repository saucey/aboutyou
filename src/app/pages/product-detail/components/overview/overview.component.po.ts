import { DebugElement } from '@angular/core';
import { ComponentFixture } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { ClickReserveButtonComponent } from '../click-reserve-button/click-reserve-button.component';
import { OverviewComponent } from './overview.component';

export class OverviewComponentPageObj {
  private element: HTMLElement;
  private debugElement: DebugElement;

  constructor(private fixture: ComponentFixture<OverviewComponent>) {
    this.debugElement = fixture.debugElement;
    this.element = fixture.nativeElement;
  }

  public getVariantNotSelectableInfo(): string | null {
    return this.getVariantNotSelectableInfoElem() ? this.getVariantNotSelectableInfoElem().textContent : null;
  }

  public getVariantNotSelectableInfoElem(): HTMLSpanElement | null {
    return this.element.querySelector('h1.product-title > span');
  }

  public getClickAndReserveButton(): HTMLElement | null {
    return this.debugElement.query(By.css('app-click-reserve-button')).nativeElement;
  }
}
