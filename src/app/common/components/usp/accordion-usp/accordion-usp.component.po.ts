import { ComponentFixture } from '@angular/core/testing';
import { AccordionUspComponent } from './accordion-usp.component';

export class AccordionUspComponentPageObj {
  private element: HTMLElement;

  constructor(private fixture: ComponentFixture<AccordionUspComponent>) {
    this.element = fixture.nativeElement;
  }

  public getHeadlineText(): string {
    return this.getHealineElement().textContent;
  }

  private getHealineElement(): Element {
    return this.element.querySelector(`.headline`);
  }

  public getLongText(): string | null {
    return this.getLongElement() ? this.getLongElement().textContent : null;
  }

  public getLongElement(): Element | null {
    return this.element.querySelector(`.long`);
  }

  public getShortText(): string {
    return this.getShortElement().textContent;
  }

  public getShortElement(): Element {
    return this.element.querySelector(`.short`);
  }

  public getLinkText(): string {
    return this.getLinkElement().textContent;
  }

  public getLinkElement(): Element {
    return this.element.querySelector(`.link`);
  }

  public getIconName(): string {
    // ATTENTION: could crash in production mode.
    // works on intergation environment
    // remove this comment if hosted successfully on staging
    return this.getIconElement().getAttribute(`ng-reflect-icon`);
  }

  public getIconElement(): Element {
    return this.element.querySelector(`.icon`);
  }
}
