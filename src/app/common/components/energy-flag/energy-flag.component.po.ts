import { ComponentFixture } from '@angular/core/testing';
import { EnergyFlagComponent } from './energy-flag.component';

export class EnergyFlagComponentPageObj {
  private element: HTMLElement;

  constructor(private fixture: ComponentFixture<EnergyFlagComponent>) {
    this.element = fixture.nativeElement;
  }

  public getTextContent(): string {
    return this.getFigureElem().textContent;
  }

  public getCssClasses(): string[] {
    return [...this.getFigureElem().classList]; // DOMTokenList to Array;
  }

  private getFigureElem(): HTMLElement {
    return this.element.querySelector('figure');
  }
}
