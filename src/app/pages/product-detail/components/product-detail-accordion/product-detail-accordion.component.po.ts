import { ComponentFixture } from '@angular/core/testing';
import { ProductDetailAccordionComponent } from './product-detail-accordion.component';

export class ProductDetailAccordionComponentPageObj {
  private element: HTMLElement;

  constructor(private fixture: ComponentFixture<ProductDetailAccordionComponent>) {
    this.element = fixture.nativeElement;
  }

  public getUspItemElements(): Element[] {
    return [...this.element.querySelectorAll(`app-accordion-usp`)];
  }
}
