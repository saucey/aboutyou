import { ComponentFixture } from '@angular/core/testing';
import { SimpleUspComponent } from './simple-usp.component';

export class SimpleUspComponentPageObj {
  private element: HTMLElement;

  constructor(private fixture: ComponentFixture<SimpleUspComponent>) {
    this.element = fixture.nativeElement;
  }

  public getHeadlineText(): string {
    return this.getHealineElement().textContent;
  }

  private getHealineElement(): Element {
    return this.element.querySelector(`.headline`);
  }

  public getShortText(): string {
    return this.getShortElement().textContent;
  }

  public getShortElement(): Element {
    return this.element.querySelector(`.short`);
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
