import { ComponentFixture } from '@angular/core/testing';
import { DetailAttributesComponent } from './detail-attributes.component';

export class DetailAttributesComponentPageObj {
  private element: HTMLElement;

  constructor(private fixture: ComponentFixture<DetailAttributesComponent>) {
    this.element = fixture.nativeElement;
  }

  public getVariantNotSelectableInfo(): string | null {
    return this.getVariantNotSelectableInfoElem() ? this.getVariantNotSelectableInfoElem().textContent : null;
  }

  public getVariantNotSelectableInfoElem(): HTMLSpanElement | null {
    return this.element.querySelector('span[testid="variantNotSelectableInfo"]');
  }
}
